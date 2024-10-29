const config = require("../config/config");
const jwt = require('jsonwebtoken');


const decodeToken = (token) => {
    let obj = {};
    try {
        const decoded = jwt.verify(token, config.secretKey);
        obj.success = true;
        obj.data = decoded;
        return obj;
    }
    catch (e) {
        obj.success = false;
        obj.data = e;
        return obj;
    }
}

const createToken = (data) => {
    var token = jwt.sign(data, config.secretKey, { expiresIn: config.jwtExpire });
    return token;
}

const refreshToken = (token) => {
    let obj = {};
    try {
        const decoded = jwt.verify(token, config.secretKey);
        delete decoded.iat;
        delete decoded.exp;
        delete decoded.nbf;
        delete decoded.jti;
        const newToken = createToken(decoded);
        obj.success = true;
        obj.data = newToken;
        return obj;
    }
    catch (e) {
        obj.success = false;
        obj.data = e;
        return obj;
    }
}

module.exports = {
    decodeToken,
    createToken,
    refreshToken,
}