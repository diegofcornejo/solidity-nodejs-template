const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, '../contracts', 'RandomToDoList.sol');
const code = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'RandomToDoList.sol': {
            content: code
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(JSON.stringify(output.contracts['RandomToDoList.sol']['RandomToDoList'], null, 4));
module.exports = {
    abi: output.contracts['RandomToDoList.sol']['RandomToDoList'].abi,
    bytecode: output.contracts['RandomToDoList.sol']['RandomToDoList'].evm.bytecode.object
}