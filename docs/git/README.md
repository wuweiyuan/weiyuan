# git 上传如何忽略 node_modules

git 上传如何忽略 node_modules，需要的就是.gitignore 文件了

创建.gitignore 文件

::: tip
步骤<br/> 1.点击项目文件，右键选择 Git Bash 进入命令行，输入 touch .gitignore，生成.gitignore 文件 <br/> 2.在生成的.gitignore 文件里输入你要忽略的文件件及其文件即可。
:::

```js
// .gitignore文件
node_modules/
dist/

```

::: tip
以斜杠“/”开头表示目录；<br/>
以星号“\*”通配多个字符；<br/>
以问号“?”通配单个字符；<br/>
以方括号“[]”包含单个字符的匹配列表；<br/>
以叹号“!”表示不忽略(跟踪)匹配到的文件或目录；<br/>
:::

git 对于 .ignore 配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效；

配置好就可以实现上传时忽略你不不需要上传的文件了！
