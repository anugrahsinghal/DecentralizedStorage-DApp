const HWP = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const DecentralizedStorage = require('./build/DecentralizedVideoStorage.json');

const provider = new HWP('snap core base concert stick yellow chunk night gym brand stone erupt',
    'https://rinkeby.infura.io/v3/c6ca97251ae44477ba9bfabe805c9f1b');
const web3 = new Web3(provider);


const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploy on Account (Contract Owner): ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(DecentralizedStorage.interface))
        .deploy({
            data: '0x' + DecentralizedStorage.bytecode
        })
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    console.log("Contract Address : ", result.options.address);

    return;
}

deploy();