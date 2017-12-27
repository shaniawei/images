/*******************************
 *
 * date 	@2016/7/10
 * author 	@Luo ZhiYi
 * desc 	@tools常用工具函数集合
 * github   @https://github.com/luozyiii/tools.js
 *
 * ******************************/
 
// 拓展zepto 滚动条方法
$.fn.scrollTo =function(options){
    var defaults = {
        toT : 0,    //滚动目标位置
        durTime : 500,  //过渡动画时间
        delay : 10,     //定时器时间
        callback:null   //回调函数
    };
    var opts = $.extend(defaults,options),
        timer = null,
        _this = this,
        curTop = _this.scrollTop(),//滚动条当前的位置
        subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
        index = 0,
        dur = Math.round(opts.durTime / opts.delay),
        smoothScroll = function(t){
            index++;
            var per = Math.round(subTop/dur);
            if(index >= dur){
                _this.scrollTop(t);
                window.clearInterval(timer);
                if(opts.callback && typeof opts.callback == 'function'){
                    opts.callback();
                }
                return;
            }else{
                _this.scrollTop(curTop + index*per);
            }
        };
    timer = window.setInterval(function(){
        smoothScroll(opts.toT);
    }, opts.delay);
    return _this;
};
// Date拓展
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// var time1 = new Date().Format("yyyy-MM-dd");
// var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss"); 

$.fn.prevAll = function(selector){
	var prevEls = [];
	var el = this[0];
	if(!el) return $([]);
	while (el.previousElementSibling) {
		var prev = el.previousElementSibling;
		if (selector) {
			if($(prev).is(selector)) prevEls.push(prev);
		}
		else prevEls.push(prev);
		el = prev;
	}
	return $(prevEls);
};

$.fn.nextAll = function (selector) {
	var nextEls = [];
	var el = this[0];
	if (!el) return $([]);
	while (el.nextElementSibling) {
		var next = el.nextElementSibling;
		if (selector) {
		 	if($(next).is(selector)) nextEls.push(next);
		}
		else nextEls.push(next);
		el = next;
	}
	return $(nextEls);
};
;(function(){

	var TOOLS = {};

	TOOLS.IP    = '';                                   // 好幸用正式域名
	// TOOLS.DMP   = 'http://broker.findmp.intely.cn';     // DMP正式域名
	// TOOLS.KAIP  = 'http://broker2.findmp.intely.cn'     // DMP卡牛正式域名
	TOOLS.APPID = 'wx153fe06e1d92e0fe';                 // 正式ID

	// TOOLS.IP    = 'http://192.168.1.211:8989'; 
	// TOOLS.DMP   = 'http://192.168.1.58:8409'; 
	// TOOLS.IP    = 'http://dev.wx.haoxy.yidejr.com';       // 好幸用测试域名
	// TOOLS.DMP   = 'http://dev.broker.findmp.intely.cn';   // DMP测试域名
	// TOOLS.KAIP  = ' http://dev.broker2.findmp.intely.cn'; // DMP卡牛测试域名
	// TOOLS.APPID = 'wx9b4b225ada4a5f83';                   // 测试ID
	
	TOOLS.channel = 'wechatLoan';

	// 匹配手机号码的正则
	TOOLS.REG_PHONE = /^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18|14|17)\d{9}$/;
	
	// 匹配身份证号码的正则
	TOOLS.REG_IDCARD = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	
	// 匹配邮箱的正则
	TOOLS.REG_EMAIL = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
	
	// 网址的正则
	TOOLS.REG_URL = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" //IP形式的URL- 199.194.52.184
	+ "|" //允许IP和DOMAIN（域名）
	+ "([0-9a-z_!~*'()-]+\.)*" //域名- www.
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." //二级域名
	+ "[a-z]{2,6})" //first level domain- .com or .museum
	+ "(:[0-9]{1,4})?" //端口- :80
	+ "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	
	// 邮政编码
	TOOLS.REG_POSTALCODE = /^[a-zA-Z0-9]{3,12}$/;
	
	// 只能输入1-20个数字
	TOOLS.REG_NUMBER = /^[0-9]{1,20}$/;
	
	// 纯中文字符
	TOOLS.REG_CH = /^[\u4E00-\u9FA5]+$/;
	
	//2~4个纯中文字符
	TOOLS.REG_CH2 = /^[\u4E00-\u9FA5]{2,4}$/;
	// 密码:只能输入6-20个字母、数字、下划线
	TOOLS.REG_PASSWORD = /^(\w){6,20}$/;
	
	// 校验手机号码/身份证号码／邮箱／网址等...  value:需要校验的值 reg：校验的规则
	TOOLS.verify = function(value,reg){
	    var regExp = new RegExp(reg);
		return regExp.test(value);
	};

	TOOLS.fmoney = function(s, n) { 
	    n = n > 0 && n <= 20 ? n : 2; 
	    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; 
	    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1]; 
	    var t = ""; 
	    for (var i = 0; i < l.length; i++) { 
	        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : ""); 
	    } 
	    return t.split("").reverse().join("") + "." + r; 
	};

	TOOLS.onlyNum = function () {
	    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
	    if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
	    event.returnValue=false;
	}

	// 设置cookie
	TOOLS.setCookie = function(name,value,days){
		var date = new Date();
        date.setTime(date.getTime() + parseInt(days) * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + date.toGMTString() + ";path=/";
	};

	// 获取cookie
	TOOLS.getCookie = function(name){
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return (arr[2]);
        } else {
            return null;
        }
	};

	// 删除cookie
	TOOLS.delCookie = function(name){
		TOOLS.setCookie(name, "", -1);
	};

	// 清空cookie
	TOOLS.clearCookie = function(){
		var names = document.cookie.match(/[^ =;]+(?=\=)/g); 
		if (names) { 
			for (var i = names.length; i--;){
				TOOLS.setCookie(names[i],'',-1);
			}
		}
	};

	// 设置本地存储
	TOOLS.setLocalstorage = function(name,value){
		if (window.localStorage) {
            localStorage.setItem(name,value);
        }
	};

	// 获取本地存储
	TOOLS.getLocalstorage = function(name){
		if (window.localStorage) {
            return localStorage.getItem(name);
        }
	};

	// 删除本地存储
	TOOLS.delLocalstorage = function(name){
	 	if (window.localStorage) {
            localStorage.removeItem(name);
        }
    };

    // 清空所有本地存储
    TOOLS.clearLocalstorage = function(){
    	if (window.localStorage) {
            localStorage.clear();
        }
    };

    // 设置会话存储
	TOOLS.setSessionstorage = function(name,value){
		if (window.sessionStorage) {
            sessionStorage.setItem(name,value);
        }
	};

	// 获取会话存储
	TOOLS.getSessionstorage = function(name){
		if (window.sessionStorage) {
            return sessionStorage.getItem(name);
        }
	};

	// 删除会话存储
	 TOOLS.delSessionstorage = function(name){
	 	if (window.sessionStorage) {
            sessionStorage.removeItem(name);
        }
    };

    // 清空所有会话存储
    TOOLS.clearSessionstorage = function(){
    	if (window.sessionStorage) {
            sessionStorage.clear();
        }
    };

    // 根据参数名获取当前url的参数值
    // 例如：xxx.html?a=1&b=2
    // 执行：TOOL.getParam(a) 可得到值1
    TOOLS.getParam = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return r[2]; return "";
    };

    //浏览器navigator信息
    TOOLS.browser = {  
	    versions:function(){   
			var u = navigator.userAgent, app = navigator.appVersion;   
			return {//移动终端浏览器版本信息   
			    trident: u.indexOf('Trident') > -1, //IE内核  
			    presto: u.indexOf('Presto') > -1, //opera内核  
			    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
			    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
			    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
			    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
			    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
			    iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
			    iPad: u.indexOf('iPad') > -1, //是否iPad    
			    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部  
			};  
		}(),  
		language:(navigator.browserLanguage || navigator.language).toLowerCase()  
	};

    //提示框
    TOOLS.msg = function (msg) {
    	if($("#myAlert").length==0){
			$("body").append("<sub id='myAlert' style='position:fixed;top:50%;left:50%;z-index:99;text-align: center;width:80%;padding:1.6rem 0;background:rgba(0,0,0,.6);color:#fff;border-radius:.6rem;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);'>"+msg+"</sub>");
			$("#myAlert").click(function(){$("#myAlert").hide()});
		}else{
			$("#myAlert").html(msg).show();
		}
		setTimeout(function(){
			$("#myAlert").hide();
		},1500)
    };

	// 获取微信code
	TOOLS.getCode = function () {
		var code = TOOLS.getParam('code');
		var state = TOOLS.getParam('state');
		if(state == ''){
			if(code == ''){
				var nowUrl = window.location.href;
				var nextUrl = encodeURIComponent(nowUrl);
				var wechatUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ TOOLS.APPID +'&redirect_uri='+ nextUrl +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
				window.location.href = wechatUrl;
			}
		}
		code = TOOLS.getParam('code');
		if (TOOLS.getLocalstorage('userID') == null) {
			$.ajax({
				type: "GET",
				url: TOOLS.IP+"/wx_authenticate",
				data: {
					'code': code
				},
				headers: {
					channel: TOOLS.channel
				},
				dataType : 'json',
				success: function(data){
					if (data.code === 0) {
						TOOLS.setLocalstorage('userID',data.data);
						TOOLS.setCookie('userID',data.data,1);
					}else if(data.code === 400){
						window.history.go(-2);
					}
				}
			});
		}
		
	};

	// 获取微信code
	TOOLS.getCodeS = function () {
		var code = TOOLS.getParam('code');
		var state = TOOLS.getParam('state');
		if(state == ''){
			if(code == ''){
				var nowUrl = window.location.href;
				var nextUrl = encodeURIComponent(nowUrl);
				var wechatUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ TOOLS.APPID +'&redirect_uri='+ nextUrl +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
				window.location.href = wechatUrl;
			}
		}
		code = TOOLS.getParam('code');
		if ((TOOLS.getSessionstorage('userID') == null)||(TOOLS.getCookie('userID') == null)) {
			$.ajax({
				type: "GET",
				url: TOOLS.IP+"/wx_authenticate",
				data: {
					'code': code
				},
				headers: {
					channel: TOOLS.channel
				},
				dataType : 'json',
				success: function(data){
					if (data.code === 0) {
						TOOLS.setSessionstorage('userID',data.data);
						TOOLS.setCookie('userID',data.data,1);
					}else if(data.code === 400){
						window.history.go(-2);
					}
				}
			});
		}
		
	};

	// 获取微信code
	TOOLS.getCode2 = function () {
		var code = TOOLS.getParam('code');
		var state = TOOLS.getParam('state');
		if(state == ''){
			if(code == ''){
				var nowUrl = window.location.href;
				var nextUrl = encodeURIComponent(nowUrl);
				var wechatUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ TOOLS.APPID +'&redirect_uri='+ nextUrl +'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
				window.location.href = wechatUrl;
			}
		}
	};
	
	//获取userid
	TOOLS.getUserID = function () {
		var userid = $("#data").data("id");
		if (userid == "{{.id}}") {
			userid = 0;
		}
		return userid;
	};

	// 设置为全局对象
    window.TOOLS = TOOLS;

})()