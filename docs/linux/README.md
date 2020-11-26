## 安装 jekins 报错 Public key for jenkins-2.249.1-1.1.noarch.rpm is not installed

::: tip
新增 --nogpgcheck 参数，实现不检查 Public Key 而强制安装, 命令如下：<br>  
yum install jenkins --nogpgcheck

:::

## 在 jenkins 中绑定 git 仓库是报错 jenkins Error performing command: git ls-remote -h

::: tip
原因：服务器没安装 git<br>
解决方案：yum install git
:::

## linux centos 安装 nginx

::: tip
一、安装准备<br>
首先由于 nginx 的一些模块依赖一些 lib 库，所以在安装 nginx 之前，必须先安装这些 lib 库，这些依赖库主要有 g++、gcc、openssl-devel、pcre-devel 和 zlib-devel 所以执行如下命令安装

```
$   yum install gcc-c++
$   yum install pcre pcre-devel
$   yum install zlib zlib-devel
$   yum install openssl openssl--devel
```

二、安装 Nginx<br>
首先进入/usr/local 目录

```
$   cd /usr/local
```

从官网下载最新版的 nginx

```
$   wget http://nginx.org/download/nginx-1.7.4.tar.gz
```

会产生一个 nginx-1.7.4 目录，这时进入 nginx-1.7.4 目录

```
$   cd  nginx-1.7.4
```

接下来安装，使用--prefix 参数指定 nginx 安装的目录,make、make install 安装

```
$   ./configure  $默认安装在/usr/local/nginx
$   make
$   make install
```

启动、停止 nginx

```
cd /usr/local/nginx/sbin/
./nginx
./nginx -s stop
./nginx -s quit
./nginx -s reload
```

:::

## liunx 安装 jenkins

::: tip
`1 .安装 java

```
yum install -y java-1.8.0-openjdk.x86_64
//验证完成安装
java -version
```

2.配置环境变量<br>
用文本编辑器打开/etc/profile<br>
\$ vi /etc/profile<br>
在 profile 文件末尾加入：

```
export JAVA_HOME=/usr/lib/jvm/jre-1.8.0-openjdk
export PATH=$JAVA_HOME/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

```
//使配置文件生效
source /etc/profile
source ~/.bash_profile
//或重启机器配置生效
reboot
```

3.服务器安装 jenkins

```
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
yum install jenkins  --nogpgcheck

//会询问你
Total download size: 74 M
Installed size: 74 M
Is this ok [y/d/N]: y
```

```
//启动
service jenkins start

//重启
service jenkins restart

//停止
service jenkins stop
```

:::

## linux centos 安装 nodejs & pm2

::: tip
1 .下载 nodejs 最新的 bin 包

```
wget https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz
```

2.解压包

```
xz -d node-v9.3.0-linux-x64.tar.xz
tar -xf node-v9.3.0-linux-x64.tar
```

3.部署 bin 文件

```
ln -s ~/node-v9.3.0-linux-x64/bin/node /usr/bin/node
ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npm
ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npx
```

4.测试

```
node -v
npm -v
```

5.安装 pm2

```
npm install -g pm2
ln -s ~/node-v9.3.0-linux-x64/bin/pm2 /usr/bin/pm2
pm2 -v
```

:::

## jenkins8080 端口网页打不开

::: tip 1.查看是否开启防火墙

```
systemctl status firewalld
```

2.查看是否开放端口 8080

```
firewall-cmd --list-ports
```

3.没有开放，则加入

```
firewall-cmd --permanent --zone=public --add-port=8080/tcp
```

4.重启防火墙

```
systemctl reload firewalld
```

:::
