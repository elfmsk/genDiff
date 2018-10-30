import fs from 'fs';
import genDiff from '../src';

describe('difference between JSON files', () => {
  it('json', () => {
    const configPath = './__tests__/__fixtures__/';
    const afterPath = `${configPath}after.json`;
    const beforePath = `${configPath}before.json`;
    const expectedJson = `${configPath}expectedJSON.txt`;
    const result = genDiff(beforePath, afterPath);
    const expected = fs.readFileSync(expectedJson, 'utf8').trim();

    expect(result).toEqual(expected);
  });

  it('yaml', () => {
    const configPath = './__tests__/__fixtures__/';
    const afterPath = `${configPath}after.yml`;
    const beforePath = `${configPath}before.yml`;
    const expectedJson = `${configPath}expectedYAML.txt`;
    const result = genDiff(beforePath, afterPath);
    const expected = fs.readFileSync(expectedJson, 'utf8').trim();

    expect(result).toEqual(expected);
  });
});
