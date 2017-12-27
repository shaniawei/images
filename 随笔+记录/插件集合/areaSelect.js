(function (window, undefined) {

	var areaSelect = {};

	// 年月
	areaSelect.func = function(cla,type) {
		var _class    = cla;
		var beforeY,afterY,difference;
		var _top      = 0;
		var _itemHtml = '';
		var _height   = $('.areaSelect '+ _class +' ul').height();
		var _num      = $('.areaSelect '+ _class +' li').length;
		var _h_item   = _height/_num;

		// html 结构
		var _type = type;
		switch(_type) {
			case 'month':
				var city=decodeURI(getUrlParam("city"))||"请选择";
				console.log(city)
				var cities=$("#fullcodeData .city p")
				console.log(cities.length)
				var fullcode;
				for(var i=0;i<cities.length;i++){
					if(cities.eq(i).html().indexOf(city)!=-1){
						 (function(arg){    
						 // console.log(cities.eq(i).html().indexOf(city))     
			       			var fullcodes=$("#fullcodeData .city p").eq(i).attr("data-id");
							fullcode=fullcodes;  
							console.log(fullcode)
							// $("#city").html(city).attr("fullcode",fullcode);
							// init(customer_id,fullcode);
							   
			   			})(i)	
					}
				}

				
				console.log(ChineseDistricts)
				var arr = [];
				var obj=ChineseDistricts["440100"]
			    for(var item in obj){
			        arr.push(obj[item]);
			    }
				// var app=new Vue({
				// 	el:"#area",
				// 	data:{"_data":ChineseDistricts[fullcode]}
				// })

				for (var i in obj) {
					_itemHtml += '<li>'+ obj[i] +'</li>';
				}
				$('.areaSelect '+ _class +' ul').html(_itemHtml);
				console.log(obj)
				// var d     = new Date()
				_height = $('.areaSelect '+ _class +' ul').height();
				_num    = $('.areaSelect '+ _class +' li').length;
				_h_item = _height/_num;
				
				// var _currentMonth = d.getMonth()+1;
				_top=_h_item
				console.log(_top)
				$('.areaSelect '+ _class +' ul').find("li:nth-child("+ (_top/_h_item)   +")").addClass('active');
				$('.areaSelect '+ _class +' ul').find("li:nth-child("+ (_top/_h_item)  +")").siblings().removeClass('active');
				$('.areaSelect '+ _class +' ul').css('transform', 'translate3d(0px, '+ _top +'px, 0px)');
				break;
		}

		$('.areaSelect '+ _class +'').on('touchstart', function (event) {
		    event.preventDefault();
		    var touch = event.touches[0];
			beforeY   = touch.pageY;
		});

		$('.areaSelect '+ _class +'').on('touchmove', function (event) {
			var touch   = event.touches[0];
			afterY      = touch.pageY;
			difference  = afterY - beforeY;
			_top        = _top + difference/10;

			if (_top > _h_item ) {
				_top = _h_item;
			}
			if (_top < (-_height + 2*_h_item)) {
				_top = -_height + 2*_h_item;

			}

			$(this).find("li:nth-child("+ (-Math.round(_top/_h_item) + 2) +")").addClass('active');
			$(this).find("li:nth-child("+ (-Math.round(_top/_h_item) + 2) +")").siblings().removeClass('active');
			$(this).find('ul').css('transform', 'translate3d(0px, '+ _top +'px, 0px)');

		    event.preventDefault();
		});

		$('.areaSelect '+ _class +'').on('touchend', function (event) {
			_top = Math.round(_top/_h_item) * _h_item;
			$(this).find('ul').css('transform', 'translate3d(0px, '+ _top +'px, 0px)');
		    event.preventDefault();
		});

		// enter
		$('.areaSelect .yes').bind('click', function(event) {
			var _b = $('.areaSelect').find('.active').html();
			$('#areaSelect').val(_b);
			$(this).parents(".areaSelect").siblings("p").css("display","block");
			// console.log(_a+_b)
			areaSelect.hide();
			event.preventDefault();
		});
	};

	areaSelect.show = function() {
		$('.areaSelect').removeClass('js-visibility-none');
	};

	areaSelect.hide = function() {
		$('.areaSelect').addClass('js-visibility-none');
	};

	areaSelect.init = function(month) {
		// areaSelect.func(year,'year');
		areaSelect.func(month,'month');
		// setTimeout(function(){
		// 	areaSelect.show();
		// },900)
	};



	window.areaSelect = areaSelect;

}(window));

(function (window, undefined) {

    var LoanInfo = {};

    LoanInfo.init = function() {
        areaSelect.init('.box-item-month');
        
        $('#areaSelect').bind('click', function(event) {
            // $(this).prev().html('出生年月');

            areaSelect.show();
            // select.show();
        });
        
    }

    window.LoanInfo = LoanInfo;

}(window));

window.onload=function(){ 
    LoanInfo.init();
}