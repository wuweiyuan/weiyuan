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
//return p
```