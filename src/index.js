import fs from 'fs';
import path from 'path';
import parse from './parser';
import buildAst from './ast';
import selector from './renderes';

const genDiff = (pathToFile1, pathToFile2, type = 'diff') => {
  const [objBefore, objAfter] = [pathToFile1, pathToFile2]
    .map(element => parse(path.extname(element), fs.readFileSync(element, 'utf8')));

  const ast = buildAst(objBefore, objAfter);
  const render = selector(type, ast);

  return render;
};
export default genDiff;
