const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const mnemonic = 'october indoor possible mandate close evidence almost return almost frown space elephant'; //provided by ganache-cli
const provider = new HDWalletProvider(mnemonic, 'http://localhost:8545');
const web3 = new Web3(provider);

(async () => {
    const accounts = await new web3.eth.getAccounts();

    const gasEstimate = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .estimateGas({ from: accounts[0] });


    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({ gas: gasEstimate, from: accounts[0] });

    console.log('Contract deployed to: ', result.options.address);
})();

