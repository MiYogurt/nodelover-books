


```
tsc --init
```

更多配置项请见这里


```
https://www.tslang.cn/docs/handbook/compiler-options.html
```

## 添加自己的 typings 文件夹

添加以下配置项。就可以加载自己的 d.ts 文件了

```
{
    "compilerOptions": {
		"typeRoots":[
		     "typings"
		]
	}
}
```

## 下载已经写好的 d.ts 文件

xxx 就是你的库的名字。

```
npm install @types/xxx -D
```

这个有点像 lodash，因为这只是安装一个小部件。

```
npm install lodash/assign -S
```

@types 这个包存放了所有别人已经写好的 d.ts 文件。可以自己先到 npmjs 去搜索看看有没有。


## 假如没有库的 d.ts 文件

有的库会报错，而有的不会，那怎么解决这个问题呢？

配置好自己 typings 目录，在该目录下新建一个 xxx.d.ts ，这个 xxx 你可以随意写。

```
declare module "koa" {
  interface Context {
    render(filename: string, ...args: any[]) : any;
    session: any;
    i18n: any;
    csrf: any;
    flash: any;
  }
}
```

这里注意了 "koa" 就是你报错库的名称，记得别忘记双引号。

这里我就是给 koa 库添加一些属性，防止代码编辑器报错。

还有一点你需要注意的是，报错一定是因为该包主目录下没有一个 index.js，它可能放到 lib 目录下面了，所以会报错。新版本的 ts 只要你安装了库，并且它的下面有 index.js 可以加载到，ts 是不会报错的，只是会让你导入的库是 any 类型的。

## 如何发布 d.ts 文件

第一种方式就是在你的库下面的 package.json 里面配置。

这里最好写上相对路径

```
"types": "./lib/main.d.ts"

// or
"typings": "./lib/main.d.ts"
```

第二种方式是给这个地址提交 PR

```
https://github.com/DefinitelyTyped/DefinitelyTyped.git
```

## 假如把 @types 里面的东西 download 到自己的私有源里面

克隆下来跑一次就可以了

```
https://github.com/Microsoft/types-publisher
```

> 我一万个建议你把 DefinitelyTyped 仓库下载下来阅读。

