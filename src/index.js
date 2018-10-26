yaml = require('js-yaml');
fs   = require('fs');

for(let i = 0;i < process.argv.length; i++){
    console.log("argv[" + i + "] = " + process.argv[i]);
}


try {
    const doc = yaml.safeLoad(fs.readFileSync(process.argv[2], 'utf8'));
    console.log(doc);
} catch (e) {
    console.log(e);
}