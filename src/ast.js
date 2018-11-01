import _ from 'lodash';

const processForObjects = [
  {
    check: (key, objB, objA) => objB[key] instanceof Object && objA[key] instanceof Object,
    process: (key, childrenB, childrenA, f) => ({
      name: key, type: 'node', value: null, children: f(childrenB[key], childrenA[key]),
    }),
  },
  {
    check: (key, objB, objA) => objB[key] === objA[key],
    process: (key, objA) => ({
      name: key, type: 'unaltered', value: objA[key], children: null,
    }),
  },
  {
    check: (key, objB, objA) => !_.has(objB, key) && _.has(objA, key),
    process: (key, objB, objA) => ({
      name: key, type: 'added', value: objA[key], children: null,
    }),
  },
  {
    check: (key, objB, objA) => _.has(objB, key) && !_.has(objA, key),
    process: (key, objB) => ({
      name: key, type: 'removed', value: objB[key], children: null,
    }),
  },
  {
    check: (key, objB, objA) => objB[key] !== objA[key],
    process: (key, objB, objA) => ({
      name: key, type: 'updated', value: { a: objA[key], b: objB[key] },
    }),
  },
];

const getObject = (key, objB, objA) => processForObjects
  .find(({ check }) => check(key, objB, objA));

const buildAst = (objBefore, objAfter) => {
  const listKey = _.union(Object.keys(objBefore), Object.keys(objAfter));
  const result = listKey.map((key) => {
    const { process } = getObject(key, objBefore, objAfter);
    return process(key, objBefore, objAfter, buildAst);
  });
  return result;
};
export default buildAst;
