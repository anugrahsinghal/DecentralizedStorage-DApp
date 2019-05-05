import web3 from "./web3";
import DecentralizedStorage from "./build/DecentralizedVideoStorage.json";
const instance = new web3.eth.Contract(
    JSON.parse(DecentralizedStorage.interface),
    '0xB08404f860d05db864e191951E14650814134f13'
);
// '0x31d475FF57e9718f46d1570D037032A2DB8886f5'
export default instance;