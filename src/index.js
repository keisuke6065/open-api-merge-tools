const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('lodash');

const readYamlFile = (filePath) => {
  try {
    const targetYamlFile = fs.readFileSync(filePath);
    return yaml.safeLoad(targetYamlFile, 'utf8');
  } catch (e) {
    throw new Error(e);
  }
};
const readYamlEnv = (envFile, targetENV) => {
  if (envFile.propertyIsEnumerable(targetENV)) {
    return envFile[targetENV];
  }
  throw new Error('env yaml not target');
};

const getOptions = (args) => {
  if (args.length < 5) {
    throw new Error('invalid arguments length.');
  }
  const options = {};
  options.apiFilePath = args[2];
  options.envFilePath = args[3];
  options.targetENV = args[4].replace('-', '');
  return options;
};
const writeYamlFile = (data, filename) => {
  try {
    const dirname = './output';
    if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
    fs.writeFileSync('./output/' + filename, yaml.safeDump(data));
    return 'Successful XD!!! \n ./output/' + filename + '\n';
  } catch (e) {
    return 'Failed :(';
  }
};

const options = getOptions(process.argv);
const openApiFile = readYamlFile(options.apiFilePath);
const envFile = readYamlEnv(readYamlFile(options.envFilePath), options.targetENV);


const replaceEnv = (x) => {
  if (x.length !== undefined) {
    const envs = Object.keys(envFile);
    for (let i = 0; i < envs.length; i++) {
      if (_.isMatch(x, `{env.${envs[i]}`)) {
        return envFile[envs[i]];
      }
    }
    if (x instanceof Array) {
      return _.mapValues(x, (a) => replaceEnv(a));
    }
    return x
  }
  return _.mapValues(x, (a) => replaceEnv(a));
};
console.log(_.mapValues(openApiFile, (x) => replaceEnv(x)));