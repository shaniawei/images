iScorll.js

```HTML
<!DOCTYPE html>
<html>
<head>
	<title>iScroll的小demo</title>
	<meta charset="utf-8">
	<style type="text/css">
		#wrapper {
			width: 235px;
			height: 321px;
			margin-right: 20px;
			overflow: hidden;
			display: inline-block;
		}
		.scroller{
			background:url(girl.jpg) no-repeat;
			height: 1000px;
			width: 800px;
			background-size: 100% 100%;
		}
		.smallpic{
			width: 235px;
			height: 321px;
			background:url(girl.jpg) no-repeat;
			background-size: 235px 321px;
			display: inline-block;
		}
		.scrollcontainer{
			border:1px solid #f00;
			background-color: rgba(255,255,255,.4);
		}
		ul{
			display: inline-block;
		}
	</style>
</head>
<body onload="loaded()">
	<div id="wrapper">
		<div class="scroller"></div>
	</div>
	<div class="smallpic">
		<div class="scrollcontainer"></div>  //它的宽高取决于其父元素(.smallpic),iScorll.js内部做了处理，我还没有去深究，只知道有这回事儿。
	</div>
	<ul>
		<li>
          <a href="javascript:myScroll.scrollTo(-100,200,400,IScroll.utils.ease.back)">header</a>		 </li>   //第一次看到js在HTML中的这种写法+这里使用的是IScroll实例的scrollTo方法
		<li>
          <a href="">hand</a>
        </li>
		<li>
          <a href="">animal</a>
        </li>
	</ul>
	<script src="iscroll.js"></script>  //iScroll.js文件在本源js文件之前引入，否则会由于IScroll类还没有定义就使用而报错
	<script type="text/javascript">
		var myScroll;
		function loaded(){
			myScroll = new IScroll('#wrapper',{
					startX: -359,  //初始化滚动条的位置
					startY: -85,
					scrollY: true,  //是否显示竖滚动条
					scrollX: true,  //是否显示横滚动条
					freeScroll: true,  //是否任意方向滚动
					mouseWheel: true,  //是否支持鼠标滑动
					indicators: {    //自定义滚动条指示元素，值可以是数组，定义多个滚动条指示器
						el: document.getElementsByClassName('smallpic')[0],  //制定滚动条的容器
						interactive: true,    //是否可以拖动滚动条
                        fade:true,   //是否渐隐滚动条，关掉可以加速
                        shrink:clip,  //滚动超出边界时是否收缩滚动条 'clip'裁剪超出部分  'false'不收缩 'scale' 按比例收缩，会占用cpu资源
                      	ignoreBoundaries:true,  //是否忽略边界，true时可设置滚动条速度
                        resize:false,  //是否固定滚动条大小，建议自定义滚动条时开启
                      	speedRatioX:0.4,
                      	speedRatioY:0.2,   //指示器相对于主滚动条的速度
					},
              		bounceEasing: 'elastic', //‘quadratic‘, ‘circular‘, ‘back‘, ‘bounce‘, ‘elastic
              		bounceTime: 1200   //当滚动器到达容器边界时执行一个反弹动画
			});
		}
	</script>
</body>
</html>

用户上传头像时，上传的图片有的会很大，如果直接改变图片的大小会让图片失真模糊，为避免这种情况，可使用iScroll.js让用户选择其想要显示的那一部分,然后在根据定位使用css3的属性clip裁剪将用户想要的呢部分进行展示。
```

iscroll.js 参数说明参考链接：

http://blog.csdn.net/sweetsuzyhyf/article/details/44195549/

https://my.oschina.net/huqiji/blog/895532

http://www.cnblogs.com/GoTing/p/6265354.html

http://www.mamicode.com/info-detail-331827.html