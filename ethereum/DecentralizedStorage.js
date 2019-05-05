import web3 from "./web3";
import DecentralizedStorage from "./build/DecentralizedVideoStorage.json";
const instance = new web3.eth.Contract(
    JSON.parse(DecentralizedStorage.interface),
    '0xB08404f860d05db864e191951E14650814134f13'
);
export default instance;

//old-with-data 0xB08404f860d05db864e191951E14650814134f13
//new-without-data 0x3b01045Ad7ef20b9d6CbB639e5BFBd2009d85f59