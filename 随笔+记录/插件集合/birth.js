(function (window, undefined) {

	var Birth = {};

	// 年月
	Birth.func = function(cla,type) {
		var _class    = cla;
		var beforeY,afterY,difference;
		var _top      = 0;
		var _itemHtml = '';
		var _height   = $('.year-month '+ _class +' ul').height();
		var _num      = $('.year-month '+ _class +' li').length;
		var _h_item   = _height/_num;

		// html 结构
		var _type = type;
		switch(_type) {
			case 'year':
				var d     = new Date()
				var _yearEnd = d.getFullYear() - 18;
				var _yearStart = _yearEnd - 49;
				
				for (var i = _yearStart; i <= _yearEnd; i++) {
					_itemHtml += '<li data-value="'+i+'">'+ i +'年</li>';
				}
				$('.year-month '+ _class +' ul').html(_itemHtml);

				_height = $('.year-month '+ _class +' ul').height();
				_num    = $('.year-month '+ _class +' li').length;
				_h_item = _height/_num;

				var num = 16;
				_top = -_height + num*_h_item;
				
				
				// 年初始 上一年高亮 + 2
				$('.year-month '+ _class +' ul').find("li:nth-child("+ (-Math.round(_top/_h_item) + 2) +")").addClass('active');
				$('.year-month '+ _class +' ul').find("li:nth-child("+ (-Math.round(_top/_h_item) + 2) +")").siblings().removeClass('active');
				$('.year-month '+ _class +' ul').css('transform', 'translate3d(0px, '+ _top +'px, 0px)');
				

				break;
			case 'month':
				var d     = new Date()
				_height = $('.year-month '+ _class +' ul').height();
				_num    = $('.year-month '+ _class +' li').length;
				_h_item = _height/_num;
				
				var _currentMonth = d.getMonth()+1;
				_top=-(_currentMonth-2)*_h_item
				$('.year-month '+ _class +' ul').find("li:nth-child("+ (_currentMonth)   +")").addClass('active');
				$('.year-month '+ _class +' ul').find("li:nth-child("+ (_currentMonth)  +")").siblings().removeClass('active');
				$('.year-month '+ _class +' ul').css('transform', 'translate3d(0px, '+ _top +'px, 0px)');

				break;
		}

		$('.year-month '+ _class +'').on('touchstart', function (event) {
		    event.preventDefault();
		    var touch = event.touches[0];
			beforeY   = touch.pageY;
		});

		$('.year-month '+ _class +'').on('touchmove', function (event) {
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

			// $(this).find("li:nth-child("+ (-Math.round(_top/_h_item) + 2) +")").addClass('active');
			// $(this).find("li:nth-child("+ (-Math.round(_top/_h_item) + 2) +")").siblings().removeClass('active');
			$(this).find('ul').css('transform', 'translate3d(0px, '+ _top +'px, 0px)');

		    event.preventDefault();
		});

		$('.year-month '+ _class +'').on('touchend', function (event) {
			_top = Math.round(_top/_h_item) * _h_item;
			$(this).find("li:nth-child("+ (-Math.round(_top/_h_item) + 2) +")").addClass('active');
			$(this).find("li:nth-child("+ (-Math.round(_top/_h_item) + 2) +")").siblings().removeClass('active');
			$(this).find('ul').css('transform', 'translate3d(0px, '+ _top +'px, 0px)');
		    event.preventDefault();
		});

		// enter
		$('.year-month .enter').bind('click', function(event) {
			var _a = $('#year').find('.active').data('value');
			var _b = $('#month').find('.active').data('value');
			$('#birth').html(_a + '-' + _b);
			TOOLS.setSessionstorage('birth',_a + '-' + _b);
			// console.log(_a+_b)
			Birth.hide();
			event.preventDefault();
		});
	};

	Birth.show = function() {
		$('.year-month').removeClass('js-visibility-none');
	};

	Birth.hide = function() {
		$('.year-month').addClass('js-visibility-none');
	};

	Birth.init = function(year,month) {
		Birth.func(year,'year');
		Birth.func(month,'month');
		// setTimeout(function(){
		// 	Birth.show();
		// },900)
	};



	window.Birth = Birth;

}(window));

window.onload=function(){ 
	
}