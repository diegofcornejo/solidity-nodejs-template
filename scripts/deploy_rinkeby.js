const dotenv = require("dotenv");
dotenv.config()

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const provider = new HDWalletProvider(process.env.PRIVATE_KEY, `https://rinkeby.infura.io/v3/${process.env.RINKEBY_PROJECT}`);
const web3 = new Web3(provider);

(async () => {
    const accounts = await new web3.eth.getAccounts();
    console.log(accounts);

    const gasEstimate = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .estimateGas({ from: accounts[0] });


    const result = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({ gas: gasEstimate, from: accounts[0] });

    // console.log(result);
    console.log('Contract deployed to: ', result.options.address);
})();

