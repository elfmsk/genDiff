// import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parser';
import buildAst from './ast';
import render from './rendering';

const genDiff = (pathToFile1, pathToFile2) => {
  const [objBefore, objAfter] = [pathToFile1, pathToFile2]
    .map(element => parse(path.extname(element), fs.readFileSync(element, 'utf8')));

  const ast = buildAst(objBefore, objAfter);
  const result = render(ast);

  return `{\n${result}}`;
};
export default genDiff;
