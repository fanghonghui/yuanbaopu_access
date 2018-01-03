const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
const FormStream = require('formstream');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const parse = require('co-busboy');
const outputDir = path.join(__dirname, '../../receive');


class UploadController extends Controller {


    async submitfile() {
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        const name = path.basename(stream.filename);
        ctx.logger.info("上传的文件:"+name);
        try {
            // 保存文件
            fs.writeFileSync(path.join(outputDir, name), stream);
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream);
            throw err;
        }
        ctx.body = {
            // 所有表单字段都能通过 `stream.fields` 获取到
            fields: stream.fields,
        };
    }


    async submitfile2(){

        let result;

        await  saveFile(this.ctx).then((res)=>{
            result = res;
        })


        this.ctx.body=result;

        function saveFile(ctx){
            return new Promise((resolve,reject) => {
                var busboy = new Busboy({ headers: ctx.request.headers });
                busboy.on('error',function(err){
                    console.log('error');
                    reject("fail");
                })
                busboy.on('file',function(field,file,filename,encoding,mimetype){
                    console.log(filename);
                    const newpath = path.join(outputDir, './' + filename);
                    file.pipe(fs.createWriteStream(newpath));

                });
                busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
                    console.log('Field [' + fieldname + ']: value: ' + val);
                });
                busboy.on('finish', function() {
                    console.log('Done parsing form!');
                    resolve("suc")
                });
                ctx.req.pipe(busboy);  //Node's request object.
            })
        }

    }


    * submitfile3() {
        var parts = parse(this.ctx);
        var part;

        while ((part = yield parts)) {
            if (part.constructor.name === 'FileStream') {

                let filename = part.filename;
                let chunkIndex, prefix;

                if (filename.indexOf('_IDSPLIT_') > 0) {
                    prefix = filename.split('_IDSPLIT_')[0];
                    chunkIndex = filename.split('_IDSPLIT_')[1];
                    console.log(`${prefix} : ${chunkIndex}`);
                }
                else {
                    prefix = filename;
                    chunkIndex = '0';
                }

                var stream = fs.createWriteStream(path.join(outputDir, "./"+prefix));
                part.pipe(stream);

            }else{
                let param = part[0];
                let value = part[1];
                console.log(`${param} : ${value}`);
            }
        }

        this.ctx.body = {result:"suc"};

    }




    async upload(){
        const ctx = this.ctx;
        const fileStream = await ctx.getFileStream();

        ctx.logger.info("上传的文件:"+fileStream.filename);

        const url = this.app.config.backServers.uploadUrl;

        const data = fileStream.fields;

        const form = new FormStream();
        form.stream('file', fileStream, fileStream.filename);

        for(var key in data)
        {
            form.field(key, data[key]);
        }


        ctx.logger.info("参数"+JSON.stringify(data));

        var result = '';

        try {
            result = await ctx.curl(url, {
                // headers: {'Content-Type':'multipart/form-data;boundary=123123123131231'},
                method: 'POST',
                // 生成符合 multipart/form-data 要求的请求 headers
                headers: form.headers(),
                // 以 stream 模式提交
                stream: form
            });

        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(fileStream);
            throw err;
        }

        ctx.body = result;

    }


    async upload2(){
        const ctx = this.ctx;
        const fileStream = await ctx.getFileStream();

        ctx.logger.info("上传的文件:"+fileStream.filename);

        const url = this.app.config.backServers.uploadUrl;
        const data = fileStream.fields;


        ctx.logger.info("参数"+JSON.stringify(data));

        var result = '';

        try {
            const result = await ctx.curl(url, {
                // 必须指定 method，支持 POST，PUT
                method: 'POST',
                // 以 stream 模式提交
                stream: fileStream,
                dataAsQueryString: true,
                data:data
            });



        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(fileStream);
            throw err;
        }

        ctx.body = result;

    }


}
module.exports = UploadController;
