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