canvas是html5新增的组件，相当于一块画布，可以用JavaScript绘制图表图形，动画等。

canvas组件定义了一个指定尺寸的矩形框。只有两个属性：width和height，分别定义其宽度和高度。id是所有组件的通用属性。

在canvas内绘制的图形要想适配不同尺寸的终端，就必须设置width和height属性，在css中设置会导致所绘制的图形变形。

canvas  DOM对象有一个getContext方法，这个方法只有一个参数，用于指定绘制内容是3d还是2d。

```HTML
<canvas id="test-canvas" width='100' height='100'>
    你的浏览器不支持canvas   //浏览器不支持canvas时才会显示
</canvas>
```

```javascript
var canvasDom=document.getElementById('test-canvas')

if(canvasDom.getContext){ //浏览器支持canvas
	var ctx=canvasDom.getContext('2d') //绘制2d图形
	var ctxW=canvasDom.getContext('webgl') //绘制3d图形   
}else{ //浏览器不支持canvas
  
}
```

[各种效果查看](https://shaniawei.github.io/resource/canvas/canvas.html)

不同于svg，canvas只支持一种原生的图形绘制，即 矩形。其他的图形都需要生成至少一条路径。好在可以使用多条路径绘制各种复杂的图形。

