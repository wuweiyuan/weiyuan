<!-- ## call，apply，bind 的用法以及区别

::: tip
这里面讲得很详细
<br>
https://www.cnblogs.com/kerwin1727/p/11433762.html
箭头函数和 this
<br>
https://www.cnblogs.com/lfri/p/11872696.html
::: -->

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
  item == 2;
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
    console.log(target, prop);
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
  ownKeys(target) {
    return Object.keys(target).filter((item) => {
      return !item.startsWith("_");
    });
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
console.log(foo.next());
console.log(foo.next());
console.log(foo.next());
console.log(foo.next());
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
const formEntries = Object.formEntries(entries);
console.log("值跟obj一样", formEntries);

//map对象转化为对象也可以用formEntries
const map = new Map();
map.set("name", "weiyuan");
map.set("age", 12);
console.log(map);
const formEntries = Object.formEntries(map);
console.log(formEntries);
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

<ClientOnly>
<buttom-view></buttom-view>
</ClientOnly>
