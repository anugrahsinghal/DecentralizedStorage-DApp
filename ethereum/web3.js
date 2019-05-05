import Web3 from "web3";
//const web3 = new Web3(window.web3.currentProvider);  // what if user havent install metamask ?
let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //in the browser and metamask installed
    web3 = new Web3(window.web3.currentProvider);
} else {
    //in the server or metamask isnot installed
    const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/c6ca97251ae44477ba9bfabe805c9f1b');
    web3 = new Web3(provider);
}

export default web3;