const CryptoJS = require('crypto-js');
const config = require('../config/config');

const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, config.secretKey).toString();
};

const decrypt = (text) => {
    var bytes = CryptoJS.AES.decrypt(text, config.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const hash = (text) => {
    var hash = CryptoJS.HmacSHA256(text, config.secretKey);
    return CryptoJS.enc.Base64.stringify(hash);
}


module.exports = {
    encrypt,
    decrypt,
    hash
}