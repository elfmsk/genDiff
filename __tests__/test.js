import fs from 'fs';
import genDiff from '../src';

describe('difference between JSON files', () => {
  it('json', () => {
    const afterPath = './__tests__/__fixtures__/after.json';
    const beforePath = './__tests__/__fixtures__/before.json';
    const expectedJson = './__tests__/__fixtures__/expectedJSON.txt';
    const result = genDiff(beforePath, afterPath);
    const expected = fs.readFileSync(expectedJson, 'utf8').trim();

    expect(result).toEqual(expected);
  });
});
