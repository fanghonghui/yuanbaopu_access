/**
 * Created by feixiangming on 2017/8/8.
 */
'use strict';
var fs=require("fs");
var wxhelper=require("../util/wxhelper");
const moment = require('moment');
const savefile = "activity.txt";



module.exports = app => {
    class WXController extends app.Controller {



        async datasubmit(){
            console.log("**************************"+ JSON.stringify(this.ctx.request.body));
            let data = this.ctx.request.body.data;
            var channel = "";
            var referrer = "";
            if(!!data.channel){
                channel= "|"+data.channel;
            }
            if(!!data.referrer){
                referrer= "|推荐人："+data.referrer;

            }


            var info = "\r\n"+moment().format("YYYY-MM-DD")+"|"+data.name+"|"+data.phone+"|"+data.loantype+referrer+channel;
            var file =  app.config.saveFilePath+savefile;

            // appendFile，如果文件不存在，会自动创建新文件
            // 如果用writeFile，那么会删除旧文件，直接写新文件
            try {
                fs.appendFile(file, info, function () {

                });
                this.ctx.body = {result:"success"};
            } catch (e) {
                this.ctx.body = {result:"fail"};
            }

        }


        async readdata(){
            var file =  this.app.config.saveFilePath+savefile;

            var data=fs.readFileSync(file,"utf-8");

            this.ctx.body = data;

        }



        async wxconfig(){
            const  url =decodeURIComponent(this.ctx.request.query.url);

            this.ctx.logger.info("url:"+ url);

            const token = await this.getAccessToken();

            const jsticket = await this.getJsapiTicketByAccessToken(token);



            const  data = wxhelper.sign(jsticket,url);
            data.appid = app.config.wx.appid;
            this.ctx.body = data;

        }


        async getAccessToken(){


            var token = await app.redis.get('accessToken');

            if(!!token){
                this.ctx.logger.info("redis里获取accesstoken:"+ token);
                return token;
            }


            var url =  app.config.wx.ACCESS_TOKEN_URL;
            this.ctx.logger.debug("请求微信accesstoken"+ url);
            var options = {
                method: 'GET',
                dataType: 'json'
            };

            const result = await app.httpclient.request(url, options);
            token = result.data.access_token;
            this.ctx.logger.info("获取到accesstoken:"+ token);
            await app.redis.set('accessToken',  token, 'EX', 600);

            return token;

            // return new Promise((resolve) => {
            //     resolve(token)
            // });;

        }

        async getJsapiTicketByAccessToken(token){

            var jsticket = await app.redis.get('jsticket');

            if(!!jsticket){
                this.ctx.logger.info("redis里获取jsticket:"+ jsticket);
                return jsticket;
            }

            var url =  app.config.wx.JSAPI_TICKET_URL.replace("ACCESS_TOKEN",token);
            this.ctx.logger.debug("请求微信JsapiTicket"+ url);

            var options = {
                method: 'GET',
                dataType: 'json'
            };
            const result = await app.httpclient.request(url, options);
            jsticket = result.data.ticket;

            this.ctx.logger.info("获取到JsapiTicket:"+ JSON.stringify(jsticket));

            await app.redis.set('jsticket',  jsticket, 'EX', 600);


            return jsticket;
        }



        async getWeixinUser(){

            var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6886a6dd37249fc4&secret=652e1ebfd152e622acc0dd6655ae7d5e&js_code='+this.ctx.request.query.code+'&grant_type=authorization_code';
            var options = {
                method: 'GET',
                dataType: 'json',
                timeout: 100000
            };

            this.ctx.logger.info("请求URL:"+url);

            const result = await app.httpclient.request(url, options);
            this.ctx.logger.info("返回数据:"+JSON.stringify(result));

            this.ctx.body = result;

        }


        async ybpact(){
            await  this.ctx.render('ybpact.nj');
        }


        async wxtest(){
            await  this.ctx.render('test.nj');
        }



    }
    return WXController;
};
