/**
 * Created by feixiangming on 2017/10/9.
 *
 *
 * 请求：
 * {
    "data":{
        "name":"姓名",
        "idcard":"身份证号",
        "phone":"手机号",
        "marry":"婚姻状况0:已婚1:未婚",
        "licence":"生产经营许可证",
        "city":"城市",
        "addr":"详细地址",
        "loanamount":"贷款金额",
        "monthpayment":"每月还款金额",
        "periods":"已还款期数",
        "loannum":"未还清贷款银行或小贷机构数量",
        "loanbalance":"未还清贷款余额"
    }
 }
 *
 * 响应：
 *{
    "data":{
        "amount":"贷款额度，贷款额度为0代表不符合贷款条件",
        "errmsg":""
    }
}
 */
const Controller = require('egg').Controller;
const fs = require('fs');
const moment = require('moment');

const savefile = "zsactivity.txt";
const wxhelper=require("../util/wxhelper");


class ZsActivityController extends Controller {


    async submitData() {


        console.log("**************************" + JSON.stringify(this.ctx.request.body));

        let data = this.ctx.request.body.data;
        var result = {};
        result.errmsg = "";


        let marry = data.marry == 1 ? "未婚" : "已婚";
        let info = "\r\n"+moment().format("YYYY-MM-DD")+"|"+data.name + "|" + data.idcard + "|" + data.phone + "|" + marry + "|" + data.licence;

        let loanamount = data.loanamount;//贷款金额A
        let monthpayment = data.monthpayment;//每月还款金额C
        let periods = data.periods;//已还款期数B
        let loannum = data.loannum;//未还清贷款银行或小贷机构数量
        let loanbalance = data.loanbalance;//未还清贷款余额

        if(!wxhelper.checkIdcard(data.idcard)){
            result.errmsg = "身份证格式错误";
            result.amount = 0;
        }

        if(isNaN(loanamount)||isNaN(monthpayment)||isNaN(periods)||isNaN(loannum)||isNaN(loanbalance)||isNaN(data.marry)){
            result.errmsg = "输入数据格式错误";
            result.amount = 0;
        }




        var age = wxhelper.getAge(data.idcard);

        if(age<25||age>55){//年龄25-55符合
            result.amount = 0;
        }

        if(data.marry==1){   //已婚符合
            if(age>35){  //未婚且年龄≤35符合
                result.amount = 0;
            }
        }

        if(data.licence.length<4){//生产经营许可证≥4个汉字符合
            result.amount = 0;
        }


        if (loanamount < 100000 || monthpayment < 800 || periods < 12) {//房贷金额记为A，A≥10万元符合,每月还款金额记为C，C≥800元符合,已还期数记为B，B≥12符合
            result.amount = 0;
        }

        if (loannum > 4 || loanbalance > 5000000) {//未还清家数≤4家符合,未还金额≤500万元符合
            result.amount = 0;
        }

        //未还清贷款银行、小贷机构＞1申请金额=（A-B×C）÷3
        var temp = loanamount - monthpayment*periods;

        if(result.amount!=0){
            if(loannum>1){
                result.amount = parseInt(temp/3);
            }else{
                result.amount = parseInt(temp/2);
            }

            if(result.amount<30000){
                result.amount = 30000;
            }
            if(result.amount>200000){
                result.amount = 200000;
            }
        }


        if(result.amount==0){
            info = info+"|不符合授信条件";
        }else{
            info = info+"|授信额度:"+result.amount+"元";
            var file =  this.app.config.saveFilePath+savefile;

            // appendFile，如果文件不存在，会自动创建新文件
            // 如果用writeFile，那么会删除旧文件，直接写新文件
            try {
                fs.appendFile(file, info, function () {

                });
            } catch (e) {
            }
        }



        console.log("##############################" + JSON.stringify(result));

        this.ctx.body = result;


    }


    async zsactivity(){
        await  this.ctx.render('index.nj');
    }


    async readdata(){
        var file =  this.app.config.saveFilePath+savefile;

        var data=fs.readFileSync(file,"utf-8");

        this.ctx.body = data;

    }



}

module.exports = ZsActivityController;
