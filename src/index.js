import _ from 'lodash';
import fs from 'fs';

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
  const [objJsonBefore, objJsonAfter] = [pathToFile1, pathToFile2]
    .map(arg => JSON.parse(fs.readFileSync(arg)));
  const listKeys = _.union(Object.keys(objJsonBefore), Object.keys(objJsonAfter));

  const arrStringElements = listKeys.reduce((acc, key) => {
    const { process } = getObject(key, objJsonBefore, objJsonAfter);
    return `${acc}${process(key, objJsonBefore, objJsonAfter)}\n`;
  }, '');

  return arrStringElements.trim();
};
export default genDiff;
