import _ from 'lodash';

const strigObj = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const inner = keys.map((item) => {
    if (!_.isObject(item)) {
      return `  ${' '.repeat(depth + 2)}${item}: ${data[item]}`;
    }
    return `${' '.repeat(depth + 2)}${item}: ${strigObj(item, depth)}`;
  });
  return _.flattenDeep(['{', inner, `${' '.repeat(depth)}  }`]).join('\n');
};

const processForObjects = {
  node: (depth, name, type, value, children, f) => `${' '.repeat(depth)}  ${name}: {\n${f(children, depth + 2)}\n  ${' '.repeat(depth)}}`,
  unaltered: (depth, name, type, value) => `${' '.repeat(depth)}  ${name}: ${value}`,
  added: (depth, name, type, value) => `${' '.repeat(depth)}+ ${name}: ${strigObj(value, depth)}`,
  removed: (depth, name, type, value) => `${' '.repeat(depth)}- ${name}: ${strigObj(value, depth)}`,
  updated: (depth, name, type, value) => [`${' '.repeat(depth)}+ ${name}: ${strigObj(value.a, depth)}`, `${' '.repeat(depth)}- ${name}: ${strigObj(value.b, depth)}`],
};

const render = (ast, depth = 0) => {
  const result = ast.map((obj) => {
    const {
      name, type, value, children,
    } = obj;
    const process = processForObjects[type];
    return process(depth, name, type, value, children, render);
  });
  return _.flatten(result).join('\n');
};

export default ast => `{\n${render(ast)}\n}`;
