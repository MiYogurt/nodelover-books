
按 ctrl + shift + d  , 然后点击左上角的小齿轮配置，把下面代码复制进去。

在你的ts代码里面打上断点，点击绿色的小箭头开始调试即可。

这个非常有用，比你使用 console.log 调试快很多。

```
{
    // Use IntelliSense to learn about possible Node.js debug attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
       {
           "type": "node",
           "request": "launch",
           "name": "启动调试",
           "program": "${workspaceRoot}/src/index.js",
           "outFiles": [
               "${workspaceRoot}/src/*.js"
           ],
           "sourceMaps": true
       },
        {
            "type": "node",
            "request": "attach",
            "name": "附加到进程",
            "address": "localhost",
            "port": 5858,
            "outFiles": [],
            "sourceMaps": true
        }
    ]
}
```