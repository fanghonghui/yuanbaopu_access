'use strict';

module.exports = appInfo => {
    const config = {};



    config.backServers ={
        "fideCheifServer": "https://wxapi.yuanbaopu.com/fidechief",
        "fideDataGServer": "https://wxapi.yuanbaopu.com/fidedatag",
        "fideUserServer": "https://wxapi.yuanbaopu.com/fideuser",
        "zsApiServer": "http://inet-local-k8s-master.yuanbaopu.com:26085",
        "ybpServer":"https://wxapi.yuanbaopu.com/ybpusertest",
        "agentServer":"https://wxapi.yuanbaopu.com/agenttest",
        "dgServer":  "https://dgtest.yuanbaopu.com",
        "baitiaoServer":  "http://192.168.5.180:9000",
        "uploadUrl":  "http://127.0.0.1:7002/submitfile2"

    };

    config.logger = {
        level: 'DEBUG',
        consoleLevel: 'DEBUG'
    };


    return config;
};
