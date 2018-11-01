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

const processForObjects = [
  {
    check: type => type === 'noda',
    process: (depth, name, type, value, children, f) => `${' '.repeat(depth)}  ${name}: {\n${f(children, depth + 2)}  ${' '.repeat(depth)}}`,
  },
  {
    check: type => type === ' ',
    process: (depth, name, type, value) => `${' '.repeat(depth)}  ${name}: ${value}`,
  },
  {
    check: type => type === '+',
    process: (depth, name, type, value) => `${' '.repeat(depth)}+ ${name}: ${strigObj(value, depth)}`,
  },
  {
    check: type => type === '-',
    process: (depth, name, type, value) => `${' '.repeat(depth)}- ${name}: ${strigObj(value, depth)}`,
  },
  {
    check: type => type === '+-',
    process: (depth, name, type, value) => `${' '.repeat(depth)}+ ${name}: ${strigObj(value.a, depth)}\n${' '.repeat(depth)}- ${name}: ${strigObj(value.b, depth)}`,
  },
];

const getObject = type => processForObjects
  .find(({ check }) => check(type));

const render = (ast, depth = 0) => {
  const result = ast.reduce((acc, obj) => {
    const {
      name, type, value, children,
    } = obj;
    const { process } = getObject(type);
    return `${acc}${process(depth, name, type, value, children, render)}\n`;
  }, '');
  return result;
};
export default render;
