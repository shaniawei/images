```javascript
//webpack.config.js配置文件

var htmlwebpackplugin=require('html-webpack-plugin');
var cleanwebpackplugin=require('clean-webpack-plugin');//如果需要这些插件的话，必须在npm把这些插件安装好，然后再引进

module.exports={
    //不分离文件
    entry:'./src/index.js',  //唯一的入口文件
    //这里相当于entry:{bundle:'./src/index.js'}
    output:{
    	path:__dirname+'/dist',  //输出路径
        filename:'bundle.js'  //所有的文件(js+css+图片+...)打包在一个文件里
        //这里相当于filename:'[name].js'
    }
  
    //分离文件
    entry:{
        app:'./src/index.js',
        print:'./src/print.js'
    },
    //使用插件
    plugins:[
        new cleanwebpackplugin(['dist']),   //清理dist文件夹下没有被应用到项目中的文件
        new htmlwebpackplugin({
            title:'output management'   //入口文件name改变，可以让html文件中的同时改变(其实是生成了一个新的html文件)
        })
    ],
    output:{
        path:__dirname+'/dist',
        filename:'[name].bundle.js'
    }
    //使用loader对css，字体，图片，数据等作处理
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',  //将css加载到html中
                    'css-loader'    //导入css文件
                  //逻辑上应该先加载css-loader，但是webpack是倒叙加载的，所以这两个loader的顺序不能换
                ]
            },
            {
                test:/\.(jpg|png|gif|jpeg|svg)$/,
                use:[
                    'file-loader'
                ]
            }
        ]
    }
	//loader的另一种写法
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test:/\.scss$/,
                loader:'style!css!sass'
            }
        ]
    }
}
```