## 上传文件只上传图片 accept="image/\*"

```js
<input
  type="file"
  multiple
  id="upload"
  style="display:none"
  accept="image/*"
  ref="fileDom"
/>
```

## 获取上传图片信息

```js
//获取dom元素下的files字段
this.$refs.fileDom.files;
```

<img src='/image/imgDom.jpg'/>

## 转换单位

```js
const size = file.size / 1024 / 1024; //把单位转换为M
```
## 跑前台静态代码，需要服务
```js
//安装
sudo npm install http-server -g
//启动服务
http-server -p 8001
//本电脑已经全局安装http-server，以后直接http-server -p 8001 这样就可以本地启动本地服务了
```

## 事件的传播（捕获、目标、冒泡）
```sh
一个事件发生后，会在子元素和父元素之间传播（propagation）。这种传播分成三个阶段。

第一阶段：从window对象传导到目标节点（上层传到底层），称为“捕获阶段”（capture phase）。
第二阶段：在目标节点上触发，称为“目标阶段”（target phase）。
第三阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。
```

## 事件的代理
```js
//由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）
var ul = document.querySelector('ul');

ul.addEventListener('click', function (event) {
  if (event.target.tagName.toLowerCase() === 'li') { // 浏览器假定click嵌套最深的元素是目标元素
    // some code
  }
});
//上面代码中，click事件的监听函数定义在<ul>节点，但是实际上，它处理的是子节点<li>的click事件。这样做的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个<li>节点上定义监听函数。而且以后再添加子节点，监听函数依然有效。

```

## 阻止事件冒泡
```js
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener('click', function (event) {
  event.stopPropagation(); // 该方法在事件对象event上
}, true); // true表示在捕获阶段绑定事件监听函数

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener('click', function (event) {
  event.stopPropagation();
}, false); // false表示在冒泡阶段（默认值）绑定事件监听函数
//上面代码中，stopPropagation方法分别在捕获阶段和冒泡阶段，阻止了事件的传播。
```

## Event.preventDefault() 取消浏览器对当前事件的默认行为
```js
//Event.preventDefault方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的cancelable属性为true，如果为false，调用该方法没有任何效果。
//注意，该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，可以使用stopPropagation()或stopImmediatePropagation()方法。

// HTML 代码为
// <input type="checkbox" id="my-checkbox" />
var cb = document.getElementById('my-checkbox');

cb.addEventListener(
  'click',
  function (e){ e.preventDefault(); },
  false
);

```

##  Event.stopImmediatePropagation() 阻止同一个事件的其他监听函数被调用
```js
//Event.stopImmediatePropagation方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比Event.stopPropagation()更彻底。

//如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了Event.stopImmediatePropagation方法，其他的监听函数就不会再执行了。
function l1(e){
  e.stopImmediatePropagation();
}

function l2(e){ // 不会被调用
  console.log('hello world');
}

el.addEventListener('click', l1, false);
el.addEventListener('click', l2, false);
```

## script 元素
```sh
浏览器加载 JavaScript 脚本，主要通过<script>元素完成。正常的网页加载流程是这样的。

1.浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
2.解析过程中，浏览器发现<script>元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
3.如果<script>元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。
4.JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。

加载外部脚本时，浏览器会暂停页面渲染，等待脚本下载并执行完成后，再继续渲染。原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。

如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。

为了避免这种情况，较好的做法是将<script>标签都放在页面底部，而不是头部。这样即使遇到脚本失去响应，网页主体的渲染也已经完成了，用户至少可以看到内容，而不是面对一张空白的页面。如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间。

脚本文件都放在网页尾部加载，还有一个好处。因为在 DOM 结构生成之前就调用 DOM 节点，JavaScript 会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了。

<head>
  <script>
    console.log(document.body.innerHTML);
  </script>
</head>
<body>
</body>
上面代码执行时会报错，因为此时document.body元素还未生成。


```



## window.open
```sh
window.open方法用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项。它会返回新窗口的引用，如果无法新建窗口，则返回null。
var popup = window.open('somefile.html');
上面代码会让浏览器弹出一个新建窗口，网址是当前域名下的somefile.html。

open方法一共可以接受三个参数。
window.open(url, windowName, [windowFeatures])

url：字符串，表示新窗口的网址。如果省略，默认网址就是about:blank。
windowName：字符串，表示新窗口的名字。如果该名字的窗口已经存在，则占用该窗口，不再新建窗口。如果省略，就默认使用_blank，表示新建一个没有名字的窗口。另外还有几个预设值，_self表示当前窗口，_top表示顶层窗口，_parent表示上一层窗口。
windowFeatures：字符串，内容为逗号分隔的键值对（详见下文），表示新窗口的参数，比如有没有提示栏、工具条等等。如果省略，则默认打开一个完整 UI 的新窗口。如果新建的是一个已经存在的窗口，则该参数不起作用，浏览器沿用以前窗口的参数。


```

## reflow(重排，回流)和repaint(重绘)
```
reflow：浏览器要花时间去渲染，当它发现了某个部分发生了变化并且影响了布局，就需要倒回去重新渲染

repaint：如果只是改变了某个元素的背景颜色或文字颜色等，不影响元素周围或内部布局，就只会引起浏览器的repaint，重画其中一部分。

reflow比repaint更花费时间，也就更影响性能，所以在写代码时应尽量避免过多的reflow。

什么时候会发生reflow？
 (1）页面初始化的时候

（2）操作DOM的时候（增加或删除DOM元素）

（3）某些元素的尺寸改了（边距，填充，边框，宽高）

（4）CSS的属性发生变化（隐藏display：none）

（5）内容改变（文本改变或图片改变而引起的的计算值的宽高改变）

（6）浏览器窗口尺寸改变（当resize事件发生时）

如何减少reflow/repaint?
（1）不要逐个修改DOM样式，可以预先定义好css的class，然后修改DOM的className，将多个需要进行相同操作的元素一次修改

（2）不要把DOM结点的属性值放在一个循环里当成循环的变量

（3）当动画元素使用fixed或absolute的position时（脱离了文档流），那么在修改他们的CSS时不会发生reflow

（4）不要使用table布局，因为可能很小的一个改动都会造成整个table的重新布局

（5）在内存中多次操作结点，完成后再添加到文档中去

（6）如果要对一个元素进行复杂的操作，可以先隐藏它（display：none），操作完成后再显示

（7）对于需要经常取出的引起浏览器重排的属性值，要缓存到变量中

```

## http 和 https
```sh
HTTP（Hyper Text Transfer Protocol，超文本传输协议）被用于在web浏览器和网站服务器之间传递信息，HTTP协议以明文的方式发送内容，不提供任何方式的数据加密，如果攻击者截取了web浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息，因此，HTTP协议不适合传输一些敏感信息，比如：信用卡号，密码等支付信息。

HTTPS（Hyper Text Transfer Protocol over Secure Socket Layer，安全套接字超文本传输协议），为了数据传输的安全，HTTPS在HTTP的基础上加入了SSL/TLS，依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。其中SSL（Secure Socket Layer，安全套接层），TLS（Transport Layer Securit，传输层安全协议），SSL 3.0和TLS 1.0差别很小，在HTTPS通信中具体使用哪一个还要看客户端和服务端的支持程度，二者在网络模型中位于哪一层？

区别：

（1）HTTPS协议需要CA申请证书，一般免费证书比较少，所以需要一定费用

（2）HTTP是超文本传输协议，信息室明文传输，HTTPS则是具有安全性的SSL加密传输协议

（3）HTTP和HTTPS使用的是完全不同的连接方式，使用的端口号也不一样，前者是80，后者是443

（4）HTTP连接很简单，是无状态的；HTTPS协议是由HTTP+SSL协议构建的可进行加密传输、身份认证的网络协议，比较安全。

（5）谷歌搜索引擎算法中，比起同等HTTP网站，采用HTTPS加密的网站在搜索结果中排名会更高
```

## 浏览器同源策略
```sh
（1）浏览器安全的基石是“同源策略”（same-origin policy）。所谓“同源”指的是“三个相同”：

    协议相同
    域名相同
    端口相同
 (2)如果非同源，共有三种行为受到限制：
    Cookie、LocalStorage和IndexDB无法读取
    DOM无法获得
    AJAX请求不能发送
```

## iframe的优缺点
```sh
优点：
1. 解决加载缓慢的第三方内容如图标和广告等的加载问题
2. Security sandbox
3. 并行加载脚本

缺点：
1. iframe会阻塞主页面的Onload事件
2. 即时内容为空，加载也需要时间
3. 没有语意
```

## js延迟加载的方式有哪些
```sh
1. defer和async
2. 动态创建DOM方式（创建script，插入到DOM中，加载完毕后callBack）
3. 按需异步载入js
```

## Doctype作用? 严格模式与混杂模式如何区分？它
```sh
1、<!DOCTYPE> 告知浏览器的解析器用什么文档标准解析这个文档。
2、严格模式的排版和 JS 运作模式是以该浏览器支持的最高标准运行。
3、在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。
4、<!DOCTYPE> 不存在或格式不正确会导致文档以混杂模式呈现。
```

## 你知道多少种Doctype文档类型？
```sh
该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。
HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。
XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。
Standards （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，而 Quirks（包容）模式（也就是松散呈现模式或者兼容模式）用于呈现为传统浏览器而设计的网页。
```

## html5有哪些新特性
```sh
语义化更好的内容标签（header,nav,footer,aside,article,section）
音频、视频API(audio,video)
画布(Canvas) API
地理(Geolocation) API
拖拽释放(Drag and drop) API
本地离线存储
表单控件，calendar、date、time、email、url、search
```

## TCP传输的三次握手
```sh
第一次握手，客户端给服务器发送数据包（带SYN标志的数据包）。此时服务器确认自己可以接收客户端的包，而客户端不确认服务器是否接收到了自己发的数据包。

第二次握手，服务器端回复（回传一个带有SYN/ACK标志的数据包以示传达确认信息）客户端。此时客户端确认自己发的包被服务器收到，也确认自己可以正常接收服务器包，客户端对此次通信没有疑问了。服务器也可以确认自己能接收到客户端的包，但不能确认客户端能否接收自己发的包。

第三次握手，客户端回复（发送端再回传一个带ACK标志的数据包，代表“握手”结束）服务器。 客户端已经没有疑问了，服务器也确认刚刚客户端收到了自己的数据包。两边都没有问题，开始通信。

为什么要三次握手：
为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。也防止了服务器端的一直等待而浪费资源
TCP作为一种可靠传输控制协议，其核心思想：既要保证数据可靠传输，又要提高传输的效率，而用三次恰恰可以满足以上两方面的需求！
```

## 四次挥手
```sh
1、主机向服务器发送一个断开连接的请求（ 不早了，我该走了 ）,发送一个FIN报文段；
2、服务器接到请求后发送确认收到请求的信号（ 知道了 ）回一个ACK报文段；
3、服务器向主机发送断开通知（ 我也该走了 ）发送FIN报文段，请求关闭连接；
4、主机接到断开通知后断开连接并反馈一个确认信号（ 嗯，好的 ），服务器收到确认信号后也断开连接；
```

## TCP和UDP的区别
```sh
TCP（Transmission Control Protocol，传输控制协议）是基于连接的协议，也就是说，在正式收发数据前，必须和对方建立可靠的连接。一个TCP连接必须要经过三次“对话”才能建立起来

UDP（User Data Protocol，用户数据报协议）是与TCP相对应的协议。它是面向非连接的协议，它不与对方建立连接，而是直接就把数据包发送过去！
UDP适用于一次只传送少量数据、对可靠性要求不高的应用环境
```

## HTTP和HTTPS
```sh
1、HTTP协议通常承载于TCP协议之上，在HTTP和TCP之间添加一个安全协议层（SSL或TSL），这个时候，就成了我们常说的HTTPS
2、默认HTTP的端口号为80，HTTPS的端口号为443

HTTPS 相对于 HTTP 性能上差点，因为多了 SSL/TLS 的几次握手和加密解密的运算处理，但是加密解密的运算处理已经可以通过特有的硬件来加速处理。
```

## 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？
```sh
1、浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求（TCP三次握手）；
2、服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
3、浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
4、载入解析到的资源文件，渲染页面，完成。
```

## 安全
```sh
1.sql注入：窃取数据库内容
  攻击方式：输入一个sql片段，最终拼接成一段攻击代码
  比如本来的sql语句是 select * from users where username='zhangsan' and password='123'
  重要的来了 如果'zhangsan'变成'zhangsan'--'
  整条语句就变成select * from users where username='zhangsan'--' and password='123'
  那后面的and password='123'就直接注释掉了，这样就相当来说，密码就无效了
  还可以更残忍的
  select * from users where username='zhangsan';delete from users;--' and password='123'
  这样直接把表都给删了

  预防措施：使用mysql的escape函数处理输入内容即可
  const mysql = require('mysql')
  mysql.escape(username)

2.XSS攻击：窃取前端的cookie内容
  攻击方式：在页面展示的内容中参杂js代码，以获取网页信息
  预防措施：转换生产js的特殊字符
  给关键cookies使用http-only
  npm install xss --save
  const xss = require('xss')
  xss('里面就是页面传进来的信息（变量）')

3.CSRF
  攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
  攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
  整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
  跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。
  CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。

  防护策略
  上文中讲了CSRF的两个特点：
    CSRF（通常）发生在第三方域名。
    CSRF攻击者不能获取到Cookie等信息，只是使用。
  针对这两点，我们可以专门制定防护策略，如下：

    阻止不明外域的访问
      同源检测
      Samesite Cookie
    提交时要求附加本域才能获取的信息
      CSRF Token
      双重Cookie验证
  （https://www.jianshu.com/p/8d7051ffec72?tt_from=weixin）
```

## 使用data-的好处
```js

<ul>
  <li onclick="showDetails(this)" id="owl" data-animal-type="鸟类">喜鹊</li>
  <li onclick="showDetails(this)" id="salmon" data-animal-type="鱼类">金枪鱼</li>
  <li onclick="showDetails(this)" id="tarantula" data-animal-type="蜘蛛">蝇虎</li>
</ul>
function showDetails(animal) {
  var animalType = animal.getAttribute("data-animal-type");
  alert(animal.innerHTML + "是一种" + animalType + "。");
}
//data-* 属性用于存储页面或应用程序的私有自定义数据。
//
//data-* 属性赋予我们在所有 HTML 元素上嵌入自定义 data 属性的能力。
//
//存储的（自定义）数据能够被页面的 JavaScript 中利用，以创建更好的用户体验（不进行 Ajax 调用或服务器端数据库查询）。
//
//data-* 属性包括两部分：
//好处
//1.自定义属性，可以被js很好的操作
//
//2.H5的新属性
//
//3.通过js的element.dataset.*或jQuery的data('*')拿到，*可以为url等字符
//
//4.框架的数据绑定，例如data-ng-if="cs==1"
```

## meta标签
[点击跳转](https://www.runoob.com/tags/tag-meta.html)

## 渐进式渲染简述
```sh
什么是渐进式渲染？

渐进式渲染是用来提高网页性能，以尽快呈现页面的技术。

例如：

图片懒加载——页面上的图片不会一次性的全部加载，当用户滚动页面到图片位置时，JS将加载并显示图像。
确定显示内容的优先级——为了尽快将页面呈现给用户，页面只将一小部分CSS，脚本，内容加载，然后在延时加载或者监听事件来加载。
异步加载HTML片段——当页面通过后台渲染时，把HTML拆分，通过异步请求，分块发送给浏览器。
```

## 移动端
```sh
px:逻辑像素，浏览器使用的抽象单位
dp,pt：物理像素
dpr:设备像素缩放比

计算公式：1px = (dpr)²*dp
最佳viewport设置
<meta name='viewport' content='width=device-width, initial-scale=1.0,user-scalabel=no'>
```
## attribute和property的区别
```
一：Attribute和Property的区别

1.含义区别

首先在定义上更准确的来说，Attribute和Property分别为特性和属性，作为区别。
其次，这样理解下来，我们知道Attribute就是DOM节点自带属性，例如我们在HTML中常用的id,class,src,title,alt等。而Property则是这个DOM元素作为对象，其附加的属性或者内容，例如childNodes，firstChild等。

另外我们常把他们弄混淆是因为，有些例如id,class,title常用的Attribute已经被作为Property附加在DOM对象上，也可以取值和赋值。但是自定义的Attribute就不能了，例如：

//这里的title1是自定义属性不能作为property
<div id="div1" class="divClass" title="divTitle" title1="divTitle1">自定义attribute</div>

2.取值和赋值区别

Attribute取值和赋值

//attribute取值
  getAttribute()
  eg:var id = div1.getAttribute("id")
     var id = div1.getAttribute("title1")
//attribute赋值
  getAttribute(attribute,value)  //value只能是字符串形式
  eg:div1.setAttribute('class', 'a');
     div1.setAttribute('title1', 'asd');  //自定义属性也可

Property取值和赋值

//通过'.'号获取property
  var id = div1.id;
  var className = div1.className; //相当于div1.getAttribute('class')
//通过'='赋予property
  div1.className = 'a';
  div1.align = 'center';
```

## document load和document DOMContentLoaded两个事件的区别
```
区别
DOMContentLoaded: DOM解析完成即触发此事件，不等待styles, images等资源的加载
load：依赖的资源也已加载完成
DOMContentLoaded绑定到document，load绑定到window
document.addEventListener('DOMContentLoaded', function(event) {
  console.log("DOM fully loaded and parsed");  // 先打印
});
window.addEventListener('load', function(event) {
  console.log("img loaded");  // 后打印
}); 
何时触发这两个事件？
1.当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。

2.当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。


```

## dom绑定事件的两种方式
```
<div id='dom'>这是一个dom</div>
第一种
<div id='dom' onClick='func()'>这是一个dom</div>
第二种
document.getElementById('dom').onClick=function(){

}
第三种
document.getElementById('dom').addEventListener('click',()=>{

})
```

## websocket
```js
//app.js 服务端
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
// 用户信息
const userList = []


// express处理静态资源: 把puclic 目录设置为静态资源目录
app.use(require('express').static('public'))

app.get('/', (req, res) => {
  // 重定向到 public下的 index.html
  res.redirect('/index.html')
});

// 监听用户连接
io.on('connection', socket => {
  console.log('新用户连接了');

  // 登录
  socket.on('login', data => {
    // 判断用户名是否存在   some()方法用于检测数组中是否有满足条件的元素 返回布尔值
    let loginState = userList.some(item => item.userName === data.userName)

    // 登录成功
    if (!loginState) {
      data.id = Math.ceil(Math.random() * 10000)
      userList.push(data)
      socket.userName = data.userName
      socket.avatar = data.avatarSrc

      // 返回给客户端：登录成功
      socket.emit('loginState', { loginState: !loginState, msg: `登录成功！`, data: data })
      // 广播：给所有已经连接的用户广播(不包括自己)
      socket.broadcast.emit('UserIn', data);

      // 广播(包括自己)：更新数据列表
      updateUserList()

      // 监听是否接收到消息，并准备广播
      socket.on('userMessage', data => {
        let newMessage = userList.filter(item => item.id === data.id)
        if (newMessage) {
          newMessage[0].message = data.message
          newMessage[0].type = data.type
          newMessage[0].file = data.file
          // 广播接收到的消息(包括自己)
          io.emit('NewMessage', newMessage[0])
        }
      })

      // 监听是否接收到文件，并准备广播
      socket.on('sendFile',data =>{
        io.emit('NewMessage', data)
      })

    } else {
      // 登录失败  用户名重复
      socket.emit('loginState', { loginState: !loginState, msg: `登录失败,用户名已在线！` })
      return
    }
  })

  // 用户断开连接
  socket.on('disconnect', (reason) => {
    // 1.把当前用户从 userList 删除
    let result = userList.findIndex(item => item.userName === socket.userName)
    if (result !== -1) {
      // 删除断开连接的用户信息
      userList.splice(result, 1)
    }
    // 2.广播 有人离开了聊天室
    socket.broadcast.emit('UserOut', socket.userName);

    // 3.广播：更新后的数据列表
    updateUserList()
  });
});

server.listen(8080, () => {
  console.log('服务器启动成功: http://127.0.0.1:8080');
});

// 广播:更新后的用户列表(包括自己)
function updateUserList() {
  io.emit('updateUserList', userList)
}


//index.js
// 1.连接socketio服务
//就是熟悉的emit和on
const socket = io();
  socket.emit('login', {
    userName: userName, avatarSrc: avatarSrc
  })

  socket.on('11',data=>{

  })

```

## http缓存

[点击跳转](https://www.jianshu.com/p/227cee9c8d15)