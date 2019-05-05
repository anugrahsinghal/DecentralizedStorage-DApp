const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

var input = {
    'DecentralizedStorage.sol': fs.readFileSync(path.resolve(__dirname, "contracts", "DecentralizedStorage.sol"), 'utf8'),
    'Ownable.sol': fs.readFileSync(path.resolve(__dirname, "contracts", "Ownable.sol"), 'utf8')
};
const compiledOutput = solc.compile({ sources: input },1).contracts;
//console.log(compiledOutput);

//--------------------------------------------------------------------------------------------
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
fs.ensureDirSync(buildPath);

for (let contract in compiledOutput) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '').split('.sol')[1] + '.json'),
        compiledOutput[contract]
    )
}
console.log("Done Compiling");