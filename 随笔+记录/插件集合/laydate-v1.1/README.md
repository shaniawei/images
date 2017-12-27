http://www.layui.com/laydate/

```javascript
		
<span class="laydate-icon" id="birth"></span>

		// 出生日期
		var birth = {
			elem: '#birth',
			format: 'YYYY-MM-DD',
			min: '1957-01-01', //设定最小日期
			max: '1999-12-31', //当前
			istime: true,
			istoday: false,
			fixed: false, //是否固定在可视区域
			choose: function(datas){
				
			}
		};
		
		laydate(birth);

		
		$('#birth').html(TOOLS.getSessionstorage('birth') || '1985-01-01');

		window.onresize=function(){ 
			laydate.reset();
		}
```