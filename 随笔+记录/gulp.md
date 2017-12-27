# **gulp  API文档**



## gulp API docs

### 1、gulp.src(globs[, options])

1.1、说明：src方法是指定需要处理的源文件的路径，gulp借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，gulp.src返回当前文件流至可用插件；

1.2、**globs**：  需要处理的源文件匹配符路径。类型(必填)：String or StringArray；

通配符路径匹配示例：

“src/a.js”：指定具体文件；

“*”：匹配所有文件    例：src/*.js(包含src下的所有js文件)；

“”：匹配0个或多个子文件夹    例：src//*.js(包含src的0个或多个子文件夹下的js文件)；

“{}”：匹配多个属性    例：src/{a,b}.js(包含a.js和b.js文件)  src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)；

“!”：排除文件    例：!src/a.js(不包含src下的a.js文件)；

JavaScript

```javascript
var gulp = require('gulp'),
    less = require('gulp-less');
 
gulp.task('testLess', function () {
    //gulp.src('less/test/style.less')
    gulp.src(['less/**/*.less','!less/{extend,page}/*.less'])
        .pipe(less())
        .pipe(gulp.dest('./css'));
});
```

1.3、**options**：  类型(可选)：Object，有3个属性buffer、read、base；

options.buffer：  类型：Boolean  默认：true 设置为false，将返回file.content的流并且不缓冲文件，处理大文件时非常有用；

options.read：  类型：Boolean  默认：true 设置false，将不执行读取文件操作，返回null；

options.base：  类型：String  设置输出路径以某个路径的某个组成部分为基础向后拼接，具体看下面示例：

JavaScript

```javascript
gulp.src('client/js//*.js')   
  .pipe(minify())  
  .pipe(gulp.dest('build'));  // Writes 'build/somedir/somefile.js'

gulp.src('client/js//*.js', { base: 'client' })  
  .pipe(minify())  
  .pipe(gulp.dest('build'));  // Writes 'build/js/somedir/somefile.js'
```

### 2、gulp.dest(path[, options])

2.1、说明：dest方法是指定处理完后文件输出的路径；

JavaScript

```javascript
gulp.src('./client/templates/*.jade')  
  .pipe(jade())  
  .pipe(gulp.dest('./build/templates'))  
  .pipe(minify())  
  .pipe(gulp.dest('./build/minified_templates'));
```

2.2、**path**：  类型(必填)：String or Function 指定文件输出路径，或者定义函数返回文件输出路径亦可；

2.3、**options**：  类型(可选)：Object，有2个属性cwd、mode；

options.cwd：  类型：String  默认：process.cwd()：前脚本的工作目录的路径 当文件输出路径为相对路径将会用到；

options.mode：  类型：String  默认：0777 指定被创建文件夹的权限；

### 3、gulp.task(name[, deps], fn)

3.1、说明：task定义一个gulp任务；

3.2、**name**：  类型(必填)：String 指定任务的名称（不应该有空格）；

3.3、**deps**：  类型(可选)：StringArray，该任务依赖的任务（注意：被依赖的任务需要返回当前任务的事件流，请参看下面示例）；

JavaScript

```javascript
gulp.task('testLess', function () {
    return gulp.src(['less/style.less'])
        .pipe(less())
        .pipe(gulp.dest('./css'));
});
 
gulp.task('minicss', ['testLess'], function () { //执行完testLess任务后再执行minicss任务
    gulp.src(['css/*.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'));
});
```

3.4、**fn**：  类型(必填)：Function 该任务调用的插件操作；

### 4、gulp.watch(glob [, opts], tasks) or gulp.watch(glob [, opts, cb])

4.1、说明：watch方法是用于监听文件变化，文件一修改就会执行指定的任务；

4.2、**glob**：  需要处理的源文件匹配符路径。类型(必填)：String or StringArray；

4.3、**opts**：  类型(可选)：Object 具体参看[https://github.com/shama/gaze](https://github.com/shama/gaze)；

4.4、**tasks**：  类型(必填)：StringArray 需要执行的任务的名称数组；

4.5、**cb(event)**：  类型(可选)：Function 每个文件变化执行的回调函数；

JavaScript

```javascript
gulp.task('watch1', function () {
    gulp.watch('less/**/*.less', ['testLess']);
});
 
gulp.task('watch2', function () {
    gulp.watch('js/**/*.js', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
```





# **gulp插件**



### gulp-uglify （JS压缩）

------

gulp-uglify安装:

```
npm install --save-dev gulp-uglify
```

gulp-uglify用来压缩js文件，使用的是uglify引擎。

```
var gulp = require('gulp');  //加载gulp
var uglify = require('gulp-uglify');  //加载js压缩

// 定义一个任务 compass
gulp.task('compass', function () {
    gulp.src(['js/*.js','!js/*.min.js'])  //获取文件，同时过滤掉.min.js文件
        .pipe(uglify())
        .pipe(gulp.dest('javascript/'));  //输出文件
});
```

小技巧，第二个参数`'！js/*.min.js'`是用来过滤掉后缀为min.js，！感叹号为排除模式。

### gulp-minify-css（CSS压缩）

------

gulp-minify-css安装：

```
npm install --save-dev gulp-minify-css
```

可以使用它来压缩CSS文件

```
var gulp = require('gulp');
var minify = require('gulp-minify-css');

gulp.task('cssmini', function () {
    gulp.src(['css/*.css', '!css/*.min.css'])  //要压缩的css
        .pipe(minify())
        .pipe(gulp.dest('buildcss/'));
});
```

### gulp-minify-html（html压缩）

------

gulp-minify-html安装：

```
npm install --save-dev gulp-minify-html
```

可以使用它来压缩html文件.

```
var gulp = require('gulp');
var htmlmini = require('gulp-minify-html');

gulp.task('htmlmini', function () {
    gulp.src('*.html')
        .pipe(htmlmini())
        .pipe(gulp.dest('minihtml'));
})
```

### gulp-jshint（JS代码检查）

------

gulp-jshint安装：

```
// npm install --save-dev gulp-jshint 已过时
npm install --save-dev jshint gulp-jshint
```

可以用来检查JS的代码

```
var gulp = require('gulp');
var jshint = require("gulp-jshint");

gulp.task('jsLint', function () {
    gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});
```

### gulp-concat（文件合并）

------

gulp-concat安装：

```
npm install --save-dev gulp-concat
```

合并CSS与JS文件，减少http请求。

```
var gulp = require('gulp');
var concat = require("gulp-concat");

gulp.task('concat', function () {
    gulp.src('js/*.js')  //要合并的文件
    .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
    .pipe(gulp.dest('dist/js'));
});
```

### gulp-less（编译Less）

------

gulp-less安装：

```
npm install --save-dev gulp-less
```

把less文件转换为css。

```
var gulp = require('gulp'),
    less = require("gulp-less");

gulp.task('compile-less', function () {
    gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'));
});
```

### gulp-sass（编译Sass）

------

gulp-sass安装：

```
npm install --save-dev gulp-sass
```

把sass文件转换为css文件。

```
var gulp = require('gulp'),
    sass = require("gulp-sass");

gulp.task('compile-sass', function () {
    gulp.src('sass/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});
```

### gulp-imagemin（压缩图片）

------

gulp-imagemin安装：

```
npm install --save-dev gulp-imagemin
```

可以使用gulp-imagemin的插件来压缩jpg、png、gif等图片。（imagemin也是有插件的，是基于imagemin产生的插件，所以前缀是imagenin开头）

压缩png插件-[imagemin-pngquant](https://www.npmjs.com/package/imagemin-pngquant)安装：

```
$npminstall--save-devimagemin-pngquant
```

gulpfile.js:

```
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件

gulp.task('default', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist'));
});
```

gulp-imagemin的使用比较复杂一点，它本身也有很多插件[（更多imagemin插件）](https://www.npmjs.com/browse/keyword/imageminplugin)，这里只是简单介绍一下，要想压缩不同格式的图片，必须对应安装不同的插件，这里只安装了pngquant插件。按照nodejs的模块化思想，每个require只包含一个功能，这样就可以达到按需加载的目的。

### gulp-livereload（自动刷新）

------

gulp-livereload安装：

```
npm install --save-dev gulp-livereload
```

当代码变化时，它可以帮助我们自动刷新页面，该插件最好配合谷歌浏览器，且要安装[livereload chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)扩展插件，否则无效。

```
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen(); //要在这里调用listen()方法
  gulp.watch('less/*.less', ['less']);  //监听目录下的文件，若文件发生变化，则调用less任务。
});
```

作者：Rin阳

链接：http://www.jianshu.com/p/98db023b5b89

來源：简书

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。