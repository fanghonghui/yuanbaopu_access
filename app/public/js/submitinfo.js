SPA_RESOLVE_INIT = function(transition) {
    var cont = document.getElementById("content");
    var detail = document.getElementById("detailbox");
    var title = document.getElementById("title");
    var info = document.getElementById("info");
    var submitbtn  = document.getElementById("submitbtn");
    var tshi = document.getElementById('tishi');
    var mask = document.getElementById('mask');
    var loantype = title.innerText.replace(/详情/,'');
    var queryString = window.location.search;
    var channel = "";
    if (queryString.indexOf("?") != -1) {
        channel = queryString.substr(1).split("=")[1];
    }
    if(title.getAttribute('data-type') !== 'type'){
        console.log(window.location.origin+'/public/ybpact'+queryString)
        window.location.href = window.location.origin+window.location.pathname+queryString;
        return;
    }
    info.style.display = 'block';
    title.innerText='元宝铺';

    detail.style.display='none';
    cont.style.display = 'none';
    submitbtn.onclick = function () {
        var name = document.getElementById("name").value.replace(/\s/g,'');
        var phone = document.getElementById("phone").value.replace(/\s/g,'');
        var referrer = document.getElementById('referrer').value.replace(/\s/g,'');
        var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if(!name){
            tshi.style.display = 'block';
            tshi.innerHTML="用户名不能为空";
            return false
        } else {
            if(!reg.test(name)){
                tshi.style.display = 'block';
                tshi.innerHTML="用户名格式不正确";
                return false
            }
        }
        if(referrer&&!reg.test(referrer)){
            tshi.style.display = 'block';
            tshi.innerHTML="推荐人姓名格式不正确";
            return false
        }
        if(!phone){
            tshi.style.display = 'block';
            tshi.innerHTML="手机号不能为空";
            return false
        }
        if (phone.length != 11) {
            tshi.style.display = 'block';
            tshi.innerHTML="手机号码必须为11位";
            return false;
        }
        if (!/1[345789][0-9]{9}/.test(phone)) {
            tshi.style.display = 'block';
            tshi.innerHTML="手机号码格式不正确";
            return false;
        }
        tshi.style.display = 'none';

        var data = {
                "data":{
                    "name":name,
                    "phone": phone,
                    "loantype":loantype,
                    "channel":channel,
                    "referrer":referrer//推荐人
                }
           }

        $.ajax( {  
            url : "https://access.yuanbaopu.com/datasubmit",
            data : data,  
            type : "POST",  
            dataType: "json",  
            success : function(xhr,result) {  
                 mask.style.display='block';
                 
            },
            fail:function(err){
                alert(err);
            }  
        });
    }

    document.getElementById('close').onclick = function(){
        mask.style.display='none';
        window.history.go(-2);
    }
}




