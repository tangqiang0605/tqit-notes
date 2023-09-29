[手摸手教你写个ESLint 插件以及了解ESLint的运行原理 - 掘金](https://juejin.cn/post/6844904016363667469?searchId=20230801153833D404F54500632E00B8E0#heading-23)

```
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "启动程序", // 调试界面的名称
            // 运行项目下的这个文件：
            "program": "${workspaceFolder}/tests/lib/rules/settimeout-no-number.js",
            "args": [] // node 文件的参数
        },
        // 下面是用于调试package.json的命令 之前可以用，貌似vscode出了点bug导致现在用不了了
        {
            "name": "Launch via NPM",
            "type": "node",
            "request": "launch",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run-script", "dev"    //这里的dev就对应package.json中的scripts中的dev
            ],
            "port": 9229    //这个端口是调试的端口，不是项目启动的端口
        },
    ]
}

```