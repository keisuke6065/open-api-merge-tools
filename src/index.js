const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const mkdirp = require('mkdirp');

/**
 * @param filePath
 * @return {Object}
 */
const readYamlFile = (filePath) => {
  try {
    const targetYamlFile = fs.readFileSync(filePath);
    return yaml.safeLoad(targetYamlFile, 'utf8');
  } catch (e) {
    throw new Error(e);
  }
};

const createEnvInfo = (file, env, target) => {
  if (!file.propertyIsEnumerable(target)) {
    throw new Error('env yaml not target')
  }

  let envInfo = file[target];

  const envKeys = Object.keys(env);
  _.mapValues(envInfo, function (x) {
    x = x.replace(/\${([^}]+)}/g, function (srcStr, envStr) {
      if (!envKeys[envStr]) {
        //throw new Error(`invalid env. "${envStr}" is not found.`);
      }
      return envKeys[envStr];
    });
    return x;
  });
  return envInfo;
};

/**
 * command line args mapping
 * @param args
 */
const getOptions = (args) => {
  if (args.length < 5) {
    throw new Error('invalid arguments length.');
  }
  const options = {};
  options.apiFilePath = args[2];
  options.envFilePath = args[3];
  options.targetENV = args[4].replace('-', '');
  options.outputPath = args[5];
  return options;
};

/**
 * write yaml file
 * @param data
 * @param filename
 * @return {string}
 */
const writeYamlFile = (outputPath, data) => {
  const getDirName = path.dirname;
  mkdirp(getDirName(outputPath), (err) => {
    if (err) {
      throw new Error('cannot create directory.');
    }
    try {
      fs.writeFileSync(outputPath, yaml.safeDump(data));
    } catch (e) {
      throw new Error(e);
    }
  });
};

const replaceEnv = (x) => {
  if (x.length !== undefined) {
    const envs = Object.keys(envInfo);
    for (let i = 0; i < envs.length; i++) {
      if (_.isMatch(x, `{env.${envs[i]}`)) {
        return envInfo[envs[i]];
      }
    }
    return x
  }
  if (x instanceof Array) {
    return _.mapValues(x, (a) => replaceEnv(a));
  }
  return _.mapValues(x, (a) => replaceEnv(a));
};

const envLocal = process.env;

const options = getOptions(process.argv);

const openApiFile = readYamlFile(options.apiFilePath);
// console.log(openApiFile);

const envInfo = createEnvInfo(readYamlFile(options.envFilePath), envLocal, options.targetENV);
// console.log(envInfo);


console.log(_.mapValues(openApiFile, (x) => replaceEnv(x)));