const complexValue = (value) => {
  const result = value instanceof Object ? '[complex value]' : value;
  return result;
};

const processForObjects = [
  {
    check: type => type === 'node',
    process: (path, type, value, children, f) => `${f(children, path)}`,
  },
  {
    check: type => type === 'unaltered',
    process: () => '',
  },
  {
    check: type => type === 'added',
    process: (path, type, value) => `Property '${path}' was added with value: '${complexValue(value)}'\n`,
  },
  {
    check: type => type === 'removed',
    process: path => `Property '${path}' was removed\n`,
  },
  {
    check: type => type === 'updated',
    process: (path, type, value) => `Property '${path}' was updated. From '${complexValue(value.b)}' to '${complexValue(value.a)}'\n`,
  },
];

const getObject = (key, objB, objA) => processForObjects
  .find(({ check }) => check(key, objB, objA));


const renderPlain = (ast, pathAcc = '') => {
  const result = ast.reduce((acc, obj) => {
    const {
      name, type, value, children,
    } = obj;
    const path = pathAcc.length > 0 ? `${pathAcc}.${name}` : `${pathAcc}${name}`;
    const { process } = getObject(type);
    return `${acc}${process(path, type, value, children, renderPlain)}`;
  }, '');
  return result;
};

export default ast => renderPlain(ast).trim();
