const complexValue = (value) => {
  const result = value instanceof Object ? '[complex value]' : value;
  return result;
};

const processForObjects = {
  node: (path, type, value, children, f) => `${f(children, path)}`,
  unaltered: path => `Property '${path}' has not been changed`,
  added: (path, type, value) => `Property '${path}' was added with value: '${complexValue(value)}'`,
  removed: path => `Property '${path}' was removed`,
  updated: (path, type, value) => `Property '${path}' was updated. From '${complexValue(value.b)}' to '${complexValue(value.a)}'`,
};

const renderPlain = (ast, pathAcc = '') => {
  const result = ast.map((obj) => {
    const {
      name, type, value, children,
    } = obj;
    const path = pathAcc.length > 0 ? `${pathAcc}.${name}` : `${pathAcc}${name}`;
    const process = processForObjects[type];
    return process(path, type, value, children, renderPlain);
  });
  return result.join('\n');
};

export default ast => renderPlain(ast);
