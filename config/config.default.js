'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + '_1493109050482_9648';


    //加载中间件
    config.middleware = ['header'];



    config.security = {
        csrf: {
            enable: false
        }
    };

    config.wx = {
        appid:'wx319f131d7ae307e7',
        appsecret:'d598dfbcadc21201309c04aa7261b1f3',
        ACCESS_TOKEN_URL:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx319f131d7ae307e7&secret=d598dfbcadc21201309c04aa7261b1f3',
        JSAPI_TICKET_URL:'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi'

    };

    config.saveFilePath = path.join(appInfo.baseDir, '../');


    config.redis = {
        // Single Redis
        client: {
            host: '192.168.7.7',
            port: '6379',
            password: '1234567890',
            db: 0
        }
    };


    config.mysql = {
        // Single Database
        client: {
            host: '192.168.7.7',
            port: '3306',
            user: 'test',
            password: 'test',
            database: 'test'
        }
    };


    config.view = {
        root: [
            path.join(appInfo.baseDir, 'app/view'),
            path.join(appInfo.baseDir, 'app/public'),
        ].join(','),
        mapping: {
            '.nj': 'nunjucks',
        },
        defaultViewEngine: 'nunjucks',

    }

    return config;
};
