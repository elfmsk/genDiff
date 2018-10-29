#!/usr/bin/env node

import commander from 'commander';

// let program = require('commander');

commander
  .version('1.0.3')
  .arguments('<firstConfig> <secondConfig>')
  .description('second project from Hexlet')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
