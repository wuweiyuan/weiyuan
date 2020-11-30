## call，apply，bind 的用法以及区别

::: tip
这里面讲得很详细
<br>
https://www.cnblogs.com/kerwin1727/p/11433762.html
箭头函数和 this
<br>
https://www.cnblogs.com/lfri/p/11872696.html
:::

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
