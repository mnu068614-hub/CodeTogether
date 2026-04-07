const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const requiredFiles = ['index.html', 'package.json', 'src/main.js', 'src/styles.css'];

test('project scaffold files exist', () => {
  for (const file of requiredFiles) {
    assert.equal(fs.existsSync(file), true, `Missing required scaffold file: ${file}`);
  }
});
