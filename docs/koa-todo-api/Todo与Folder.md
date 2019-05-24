
## 增加 Todo 的一些业务

在 controller 下面新建 todo.ts, 为了更加的健壮大家可以自行把 catch 里面的逻辑补完。

```
import * as Koa from 'koa';
import { Todo } from '../model/todo';

export default {
     async create(ctx: Koa.Context, next){
        try {
            const { todo_folder_id, text, completed } = ctx.request.fields;
            let todo = await Todo.create({
                todo_folder_id,
                text,
                completed
            });
            ctx.body = todo;
        } catch (e) {
          console.error(e);
        }

    },

    async edit(ctx: Koa.Context, next){
        try {
            const { text = null, completed = null, todo_folder_id = null } = ctx.request.fields;
            const id = ctx.params.id;
            const todo = await Todo.findOne({
                where: {
                    id
                }
            });

            if(text) todo.text = text;
            if(completed) todo.completed = completed;
            if(todo_folder_id) todo.todo_folder_id = todo_folder_id;
            await todo.save();

            ctx.body = todo;
            
        } catch (error) {
            console.error(error);
        }
    },

    async show(ctx: Koa.Context, next){
        try {
            const id = ctx.params.id
            const todo = await Todo.findOne({
                where: {
                    id
                }
            });
            ctx.body = todo;
        } catch (error) {
            console.error(error)
        }
    },

    async delete(ctx: Koa.Context, next){
        try {
            const id = ctx.params['id'];
            await Todo.destroy({
                where: {
                   id
                }
            });
            ctx.body = "删除成功";
        } catch (error) {
            console.error(error);
        }
    }
}
```

增加路由

```
api.get('/todo/:id', TodoController.show);
api.post('/todo', TodoController.create);
api.put('/todo/:id', TodoController.edit);
api.del('/todo/:id', TodoController.delete);
```

## 增加 folder 业务逻辑

在controller 目录下面新建 folder.ts

```
import { TodoFolder } from '../model/todoFolder'
import * as Koa from 'koa';
import { Todo } from '../model/todo';

function getFields(ctx: Koa.Context, next){
    try {
        const { user_id, title } = ctx.request.fields;
        return [ user_id, title ];
    } catch (e) {
        console.error(e);
        ctx.status = 422;
        ctx.body = '[Unprocesable entity] \n验证失败，必须传递 user_id/title 字段';
    }
}

export default {
    async create(ctx: Koa.Context, next){
        const [ user_id, title ] = getFields(ctx, next);
        try {
            const folder = await TodoFolder.create({
                user_id,
                title
            });
            ctx.body = folder;
        } catch (e) {
            ctx.body = e.errors[0].message;
        }

    },

    async edit(ctx: Koa.Context, next){
        try{
            const id = ctx.params.id;
            const { title } = ctx.request.fields;

            let folder = await TodoFolder.findOne({
                where:{
                    id
                }
            });
            if(title) folder.title = title;
            await folder.save();
            ctx.body = folder;
        }catch (e) {
            console.error(e);
        }
    },

    async show(ctx: Koa.Context, next){
        try {
            const id = ctx.params.id
            const folder = await TodoFolder.findOne({
                where: {
                    id
                }
            });
            ctx.body = folder;
        } catch (error) {
            ctx.status = 422;
            ctx.body = '[Unprocesable entity] \n 验证失败，必须传递 folder_id 字段';
        }
    },
    async delete(ctx: Koa.Context, next){
        try {
            const id = ctx.params.id;

            await Todo.destroy({
                where: {
                    'todo_folder_id': id
                }
            });

            await TodoFolder.destroy({
                where: {
                    id
                }
            });

            ctx.body = "删除成功";
        } catch (error) {
            ctx.status = 422;
            ctx.body = '[Unprocesable entity] \n验证失败，必须传递 folder_id 字段';
        }
    }
}
```

# 增加路由

```
api.get('/folder/:id', FolderController.show);
api.post('/folder', FolderController.create);
api.put('/folder/:id', FolderController.edit);
api.del('/folder/:id', FolderController.delete);
```
