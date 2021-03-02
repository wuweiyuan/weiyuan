## 泛型
```js
function echo<T>(arg:T):T{
    return arg
}
const result = echo('string')
function swap<T,U>(tuple:[T,U]):[U,T]{
    return [tuple[1],tuple[0]]
}

const result1 = swap(['string',123])

//约束泛型

interface hasLength{
    length:number
}
function shuldHasLength<T extends hasLength>(arg:T):T{
    console.log(arg.length)
    return arg
}
shuldHasLength(true)
const result2 = shuldHasLength('str')
const result3 = shuldHasLength([1,2,3])
```


## 类型别名
```js
type strOrNum = string | number
const qwe:strOrNum = 'wwy'
const num:strOrNum= 123
```

## 类型别名（交叉类型）
```js
interface IName{
    name:string
}


type person  = IName & {age:number}

let ren:person={name:'weiyuan',age:12}
```
## 使用第三方库需要声明文件
```js
//文件后缀为.d.ts
//比如jquery
```

## Partial（内置类型）
```js
//假设我们有一个定义 user 的接口，如下
interface IUser {
  name: string
  age: number
  department: string
}
//经过 Partial 类型转化后得到
type optional = Partial<IUser>

// optional的结果如下
type optional = {
    name?: string | undefined;
    age?: number | undefined;
    department?: string | undefined;
}

```

## Omit（内置类型）
```js
//去掉某个属性
type IOmit = Omit<IPerson,'name'>
let data2:IOmit={age:12}
```

