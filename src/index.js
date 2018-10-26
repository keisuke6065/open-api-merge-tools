yaml = require('js-yaml');
fs = require('fs');

const readYamlFile= (filePath) => {
    try {
        const targetYamlFile = fs.readFileSync(filePath);
        return yaml.safeLoad(targetYamlFile, 'utf8');
    } catch (e) {
        throw new Error(e)
    }
};
const readYamlEnv = (envFile) => {
    if (envFile.propertyIsEnumerable(targetENV)) {
        return envFile[targetENV];
    }
    throw new Error('env yaml not target')
};

const writeYamlFile = (data) => {
    try {
        const dirname = './output';
        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
        fs.writeFileSync('./output/openapi.yaml', yaml.safeDump(data));
        return 'Successful XD!!! \n ./output/openapi.yaml \n';
    } catch (e) {
        return 'Failed :(';
    }
};

const envLocal = process.env;
// console.log(envLocal);

const openApiFile = readYamlFile(process.argv[2]);
// console.log(openApiFile);

const envFile = readYamlFile(process.argv[3]);
console.log(envFile);

const targetENV = process.argv[4].replace('-', '');
console.log(targetENV);

console.log(readYamlEnv(envFile));

console.log(openApiFile);

const test = readYamlFile(process.argv[2]);
console.log(test);

const doc = readYamlFile(process.argv[3]);
console.log(doc);

const output =  writeYamlFile(test);
console.log(output);
