yaml = require('js-yaml');
fs   = require('fs');

try {
    const doc = yaml.safeLoad(fs.readFileSync('./test/test.yml', 'utf8'));
    console.log(doc);
} catch (e) {
    console.log(e);
}