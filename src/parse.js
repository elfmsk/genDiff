import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const choose = {
  '.json': file => JSON.parse(fs.readFileSync(file)),
  '.yml': file => yaml.safeLoad(fs.readFileSync(file)),
};

const parseFunction = (pathB, pathA) => {
  const [keyB, keyA] = [pathB, pathA].map(element => path.extname(element));
  return [choose[keyB](pathB), choose[keyA](pathA)];
};
export default parseFunction;
