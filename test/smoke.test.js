const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const { resolveRequestedPath } = require('../server');

const requiredFiles = ['index.html', 'package.json', 'src/main.js', 'src/styles.css'];

test('project scaffold files exist', () => {
  for (const file of requiredFiles) {
    assert.equal(fs.existsSync(file), true, `Missing required scaffold file: ${file}`);
  }
});

test('resolveRequestedPath keeps requests within document root', () => {
  assert.equal(resolveRequestedPath('/index.html').isInsideRoot, true);
  assert.equal(resolveRequestedPath('/src/main.js').isInsideRoot, true);
  assert.equal(resolveRequestedPath('/../CodeTogether2/secret.txt').isInsideRoot, false);
  assert.equal(resolveRequestedPath('/../../etc/passwd').isInsideRoot, false);
});


test('resolveRequestedPath rejects NUL bytes in request paths', () => {
  assert.throws(() => resolveRequestedPath('/%00'), URIError);
  assert.throws(() => resolveRequestedPath('/safe\0name.txt'), URIError);
});
