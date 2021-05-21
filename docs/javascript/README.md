<!-- ## call，apply，bind 的用法以及区别

::: tip
这里面讲得很详细
<br>
https://www.cnblogs.com/kerwin1727/p/11433762.html
箭头函数和 this
<br>
https://www.cnblogs.com/lfri/p/11872696.html

https://www.cnblogs.com/youhong/p/6209054.html
::: -->
## call
```js
//有句话非常重要谁调用这个函数，this就指向谁
var a = 1
var obj1 = {
  a:2,
  fn:function(){
    console.log(this.a)
  }
}
obj1.fn()//2
//此时的this是指obj1这个对象，obj1.fn()实际上是obj1.fn.call(obj1)，事实上谁调用这个函数，this就是谁。补充一下，DOM对象绑定事件也属于方法调用模式，因此它绑定的this就是事件源DOM对象。如：
document.addEventListener('click', function(e){
    console.log(this);
    setTimeout(function(){
        console.log(this);
    }, 200);
}, false);
//点击页面，依次输出：document和window对象
//解析：点击页面监听click事件属于方法调用，this指向事件源DOM对象，即obj.fn.apply(obj)，//setTimeout内的函数属于回调函数，可以这么理解，f1.call(null,f2)，所以this指向window。
function fn1(){
  console.log(this)//window
}
fn1()

function fn1(){
    function fn2(){
        console.log(this)//window
    }
    fn2()
}
fn1()

var a = 1
var obj1 = {
    a:2,
    fn:function(){
        console.log(this.a)
    }
}
var fn1 = obj1.fn
fn1()//1
//但是直接obj1.fn()输出就是2了

//new一个函数时，背地里会创建一个连接到prototype成员的新对象，同时this会被绑定到那个新对象上
function Person(name,age){
// 这里的this都指向实例
    this.name = name
    this.age = age
    this.sayAge = function(){
        console.log(this.age)
    }
}
var dot = new Person('Dot',2)
dot.sayAge()//2
//call 方法第一个参数是要绑定给this的值，后面传入的是一个参数列表。当第一个参数为null、undefined的时候，默认指向window。
var arr = [1, 2, 3, 89, 46]
var max = Math.max.call(null, arr[0], arr[1], arr[2], arr[3], arr[4])//89
//可以这么理解：
obj1.fn() 
obj1.fn.call(obj1);

fn1()
fn1.call(null)

f1(f2)
f1.call(null,f2)
//看一个例子
var obj = {
    message: 'My name is: '
}

function getName(firstName, lastName) {
    console.log(this.message + firstName + ' ' + lastName)
}

getName.call(obj, 'Dot', 'Dolby')//My name is: Dot Dolby
```

## apply
```js
//apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个参数数组。当第一个参数为null、undefined的时候，默认指向window。
//可以这么理解：
obj1.fn() 
obj1.fn.apply(obj1);

fn1()
fn1.apply(null)

f1(f2)
f1.apply(null,f2)
//事实上apply 和 call 的用法几乎相同, 唯一的差别在于：当函数需要传递多个变量时, apply 可以接受一个数组作为参数输入, call 则是接受一系列的单独变量。
var obj = {
    message: 'My name is: '
}

function getName(firstName, lastName) {
    console.log(this.message + firstName + ' ' + lastName)
}

getName.apply(obj, ['Dot', 'Dolby'])// My name is: Dot Dolby

//call和apply可用来借用别的对象的方法，这里以call()为例：
var Person1  = function () {
    this.name = 'Dot';
}
var Person2 = function () {
    this.getname = function () {
        console.log(this.name);
    }
    Person1.call(this);
}
var person = new Person2();
person.getname();       // Dot

```

## bind
```js
//和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表。区别在于bind方法返回值是函数以及bind接收的参数列表的使用。
//bind返回值是函数
var obj = {
    name: 'Dot'
}

function printName() {
    console.log(this.name)
}

var dot = printName.bind(obj)
console.log(dot) // function () { … }
dot()  // Dot
//bind 方法不会立即执行，而是返回一个改变了上下文 this 后的函数。而原函数 printName 中的 this 并没有被改变，依旧指向全局对象 window。

```

## call,apply,bind小总结
```sh
call、apply和bind函数存在的区别:
bind返回对应函数, 便于稍后调用； apply, call则是立即调用。

除此外, 在 ES6 的箭头函数下, call 和 apply 将失效
```

## 详解Array.prototyoe.slice(argument)
```js
//这个是把类数组转为数组
//slice内部的实现原理大概是这样的
Array.prototype.slice = function(start,end){
     var result = new Array();
     start = start || 0;        // 如果不传则取默认值
     end = end || this.length;  // 如果不传则取默认值

     //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键
     for(var i = start; i < end; i++){
          result.push(this[i]);
     }
     return result;
}

```
## 闭包

::: tip
一、闭包是什么?
   闭包(closure)就是能够读取其他函数内部变量的函数。在 javascript 中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成 “定义在一个函数内部的函”。在本质上，闭包是将函数内部和函数外部连接起来的桥梁。(闭包的最典型的应用是实现回调函数（callback) )。

二、JS 中闭包的优缺点及特性

→ 优点：

1.保护函数内的变量安全

2.在内存中维持一个变量(用的太多就变成了缺点，占内存) ；

3. 逻辑连续，当闭包作为另一个函数调用的参数时，避免你脱离当前逻辑而单独编写额外逻辑。

4. 方便调用上下文的局部变量。

5. 加强封装性，可以达到对变量的保护作用。

→ 缺点：

1.常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

2.还有有一个非常严重的问题，那就是内存浪费问题，这个内存浪费不仅仅因为它常驻内存，更重要的是，对闭包的使用不当会造成无效内存的产生

→ 特性：

1. 函数嵌套函数

2. 内部函数可以访问外部函数的变量

3. 参数和变量不会被回收。

:::

## Babel 可以把 es6 及之后的语法转化为 es5，从而所有浏览器能够适配（webpack）

## Object.freeze 冻结对象（不能添加属性和改变值）

::: tip
`

```js
const obj = {
  name: "weiyuan",
  age: 25,
  kill: {
    age: 11,
  },
};
Object.freeze(obj);
// Object.freeze(obj.kill)
console.log(obj);
obj.school = "baiyuan";
obj.name = "wuweiyuan";
obj.kill.age = "12";
console.log(obj);
//注意这里obj.kill.age是12，所以这里是浅冻结，要冻结kill，要再使用Object.freeze(obj.kill);
```

:::

## 对象解构赋值用其他名字

```js
let obj = { name: "weiyuan", age: 10 };
let { name: a, age: b } = obj;
console.log(a, b);
```

## for 和 forEach 循环区别，在 for 循环中 break 和 continue 可用，而 forEach 不可用

## map 循环返回新数组不会改变原数组

```js
let arr = [1, 2, 3];
let result = arr.map((item) => {
  return item + 1;
});
console.log(arr, result);
```

## some 返回的是一个波尔值有一个符合为 true

```js
let arr = [1, 2, 3];
let result = arr.some((item) => {
  return item == 2;
});
console.log(arr, result);
```

## every 返回的是一个波尔之，每一个符合为 true

## find 返回的是第一个通过测试的元素(findIndex 也是第一个通过测试)

```js
let arr = [1, 2, 3, 4, 2];
let result = arr.find((item) => {
  return item == 2;
});
//这个是第一个2
```

## 伪数组（dom 元素,arguments）转化为真数组

```js
let div s= document.querySelectorAll('.xx')
let  arr = Array.prototype.slice.call(divs)//es5
let arr = Array.from(divs)//es6

```

## 箭头函数不可以当作构造函数和不可以使用 arguments

## es6 类的继承

```js
    class Person{
        this.sex
        get sex(){
            return this._sex
        }
        set sex(val){
            this._sex = val
        }
        constructor(name,age){
            this.name = name
            this.age = age
            this._sex = ''
        }
    }

    class Weiyuan extends Person{
        constructor(name,age,company){
            //关键字
            super(name,age)
            this.company = company
        }
    }
```

## symbol

```js
let s1 = Symbol("fpp");
```

## set 里面的值都是唯一的

```js
let arr = new Set([1, 2, 3, 2]);
//加数据，可以链式操作
arr.add(5).add(7);
//删除数据
arr.delete(1);
//清空
arr.clear();
//是否有某一个值
arr.has(2);
//有几个值
arr.size;
//可以遍历

//数组合并去重
let arr1 = [1, 3, 4, 5, 7];
let arr2 = [2, 3, 5, 89];
let s = new Set([...arr1, ...arr2]);
//变成数组
let array = [...s];
let array = Array.from(s);
//交集
let s1 = new Set(arr1);
let s2 = new Set(arr2);
let s = new Set(arr1.filter((item) => s2.has(item)));
```

## map 数据类型

```js
let m = new Map();
let obj = {
  name: "weiyuan",
};
m.set(obj, "es");
//console.log(m.get(obj))
//m.delete(obj)
console.log(m);
m.has(obj);
m.size;
//遍历
//forEach前面是value后面是key
m.forEach((value, key) => {
  console.log(value, key);
});
//for of遍历 前面是key后面是value
for (let [key, value] of m) {
}
//map性能比对象要好
```

## 进制运算

```js
//十进制-》二进制
const a = 5; //101
console.log(a.toString(2));
//二进制转化为十进制
const b = 101;
console.log(parseInt(b, 2));
//0B二进制 0O八进制
const a = 0b0101;
console.log(a);
const b = 0o777;
console.log(b);
//判断是不是整数
Number.isInteger(5.5);
```

## Proxy

```js
let arr = [7, 8, 9];
arr = new Proxy(arr, {
  get(target, prop) {
    console.log(target, prop);//target数组本身  prop传进来的值
    return prop in target ? target[prop] : "error";
  },
});
console.log(arr[1]);
console.log(arr[10]);

//has
let range = {
  start: 5,
  end: 10,
};
rang = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  },
});
console.log(2 in range);

//
let userInfo = {
  name: "weiyuan",
  age: 28,
  _password: "*****",
};
userInfo = new Proxy(userInfo, {
  //ownkeys是管理遍历的，这个例子就是不让_password给遍历出来
  ownKeys(target) {
    return Object.keys(target).filter((item) => {
      return !item.startsWith("_");
    });
  },
  //拦截删除
  deleteProperty(target, prop) { // 拦截删除
        if (prop.startsWith('_')) {
            throw new Error('不可删除')
        } else {
            delete target[prop]
            return true
        }
    },
});
for (let key in userInfo) {
  console.log(key);
}
console.log(Object.keys(userInfo));

let sum = (...argus) => {
  let num = 0;
  argus.forEach((item) => {
    num += item;
  });
  return num;
};
sum = new Proxy(sum, {
  apply(target, ctx, args) {
    console.log(target);
    return target(...args) * 2;
  },
});
console.log(sum(1, 2));
```

## ajax 原理

```js
var url = "";
function ajax(url, callback) {
  var xmlhttp;
  //1，创建XMLHttpRequest对象
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    //兼容早期浏览器
    smlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  //2.发送请求
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  //3.服务端响应
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var obj = JSON.parse(xmlhttp.responseText);
      console.log(obj);
      callback(obj);
    }
  };
}

ajax(url, (res) => {
  console.log(res);
});
```

## promise

```js
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("dingshiqi");
    // resolve()
    reject();
    //如果要在下面的then显示的话，需要把数据写进括号里面。例如resolve({name:weiyuan})
  });
}).then(
  (res) => {
    console.log("成功", res);
  },
  () => {
    console.log("失败");
  }
);
```

## promise.race([func1,func2]) 那个先抛出 resolve 或者 reject，就先显示哪一个

## Generator

```js
function* foo() {
  for (let i = 0; i < 3; i++) {
    yield i;
  }
}
let f = foo();
console.log(f.next());
console.log(f.next());
console.log(f.next());
console.log(f.next());

//yield后面是返回值
//f.next(12)里面的12表达的是上一个yield的返回值，看下面的例子就明白了
function* wwy(x){
  let y = 2 * (yield(x+1))
  let z = yield(y/3)
  return x + y + z 
}
let g = wwt(5)
//这样执行
g.next() //6
g.next() //NaN
g.next() //NaN
//如果这样执行
g.next() //6
g.next(12)  //y=24 8
g.next(13) // z = 13 y =24 x=5  42 
```

## Module

:::tip
一个 js 只能有一个 export default <br>
export 可以有多个

import 如果是 export 的，变量名一定要一样,而且要写括号，export default 的名字可以不一样 <br>
改名 可以用 as 例如 import a as b from './a.js'
:::

## includes

```js
var arr = ["es5", "es6", "es7"];
//可以接收两个参数，第一个参数是要查找的内容，第二个参数是从哪个索引开始查找
arr.includes("es6", 2); //false
arr.includes("es6", 1); //true
// 只能判断基本类型，不能判断引用类型
const a = ["es5", ["es6", "es7"], "es8"];
a.includes(["es6", "es7"]); //false
a.indexOf(["es6", "es7"]); //-1
```

## 幂运算符

```js
//幂运算符:** (es7)等同于 Math.pow()
//2的10次方
Math.pow(2, 10);
2 ** 10;
```

:::

## await 要写在 async 函数里面

## 静态方法和实例方法

```js
Object.values(); //静态
let arr = [1, 3];
arr.includes(1); //实例方法
```

## 各属性说明

<img src='/image/object.png' />
<img src='/image/object1.png' />

```js
let obj = { name: "wwy" };
Object.getOwnPropertyDescriptors(obj);
//value 默认值
//writable 是否课修改
//enumerable 是否可遍历
//configurable  能否用delete删除
```

## Date 中的时间格式 format

```js
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(H)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d H:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
//调用方法
var time1 = new Date().Format("yyyy-MM-dd HH:mm:ss");

var time2 = new Date().Format("yyyy-MM-dd");
```

## String.prototype.padStart() String.prototype.padEnd() 填充字符串

```js
//月份需不需要加0平时要用到
let str = "qwe";
//8是总的多少位，‘1’是可选的，默认是‘’，
str.padStart(6, "1");
//111qwe
```

## 拷贝数据

```js
const obj1 = {
  name: "weiyuan",
  age: 11,
};
const obj2 = { ...obj1 };
```

## 对象剩余属性 rest

```js
const obj = {
  name: "weiyuan",
  age: "2",
  school: "baiyun",
};
//...rest必须放在最后一个
const { name, ...rest } = obj;
```

## Promise.prototype.finally()

## Object.fromEntries()

```js
const obj = {
  name: "weiyuan",
  age: 12,
};
const entries = Object.entries(obj);
console.log(entries);
//es10
const fromEntries = Object.fromEntries(entries);
console.log("值跟obj一样", fromEntries);

//map对象转化为对象也可以用formEntries
const map = new Map();
map.set("name", "weiyuan");
map.set("age", 12);
console.log(map);
const fromEntries = Object.fromEntries(map);
console.log(fromEntries);
```

## String.prototype.trimStart() ，String.prototype.trimEnd()

```js
var str = "    wwy   ";
//去除前面的空格
console.log(str.trimStart());
//去除后面的空格
console.log(str.trimEnd());
//去掉前后的空格
console.log(str.trim());
```

## Array.prototype.flat()，Array.prototype.flatMap()

```js
//数组开平
var arr = [1, 2, [3, 4, 5, [6, 7]]];
//flat（）扁平一次，可以链式操作
console.log(arr.flat().flat());
//可传参数相当于扁平两次
console.log(arr.flat(2));
console.log(arr.flat(Infinity));

var arr = [1, 2, 3, 4];
var res = arr.map((x) => [x + 1]).flat();
//等于下面的
var res = arr.flapMap((x) => [x + 1]);
```

## Symbol.prototype.description

```js
var s = Symbol("wuweiyuan");
console.log(s);
console.log(s.description); //只读属性
```

## Promise.allSettled()跟 Promise.all 的区别

```js
//区别在于all其中一个是reject就进入catch，而allSettlted都进入then
```

<img src="/image/promise(allSettled).jpg" />

## 空值合并运算符：Nullish coalescing Operator

```js
var a = 0;
var b = a || 5;
//b = 5

var a = 0;
var b = a ?? 5;
//b = 0 只有undefined和null才取5
```

## js使用require 和 import 引入依赖的区别
```js
//1.require是Commonjs的规范，node应用是由模块组成的，遵从commonjs的规范。用法：
//a.js
function test (args) {
  // body...
  console.log(args);	
}
 
module.exports = {
  test
}
//b.js
let { test } = require('./a.js');
 
test('this is a test.');

//2.import是es6为js模块化提出的新的语法，import （导入）要与export（导出）结合使用。用法：
//a.js
export function test (args) {
  // body...
  console.log(args);	
}
 
// 默认导出模块，一个文件中只能定义一个
export default function() {...};
 
export const name = "lyn";
————————————————
//b.js
// _代表引入的export default的内容
import _, { test, name } from './a.js';
 
test(`my name is ${name}`);
```

## xss攻击
```js
//xss攻击就是在页面展示内容中参杂js代码，以获取网页信息
//预防措施 转换生成js的特殊字符
//安装
npm install xss --save
const xss = require('xss')
xss('里面就是页面传进来的信息（变量）')
```


## instanceof 和typeof 的区别
```sh
* typeof:
    * 可以区别: 数值, 字符串, 布尔值, undefined, function
    * 不能区别: null与对象, 一般对象与数组
  * instanceof (obj instanceof Object )
    * 专门用来判断对象数据的类型: Object, Array与Function
  * ===
    * 可以判断: undefined和null
```

## 关于引用变量问题（很重要）
```js

//关于引用变量赋值问题
  //* 2个引用变量指向同一个对象, 通过一个引用变量修改对象内部数据, 另一个引用变量也看得见
  //* 2个引用变量指向同一个对象,让一个引用变量指向另一个对象, 另一个引用变量还是指向原来的对象



  //1. 2个引用变量指向同一个对象, 通过一个引用变量修改对象内部数据, 另一个引用变量也看得见
  var obj1 = {}
  var obj2 = obj1
  obj2.name = 'Tom'
  console.log(obj1.name)
  function f1(obj) {
    obj.age = 12
  }
  f1(obj2)
  console.log(obj1.age)

  //2. 2个引用变量指向同一个对象,让一个引用变量指向另一个对象, 另一个引用变量还是指向原来的对象
  var obj3 = {name: 'Tom'}
  var obj4 = obj3
  obj3 = {name: 'JACK'}
  console.log(obj4.name)
  function f2(obj) {
    obj = {name: 'Bob'}
  }
  f2(obj4)
  console.log(obj4.name)


```

## IIFE
```js
//就是匿名函数，马上执行，要用（）包起来
(function (i) {
    var a = 4
    function fn() {
      console.log('fn ', i+a)
    }
    fn()
  })(3)
```

## 原型
```js

//1. 函数的prototype属性(图)
//  * 每个函数都有一个prototype属性, 它默认指向一个Object空对象(即称为: 原型对象)
//  * 原型对象中有一个属性constructor, 它指向函数对象
//2. 给原型对象添加属性(一般都是方法)
//  * 作用: 函数的所有实例对象自动拥有原型中的属性(方法)

  // 每个函数都有一个prototype属性, 它默认指向一个对象(即称为: 原型对象)
  console.log(Date.prototype, typeof Date.prototype)
  function fn() {

  }
  console.log(fn.prototype, typeof fn.prototype)

  // 原型对象中有一个属性constructor, 它指向函数对象
  console.log(Date.prototype.constructor===Date)
  console.log(fn.prototype.constructor===fn)


  // 2. 给原型对象添加属性(一般都是方法)
  function F() {

  }
  F.prototype.age = 12 //添加属性
  F.prototype.setAge = function (age) { // 添加方法
    this.age = age
  }
  // 创建函数的实例对象
  var f = new F()
  console.log(f.age)
  f.setAge(23)
  console.log(f.age)

```

## 显示原型和隐式原型
```js

//1. 每个函数function都有一个prototype，即显式原型
//2. 每个实例对象都有一个__proto__，可称为隐式原型
//3. 对象的隐式原型的值为其对应构造函数的显式原型的值
//4. 总结:
  //* 函数的prototype属性: 在定义函数时自动添加的, 默认值是一个空Object对象
  //* 对象的__proto__属性: 创建对象时自动添加的, 默认值为构造函数的prototype属性值
  //* 程序员能直接操作显式原型, 但不能直接操作隐式原型(ES6之前)
  function Fn() {

  }
  var fn = new Fn()
  console.log(Fn.prototype, fn.__proto__)
  console.log(Fn.prototype===fn.__proto__)

  Fn.prototype.test = function () {
    console.log('test()')
  }
  fn.test()

```

## 原型链
```js
//1. 原型链(图解)
//  * 访问一个对象的属性时，
//    * 先在自身属性中查找，找到返回
//    * 如果没有, 再沿着__proto__这条链向上查找, 找到返回
//    * 如果最终没找到, 返回undefined
//  * 别名: 隐式原型链
//  * 作用: 查找对象的属性(方法)
//2. 构造函数/原型/实体对象的关系(图解)
//3. 构造函数/原型/实体对象的关系2(图解)

/*
1. 函数的显示原型指向的对象默认是空Object实例对象(但Object不满足)
  */

  /*
2. 所有函数都是Function的实例(包含Function)
*/
/*
3. Object的原型对象是原型链尽头
*/
  function Fn() {
    this.test1 = function () {
      console.log('test1()')
    }
  }
  Fn.prototype.test2 = function () {
    console.log('test2()')
  }
  var fn = new Fn()

  fn.test1()
  fn.test2()
  console.log(fn.toString())
  fn.test3()

//1. 读取对象的属性值时: 会自动到原型链中查找
//2. 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值
//3. 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上
 function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.setName = function (name) {
    this.name = name;
  }
  Person.prototype.sex = '男';

  var p1 = new Person('Tom', 12)
  p1.setName('Jack')
  console.log(p1.name, p1.age, p1.sex)
  p1.sex = '女'
  console.log(p1.name, p1.age, p1.sex)

  var p2 = new Person('Bob', 23)
  console.log(p2.name, p2.age, p2.sex)
```

## instanceof 
```js
//1. instanceof是如何判断的?
//  * 表达式: A instanceof B
//  * 如果B函数的显式原型对象在A对象的原型链上, 返回true, 否则返回false
//2. Function是通过new自己产生的实例
function Foo() {  }
  var f1 = new Foo();
  console.log(f1 instanceof Foo);
  console.log(f1 instanceof Object);

  //案例2
  console.log(Object instanceof Function)
  console.log(Object instanceof Object)
  console.log(Function instanceof Object)
  console.log(Function instanceof Function)
  function Foo() {}
  console.log(Object instanceof  Foo);
```

## 原型链面试题
```js
//1
var A = function() {

  }
  A.prototype.n = 1

  var b = new A()

  A.prototype = {
    n: 2,
    m: 3
  }

  var c = new A()
  console.log(b.n, b.m, c.n, c.m)

//2
  var F = function(){};
  Object.prototype.a = function(){
    console.log('a()')
  };
  Function.prototype.b = function(){
    console.log('b()')
  };
  var f = new F();
  f.a()
  f.b()
  F.a()
  F.b()


```
## 变量提升和函数提升
```js

//1. 变量声明提升
  //* 通过var定义(声明)的变量, 在定义语句之前就可以访问到
  //* 值: undefined
//2. 函数声明提升
  //* 通过function声明的函数, 在之前就可以直接调用
  //* 值: 函数定义(对象)
    //变量提升快于函数提升
  /*
   面试题: 输出什么?
   */
  var a = 4
  function fn () {
    console.log(a)
    var a = 5
  }
  fn()//undefine


  /*变量提升*/
  console.log(a1) //可以访问, 但值是undefined
  /*函数提升*/
  a2() // 可以直接调用

  var a1 = 3
  function a2() {
    console.log('a2()')
  }

//重要
fn()//报错 因为这是变量提升，不是函数提成，函数声明的方式不一样
var fn = function(){
  console.log('fn')
}
```

## 执行上下文面试题
```js

//1. 代码分类(位置)
//  * 全局代码
//  * 函数(局部)代码
//2. 全局执行上下文
//  * 在执行全局代码前将window确定为全局执行上下文
//  * 对全局数据进行预处理
//    * var定义的全局变量==>undefined, 添加为window的属性
//    * function声明的全局函数==>赋值(fun), 添加为window的方法
//    * this==>赋值(window)
//  * 开始执行全局代码
//3. 函数执行上下文
//  * 在调用函数, 准备执行函数体之前, 创建对应的函数执行上下文对象(虚拟的, 存在于栈中)
//  * 对局部数据进行预处理
//    * 形参变量==>赋值(实参)==>添加为执行上下文的属性
//    * arguments==>赋值(实参列表), 添加为执行上下文的属性
//    * var定义的局部变量==>undefined, 添加为执行上下文的属性
//    * function声明的函数 ==>赋值(fun), 添加为执行上下文的方法
//    * this==>赋值(调用函数的对象)
//  * 开始执行函数体代码

console.log('global begin: '+ i)
  var i = 1
  foo(1);
  function foo(i) {
    if (i == 4) {
      return;
    }
    console.log('foo() begin:' + i);
    foo(i + 1);
    console.log('foo() end:' + i);
  }
  console.log('global end: ' + i)
```

## 作用域面试题
```js

var x = 10;
  function fn() {
    console.log(x);
  }
  function show(f) {
    var x = 20;
    f();
  }
  show(fn);

  //
  var fn = function () {
    console.log(fn)
  }
  fn()

  var obj = {
    fn2: function () {
      console.log(fn2)
    }
  }
  obj.fn2()
```

## 闭包面试
```js
//1. 如何产生闭包?
//  * 当一个嵌套的内部(子)函数引用了嵌套的外部(父)函数的变量(函数)时, 就产生了闭包
//2. 闭包到底是什么?
//  * 使用chrome调试查看
//  * 理解一: 闭包是嵌套的内部函数(绝大部分人)
//  * 理解二: 包含被引用变量(函数)的对象(极少数人)
//  * 注意: 闭包存在于嵌套的内部函数中
//3. 产生闭包的条件?
//  * 函数嵌套
//  * 内部函数引用了外部函数的数据(变量/函数)

// 常见的闭包
// 1. 将函数作为另一个函数的返回值
// 2. 将函数作为实参传递给另一个函数调用

//闭包的作用
//
//1. 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)
//2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)
//
//问题:
//  1. 函数执行完后, 函数内部声明的局部变量是否还存在?  一般是不存在, 存在于闭中的变量才可能存在
//  2. 在函数外部能直接访问函数内部的局部变量吗? 不能, 但我们可以通过闭包让外部操作它


//1. 产生: 在嵌套内部函数定义执行完时就产生了(不是在调用)
//2. 死亡: 在嵌套的内部函数成为垃圾对象时


//个人理解，闭包就是函数里面包含多一层函数，然后里面函数变量引用了外部函数变量，这样就形成了闭包，而且需要注意的是，并不是内部函数要调用和返回该函数才会产生闭包

//代码片段一
  var name = "The Window";
  var object = {
    name: "My Object",
    getNameFunc: function () {
      return function () {
        return this.name;
      };
    }
  };
  console.log(object.getNameFunc()());  //?

//代码片段二
  var name2 = "The Window";
  var object2 = {
    name2: "My Object",
    getNameFunc: function () {
      var that = this;
      return function () {
        return that.name2;
      };
    }
  };
  console.log(object2.getNameFunc()()); //?
```


## 进程与线程
```sh

1. 进程：程序的一次执行, 它占有一片独有的内存空间
2. 线程： CPU的基本调度单位, 是程序执行的一个完整流程
3. 进程与线程
  * 一个进程中一般至少有一个运行的线程: 主线程
  * 一个进程中也可以同时运行多个线程, 我们会说程序是多线程运行的
  * 一个进程内的数据可以供其中的多个线程直接共享
  * 多个进程之间的数据是不能直接共享的
4. 浏览器运行是单进程还是多进程?
  * 有的是单进程
    * firefox
    * 老版IE
  * 有的是多进程
    * chrome
    * 新版IE
5. 如何查看浏览器是否是多进程运行的呢?
  * 任务管理器==>进程
6. 浏览器运行是单线程还是多线程?
  * 都是多线程运行的

```

## js代码是单线程
```sh
1. 如何证明js执行是单线程的?
  * setTimeout()的回调函数是在主线程执行的
  * 定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行
2. 为什么js要用单线程模式, 而不用多线程模式?
  * JavaScript的单线程，与它的用途有关。
  * 作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。
  * 这决定了它只能是单线程，否则会带来很复杂的同步问题

3. 代码的分类:  
  * 初始化代码
  * 回调代码
4. js引擎执行代码的基本流程
  * 先执行初始化代码: 包含一些特别的代码   回调函数(异步执行)
    * 设置定时器
    * 绑定事件监听
    * 发送ajax请求
  * 后面在某个时刻才会执行回调代码
```


## 时间循环模型
```sh
1. 所有代码分类
  * 初始化执行代码(同步代码): 包含绑定dom事件监听, 设置定时器, 发送ajax请求的代码
  * 回调执行代码(异步代码): 处理回调逻辑
2. js引擎执行代码的基本流程:
  * 初始化代码===>回调代码
3. 模型的2个重要组成部分:
  * 事件(定时器/DOM事件/Ajax)管理模块
  * 回调队列
4. 模型的运转流程
  * 执行初始化代码, 将事件回调函数交给对应模块管理
  * 当事件发生时, 管理模块会将回调函数及其数据添加到回调列队中
  * 只有当初始化代码执行完后(可能要一定时间), 才会遍历读取回调队列中的回调函数执行
```

## web Workers
```js
//
//1. H5规范提供了js分线程的实现, 取名为: Web Workers
//2. 相关API
//  * Worker: 构造函数, 加载分线程执行的js文件
//  * Worker.prototype.onmessage: 用于接收另一个线程的回调函数
//  * Worker.prototype.postMessage: 向另一个线程发送消息
//3. 不足
//  * worker内代码不能操作DOM(更新UI)
//  * 不能跨域加载JS
//  * 不是每个浏览器都支持这个新特性

//index.html
<input type="text" placeholder="数值" id="number">
<button id="btn">计算</button>
<script type="text/javascript">
  var input = document.getElementById('number')
  document.getElementById('btn').onclick = function () {
    var number = input.value

    //创建一个Worker对象
    var worker = new Worker('worker.js')
    // 绑定接收消息的监听
    worker.onmessage = function (event) {
      console.log('主线程接收分线程返回的数据: '+event.data)
      alert(event.data)
    }

    // 向分线程发送消息
    worker.postMessage(number)
    console.log('主线程向分线程发送数据: '+number)
  }
</script>
//worker.js

function fibonacci(n) {
  return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2)  //递归调用
}

console.log(this)
this.onmessage = function (event) {
  var number = event.data
  console.log('分线程接收到主线程发送的数据: '+number)
  //计算
  var result = fibonacci(number)
  postMessage(result)
  console.log('分线程向主线程返回数据: '+result)
  // alert(result)  alert是window的方法, 在分线程不能调用
  // 分线程中的全局对象不再是window, 所以在分线程中不可能更新界面
}

```

## 宏任务微任务 事件循环
```sh
宏任务：setTimeout、setInterval, Ajax，DOM事件
微任务：Promise async/await
主线程中的所有代码依次顺序执行，遇到同步则直接执行，遇到异步，则在Event Table中注册异步
异步操作又区分为宏任务和微任务
宏任务
包括 整体代码script，setTimeout，setInterval ，setImmediate，I/O，UI renderingnew ，Promise* DOM渲染后触发
微任务
包括 Promises.(then catch finally)，process.nextTick， MutationObserver
DOM渲染前触发

宏任务和微任务的区别在于在事件循环机制中，执行的机制不同
每次执行完所有的同步任务后，会在任务队列中取出异步任务，先将所有微任务执行完成后，才会执行宏任务
所以可以得出结论， 微任务会在宏任务之前执行。
我们在工作常用到的宏任务是 setTimeout，而微任务是 Promise.then
注意这里是Promise.then,也就是说 new Promise在实例化的过程中所执行的代码是同步的，而在 then中注册的回调函数才是异步。


也就是说，遇到异步函操作，还需要判断是宏任务还是微任务，宏任务的话，就把异步操作的结果加入宏任务队列，微任务的话，就加入到微任务队列。
于是，异步到的队列，就由原来的一个事件队列，变成了宏队列和微队列两个，而主线程空了的话，会先去微队列中查找（若在这个过程中，微队列的事件又产生的新的微任务加入队尾，也会在本次循环中进行处理，简而言是就是把每轮循环把微队列搞空），然后再去宏队列中查找（同样的，把宏队列搞空）。

https://blog.csdn.net/weixin_42349568/article/details/110351387

//宏任务包括：
//setInterval
//setTimeout
//setImmediate（node.js）
//XHR 回调
//事件回调（鼠标键盘事件）
//indexedDB 数据库等 I/O 操作
//UI rendering
//

//微任务包括：
//Promise.then catch finally
//process.nextTick（node.js）
//MutationObserver
//Object.observe（已被弃用）

//这是错的。。。。自己总结出错的来
//本人自己总结下，没什么专业术语的那种
//1.一开始是先执行宏任务，第一次是全部执行
//2.第一次宏任务全部执行完后，就执行微任务，微任务也是全部执行完
//3.重要的来了，然后再执行宏任务，但是只执行一个，后面暂不执行
//4.然后再执行全部的微任务
//5.之后就重复3.4步骤循环
//例子
//微事件1
process.nextTick(function() {
    console.log('6');-
})
//主线程直接执行
new Promise(function(resolve) {
    console.log('7');-
    resolve();
}).then(function() {
    //微事件2
    console.log('8')-
})
//丢到宏事件队列中
setTimeout(function() {
    console.log('9');-
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');-
        resolve();
    }).then(function() {
        console.log('12')
    })
})
//输出 1 7 6 8 2 4 3 5  9  11 10 12
```

## js的new
```js
//new操作符新建了一个空对象，这个对象原型指向构造函数的prototype，执行构造函数后返回这个对象
//
//1、创建一个空的对象
//2、链接到原型
//3、绑定this指向，执行构造函数
//4、确保返回的是对象 
```

## axios拦截器
```js
//其实是需要两步，路由拦截和axios拦截
//就用vue来说
//首先在定义路由的时候就需要多添加一个自定义字段requireAuth，用于判断该路由的访问是否需要登录。如果用户已经登录，则顺利进入路由， 否则就进入登录页面。

const routes = [
    {
        path: '/',
        name: '/',
        component: Index
    },
    {
        path: '/repository',
        name: 'repository',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Repository
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];
//定义完路由后，我们主要是利用vue-router提供的钩子函数beforeEach()对路由进行判断。

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})
//每个钩子方法接收三个参数：
//
//to: Route: 即将要进入的目标 路由对象
//from: Route: 当前导航正要离开的路由
//next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
//next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
//next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
//确保要调用 next 方法，否则钩子就不会被 resolved。



//下面是拦截器
//要想统一处理所有http请求和响应，就得用上 axios 的拦截器。通过配置http response inteceptor，当后端接口返回401 Unauthorized（未授权），让用户重新登录


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

```

## 防抖和节流函数
```js
//防抖和节流的作用都是防止函数被多次调用，
//防抖函数在高频事件结束后，n毫秒后调用一次函数
//防抖封装
function debounce(fnc,wait){
  let timeout = null;
  return function (){
    let context = this;
    let arg = arguments;
    if(timeout){
      clearTimeout(timeout)
    }
    timeout = setTimeout(()=>{
      fnc.apply(context,arg)
    },wait)
  }
}
//节流函数会在高频事件触发的过程中每隔n毫秒调用一次函数
//节流封装
function throttle(fnc,wait){
  let timeout = null;
  return function(){
    let context = this;
    let arg = arguments;
    if(!timeout){
      timeout = setTimeout(()=>{
        cleatTimeout(timeout)
        fnc.apply(context,args)
      },wait)
    }
  }
}
```

## js获取路由参数
```js
  function getUrl(str){
    let query = window.location.search.substring(1)
    let arr = query.split('&')
    for(let i = 0 ; i < arr.length ; i++){
      let item = arr[i].split('=')
      if(item[0] == str){
        return item[1]
      }
    }    
     return(false);
  }
```

## 比typeof运算符更准确的类型判断
```sh
不同数据类型的Object.prototype.toString方法返回值如下。
数值：返回[object Number]。
字符串：返回[object String]。
布尔值：返回[object Boolean]。
undefined：返回[object Undefined]。
null：返回[object Null]。
数组：返回[object Array]。
arguments 对象：返回[object Arguments]。
函数：返回[object Function]。
Error 对象：返回[object Error]。
Date 对象：返回[object Date]。
RegExp 对象：返回[object RegExp]。
其他对象：返回[object Object]。

Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"

利用这个特性，可以写出一个比 typeof 运算符更准确判断函数

var type = function (o){
  var s = Object.prototype.toString.call(o)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

```

## 正则
```js
//随便写写，遇到的或者忘了的，记下
//点字符（.) 类似通配
//点字符（.）匹配除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的任何单个字符。注意，对于码点大于0xFFFF字符，点字符不能正确//匹配，会认为这是两个字符。
/c.t/        

'cet c2t c-t c.t coot c我t'.match(/c.t/g)
// ["cet", "c2t", "c-t", "c.t", "c我t"]

'cet c2t c-t c.t coot c我t'.match(/c..t/g)
//["coot"]

//位置字符(^) ($) 开始位置和结束位置

//选择符（|） 表示''或关系''
/11|22/.test('911') // true

//转义符（\ 反斜杠）
//正则表达式中，需要反斜杠转义的，一共有12个字符：^、.、[、$、(、)、|、*、+、?、{和\。需要特别注意的是，如果使用RegExp方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次。
(new RegExp('1\+1')).test('1+1')
// false

(new RegExp('1\\+1')).test('1+1')
// true

//字符类字符类（class）表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内，比如[xyz] 表示x、y、z之中任选一个匹配

/[abc]/.test('hello world') // false
/[abc]/.test('apple') // true  a、b、c其中任意一个

//脱字符（^ 排除）如果方括号内的第一个字符是[^]，则表示除了字符类之中的字符，其他字符都可以匹配。比如，[^xyz]表示除了x、y、z之外都可以匹配。
/[^abc]/.test('bbc news') // true  字符串中包含了a、b、c以为的字符
/[^abc]/.test('bbc') // false  字符串中没有除了a、b、c以外的字符

//连字符（- 字符连续范围） 某些情况下，对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围。比如，[abc]可以写成[a-c]，[0123456789]可以写成[0-9]，同理[A-Z]表示26个大写字母。


/a-z/.test('b') // false
/[a-z]/.test('b') // true

//预定义模式 

//    \d 匹配0-9之间的任一数字，相当于[0-9]。(数字)
//    \D 匹配所有0-9以外的字符，相当于[^0-9]。(非数字)
//    \w 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]。(字母、数字、下划线)
//    \W 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]。(非：字母、数字、下划线)
//    \s 匹配空格（包括换行符、制表符、空格符等），相等于[ \t\r\n\v\f]。(空格)
//    \S 匹配非空格的字符，相当于[^ \t\r\n\v\f]。(非空格)
//    \b 匹配词的边界。(单词边界)
//    \B 匹配非词边界，即在词的内部。(非单词边界)

//重复类 （ {n} {n,} {n,m} ）
//模式的精确匹配次数，使用大括号（{}）表示。{n}表示恰好重复n次，{n,}表示至少重复n次，{n,m}表示重复不少于n次，不多于m次。
/lo{2}k/.test('look') // true  2个o
/lo{2,5}k/.test('looook') // true   2到5个o


//量词符（?）（*）（+）

//   ? 问号表示某个模式出现0次或1次，等同于{0, 1}。
//   * 星号表示某个模式出现0次或多次，等同于{0,}。
//   + 加号表示某个模式出现1次或多次，等同于{1,}。



//修饰符
//g 修饰符 （全局匹配）
var regex = /b/g;
var str = 'abba';

regex.test(str); // true
regex.test(str); // true
regex.test(str); // false

//i 修饰符 （不区分大小写）
/abc/.test('ABC') // false
/abc/i.test('ABC') // true

//m 修饰符（让^和$识别换行符）
//m修饰符表示多行模式（multiline），会修改^和$的行为。默认情况下（即不加m修饰符时），^和$匹配字符串的开始处和结尾处，加上m修饰符以后，^和$还会匹配行首和行尾，即^和$会识别换行符（\n）。
/world$/.test('hello world\n') // false
/world$/m.test('hello world\n') // true

/^b/m.test('a\nb') // true
//上面代码要求匹配行首的b，如果不加m修饰符，就相当于b只能处在字符串的开始处。加上m修饰符以后，换行符\n也会被认为是一行的开始。

```

## new命令原理
```js
//创建一个空对象，作为将要返回的实例对象。

//将这个空对象的原型，指向构造函数的prototype属性。

//将这个空对象赋值给函数内部的this关键字。

//开始执行构造函数内部的代码。（代码中this指向空对象（实例对象））

//返回实例对象（或自定义对象）
//也就是说，构造函数内部，this指的是一个新生成的空对象，所有针对this的操作，都会发生在这个空对象上。构造函数之所以叫“构造函数”，就是说这个函数的目的，就是操作一个空对象（即this对象），将其“构造”为需要的样子。

//如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象。

var Vehicle = function () {
  this.price = 1000;
  return 1000; // 1000 非对象，被忽略，返回的是this对象；如果是return {}，则会返回{}
    
};

(new Vehicle()) === 1000
// false

//上面代码中，构造函数Vehicle的return语句返回一个数值。这时，new命令就会忽略这个return语句，返回“构造”后的this对象。

//但是，如果return语句返回的是一个跟this无关的新对象，new命令会返回这个新对象，而不是this对象。这一点需要特别引起注意。

//重要，new命令简化的内部流程，可以用下面的代码表示

// 构造函数
function Person(name,age){
    this.name = name
    this.age = age
}

//自定义_new
function _new(){
  var arg = [].slice.call(arguments)
  var constructor = arg.shift()
  var context = Object.create(constructor.prototype)
  var result = constructor.apply(context,arg)
  return (typeof result == 'object' && result != null) ? resulr : context
}
//自定义_new2
function _new2(/* 构造函数 */ constructor, /* 构造函数参数 */ params){
  var context = Object.create(constructor.prototype)
  var result = constructor.apply(context,params)
  return (typeof result == 'object' && result != null) ? result :context
}
var actor = _new(Person, '张三', 28);
actor.name // 张三

// 通过自定义_new2 返回实例
var actor2 = _new2(Person, ['李四', 29]);
actor2.name // 李四

// 通过new命令 返回实例
var actor3 = new Person('王五',30)
actor3.name // 王五
```
## Array.prototype.slice.call(a) 类数组 转数组原理
```js
var objArr = { // 类数组对象
    0:'a',
    1:'b',
    2:'c',
    length:3
}

var arr = Array.prototype.slice.call(objArr) // 执行数组的slice方法，并把obj指定为方法的this
// 或 arr = [].slice.call(obj)

arr // ['a','b','c']

//上面代码中，objArr是一个类似数组的对象，使用call调用数组的slice方法，指定objArr为slice方法内部的this，slice方法返回值赋给arr。

//另外来看看数组slice方法的内部实现原理
Array.prototype.slice=function(start,end){  //数组方法slice的底层内部实现
    var result = new Array(); //新数组
    var start = start || 0;
    var end = end || this.length; //this指向调用的对象，用了call之后，改变this的指向，指向传进来的对象
    for(var i=start; i<end; i++){
        result.push(this[i]);
    }
    return result;	//返回的为一个新的数组
}
```

## cookie基本知识
```sh
https://www.cnblogs.com/Darren_code/archive/2011/11/24/Cookie.html
```

## ajax
```sh
具体来说，AJAX 包括以下几个步骤。

1.创建 XMLHttpRequest 实例
2.发出 HTTP 请求
3.接收服务器传回的数据
4.更新网页数据

```

## storage
```sh
Storage 接口用于脚本在浏览器保存数据。两个对象部署了这个接口：window.sessionStorage和window.localStorage。
Storage.setItem()
Storage.getItem()
Storage.removeItem()
Storage.clear()
Storage.key()
```

## History
```sh
window.history属性指向 History 对象，它表示当前窗口的浏览历史。
属性
History.length：当前窗口访问过的网址数量（包括当前网页）
方法
History.back()、History.forward()、History.go()
History.back()：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
History.forward()：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
History.go()：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go(1)相当于forward()，go(-1)相当于back()。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为0，相当于刷新当前页面。
```

## 性能高的几种去重方法
```js
//耗时约23ms，ES5标准中性能最高
function fnc(arr){
    arr = arr.sort()
    var result = [arr[0]]
    for(let i = 1 ; i < arr.length ; i++){
        arr[i] !== arr[i-1] && result.push(arr[i]) 
    }
    return result
}
//ES6的Set数据结构，耗时约20ms，性能高，代码简洁
Array.from(new Set([...arr]))

//耗时约16ms，所有方法中 性能最高
function fnc1(arr){
    var result = []
    var obj = {}
    for(let item of arr){
        if(!obj[item]){
            result.push(item)
            obj[item] = true
        } 
    }
    return result
}


```

## js随机打乱数组
```js
        function getRandomInt(min,max){
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        function fnc(arr){
            for(let i = 0; i < arr.length ; i++){
                let j = getRandomInt(0,i)
                let a = arr[i]
                arr[i] = arr[j]
                arr[j] = a                 
            }
            return arr           
        }
       
        var arr = [1,2,3,4]
        console.log(fnc(arr))
```

##  判断是否为移动端浏览器
```js
const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
if(flag){
    // 移动端
} else {
    // PC端
}
```

## 深拷贝
```js
//乞丐版深拷贝
  var obj1 = {
    a: 1,
    b: 2,
    c: 3
}
var objString = JSON.stringify(obj1);
var obj2 = JSON.parse(objString);
obj2.a = 5;
console.log(obj1.a);  // 1
console.log(obj2.a); // 5

//乞丐版深拷贝2
var obj1 = {
    a: 1,
    b: 2,
    c: 3
}
var obj2 = Object.assign({}, obj1);
obj2.b = 5;
console.log(obj1.b); // 2
console.log(obj2.b); // 5

//真正的深拷贝，递归
//面试够用
function deepClone(data){
    if(typeof data === 'object'){
        var result = data.constructor == Object ? {} : []
        for(let item in data){
            result[item] = typeof data[item] == 'object' ? deepClone(data[item]) : data[item]
        }
    }else{
        var result = data
    }
    return result
}
```

## a--和--a
```js
var a = 3
while(a--){
  console.log(a)
}
//分开执行，不然死循环
var a = 3
while(--a){
  console.log(a)
}
```

## 设计模型
```
设计模式这个术语在软件工程中用来表示软件设计中经常出现的问题的通用的、可重用的解决方案。
工厂模式
function createPerson(name, age){
      var o = new Object();      // 创建一个对象
      o.name = name;
      o.age = age;
      o.sayName = function(){
            console.log(this.name)
      }
      return o;      // 返回这个对象
}
var person1 = createPerson('ccc', 18)
var person2 = createPerson('www', 18)

构造函数模式
function Person(name , age){
  this.name = name;
  this.age = age;
  this.sayName = function(){
    console.log(this.name)
  }
}

var person1 = new Person('ccc', 18)
var person2 = new Person('www', 18)
person1.sayName()      // --> 'ccc'

原型模式
function Person(){
}
Person.prototype.name = 'ccc'
Person.prototype.age = 18
Person.prototype.sayName = function(){
  console.log(this.name)
}
var person1 = new Person()
person1.sayName()      // --> ccc

var person2 = new Person()
person2.sayName()      // --> ccc

console.log(person1.sayName === person2.sayName)    

组合使用构造函数模式和原型模式
function Person(name, age){
  this.name = name;
  this.age = age;
  this.friends = ['aaa', 'bbb']
}
Person.prototype = {
  constructor: Person,
  sayName: function(){
    console.log(this.name)
  }
}
var person1 = new Person('ccc', 18)
var person2 = new Person('www', 18)
person1.friends.push('ddd')

console.log(person1.friends)      // --> ["aaa", "bbb", "ddd"]
console.log(person2.friends)      // --> ["aaa", "bbb"]
console.log(person1.friends === person2.friends)      // --> false
console.log(person1.sayName === person2.sayName)      // --> true
这种构造函数与原型混成的模式，是目前ECMAscript中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认方式。

动态原型模式
function Person(name, age){
  // 属性
  this.name = name
  this.age = age
  // 方法
  if(typeof this.sayName !== 'function'){
    Person.prototype.sayName = function(){
      console.log(this.name)
    }
  }
}

var person1 = new Person('ccc', 18)
person1.sayName()      // --> ccc
```
<ClientOnly>
<buttom-view></buttom-view>
</ClientOnly>



