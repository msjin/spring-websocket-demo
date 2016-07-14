// 全局回车事件
$(function() {
	$(document).bind("keyup", function(e) {
		if (e.keyCode == 13) {
			// 如果在easyui的那个页码框就不触发
			if ($("input.pagination-num:visible").is(":focus"))
				return;
			// 如果有显示的遮罩就不触发，因为此时可能已经在加载
			if ($("div.window-mask:visible").length == 0)
				$("a.easyui-linkbutton.l-btn.l-btn-small[data-options*='icon-search']:visible").click();
		}
	})
})
var hz = {};

hz.location = (window.location+'').split('/'); 
//hz.basePath = hz.location[0]+'//'+hz.location[2];
hz.basePath = hz.location[0]+'//'+hz.location[2]+'/'+hz.location[3];

/**
 * 平台常量定义
 * 渲染页面和js所有平台数据来源，务在页面或js写死
 */
//状态： 0=初审中  1=初审失败  2=核保中  3=核保失败  5=核保成功  6=拒保  7=已过期   8=已撤销',
hz.insureStatus = [[0,'初审中'],[1,'初审失败'],[2,'核保中'],[3,'核保失败'],[5,'核保成功'],[6,'拒保'],[7,'已过期'],[8,'已撤销'],[9,'待支付'],[10,'待确认'],[11,'已支付'],[12,'待出单'],[13,'已出单']];
hz.firstCheckStatus= [[0,'初审中'],[1,'初审失败'],[2,'初审成功'],[6,'拒保']];
hz.secondCheckStatus=[[2,'核保中'],[3,'核保失败'],[5,'核保成功'],[6,'拒保']];


hz.payStatus = [[1,'待支付'],[2,'待确认'],[3,'已支付']];//支付状态（1=待支付，2=待确认，3=已支付

hz.receivePayStatus = [[1,'待付款'],[2,'已付款']];//收款状态（1：待收款 2：已收款）

hz.issueStatus = [[1,'待出单'],[2,'已出单']];//出单状态（1=未出单  2=已出单）',

hz.expreWay = [[1,'寄送'],[2,'自提']];

hz.cardType = [[1,'身份证'],[2,'护照'],[3,'军官证'],[4,'港澳回乡证'],[5,'台胞证'],[6,'组织机构代码证'],[7,'税务登记证'],[8,'其他']];

hz.ownerKind = [[1,'私人'],[2,'企业'],[3,'机关']];//车主所属性质

hz.vehicleUseKind = [[0,'非营业'],[1,'营业']];// 车辆使用性质

hz.secondvehicleUseKind=[[1,'城市公交客车'],[2,'出租车'],[3,'租赁客车'],[4,'公路营运客车'],[5,'货车'],[6,'家庭自用汽车'],[7,'客车'],[8,'货车']];

hz.quotationStatus= [[-1,'待填写'],[0,'待报价'],[1,'已报价'],[2,'报价失败'],[3,'拒保'],[4,'crm线下报价']];

//收款方式
hz.payType=[[1,'银行转账'],[2,'支付宝'],[3,'财付通'],[4,'块钱'],[5,'其它']];
//车险收款方式：1:银行转账 2：pos刷卡 3：支付宝 4：银联 5:快钱 6财付通'
hz.carPayType=[[1,'银行转账'],[2,'pos刷卡'],[3,'支付宝'],[4,'银联 '],[5,'快钱'],[6,'财付通']];
//性别(0女1男)
hz.sex = [[0,'女'],[1,'男']];

//合作状态ID:1 未合作2 合作中3 合作暂停4 合作结束
hz.state = [[1,'未合作'],[2,'合作中'],[3,'合作暂停'],[4,'合作结束']];

hz.initInsureStatus = function(id){
	var statusData;
	var json=new Array();
	json.push('{"label":"-1","text":"-1","value":"--全部--"}');
	for (var i = 0; i < hz.insureStatus.length; i++) {
		json.push('{"label":"'+hz.insureStatus[i][0]+'","text":"'+hz.insureStatus[i][0]+'","value":"'+hz.insureStatus[i][1]+'"}');
	}
	statusData="["+json.join(",")+"]";
	$("#"+id+"").combobox({
        data : eval("("+statusData+")"),
        valueField:'text',
        textField:'value'
    });
};
hz.checkStatus = function(id,data){
	var statusData;
	var json=new Array();
	json.push('{"label":"-1","text":"-1","value":"--全部--"}');
	for (var i = 0; i < data.length; i++) {
		json.push('{"label":"'+data[i][0]+'","text":"'+data[i][0]+'","value":"'+data[i][1]+'"}');
	}
	statusData="["+json.join(",")+"]";
	$("#"+id+"").combobox({
        data : eval("("+statusData+")"),
        valueField:'text',
        textField:'value'
    });
};
hz.initCompany=function(id){
	var companyData;
	var json=new Array();
	json.push('{"label":"0","text":"0","value":"--全部--"}');
	var url=hz.basePath+"/company/getList";
	$.ajax({
		url : url,
		type: 'post',
		data : {},
		dataType : 'json',
		success : function(data) {
			if(data){
				for(var i=0;i<data.length;i++){
					json.push('{"label":"'+data[i].companyId+'","text":"'+data[i].companyId+'","value":"'+data[i].simpName+'"}');
				}
			}
			companyData="["+json.join(",")+"]";
			$("#"+id+"").combobox({
				data : eval("("+companyData+")"),
		        valueField:'text',
		        textField:'value'
			}); 
		}
	});
};
//初始化付款方式(下拉框)
hz.initPayType = function(id){
	var serviceTypeData;
	var json=new Array();
	json.push('{"label":"0","text":"0","value":"--请选择--"}');
	for (var i = 0; i < hz.payType.length; i++) {
		json.push('{"label":"'+hz.payType[i][0]+'","text":"'+hz.payType[i][0]+'","value":"'+hz.payType[i][1]+'"}');
	}
	serviceTypeData="["+json.join(",")+"]";
	$("#"+id+"").combobox({
        data : eval("("+serviceTypeData+")"),
        valueField:'text',
        textField:'value'
    });
};
//打开窗口
hz.openWindow = function(windowId,opt){
	$('#'+windowId).window({
		title:opt,
		modal:true,
		resizable:false,
		draggable:false,
		collapsible:false,
		closed:true,
    	maximized:true,
    	minimizable:false,
    	maximizable:false,
		onBeforeClose:function(){
			$(".tooltip").remove();
		}
	});
	$('#'+windowId).window('open');
};
//将表单数据转为json
hz.form2Json = function(id) {
	var arr = $("#" + id).serializeArray();
	var jsonStr = "";
	jsonStr += '{';
	for (var i = 0; i < arr.length; i++) {
		var content = $.trim(arr[i].value);
		content = content.replace(/\n/g, "\\n")  
						.replace(/\'/g, "\\'")  
						.replace(/\"/g, "\\\"")  
						.replace(/\r/g, "\\r")  
		jsonStr += '"' + arr[i].name + '":"' + content + '",';
	}
	jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
	jsonStr += '}';
	//var json = JSON.parse(jsonStr);
	var json = eval('(' + jsonStr + ')');
	return json;
};

//将表单数据转为json,陈胜重写的，上面个太局限性了，只能用id，我这个要灵活一点
hz.form2JsonForCs = function(target) {
	var arr = target.serializeArray();
	var jsonStr = "";
	jsonStr += '{';
	for (var i = 0; i < arr.length; i++) {
		var content = $.trim(arr[i].value);
		content = content.replace(/\n/g, "\\n")  
		.replace(/\'/g, "\\'")  
		.replace(/\"/g, "\\\"")  
		.replace(/\r/g, "\\r")  
		jsonStr += '"' + arr[i].name + '":"' + content + '",';
	}
	jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
	jsonStr += '}';
	//var json = JSON.parse(jsonStr);
	var json = eval('(' + jsonStr + ')');
	return json;
};
//关闭窗口
hz.closeWindow = function(windowId){
	$('#'+windowId).window('close');
};

/**
 * 公司资料类型定义
 */
hz.INFO_TYPE_1=1;//1产品条款管理 ;
hz.INFO_TYPE_2=2;//2索赔方式管理;
hz.INFO_TYPE_3=3;//3赔付比例管理;
hz.INFO_TYPE_4=4;//4疾病分类管理;
hz.INFO_TYPE_6=6;//6投保须知管理;
hz.INFO_TYPE_7=7;//7投保声明

//正推， 表单到对象
hz.serializeObject = function(form) {  
    var o = {};  
    $.each(form.serializeArray(), function(index) {  
        if (o[this['name']]) {  
            o[this['name']] = o[this['name']] + "," + this['value'];  
        } else {  
            o[this['name']] = this['value'];  
        }  
    });  
    return o;  
};  
hz.keydown = function() {
	$(document).keydown(function(event){
	    if(event.keyCode==13){
	      $("#search").click();
	    }
	 });
};
// 反推，对象填充到input
hz.setValue = function(obj) {
	// 开始遍历
	for ( var p in obj) {
		// 方法
		console.info(obj);
		if (typeof (obj[p]) == "function") {
			// obj[p]();
		} else {
			$("#" + p).val(obj[p]);
			// p 为属性名称，obj[p]为对应属性的值
		}
	}
}  

//获取传递参数值
$.getUrlParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
};
//选择险种一级大类
hz.selectCatrogyDataGrid = function(){
	$('#catrogy_list').datagrid({
		url : hz.basePath+'/proType/getListByPlatform/'+hz.platforms[0][0],
		method : 'post',
		title : '',
		toolbar : '#sub_toolbar',
		pagination : 'true',
		rownumbers : 'true',
		fitcolumns : 'true',
		singleselect : 'false',
		width:781,
		height:460,
		pageSize: 15,//每页显示的记录条数，默认为10
	    pageList:[5,10,15,20],//每页显示几条记录
		frozenColumns : [[
			{field : 'ck',checkbox :'true',width : 80}
		]]
	}); 
    var p = $('#catrogy_list').datagrid('getPager'); 
    $(p).pagination({ 
        pageSize: 15,//每页显示的记录条数，默认为10
        pageList:[5,10,15,20],//每页显示几条记录
        beforePageText: '第',//页数文本框前显示的汉字
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录    共 {total} 条记录',
        onBeforeRefresh:function(){ 
            $(this).pagination('loading');//正在加载数据中...
            $(this).pagination('loaded'); //数据加载完毕
        } 
    }); 
};

//判断,防止报错
if($.fn.validatebox){
	$.extend(($.fn.validatebox.methods), {    
	    remove: function(jq, newposition){    
	        return jq.each(function(){    
	            $(this).removeClass("validatebox-text validatebox-invalid").unbind('focus').unbind('blur');  
	        });    
	    },  
	    reduce: function(jq, newposition){    
	        return jq.each(function(){    
	           var opt = $(this).data().validatebox.options;  
	           $(this).addClass("validatebox-text").validatebox(opt);  
	        });    
	    },
	    reset: function(jq, newposition){ 
	    	 return jq.each(function(){    
	             $(this).removeClass("validatebox-text validatebox-invalid").unbind('focus').unbind('blur');  
	             var opt = $(this).data().validatebox.options;  
	             $(this).addClass("validatebox-text").validatebox(opt);  
	         });
	    }
	});
}

//判断,防止报错
if($.fn.datagrid){
	//清空datagrid数据
	$.extend($.fn.datagrid.methods,{
		 clearData:function(jq){
		     return jq.each(function(){
		          $(this).datagrid('loadData',{total:0,rows:[]});
		     });
		 }
	});
} 

//加载效果
hz.loading = function(type,msg){
	if(msg==null||msg==""){
		msg = "请稍后,正在加载......";
	}
	var  body_width =  document.body.clientWidth;
	var  body_height= document.body.clientHeight;
	//展示loading
	if(type=="show"){
		var myload = $("<div id='myload' style='border:2px solid #95B8E7;display:inline-block;padding:10px 8px;;position:absolute;z-index:999999999;top:0px;left:0px;background:#ffffff'>"+
				"<div style='float:left;'><img src='"+hz.basePath+"/images/login/loading.gif'></div>"+
				"<div style='font-size:12px;float:left;display:inline-block;margin-top:2px;margin-left:5px;'>"+msg+"</div>"+
		 "</div>").appendTo($("body"));
		 var myloadwidth = myload.width();
		 var myloadheight = myload.height();
		 myload.css({"left":(body_width-myloadwidth)/2,"top":(body_height-myloadheight)/2});
		 $("<div id='remote_load' style='position:fixed;width:100%;height:"+body_height+"px;z-index:99999999;top:0px;left:0px;background-color: #ccc;opacity: 0.3;filter: alpha(opacity = 30);'></div>").appendTo($("body"));
	}else{
		$("#myload").remove();
		$("#remote_load").remove();
	}
};

hz.beginEditAllLine = function(id){
	var curObj = $("#"+id);
	var rows = curObj.datagrid("getRows");
	for(var i=0,length = rows.length;i<length;i++){
		curObj.datagrid('beginEdit', i);
   	}
};


function convertArray(o) { 
	var v = {};
	for ( var i in o) {
		if (typeof (v[o[i].name]) == 'undefined')
			v[o[i].name] = o[i].value;
		else
			v[o[i].name] += "," + o[i].value;
	}
	return JSON.stringify(v);
}

//获取当前日期多少天后的日期
hz.getDayAfter = function(days){
	var myDate = new Date();
	var date = myDate.getDate();
	date = date + days;
	myDate.setDate(date);
	var SY = myDate.getFullYear();
	var SM = myDate.getMonth();
	var SD = myDate.getDate();
	var SH = myDate.getHours();
	var mm = myDate.getMinutes();
	var SS = myDate.getSeconds();
	return SY+"-"+(SM+1)+"-"+SD+" "+SH+":"+mm+":"+SS;
};

//获取某个时间后的日期
hz.getDateAfterInfo = function(myDate,days){
	var date = myDate.getDate();
	date = date + days;
	myDate.setDate(date);
	var SY = myDate.getFullYear();
	var SM = myDate.getMonth();
	var SD = myDate.getDate();
	var SH = myDate.getHours();
	var mm = myDate.getMinutes();
	var SS = myDate.getSeconds();
	return (SM+1)+"月"+SD+"日";
}

//获取当前日期
hz.getCurDate = function(){
	var now = new Date(); 
	var SY = now.getFullYear(); 
	var SM = now.getMonth(); 
	var SD = now.getDate(); 
	return SY+"-"+(SM+1)+"-"+SD;
};

//获取当前日期的前一天也就是昨天
hz.getYesterday = function(){
	var myDate = new Date();
	var date = myDate.getDate();
	date = date - 1;
	myDate.setDate(date);
	
	return myDate;
};

//获取当前日期前一个月
hz.getPreMonthDate = function(){
	var now = new Date(); 
	var SY = now.getFullYear(); 
	var SM = now.getMonth()-1; 
	var SD = now.getDate(); 
	return SY+"-"+(SM+1)+"-"+SD;
};

//判断开始日期是否小于结束日期可相等
hz.isStartLessThanEndDate = function(startDate,endDate){   
    if(startDate.length>0&&endDate.length>0){   
        var arrStartDate = startDate.split("-");   
        var arrEndDate = endDate.split("-");   
        var allStartDate = new Date(arrStartDate[0],arrStartDate[1],arrStartDate[2]);   
        var allEndDate = new Date(arrEndDate[0],arrEndDate[1],arrEndDate[2]);   
        if(allStartDate.getTime()>allEndDate.getTime()){   
             return false;   
        }   
     }   
     return true;   
};

hz.convertArray = function(o) { 
	var v = {};
	for ( var i in o) {
		if (typeof (v[o[i].name]) == 'undefined')
			v[o[i].name] = o[i].value;
		else
			v[o[i].name] += "," + o[i].value;
	}
	return JSON.stringify(v);
};
/**
 * async:true异步
 * dataType:服务器返回的数据类型
 */
hz.ajaxRequest = function(url,reqParam,async,dataType,callback){
	$.ajax({
		  beforeSend: function(){
			  hz.isLogin();
		  },
		  async:async,
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  dataType:dataType,
		  cache: false,
		  success: callback
	});
};
hz.isLogin = function(){
	var url=hz.basePath+"/common/getCurrentUser?v="+Math.random();
	$.ajax({
		url : url,
		type: 'post',
		dataType : 'json',
		success : function(data) {
			if(!data){
				top.location =hz.basePath+"/pages/login.html";
			}
		}
	}); 
};
String.prototype.replaceAll  = function(s1,s2){     
    return this.replace(new RegExp(s1,"gm"),s2);     
};

function converLookupJsonObj(data){
	var str = "";
	for(var i = 0,length = data.length;i<length;i++){
		str = str+"\""+data[i].itemvalue +"\":\""+data[i].itemname+"\"";
		if(i<length-1){
			str = str+",";
		}
	}
	return eval("({"+str+"})");
};
hz.clearSearchForm = function(){
	$("#startCreateTimes").val("");
	$("#endCreateTimes").val("");
	$("#searchOwner").textbox('clear');
	$("#searchPlateNum").textbox('clear');
	$("#companyList").combobox('setValue', '0');
	$("#searchInsureNum").textbox('clear');
};

function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-'
		+ (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
	if (!s)
		return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new Date();
	}
}
/**
 * 选择日期合法性检查
 * @returns {Boolean}
 * 第三个参数陈胜加的，为了不让弹框做的
 */
function checkDate(startDate,endDate, isNotAlert){
	//如果日期为空，返回TRUE
	if(startDate==null || startDate ==""){
		return true;
	}
	if(endDate ==null || endDate ==""){
		return true;
	}
	var dateReg = /^(1[89]\d\d|2[01][01]\d)-(1[0-2]|0\d)-([0-2]\d|3[01])$/;
	if(!dateReg.test(startDate)){
		alert("起始日期格式要求为'yyyy-MM-dd'，请重新选择！");
		return false;
	}
	if(!dateReg.test(endDate)){
		alert("截止日期格式要求为'yyyy-MM-dd'，请重新选择！");
		return false;
	}
	//现在日期毫秒表示
	var todayMs = new Date().getTime();
	//获取选择的日期转为毫秒表示
	var beginMs = new Date(startDate.replace(/-/g,'/')).getTime();
	var endMs = new Date(endDate.replace(/-/g,'/')).getTime();
	//起止间隔天数
	var beginToEndDays = Math.floor((endMs - beginMs)/1000/60/60/24);
	//选择的起始日期距离现在天数
	var beginToNowDays = Math.floor((todayMs - beginMs)/1000/60/60/24);
	
	//暂时不需要此项判断
//	if(beginToNowDays - 360 > 0){
//		alert("只支持一年内(360天)的明细查询，请重新选择！");
//		return false;
//	}
	
	if(beginMs - endMs > 0){
		if (!isNotAlert)
			alert("起始日期不能大于截止日期，请重新选择！");
		return false;
	}
	//不需要此验证
//	if(endMs - todayMs > 0){
//		alert("截止日期不能大于今天，请重新选择！");
//		return false;
//	}
	//暂时不需要此项判断
//	if(beginToEndDays - 90 > 0){
//		alert("一次查询最大时间跨度为90天，请重新选择！");
//		return false;
//	}
	return true;
}
//对Date的扩展，将 Date 转化为指定格式的String 
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
//author: meizz 
Date.prototype.format = function(fmt) { 
	var o = { 
		"M+" : this.getMonth()+1,                 //月份 
		"d+" : this.getDate(),                    //日 
		"h+" : this.getHours(),                   //小时 
		"H+" : this.getHours(),                   //小时 
		"m+" : this.getMinutes(),                 //分 
		"s+" : this.getSeconds(),                 //秒 
		"q+" : Math.floor((this.getMonth()+3)/3), //季度 
		"S"  : this.getMilliseconds()             //毫秒 
	}; 
	
	if(/(y+)/.test(fmt)) 
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	for(var k in o) 
		if(new RegExp("("+ k +")").test(fmt)) 
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
	return fmt; 
}

//获得main页面全局下属性或方法
hz.getCommonRes = function (id) {
    return window[id];
};

//获取参数数组
hz.getParamArray = function (id) {
    var param = window[id];

    if (!$.isArray(param)) {
        var paramList = hz.getCommonRes('paramList');
        param = paramList ? paramList[id] : [];
    }
    return param;
};

//获取参数显示信息，增加一个选中默认值形参，参数表中找不到则显示这个值,此形参不传则返回原值
hz.getParamDisplay = function (id, key, lang, defval) {
    var param = hz.getParamArray(id);

    if ($.isArray(param)) {
        var record;

        for (var i = 0 ; i < param.length; i++) {
            if (param[i].key == key) {
                record = param[i];
                break;
            }
        }

        if (record) {
            if (lang && record.i18n && record.i18n[lang])
                return record.i18n[lang];
            return record.text;
        } else {
            return "";
        }
    } else {
        return "";
    }
};

//获取实际要展示的值
hz.getValueDisplay = function (id, key, value) {
    var param = hz.getParamArray(id);

    if ($.isArray(param)) {
        var record;

        for (var i = 0 ; i < param.length; i++) {
            if (param[i].key == key) {
                record = param[i];
                break;
            }
        }

        if (record) {
            return record.function != undefined? record.function(value):value;
        } else {
            return value ? value : "";
        }
    } else {
    	return value ? value : "";
    }
};

/**
 * 获取参数显示信息,参数
 * @param param 为数组对象
 */
hz.getParamDisplayByParam = function (param, value, lang, defval) {
//    var param = hz.getParamArray(id);

    if ($.isArray(param)) {
        var record;

        for (var i = 0 ; i < param.length; i++) {
            if (param[i].id == value) {
                record = param[i].name;
                return record;
            }
        }
        
//        if (record) {
//            if (lang && record.i18n && record.i18n[lang])
//                return record.i18n[lang];
//            return record.text;
//        } else {
//            return defval ? defval : value;
//        }
    } else {
        return defval ? defval : value;
    }
};

/**
 * 由于js比较会认为12345.00比9999.00小，故使用左补0方式来比较
 * 即对12345.00补00000000012345.00(整数部分14位)与00000000009999.00(整数部分14位)
 *
 * @param data 传入的数必须是已经补过小数点的数，如123.00
 * @return 
 */
function compareAmount(data){
	
	if(data == undefined || data == null || data == ""){
		data = "0"
	}
	
	if(data.length < 20){
		var length = 20-data.length;
		var leftAppend = "";
		for(var i=0;i<length;i++){
			leftAppend += "0";
		}
		data = leftAppend + data;
	}
	return data;
}

/**
 * 取数组元素位置
 * @param val
 * @param array
 * @returns {Number}
 */
function arrayIndexOf(val,array){
	for(var i =0;i<array.length;i++){
		if(array[i] == val){
			return i;
		}
		return -1;
	}
}
/**
 * 删除数组中的元素
 * @param val    --删除的元素
 * @param array   --数组
 */
function arrayRemove(val,array){
	var index =arrayIndexOf(val,array);
	if(index>-1){
		array.splice(index,1);
	}
}

/**
*常用语弹框
*/
function checkCommon(id,spanId){
	
	if($("#commonWindow") != undefined && isWindow($("#commonWindow"))){
		$("#commonWindow").window("close");
	}
	
	$.get(hz.basePath+"/pages/case/common-info.jsp?id="+id+"&spanId="+spanId, function(data) {
		$("#commonWindow").window({
			width : 630,
			height : 400,
			modal : true,
			title : "常用语",
			content : data,
			minimizable : false,
			onOpen : function() {
				$("#commonWindow").window("center");
			}
		});
		$("#commonWindow").window("open");
	}, "html")
	
}

function isWindow( obj ){ 
	if(typeof obj !== "object") return false;//必须是一个对象 
	var expando = "dom"+(new Date-0) //生成一个随机变量名 
	//全局解析代码，IE的eval只对原作用域有效 
	//详见http://www.javaeye.com/topic/519098 
	//加之eval与with是 html5严格模式下要禁止的东西，弃之不用！ 
	var js = document.createElement("script"); 
	var head = document.getElementsByTagName("head")[0]; 
	head.insertBefore(js,head.firstChild); 
	js.text = expando + " = {};" 
	head.removeChild(js) 
	return window[expando] === obj[expando] 
} 

/**
 * 打开iframe
 */
function openWindow(url,frameName,windowName){
	$("#"+frameName).attr("src",url);
	$('#'+windowName).window('open');
}
/**
 * 关闭iframe
*/
function closeWindow(id){
	var commonWindow = $("#"+id,parent.document);
	$(commonWindow).find("iframe").attr("src","about:blank");
	$(commonWindow).parent().siblings("div.window-shadow").hide();
	$(commonWindow).parent().siblings("div.window-mask").hide();
	$(commonWindow).parent().hide();
}

//添加新的tab
function addNewTabs(url,title){
	var jq = top.jQuery;
	if (jq("#tabs").tabs('exists', title)) {
		jq("#tabs").tabs('select', title);
	} else {
		var content = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
		jq("#tabs").tabs('add', {
			title : title,
			content : content,
			closable : true
		});
	}
	tabClose();
}

function tabClose() {
	var jq = top.jQuery;
	/* 双击关闭TAB选项卡 */
	jq(".tabs-inner").dblclick(function() {
		var subtitle = jq(this).children(".tabs-closable").text();
		jq('#tabs').tabs('close', subtitle);
	})
	/* 为选项卡绑定右键 */
	jq(".tabs-inner").bind('contextmenu', function(e) {
		jq('#mm').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
		var subtitle = jq(this).children(".tabs-closable").text();

		jq('#mm').data("currtab", subtitle);
		jq('#tabs').tabs('select', subtitle);
		return false;
	});
}

//关闭当前tabs(根据tabs标题关闭)
function closeNewTabs(title){
	var jq = top.jQuery;
	if (title) {
		jq("#tabs").tabs("close",title);
		return;
	}
	
	//获取当前tab的标题
	var tabs = jq("#tabs").tabs('getSelected');
	var title = tabs.panel('options').title;
	//关闭当前tab
	jq("#tabs").tabs("close",title);
}

//获取当前选择的tab的标题
function getSelectedTitle(){
	var jq = top.jQuery;
	//获取当前tab的标题
	var tabs = jq("#tabs").tabs('getSelected');
	
	return tabs.panel('options').title;
}

/**
 *设置单选框选中状态，根据参数值找出值与之相等的radio，并置为选中状态
 *@param radioName{String} radio名称
 *@param value {String} 需要找出的radio的值
 */
function setRadioValue(radioName, value) {
	var radioList = document.getElementsByName(radioName);
	if(radioList.length) {
		for (var i = 0; i < radioList.length; i++)
		{
			radioList[i].checked = radioList[i].value == value;
		}
	}else {
		radioList.checked = radioList.value == value;
	}
}

//计算textarea的数量 czx
function countChar(logContent,spanNameCount){
	if($("#"+logContent).val().length <= 1000){
		$("#"+spanNameCount).html(1000 - $("#"+logContent).val().length);
	} else {
		$("#"+logContent).val($("#"+logContent).val().substring(0, 1000));
	}
}

//给分割单用 czx
function countChar_fengedan(fengedanContent,spanNameCountfengedan){
	if($("#"+fengedanContent).val().length <= 1000){
		$("#"+spanNameCountfengedan).html(1000 - $("#"+fengedanContent).val().length);
	} else {
		$("#"+fengedanContent).val($("#"+fengedanContent).val().substring(0, 1000));
	}
}

//删除combobox下拉框箭头
$(function(){
	$(".rm_icon_arrow").next("span").children("span").children("a").removeClass();
})

/**
* 检验字符串是否为空
* @param {String} 字符串
* @return {bool} 是否为空
*/
hz.isEmpty = function (input)
{
	if( input==null ||  $.trim(input).length == 0 || input == 'null')
		return true;
	else
		return false;
}

/**
 * 刷新选中的tab
 */
hz.updateSelectTab = function(title){
	
	var currentTab ;
	
	if(hz.isEmpty(title)){
		currentTab = window.parent.$('#tabs').tabs('getSelected');
	}else{
		currentTab = window.parent.$('#tabs').tabs('getTab',title); 
	}
	
	var iframe = $(currentTab.panel('options').content);
	var src = iframe.attr('src');
	window.parent.$('#tabs').tabs('update', {
		tab : currentTab,
		options : {
			content : createFrame(src)
		}
	})
}


function createFrame(url) {
	var s = '<iframe scrolling="auto" frameborder="0"  src="' + url
			+ '" width="100%" height="100%"></iframe>';
	return s;
}

/**
* 检查字符串是否是整数
* @param {String} 字符串
* @return {bool} 是否是整数
*/
hz.isInteger = function( s )
{ 
	var isInteger = RegExp(/^[0-9]+$/);
	return ( isInteger.test(s) );
}

/**
 * 检查是否以某个字符串结尾
 */
String.prototype.endWith=function(s){
	  if(s==null||s==""||this.length==0||s.length>this.length)
		     return false;
		  if(this.substring(this.length-s.length)==s)
		     return true;
		  else
		     return false;
		  return true;
		 }


/**
 * 格式化时间
 */
hz.formatTime=function(value){
	if(value == null || value == undefined){
		return "";
	}else if((typeof value == 'string') && value.constructor == String)
		return new Date(value.replace(/-/g, "/")).format("yyyy-MM-dd");
	else
		return new Date(value).format("yyyy-MM-dd");
}

hz.formatTimeLong=function(value){
	if(value == null || value == undefined){
		return "";
	}else if((typeof value == 'string') && value.constructor == String)
		return new Date(value.replace(/-/g, "/")).format("yyyy-MM-dd HH:mm");
	else
		return new Date(value).format("yyyy-MM-dd HH:mm");
}