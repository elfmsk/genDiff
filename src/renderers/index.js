import renderDiff from './renderDiff';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const choose = {
  diff: renderDiff,
  plain: renderPlain,
  json: renderJson,
};

export default (type, ast) => choose[type](ast);
