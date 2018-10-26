const yaml = require('js-yaml');
const fs = require('fs');
const _ = require('lodash');

const readYamlFile= (filePath) => {
    try {
        const targetYamlFile = fs.readFileSync(filePath);
        return yaml.safeLoad(targetYamlFile, 'utf8');
    } catch (e) {
        throw new Error(e)
    }
};
const createEnvInfo = (file, env, target) => {
    if (!file.propertyIsEnumerable(target)) {
        throw new Error('env yaml not target')
    }
    
    let envInfo = file[target];

    const envKeys = Object.keys(env);
    _.mapValues(envInfo, function(x){
        x = x.replace(/\${([^}]+)}/g, function(srcStr, envStr){
          if(!envKeys[envStr]){
              //throw new Error(`invalid env. "${envStr}" is not found.`);
          }
          return envKeys[envStr];
        })
        return x;
      });
    return envInfo;
};

const getOptions = (args) => {
    if  (args.length <  5){
      throw new Error('invalid arguments length.')
    }
    const options = {};
    options.apiFilePath = args[2];
    options.envFilePath = args[3];
    options.targetENV = args[4].replace('-', '');
    return options;
};

const writeYamlFile= (data, filename) => {
    try {
        const dirname = './output';
        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname);
        fs.writeFileSync('./output/' + filename, yaml.safeDump(data));
        return 'Successful XD!!! \n ./output/' + filename + '\n';
    } catch (e) {
        return 'Failed :(';
    }
};

const envLocal = process.env;

const options = getOptions(process.argv);

const openApiFile = readYamlFile(options.apiFilePath);
// console.log(openApiFile);

const envInfo = createEnvInfo(readYamlFile(options.envFilePath), envLocal, options.targetENV);
// console.log(envInfo);


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
    return _.mapValues(x, (a) => replaceEnv(a));
};
// console.log(_.mapValues(openApiFile, (x) => replaceEnv(x)));
