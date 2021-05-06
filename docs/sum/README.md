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
