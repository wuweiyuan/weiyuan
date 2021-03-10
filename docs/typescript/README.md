## 安装
```js
sudo npm install -g typescript
//使用 tsc 全局命令：
// 查看 tsc 版本
tsc -v
// 编译 ts 文件
tsc fileName.ts

```
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

//泛型与类和接口
class Queue {
  private data = [];
  push(item) {
    return this.data.push(item)
  }
  pop() {
    return this.data.shift()
  }
}

const queue = new Queue()
queue.push(1)
queue.push('str')
console.log(queue.pop().toFixed())
console.log(queue.pop().toFixed())

//在上述代码中存在一个问题，它允许你向队列中添加任何类型的数据，当然，当数据被弹出队列时，也可以是任意类型。在上面的示例中，看起来人们可以向队列中添加string 类型的数据，但是那么在使用的过程中，就会出现我们无法捕捉到的错误，

class Queue<T> {
  private data = [];
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}
const queue = new Queue<number>()

//泛型和 interface
interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kp1: KeyPair<number, string> = { key: 1, value: "str"}
let kp2: KeyPair<string, number> = { key: "str", value: 123}

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

