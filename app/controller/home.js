'use strict';
var fs=require("fs");

module.exports = app => {
    class HomeController extends app.Controller {
        async index() {
            await app.redis.set('feixmtest', 'hello');
            //
            // const post = await app.mysql.get('activity', {id: 1});
            //
            // this.ctx.logger.info(post);
            //
            this.ctx.body = await app.redis.get('feixmtest');


        }


        async readdata(){
            var file =  app.config.saveFilePath+"entryform.txt";

            var data=fs.readFileSync(file,"utf-8");

            this.ctx.body = data;

        }


    }
    return HomeController;
};