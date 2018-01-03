const CryptoJS = require("crypto-js");

module.exports = app => {
    return async(ctx, next) => {
        console.log("*******************************************encoder");
        await next();
    }
};