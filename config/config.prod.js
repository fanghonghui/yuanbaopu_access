'use strict';

module.exports = appInfo => {
    const config = {};


    config.backServers ={
        "fideCheifServer": "http://inet-dop2.yuanbaopu.com:6070",
        "fideDataGServer": "http://inet-dop2.yuanbaopu.com:6010",
        "fideUserServer": "http://inet-dop2.yuanbaopu.com:6030",
        "ybpServer":    "http://iuserapi.yuanbaopu.com",
        "agentServer":  "http://ipartnerapi.yuanbaopu.com",
        "dgServer":  "https://dg.yuanbaopu.com",
        "baitiaoServer":  "http://115.236.188.99:9000"
    };

    config.saveFilePath = "/data/ybp-access-data/";


    config.logger = {
        dir: '/data/logs/yuanbaopu_access',
        level: 'INFO',
        consoleLevel: 'INFO'
    };

    config.redis = {
        // Single Redis
        client: {
            host: '10.131.178.192',
            port: '6379',
            password: '7ygv6tfc',
            db: 0
        }
    };

    return config;
};
