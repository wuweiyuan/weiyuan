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
    const path = url.split('?')[0]//路由
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
        let postData = '';
        //设置返回格式JSON
        res.setHeader('Content-type','application/json')
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


## nodemon可以监听文件变化
```js
npm install nodemon --save-dev
//然后在package.json
"script":{
    dev:"nodemon index.js"
}
```

## cross-en是一款运行跨平台设置和使用环境变量的脚本
```js
npm install --save-dev cross-env
//然后在package.json
 "script":{
    dev:"cross-env NODE_ENV=dev nodemon index.js"
}
//可以通过process.env.NODE_ENV修改
```

## 为命中路由
```js
    res.writeHeade(404,{"Content-type":"text-plain"})
    res.write("404 Not found/n")
    res.end()
```

## 读取文件
```js
//简单的nodejs读取文件
const fs = require('fs')
const path = require('path')
//files文件夹名a.json是文件名
const fullFileName = path.resolve(__dirname,'files','a.json')
fs.readFile(fullFileNamw,(err,data)=>{
    if(err){
        console.erroe(err)
        return
    }
    console.log(data.toString())
})
```

## 安装mysql
```js
//1.https://dev.mysql.com/downloads/mysql/
//2.https://dev.mysql.com/downloads/workbench/
```

## sql笔记
```js
//有一列名为password，这个是关键字，直接使用的话会报错，所以可以用``包起来，这样就不会报错了
insert into users(username,`password`,realname) values ('lisi','123','李四');
// 模糊查询
select * from users where username like '%li%';
//排序
select * from users where username like '%li%' order by id desc;
//更新
update users set username='zhangsan' where id='1';
//如果更新报错
SET SQL_SAFE_UPDATEA=0;
//删除(其实现实中一般 都是软删除)
delete from users where id='1';
```

## nodejs操作数据库
```js
//首先要安装musql的依赖
npm i mysql;
//之后就执行下面命令
const mysql = require('mysql')
const con = mysql.createConnection({
    host:'localhost',//可以写本地，如果是线上的就写线上的地址,
    user:'root',
    password:'',//自己的密码必填
    port:3306,//端口号
    database:'myblog'
})
//开始连接
con.connect();

//执行sql语句
const sql = 'select * from users';
con.query(sql,(err,result)=>{
    if(err){
        console.error(err);
        return
    }
    console.log('结果',result)
})

//关闭连接（现实中项目不用关闭，只是这里是demo所以关闭）
con.end()
```

## server端nodejs操作cokkie
```js
     const http = require('http')
     const  querystring= require('querystring')
     //获取cookie过期时间
    const getCookieExpires = () =>{
        const d = new Date()
        d.setTime = d.getTime() + (24 * 60 * 60 * 1000)
        console.log('d.toUTCString()',d.toUTCString())
        return d.toUTCString()
    }
    const server = http.createServer((req,res)=>{
    //操作cookie设置cookie
    res.setHeader('Set-Cookie',`username=wwu;path=/;httpOnly;expires=${getCookieExpires()}`)//这里/是根路由，在根路由下都生效,这样就可以在浏览器看到效果
    //httpOnly这个值很重要，设置了这个属性，前端就不能修改cookie，只能在服务端修改，而且在前端也看不懂cookie值
    //expires设置cookie过期时间



    //服务端获取cookie
    req.cookie = {};
    const cookie = req.headers.cookie || '';//解析cookie  k1=v1;k2=v2;
    cookie.split(';').forEach(item=>{
        if(!item){
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })
    //要看到cookie，可以在浏览器控制台执行document.cookie = 'name=wwy'当然这是不可取的，还是要在server执行cookie

    console.log('看看cookie是什么',req.cookie)
    res.end(JSON.stringify(req.query))
})
```


## session
```js
    //设置值
    req.session.name='wwy';
    req.session.realName='吴伟元';
```

## redis(一般是用来存取session)
```js
//安装
brew install redis
//开启redis服务
redis-server
//在打开一个终端
redis-cli
//使用redis,可以直接在终端执行。例如
//设置
set myname wuweiyuan
//查看
get myname
//看所有的key
keys *
//删除自己设置的key
del myname
```

## nodejs连接redis
```js
//先安装依赖
npm install redis --save
const redis = require('redis');

//创建客户端 6397是redis端口号，127.0.0.1是本地地址，如果是线上就写线上的地址
const redisClient = redis.createClient(6379,"127.0.0.1")
redisClient.on('error',err=>{
    console.error(err)
})

//测试 myname是key wuweiyuian是val redis.print是设置完成后打印看是不是正确（控制台打印的是Reply:OK）
redisClient.set('myname','wuweiyuan',redis.print)
redisClient.get('myname',(err,val)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('val',val)
    redisClient.quit()//退出  只是demo要退出，现实中的项目就不要退出了

})
```

## 使用nginx
```js
//下载
brew install nginx
//打开nginx配置(终端打开)
sudo vi /usr/local/etc/nginx/nginx.conf
//重要在编辑模式中，按先按esc键，在输入:wq就可退出编辑模式了
//测试配置文件格式是否正确(没权限就要在前面加sudo)
nginx -t
//启动
nginx;
//重启
nginx -s reload
//停止
nginx -s stop

```

## nodejs文件操作
```js
    
    const fs = require('fs')
    const path = require('path')
    const fileName = path.resolve(__dirname,'data.text')

    //读取文件
    fs.readFile(fileName,(err,data)=>{
        if(err){
            console.error(err);
            return
        }
        //因为data是二进制的，所以要toString
        console.log(data.toString())
    })

    //写入文件
    const content = '这是要写入的新内容\n'
    const opt ={
        flag:"a"//"a"是追加写入，覆盖用“w”
    }
    fs.writeFile(fileName,content,opt,(err)=>{
        console.error(err)
    })

     //判断文件是否存在
    fs.exists(fileName,(exists)=>{
        console.log('exists',exists)
    })
```

## nodejs stream
```js
//我所了解的有这两种，通过pipe连起来
 process.stdin.pipe(process.stdout)
 req.pipe(res)
//复制文件使用流
const fs = require('fs')
const path = require('path')

const fileName1 = path.resolve(__dirname,'data.txt');
const fileName2 = path.resolve(__dirname,'data-cop.txt');
const redStream = fs.createReadStream(fileName1);
const writeStream = fs.createWriteStream(fileName2)
redStream.pipe(writeStream)
redStream.on('data',data=>{
    console.log('data',data.toString())
})
redStream.on('end',()=>{
    console.log('已拷贝完')
})
```

## 了解readline

## 防sql注入
```js
const mysql =require('mysql')
mysql.escape('这里面就是浏览器传进来的数据（变量）')
```

## 密码加密
```js
    //这个是nodejs自带的
    const crypto = require('crypto')
    const SECRET_KEY = 'WJiol_8776#'//密钥，自己写
    //md5加密
    function md5(content){
        let md5 = crypto.createHash('md5')
        return md5.update(content).digest('hex')
    }

    //加密函数
    function genPassword(password){
        const str = `password=${password}&key=${SECRET_KEY}`;
        return md5(str)
    }


    const result = genPassword('123')
    console.log('result',result)
    //所以数据库要存加密过的密码
```

## 安装express
```js
sudo npm install express-generator -g
//生成项目
express blog-express
```

## express中间件理解
```js
//通过浏览器调试，大概知道什么是中间件了
const express = require('express')

//本次http请求实例
const app = express()

app.use((req,res,next)=>{
    console.log('请求开始',req.method,req.url)
    next()
})

app.use((req,res,next)=>{
    console.log('假设在处理cookie')
    //假设在处理cookie
    req.cookie = {
        userId:'123wwy'
    }
    next()
})

app.use((req,res,next)=>{
    //假设处理postdata
    console.log('假设处理postdata')
    setTimeout(()=>{
        req.body={
            a:100,
            b:200
        }
        next()
    }
    )
})

app.use('/api',(req,res,next)=>{
    console.log('处理api路由 ')
    next() 
})


app.get('/api',(req,res,next)=>{
    console.log('get处理api路由 ')
    next() 
})

app.post('/api',(req,res,next)=>{
    console.log('post 处理api路由 ')
    next() 
})
//模拟登录验证
function loginCheck(req,res,next){
    console.log('模拟登录成功')
    setTimeout(()=>{
        next()
    })
}

app.get('/api/get-cookie',loginCheck,(req,res,next)=>{
    console.log('get /api/get-cookie')
    res.json({
        error:0,
        data:req.cookie
    })
})

app.post('/api/get-post-data',(req,res,next)=>{
    console.log('post api/get-post-data')
    res.json({
        error:0,
        data:req.body
    })
})

app.use((req,res,next)=>{
    console.log('处理404')
    res.json({
        error:-1,
        msg:'404 not found '
    })
})

app.listen(3000,()=>{
    console.log('server is start for 3000')
})
```


## 修改环境变量
```js
"dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
"prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"

//dev和production可自行修改
//在代码中process.env.NODE_ENV可以获取到
```

## pm2
```js
//安装
sudo npm install pm2 -g
//package.json
"prd":"cross-env NODE_ENV=production pm2 start index.js"
//常用命令
pm2 start ... //开启
pm2 list //pm2列表
pm2 restart <AppName>/<id> //手动重启
pm2 stop <AppName>/<id>//停止
pm2 delete <AppName>/<id>//删除
pm2 info <AppName>/<id>//基本信息
pm2 log <AppName>/<id>//日志
pm2 monit <AppName>/<id>//监控cpu内存信息
//pm2一遇到错误就能重启，保证不错误的地方成功运行
//配置
//新建pm2配置文件pm2.conf.json
{
    "apps":{
        "name":"woshiwuweiyuan",//更改名字
        "script":"index.js",
        "watch":true,//监听文件变化
        "ignore_watch":["node_modules","logs"],//哪些文件不需要监听
        "error_file":"logs/err.log",//错误日志存放位置
        "out_file":"logs/out.log",//正常日志存放地方
        "log_date_format":"YYYY-MM-DD HH:mm:ss", //日志时间错格式
        "instances":4//四进程，看你电脑几核
    }
}
//然后启动命令可以改为
"prd":"cross-env NODE_ENV=production pm2 start pm2.conf.json"
```