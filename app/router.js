'use strict';

module.exports = app => {
    const decoder = app.middlewares.decoder();
    const encoder = app.middlewares.encoder();

    app.get('/',encoder,'home.index');
    app.get('/readdata','home.readdata');
    app.get('/wx/wxconfig','wx.wxconfig');
    app.post('/datasubmit','wx.datasubmit');
    app.post('/submitfile','upload.submitfile');
    app.post('/submitfile2','upload.submitfile2');
    app.post('/submitfile3','upload.submitfile3');
    app.post('/upload','upload.upload');
    app.post('/upload2','upload.upload2');
    app.post('/zsdatasubmit','zsActivity.submitData');
    app.get('/zsdata','zsActivity.readdata');
    app.get('/public/zsactivity','zsActivity.zsactivity');
    app.get('/public/ybpact','wx.ybpact');

    app.get('/wxapi/getwxuser','wx.getWeixinUser');
    app.get('/wxtest','wx.wxtest');
    app.get('/actdata','wx.readdata');



    /**
     * 前置服务GET
     * */
    app.get('/api/:serverName/*', 'transpond.getTranspond');




    /**
     * 前置服务POST
     * */
    app.post('/api/:serverName/*', decoder, 'transpond.postTranspond');


};
