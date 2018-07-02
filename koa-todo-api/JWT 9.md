
## 增加验证逻辑

我们不想要谁都可以访问 todo 、folder 的一些API，至少我们需要用户登陆了才可以访问，这个时候我们需要 JSON Web Token。

json 代表一种格式，web 代表所处的环境，token 代表一段加密好的字符串。

它的流程通常是这样，在没登录之前访问 todo 或者 folder 是不会给你任何数据的，当我们请求 login 或者 register 接口的时候，校验成功了之后
会返回一段token，之后我们去请求 todo 或者 folder的 API，但是在请求之前，我们要在请求头上面加上一个验证字段，而这个字段的值就是我们的token。

当服务器接收到拥有验证字段的请求头部的时候，服务器会校验这个token的有效性，就是先解密后再拿到里面的值，有的是里面还包含一个有效时间的属性，这里我们为了简单，就不添加超时时间字段了。

安装 koa-jwt 、jsonwebtoken

```
npm i koa-jwt@2 jsonwebtoken -S
```

koa-jwt 是服务器用来验证请求头的中间件，当有验证请求头的时候，它会把里面的数据解密了之后放到 ctx.state.user 这个对象里面。

jsonwebtoken 就是用来加密对象的库

修改 index.ts , 增加 koa-jwt 中间件

```
import * as Koa from 'koa';
import * as OtherParser from 'koa-better-body';
import * as bodyParser from 'koa-bodyparser';
import * as Convert from 'koa-convert';
import * as  kjwt from 'koa-jwt';
import { api, router } from './router';

const app = new Koa();

app
.use(Convert(bodyParser()))
.use(Convert(OtherParser()))
.use(kjwt({secret: 'todo-app'}).unless({ path: [/^\/api\/v1\/(login|register)/] }))
.use(router.middleware())
.use(api.middleware())
.use(async (ctx, next) => {
    console.log("state \n");
    console.log(ctx.state);
    await next();
})
.listen(3000, () => {
    console.log("Server Stared on http://localhost:3000");
    api.getRoutes().forEach((route) => {
         console.log(`${route.method} http://localhost:3000${route.path}`)
    })
});
```

修改 controller/user.ts 让他放回 token， 这个token 非常的简单，就是存储了我们的 user 信息。

```
import * as Koa from 'koa';
import UserUtil, { User } from '../model/user';
import * as ph from 'password-hash';
import * as jwt from 'jsonwebtoken';

var secret = 'todo-app';

function getFields(ctx: Koa.Context, next) : [string, string, string]{
    try{
        const { username, email, password } = ctx.request.fields
        return [username, email, password];
    }catch(e){
        console.error(e);
        ctx.status = 422;
        ctx.body = '[Unprocesable entity] \n验证失败，必须传递 username/email/password 三个字段';
    }
}

function exceptPassword(user: any){
    user = JSON.parse(JSON.stringify(user));
    if(user.password) delete user.password;
    return user;
}

export default {    
    async register(ctx: Koa.Context, next) {
        const [username, email, password] = getFields(ctx, next);
        try{
            const user = await UserUtil.createUser({
                username,
                email,
                password
            });
            const ret = exceptPassword(user);
            ctx.body = jwt.sign(ret, secret);
        }catch (e){
            console.error(e);
            ctx.status = 422;
            // ctx.body = '[Unprocesable entity] \n验证失败，' + e.errors[0].message;
        }
        await next();
    },

    async login(ctx: Koa.Context, next) {
        const [_, email, password] = getFields(ctx, next);
        ctx.status = 400;
        try{
            const db_user = await User.findOne({
                where: {
                    email
                }
            });
            if(ph.verify(password, db_user.password)){
                ctx.status = 200;
                const ret = exceptPassword(db_user);
                ctx.body = jwt.sign(ret, secret);
            }else{
                ctx.body = "密码不正确";
            }
        }catch(e){
            console.error(e);
            // ctx.body = e.errors[0].message;
        }

        await next();
    }
}
```

这样我们就保证了不是谁都可以请求我们的 todo 和 folder api 了。