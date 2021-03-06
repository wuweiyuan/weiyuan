## 简单事例
```js
const http = require('http')
const server = http.createServer((req,res)=>{
    res.end('hellowworld')
})

server.listen(8000)

//执行 node index.js
//可以在127.0.0.1:8000端口查看到hellowworld
```

## 处理get请求
```js
const http = require('http')
const  querystring= require('querystring')
const server = http.createServer((req,res)=>{
    console.log('method:', req.method)
    const url= req.url
    console.log('url:url',url)
    req.query = querystring.parse(url.split('?')[1])
    console.log('query:',req.query)
    res.end(JSON.stringify(req.query))
})
//浏览器输入地址http://127.0.0.1:3000/wwy/asd/qq?name=weiyuan&age=12
//执行node的命令看看控制台输出还有浏览器显示什么
```

## 处理post请求
```js
const http = require('http')
const server = http.createServer((req,res)=>{
    if(req.method=="POST"){
        console.log(req.headers["content-type"])
        let postData = ''
        req.on("data",chunk=>{
            postData += chunk.toString()
            console.log('chunk',chunk.toString())
        })
        req.on("end",()=>{
            console.log('postData',postData);
            res.end("hello world")
        })
    }
})
server.listen(3000)
//post请求，只能通过postman模拟，浏览器模拟不了
```