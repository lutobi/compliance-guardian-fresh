import { useEffect, useRef } from 'react';

const NetworkAnimation = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.scale(1, 1);
    };

    // Initialize nodes
    const nodes: Node[] = [];
    const numNodes = 100;
    const nodeRadius = 1.5;
    const connectionDistance = 150;
    const baseSpeed = 0.3;

    // Define colors
    const primaryColor = { r: 111, g: 76, b: 255 };
    const secondaryColor = { r: 255, g: 106, b: 106 };

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * baseSpeed;
        this.vy = (Math.random() - 0.5) * baseSpeed;
        this.radius = nodeRadius;
        this.color = Math.random() > 0.5 
          ? `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, 0.5)`
          : `rgba(${secondaryColor.r}, ${secondaryColor.g}, ${secondaryColor.b}, 0.5)`;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create initial nodes
    const createNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < numNodes; i++) {
        nodes.push(
          new Node(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
          )
        );
      }
    };

    // Draw connections between nodes
    const drawConnections = () => {
      nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach((nodeB) => {
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            
            // Create gradient line
            const gradient = ctx.createLinearGradient(
              nodeA.x, nodeA.y, nodeB.x, nodeB.y
            );
            gradient.addColorStop(0, `rgba(${primaryColor.r}, ${primaryColor.g}, ${primaryColor.b}, ${opacity})`);
            gradient.addColorStop(1, `rgba(${secondaryColor.r}, ${secondaryColor.g}, ${secondaryColor.b}, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        });
      });
    };

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update(window.innerWidth, window.innerHeight);
      });

      drawConnections();

      nodes.forEach((node) => {
        node.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      createNodes();
    };

    // Initialize
    setCanvasSize();
    createNodes();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ opacity: 0.5 }}
    />
  );
};

export default NetworkAnimation;
