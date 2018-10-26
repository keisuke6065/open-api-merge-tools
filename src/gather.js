const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const yaml = require('js-yaml');

exports.gather = (rootYamlPath) => {
    let result = {};
    const rootDir = path.dirname(rootYamlPath);
    walkDirectory(rootYamlPath)
        .filter(it => it.endsWith('.yaml'))
        .forEach(targetYamlPath => {
            const targetYamlFile = fs.readFileSync(targetYamlPath);
            const targetYamlKey = targetYamlPath.replace(rootDir, ".");
            result[targetYamlKey] = yaml.safeLoad(targetYamlFile, 'utf8')
        });
    return result;
};

const walkDirectory = (rootYaml) => {
    return _.flatMap(
        listFiles(path.dirname(rootYaml)).filter(isDirectory),
        walkDirectoryRecursively);
};

const walkDirectoryRecursively = (targetDir) => {
    const grouped = _.groupBy(listFiles(targetDir), isDirectory);
    let result = [];
    if (dirs = grouped[true]) {
        result = result.concat(_.flatMap(dirs, walkDirectoryRecursively));
    }
    if (files = grouped[false]) {
        result = result.concat(files);
    }
    return result;
};

const isDirectory = it => {
    return fs.statSync(it).isDirectory();
};

const listFiles = (targetDir) => {
    return fs.readdirSync(targetDir).map(it => targetDir + '/' + it);
};
