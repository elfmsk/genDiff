import fs from 'fs';
import genDiff from '../src';

describe('difference between JSON files', () => {
  it('json', () => {
    const configPath = './__tests__/__fixtures__/';
    const afterPath = `${configPath}after.json`;
    const beforePath = `${configPath}before.json`;
    const result = genDiff(beforePath, afterPath);
    const expected = fs.readFileSync(`${configPath}expected.txt`, 'utf8').trim();

    expect(result).toEqual(expected);
  });

  it('yaml', () => {
    const configPath = './__tests__/__fixtures__/';
    const afterPath = `${configPath}after.yml`;
    const beforePath = `${configPath}before.yml`;
    const result = genDiff(beforePath, afterPath);
    const expected = fs.readFileSync(`${configPath}expected.txt`, 'utf8').trim();

    expect(result).toEqual(expected);
  });

  it('ini', () => {
    const configPath = './__tests__/__fixtures__/';
    const afterPath = `${configPath}after.ini`;
    const beforePath = `${configPath}before.ini`;
    const result = genDiff(beforePath, afterPath);
    const expected = fs.readFileSync(`${configPath}expected.txt`, 'utf8').trim();

    expect(result).toEqual(expected);
  });

  it('jsonTree', () => {
    const configPath = './__tests__/__fixtures__/';
    const afterPath = `${configPath}afterTree.json`;
    const beforePath = `${configPath}beforeTree.json`;
    const result = genDiff(beforePath, afterPath);
    const expected = fs.readFileSync(`${configPath}expectedTree.txt`, 'utf8').trim();

    expect(result).toEqual(expected);
  });

  it('plain', () => {
    const configPath = './__tests__/__fixtures__/';
    const afterPath = `${configPath}afterTree.json`;
    const beforePath = `${configPath}beforeTree.json`;
    const result = genDiff(beforePath, afterPath, 'plain');
    const expected = fs.readFileSync(`${configPath}expectedPlain.txt`, 'utf8').trim();

    expect(result).toEqual(expected);
  });
});
