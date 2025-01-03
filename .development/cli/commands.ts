import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { promisify } from 'util';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ValidationResult {
  passed: boolean;
  message: string;
  suggestions?: string[];
}

export async function createFeature(name: string) {
  const featureName = name.charAt(0).toUpperCase() + name.slice(1);
  const featureNameLower = name.toLowerCase();

  try {
    // Create feature directories
    const dirs = [
      `src/types/${featureNameLower}`,
      `src/services/${featureNameLower}`,
      `src/hooks/${featureNameLower}`,
      `src/components/${featureNameLower}`,
      `src/tests/${featureNameLower}`
    ];

    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
      console.log(chalk.green(`✓ Created directory: ${dir}`));
    }

    // Execute the create-feature.sh script
    const scriptPath = path.join(__dirname, '..', 'scripts', 'create-feature.sh');
    const { stdout, stderr } = await execAsync(`bash ${scriptPath} ${name}`);
    
    if (stdout) console.log(stdout);
    if (stderr) console.error(chalk.red(stderr));

    console.log(chalk.green(`\n✓ Feature ${featureName} created successfully`));
    console.log(chalk.blue('\n→ Next steps:'));
    console.log('  1. Implement SecurityContext');
    console.log('  2. Add type definitions');
    console.log('  3. Create service layer');

  } catch (error) {
    console.error(chalk.red('Error creating feature:'), error);
    process.exit(1);
  }
}

export async function checkFeature(featureName: string) {
  try {
    // Execute the validate-implementation.sh script
    const scriptPath = path.join(__dirname, '..', 'scripts', 'validate-implementation.sh');
    const { stdout, stderr } = await execAsync(`bash ${scriptPath} ${featureName}`);
    
    if (stdout) console.log(stdout);
    if (stderr) console.error(chalk.red(stderr));
  } catch (error) {
    console.error(chalk.red('Error checking feature:'), error);
    process.exit(1);
  }
}

export async function runTests() {
  try {
    const { stdout, stderr } = await execAsync('npm run test');
    if (stdout) console.log(stdout);
    if (stderr) console.error(chalk.red(stderr));
  } catch (error) {
    console.error(chalk.red('Error running tests:'), error);
    process.exit(1);
  }
}
