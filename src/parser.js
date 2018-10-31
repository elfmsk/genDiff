import yaml from 'js-yaml';
import ini from 'ini';

const choose = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const parse = (key, path) => choose[key](path);
export default parse;
