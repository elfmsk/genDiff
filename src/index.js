import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';

const processForObjects = [
  {
    check: (key, objB, objA) => objB[key] === objA[key],
    process: (key, objB) => `${key}: ${objB[key]}`,
  },
  {
    check: (key, objB, objA) => !_.has(objB, key) && _.has(objA, key),
    process: (key, objB, objA) => `+ ${key}: ${objA[key]}`,
  },
  {
    check: (key, objB, objA) => _.has(objB, key) && !_.has(objA, key),
    process: (key, objB) => `- ${key}: ${objB[key]}`,
  },
  {
    check: (key, objB, objA) => objB[key] !== objA[key],
    process: (key, objB, objA) => `+ ${key}: ${objA[key]}\n- ${key}: ${objB[key]}`,
  },
];

const getObject = (key, objB, objA) => processForObjects
  .find(({ check }) => check(key, objB, objA));

const genDiff = (pathToFile1, pathToFile2) => {
  const [objBefore, objAfter] = [pathToFile1, pathToFile2]
    .map(element => parse(path.extname(element), fs.readFileSync(element, 'utf8')));

  const listKeys = _.union(Object.keys(objBefore), Object.keys(objAfter));

  const result = listKeys.reduce((acc, key) => {
    const { process } = getObject(key, objBefore, objAfter);
    return `${acc}${process(key, objBefore, objAfter)}\n`;
  }, '');

  return result.trim();
};
export default genDiff;
