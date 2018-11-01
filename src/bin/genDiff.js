#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

commander
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('second project from Hexlet')
  .option('-f, --format [type]', 'Output format')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2));
  })
  .parse(process.argv);
