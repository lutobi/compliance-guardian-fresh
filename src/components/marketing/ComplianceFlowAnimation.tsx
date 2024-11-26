import React, { useEffect, useRef } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'input' | 'process' | 'output';
  connections: string[];
}

interface Particle {
  x: number;
  y: number;
  pathIndex: number;
  progress: number;
  speed: number;
  path: { x: number; y: number }[];
}

const NETWORK_NODES: Node[] = [
  // Input nodes (Compliance Sources)
  { id: 'controls', x: 0.2, y: 0.3, label: 'Security\nControls', type: 'input', connections: ['policies', 'risk'] },
  { id: 'evidence', x: 0.2, y: 0.5, label: 'Audit\nEvidence', type: 'input', connections: ['assessment', 'monitoring'] },
  { id: 'vendors', x: 0.2, y: 0.7, label: 'Vendor\nManagement', type: 'input', connections: ['risk', 'monitoring'] },

  // Process nodes (Platform Features)
  { id: 'policies', x: 0.4, y: 0.3, label: 'Policy\nManagement', type: 'process', connections: ['iso', 'soc2'] },
  { id: 'assessment', x: 0.4, y: 0.5, label: 'Assessment\nEngine', type: 'process', connections: ['iso', 'pci', 'hipaa'] },
  { id: 'risk', x: 0.4, y: 0.7, label: 'Risk\nAnalysis', type: 'process', connections: ['soc2', 'hipaa'] },
  { id: 'monitoring', x: 0.6, y: 0.4, label: 'Continuous\nMonitoring', type: 'process', connections: ['iso', 'pci'] },

  // Output nodes (Frameworks)
  { id: 'iso', x: 0.8, y: 0.3, label: 'ISO 27001', type: 'output', connections: [] },
  { id: 'soc2', x: 0.8, y: 0.45, label: 'SOC 2', type: 'output', connections: [] },
  { id: 'pci', x: 0.8, y: 0.6, label: 'PCI DSS', type: 'output', connections: [] },
  { id: 'hipaa', x: 0.8, y: 0.75, label: 'HIPAA', type: 'output', connections: [] }
];

export const ComplianceFlowAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initializeNodes = () => {
      nodesRef.current = NETWORK_NODES.map(node => ({
        ...node,
        x: node.x * canvas.offsetWidth,
        y: node.y * canvas.offsetHeight
      }));
    };

    const findNode = (id: string) => nodesRef.current.find(n => n.id === id);

    const createParticle = () => {
      // Select random input node
      const inputNodes = nodesRef.current.filter(n => n.type === 'input');
      const startNode = inputNodes[Math.floor(Math.random() * inputNodes.length)];
      
      // Build random path through network
      const path: Node[] = [startNode];
      let currentNode = startNode;
      
      while (currentNode.type !== 'output' && currentNode.connections.length > 0) {
        const nextId = currentNode.connections[Math.floor(Math.random() * currentNode.connections.length)];
        const nextNode = findNode(nextId);
        if (nextNode) {
          path.push(nextNode);
          currentNode = nextNode;
        }
      }

      return {
        x: path[0].x,
        y: path[0].y,
        pathIndex: 0,
        progress: 0,
        speed: 0.02 + Math.random() * 0.02,
        path: path.map(n => ({ x: n.x, y: n.y }))
      };
    };

    const drawConnection = (start: Node, end: Node) => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 1;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    };

    const drawNode = (node: Node) => {
      // Node circle
      ctx.beginPath();
      ctx.fillStyle = node.type === 'process' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.1)';
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
      ctx.lineWidth = 2;
      ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Node label
      ctx.fillStyle = 'rgba(99, 102, 241, 0.9)';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const lines = node.label.split('\n');
      lines.forEach((line, i) => {
        const offset = (i - (lines.length - 1) / 2) * 16;
        ctx.fillText(line, node.x, node.y + offset);
      });
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections
      nodesRef.current.forEach(node => {
        node.connections.forEach(targetId => {
          const targetNode = findNode(targetId);
          if (targetNode) {
            drawConnection(node, targetNode);
          }
        });
      });

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        if (particle.pathIndex >= particle.path.length - 1) {
          particlesRef.current.splice(index, 1);
          return;
        }

        const currentPoint = particle.path[particle.pathIndex];
        const nextPoint = particle.path[particle.pathIndex + 1];
        
        particle.progress += particle.speed;
        
        if (particle.progress >= 1) {
          particle.pathIndex++;
          particle.progress = 0;
          return;
        }

        const x = currentPoint.x + (nextPoint.x - currentPoint.x) * particle.progress;
        const y = currentPoint.y + (nextPoint.y - currentPoint.y) * particle.progress;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes
      nodesRef.current.forEach(drawNode);

      // Add new particles
      if (Math.random() < 0.05) {
        particlesRef.current.push(createParticle());
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', () => {
      resizeCanvas();
      initializeNodes();
    });
    
    initializeNodes();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
};
