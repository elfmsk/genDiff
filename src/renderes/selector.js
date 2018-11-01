import renderingAST from './renderingAST';
import plainAST from './plainAST';

const choose = {
  diff: renderingAST,
  plain: plainAST,
};

export default (type, ast) => choose[type](ast);
