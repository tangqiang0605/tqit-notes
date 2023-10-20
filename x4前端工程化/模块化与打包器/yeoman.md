

```
yarn global add yo
mkdir generator-name
yarn init -y
yarn add yeoman-generator
yarn link 到全局（使用 yo 模板名name）
```

```
目录结构
generators
- app
	- index.js
	- templates
		- foo.txt遵循ejs模板标记语法
package.json
```
ejs 模板语法
```
<%= title %>

<% if (success) {%>
hello
<% }%>
```

```
generators/index.js
const Generator =require('yeoman-generator');

module.exports=class extends Generator{
	writing(){
		获取templates/foo.txt
		const tmpl=this.templatePath('foo.txt');
		生成项目下文件路径
		const output=this.destinationPath('foo.txt');
		// this.fs.write(this.destinationPath('temp.txt'),'hi');
		
	}
}

```
![[Pasted image 20230507200135.png]]


