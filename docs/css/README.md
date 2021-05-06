## Flex 布局教程

[点击跳转](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)


## Grid 网格布局教程
[点击跳转](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)


## 只要一行代码，实现五种 CSS 经典布局
[点击跳转](http://www.ruanyifeng.com/blog/2020/08/five-css-layouts-in-one-line.html)
```sh

空间居中布局
不管容器的大小，项目总是占据中心点

并列式布局
多个项目并列，如果宽度不够，放不下的项目就自动折行

两栏式布局
一个边栏，一个主栏。边栏始终存在，主栏根据设备宽度，变宽或者变窄

三明治布局
页面在垂直方向上，分成三部分：页眉、内容区、页脚。

圣杯布局
最常用的布局，所以被比喻为圣杯。它将页面分成五个部分，除了页眉和页脚，内容区分成左边栏、主栏、右边栏。
```

## CSS中 link 和@import 的区别是？
```sh
(1) link属于HTML标签，而@import是CSS提供的;

(2) 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
```

## css3新特性
```sh
圆角 border-radius
弹性布局 flex
翻转 transform
动画 animation
阴影 box-shadow
过渡效果 transtion
媒体查询 @media
```

## BFC
[点击跳转](https://www.cnblogs.com/qs-cnblogs/p/12349887.html)
```sh
如何创建BFC（以下任意一条符合就行）
1、float的值不是none。
2、position的值不是static或者relative。
3、display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4、overflow的值不是visible

BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

BFC的特性
1、属于同一个BFC的两个相邻容器的上下margin会重叠（重点）
2、计算BFC高度时浮动元素也参于计算（重点）
3、BFC的区域不会与浮动容器发生重叠（重点）
4、BFC内的容器在垂直方向依次排列
5、元素的margin-left与其包含块的border-left相接触
6、BFC是独立容器，容器内部元素不会影响容器外部元素

注：其中1、2、3需重点理解，其特性和功能下面将用代码逐个演示；
4、5、6为基本现象，按字面意思理解即可，不做重点说明。
BFC功能总结
1、可以利用BFC解决两个相邻元素的上下margin重叠问题；
2、可以利用BFC解决高度塌陷问题；
3、可以利用BFC实现多栏布局
```

## position:absolute和float属性的异同
```sh
A：共同点：
对内联元素设置float和absolute属性，可以让元素脱离文档流，并且可以设置其宽高。

B：不同点：
float仍会占据位置，position会覆盖文档流中的其他元素。
```

## box-sizing属性
```sh
content-box：让元素维持W3C的标准盒模型。元素的宽度/高度由border + padding + content的宽度/高度决定，设置width/height属性指的是content部分的宽/高，一旦修改了元素的边框或内距，就会影响元素的盒子尺寸，就不得不重新计算元素的盒子尺寸，从而影响整个页面的布局。

border-box：让元素维持IE传统盒模型（IE6以下版本和IE6~7的怪异模式）。设置width/height属性指的是border + padding + content
```

## 解释下浮动和它的工作原理？清除浮动的技巧
```sh
浮动元素脱离文档流，不占据空间。浮动元素碰到包含它的边框或者浮动元素的边框停留。
1.使用空标签清除浮动。
这种方法是在所有浮动标签后面添加一个空标签 定义css clear:both. 弊端就是增加了无意义标签。
2.使用overflow。
设置overflow为hidden或者auto，给包含浮动元素的父标签添加css属性 overflow:auto; zoom:1; zoom:1用于兼容IE6。
3.使用after伪对象清除浮动。
该方法只适用于非IE浏览器。该方法中必须为需要清除浮动元素的伪对象中设置 height:0，否则该元素会比实际高出若干像素；
#box:after{
 content:".";
 height:0;
 visibility:hidden;
 display:block;
 clear:both;
}
```

## flex=1
```js
<div class='a'>
    <div class='b'></div>
    <div class='c'></div>
</div>

.a{
    display:flex
}
.b{
    flex:1
}
.c{
    flex:2
}

//这里flex：1说明占宽三分之一 （三是2+1来的）
```

## rem
```sh
1.字体单位
-值根据html根元素大小而定，同样可以作为宽度，高度等单位
2.适配原理
-将px替换成rem，动态修改html的font-size适配
 
 //获取视窗宽度
 let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
 //获取视窗高度
 let htmlDom = document.getElementsByTagName('html')[0]
 window.addEventListener('resize',(e)=>{
     //获取视窗宽度
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
 })
 htmlDom.style.fontSize = htmlWidth / 10 + 'px';
 在sass文件里
 @function px2rem($px){
     $rem:37.5px; 
     @return ($px/$rem)+rem;
 }
```

## CSS实现隐藏页面的方式
```
opacity：设置透明度，值为0-1。为0则页面上不显示，但是元素还在那个位置,依然可以网页交互,单纯是看不到而已。

.class{
    opacity:0;

}

visibility：设置隐藏。hidden为隐藏，在页面不显示，交互效果也会没有。visible为显示，

.class{
    visibility:hidden;//隐藏

    visibility:visible;//显示

}
display:设置不显示和显示。注意了，这里要强调的一点是，如果你想使他的子元素显示，用display:visible是没用的。而上面两种方式是可以使用。

.class {
    display:none;

}

position位置，把他绝对定位了 挪到远远地。

.class{
    position:absolutely;

    left:-999px;

    top:-999px;

}
```
