const complexValue = (value) => {
  const result = value instanceof Object ? '[complex value]' : value;
  return result;
};

const processForObjects = {
  node: (path, type, value, children, f) => `${f(children, path)}`,
  unaltered: () => '',
  added: (path, type, value) => `Property '${path}' was added with value: '${complexValue(value)}'\n`,
  removed: path => `Property '${path}' was removed\n`,
  updated: (path, type, value) => `Property '${path}' was updated. From '${complexValue(value.b)}' to '${complexValue(value.a)}'\n`,
};

const renderPlain = (ast, pathAcc = '') => {
  const result = ast.reduce((acc, obj) => {
    const {
      name, type, value, children,
    } = obj;
    const path = pathAcc.length > 0 ? `${pathAcc}.${name}` : `${pathAcc}${name}`;
    const process = processForObjects[type];
    return `${acc}${process(path, type, value, children, renderPlain)}`;
  }, '');
  return result;
};

export default ast => renderPlain(ast).trim();
