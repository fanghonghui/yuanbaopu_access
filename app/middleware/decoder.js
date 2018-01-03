const CryptoJS = require("crypto-js");

module.exports = app => {

    return async(ctx, next) => {


        //解码URL
        var bytes = CryptoJS.AES.decrypt(ctx.path.split(ctx.params.serverName+"/")[1], ctx.params.serverName);
        var path = bytes.toString(CryptoJS.enc.Utf8);
        ctx.path = "/api/" +ctx.params.serverName + path;
        console.log("*************************"+path);


        //POST解密
        if (ctx.method == 'POST' && !!ctx.request.body['cdata']) {
            console.log("*************************"+ CryptoJS.enc.Base64.parse(ctx.request.body['cdata']).toString(CryptoJS.enc.Utf8));
            var str = CryptoJS.enc.Base64.parse(ctx.request.body['cdata']).toString(CryptoJS.enc.Utf8);
            var bytes2 = CryptoJS.AES.decrypt(str, ctx.params.serverName);
            var json = JSON.parse(bytes2.toString(CryptoJS.enc.Utf8));
            ctx.request.body = json;
        }
        return next();
    }

};