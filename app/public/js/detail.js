SPA_RESOLVE_INIT = function(transition) {
	var type = transition.query.detail;
	var cont = document.getElementById("content");
	var detail = document.getElementById("detailbox");
	var title = document.getElementById("title");
	var rixi =document.getElementById("rixi");
	var money = document.getElementById("money");
    var hkfs = document.getElementById("hkfs");
    var jd = document.getElementById("jd");
    var txtbox = document.getElementById("txtbox");
	var lc1txt = document.getElementById("lc1txt");
    var lc2txt = document.getElementById("lc2txt");
    var lc3txt = document.getElementById("lc3txt");
    var lc4txt = document.getElementById("lc4txt");
    var detailimg = document.getElementById("detailimg");
    var info = document.getElementById("info");
    info.style.display = 'none';
    detail.style.display='block';
    detail.style.height=window.screen.height+'px';
    document.body.scrollTop = '0px';
    title.setAttribute('data-type', 'type');
    switch (type){
		case 'dsd':
            title.innerText='电商贷详情';
            detailimg.src = 'img/dsdbg.png';
            rixi.innerText='0.03%';
            hkfs.innerText='还款方式：按月还款';
            money.innerText='1万-50万';
            jd.innerText='最快当天下款';
			txtbox.innerHTML='<p>1.年龄在20-60周岁；</p>'+
                             '<p>2.网店铺经营时间1年以上；</p>'+
                              '<p>3.正常经营天猫，淘宝，京东，亚马逊，速卖通均可办理</p>';
			lc1txt.innerText='提交资料申请贷款';
            lc2txt.innerText='元宝铺评估授信额度';
            lc3txt.innerText='银行审核放款';
            lc4txt.innerText='签约完成支用';
            break;
		case 'fd':
            title.innerText='房贷详情';
            detailimg.src = 'img/fdbg.png';
            rixi.innerText='4.7%';
            hkfs.innerText='还款方式：等额本金';
            money.innerText='50万-1000万';
            jd.innerText='支持提交还款，按天计息';
            txtbox.innerHTML='<p> 1. 借款人为18-60周岁，抵押人为18-65周岁中国大陆公民； </p>'+
                '<p>2. 自然人为经营实体的股东或法人；</p>'+
                '<p>3. 私有产权：商品房、商铺、别墅（性质住宅）写字楼、经济适用房；</p>'+
                '<p>4. 近1年内征信记录良好；</p>'
            lc1txt.innerText='提交申请';
            lc2txt.innerText='审核放款';
            lc3txt.innerText='办理抵押';
            lc4txt.innerText='签约支用';
            break;
        case 'scd':
            title.innerText='商超贷详情';
            detailimg.src = 'img/scdbg.png';
            rixi.innerText='0.06%';
            hkfs.innerText='还款方式：按月还款';
            money.innerText='1万-20万';
            jd.innerText='最快当天下款';
            txtbox.innerHTML='<p>1. 年龄在22-55周岁；  </p>'+
                '<p>2. 正常经营实体商店或超市1年以上；</p>'+
                '<p>3. 近6个月内借款人与经营实体无重大违规记录； </p>';
            lc1txt.innerText='提交资料申请贷款123';
            lc2txt.innerText='评估授信额度';
            lc3txt.innerText='银行审核放款';
            lc4txt.innerText='签约完成支用';
            break;
        case 'cdd':
            title.innerText='车抵贷详情';
            detailimg.src = 'img/cddbg.png';
            rixi.innerText='8.3厘';
            hkfs.innerText='还款方式：按月还款';
            money.innerText='3万-60万';
            jd.innerText='借款期限：3 6 12 24 36期';
            txtbox.innerHTML='<p>  1.20万公里以内新车及二手车； </p>'+
                '<p>2.上牌登记之日起加贷款年限不超9年；</p>'+
                '<p>3.全国范围内个人名下全款私家车； </p>';
            lc1txt.innerText='提交申请';
            lc2txt.innerText='审核放款';
            lc3txt.innerText='办理抵押';
            lc4txt.innerText='签约支用';
            break;
        case 'xfd':
            title.innerText='消费贷详情';
            detailimg.src = 'img/xfdbg.png';
            rixi.innerText='0.04%';
            hkfs.innerText='还款方式：按月还款（提前还款）';
            money.innerText='1千-3万';
            jd.innerText='最快3分钟下款';
            txtbox.innerHTML='<p>    1. 年龄在22-55周岁；</p>'+
                '<p>2. 持中国居民身份证的中国大陆公民； </p>';
            lc1txt.innerText='提交申请';
            lc2txt.innerText='评估额度';
            lc3txt.innerText='审核放款';
            lc4txt.innerText='签约支用';
            break;
		default:
			break;
	}

    cont.style.display = 'none';
}