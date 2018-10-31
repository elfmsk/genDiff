#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

commander
  .version('1.0.4')
  .arguments('<firstConfig> <secondConfig>')
  .description('second project from Hexlet')
  .option('-f, --format [type]', 'Output format')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2));
  })
  .parse(process.argv);
