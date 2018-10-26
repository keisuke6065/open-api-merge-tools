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

function writeYamlFile(data) {
    try {
        const dirname = './output';
        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
        fs.writeFileSync("./output/openapi.yaml", yaml.safeDump(data));
        return "Successful XD!!! \n ./output/openapi.yaml \n";
    } catch (e) {
        return "Failed :("
    }
}

const test = readYamlFile(process.argv[2]);
console.log(test);

const doc = readYamlFile(process.argv[3]);
console.log(doc);

const output =  writeYamlFile(test);
console.log(output);

