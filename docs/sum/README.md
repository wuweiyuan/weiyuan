## 如何实现multi(2)(3)(4)=24?
```js
function multi(n){
  var fn = function(x) {
    return multi(n * x);
  };
  
  fn.valueOf = function() {
    return n;
  };
  
  return fn;
}
```

## 用js实现读取出字符串中每个字符重复出现的次数？
```js
var arr = 'abcdaabc';

var info = arr
    .split('')
    .reduce((p, k) => (p[k]++ || (p[k] = 1), p), {});

console.log(info); //{ a: 3, b: 2, c: 2, d: 1 }
//,p 就是return p
```

## 自己练习的冒泡排序
```js
        var arr = [55555555555,444444,2,22];
        //自己练习冒泡
        function fnc(arr){
            var len = arr.length;
            for(let i = 0 ; i < len-1 ; i++){
                for(let j = i+1 ; j <len; j ++){
                    if(arr[i]>arr[j]){
                        var tem = arr[i]
                        arr[i] = arr[j]
                        arr[j] = tem
                    }
                }
            }
            return arr
        }
        console.log(fnc(arr))
```


## DOM 树的遍历
```
<div class="root">
  <div class="container">
    <section class="sidebar">
      <ul class="menu"></ul>
    </section>
    <section class="main">
      <article class="post"></article>
      <p class="copyright"></p>
    </section>
  </div>
</div>

function fn(dom) {
    var arr = [dom];
    while (arr.length) {
      var node = arr.shift();
      print(node);
      if (!node.children.length) {
        continue;
      } else {
        var children = Array.prototype.slice.call(node.children);
        children.forEach((item) => {
          arr.push(item);
        });
      }
    }
  }
  function print(node) {
    console.log(node.tagName, `.${node.className}`);
  }
  fn(document.querySelector(".root"));
```

## 手写一个extend函数
```
//手写一个extend函数
Object.defineProperty(Object.prototype, "extend", {
  writable: true,
  enumerable: false,
  configurable: true,
  value: function (o) {
    var arr = Object.getOwnPropertyNames(o);
    for (let i = 0; i < arr.length; i++) {
      if (arr in this) {
        continue;
      } else {
        var des = Object.getOwnPropertyDescriptor(o, arr[i]);
        Object.defineProperty(this, arr[i], des);
      }
    }
  },
});

// 定义一个新对象
var a = {
  itemA: 1,
};
// 新建一个属性，并设置属性描述符
Object.defineProperty(a, "itemB", {
  writable: true,
  enumerable: false,
  configurable: true,
  value: 2,
});
// 再定义一个新对象
var b = {};
b.extend(a);
// 此时我们可以看到静态属性已经继承过去了
console.log(b); // 结果为{itemA: 1,itemB: 2}
//再来看看属性描述符是不是也过去了
let extendDesc = Object.getOwnPropertyDescriptor(b, "itemB");
console.log(extendDesc);
```