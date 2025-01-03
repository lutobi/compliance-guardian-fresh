#!/usr/bin/env node

import { Command } from 'commander';
import { checkFeature, createFeature, runTests } from './commands.js';

const program = new Command();

async function main() {
  program
    .version('1.0.0')
    .description('Interactive Development Guide CLI');

  program
    .command('new-feature <name>')
    .description('Create a new feature with all required files')
    .action(createFeature);

  program
    .command('check <feature>')
    .description('Check feature implementation against guidelines')
    .action(checkFeature);

  program
    .command('validate')
    .description('Run all validation checks')
    .action(runTests);

  await program.parseAsync(process.argv);
}

main().catch(console.error);
