install:
	npm install

start:
	npm run babel-node -- src/bin/genDiff.js

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm test
