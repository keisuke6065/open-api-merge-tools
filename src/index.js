yaml = require('js-yaml');
fs   = require('fs');

function readYamlFile(filePath) {
    try {
        const targetYamlFile = fs.readFileSync(filePath);
        return yaml.safeLoad(targetYamlFile, 'utf8');
    } catch (e) {
        console.log(e)
    }
}

const test = readYamlFile(process.argv[2]);
console.log(test);

const doc = readYamlFile(process.argv[3]);
console.log(doc);