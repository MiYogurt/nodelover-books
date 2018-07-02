# Migrate

首先安装以下工具 （工具不提供 ts 支持）

```ts
npm install -g sequelize-cli
```

```bash
mkdir models && cd models
npm init -y
npm i sequelize mysql2 -S
```

在安装了 sequelize 的 node 项目中运行以下，便可看到如下信息。

```bash
$ sequelize

Sequelize [Node: 8.1.2, CLI: 2.7.0, ORM: 4.2.0]

Usage
  sequelize [task] [OPTIONS...]
Available tasks
  db:migrate             Run pending migrations.
  db:migrate:old_schema  Update legacy migration table
  db:migrate:status      List the status of all migrations
  db:migrate:undo        Reverts a migration.
  db:migrate:undo:all    Revert all migrations ran.
  db:seed                Run specified seeder.
  db:seed:all            Run every seeder.
  db:seed:undo           Deletes data from the database.
  db:seed:undo:all       Deletes data from the database.
  help                   Display this help text. Aliases: h
  init                   Initializes the project. [init:config, init:migrations, init:seeders, init:models]
  init:config            Initializes the configuration.
  init:migrations        Initializes the migrations.
  init:models            Initializes the models.
  init:seeders           Initializes the seeders.
  migration:create       Generates a new migration file. Aliases: migration:generate
  model:create           Generates a model and its migration. Aliases: model:generate
  seed:create            Generates a new seed file. Aliases: seed:generate
  version                Prints the version number. Aliases: v
Available manuals
  help:db:migrate             The documentation for "sequelize db:migrate".
  help:db:migrate:old_schema  The documentation for "sequelize db:migrate:old_schema".
  help:db:migrate:status      The documentation for "sequelize db:migrate:status".
  help:db:migrate:undo        The documentation for "sequelize db:migrate:undo".
  help:db:migrate:undo:all    The documentation for "sequelize db:migrate:undo:all".
  help:db:seed                The documentation for "sequelize db:seed".
  help:db:seed:all            The documentation for "sequelize db:seed:all".
  help:db:seed:undo           The documentation for "sequelize db:seed:undo".
  help:db:seed:undo:all       The documentation for "sequelize db:seed:undo:all".
  help:init                   The documentation for "sequelize init".
  help:init:config            The documentation for "sequelize init:config".
  help:init:migrations        The documentation for "sequelize init:migrations".
  help:init:models            The documentation for "sequelize init:models".
  help:init:seeders           The documentation for "sequelize init:seeders".
  help:migration:create       The documentation for "sequelize migration:create".
  help:model:create           The documentation for "sequelize model:create".
  help:seed:create            The documentation for "sequelize seed:create".
  help:version                The documentation for "sequelize version".
```

对于命令可以通过 help:xxxx 来查看帮助。

### 初始化

运行 `sequelize init` 进行初始化，该命令是以下命令的总和。

```bash
init:config            Initializes the configuration.
init:migrations        Initializes the migrations.
init:models            Initializes the models.
init:seeders           Initializes the seeders.
```

此时我们会得到几个文件夹 config / migrations / models/ seeders

config 是 sequelize 的配置目录，比如数据库地址等等，有好几个环境的配置项。
migrations 是通过 js 文件里面定义好的创建数据表。修改数据库表的文件。
models 就是我们自己定义模型的地方
seeders 就是填充假数据的地方

### 查看如何创建一个模型

运行一下 sequelize help:model:create 命令，可以看到如下信息。

```
$ sequelize help:model:create

Sequelize [Node: 8.1.2, CLI: 2.7.0, ORM: 4.2.0]

Loaded configuration file "config/config.json".
Using environment "development".
COMMANDS
    sequelize model:create   -- Generates a model and its migration.
    sequelize model:generate -- Generates a model and its migration.
DESCRIPTION
    This task generates a model file and its respective migration.
    It is necessary to specify the name of the new model as well as
    the model's attributes.

    The attributes can be specified as in the following (and semantically equal) examples:

    sequelize model:create --name User --attributes first_name:string,last_name:string,bio:text
    sequelize model:create --name User --attributes 'first_name:string last_name:string bio:text'
    sequelize model:create --name User --attributes 'first_name:string, last_name:string, bio:text'

    This command will generate a new migration and model definition:

    // the model file
    // located under models/user.js
    'use strict';
    module.exports = function(sequelize, DataTypes) {
      var User = sequelize.define('User', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        bio: DataTypes.TEXT
      }, {
        classMethods: {
          associate: function(models) {
            // associations can be defined here
          }
        }
      });
      return User;
    };

    // the migration file
    // located under migrations/20170628070436-create-user.js
    'use strict';
    module.exports = {
      up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          first_name: {
            type: Sequelize.STRING
          },
          last_name: {
            type: Sequelize.STRING
          },
          bio: {
            type: Sequelize.TEXT
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
          }
        });
      },
      down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('Users');
      }
    };
```


紧接着我们再运行一下 

```ts
sequelize model:create --name User --attributes first_name:string,last_name:string,bio:text
sequelize model:create --name Book --attributes title:string,authorId:integer,desc:text
```

再来看看 models 文件夹和 migrations 文件夹就会发现出现了一些文件。

在 `migrations/xxxxx-create-user.js` 文件里面会看到，`queryInterface.createTable`很明显就是创建一个数据表而 `queryInterface.dropTable`就是删除一个数据表。

queryInterface 气死在 d.ts 文件里面可以找到，在 `4206 - 4329` 行，大家可以自己查找他能使用的方法。

### 定义一下关系

models/user.js

```js
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.User.hasMany(models.Book)
        models.Book.belongsTo(models.User);
      }
    }
```

### 解决无法关联的问题

接下来我们来测试一下方法

在项目根目录下面新建 index.js

```js
const db = require('./models');

console.dir(db.sequelize.models.User)
```

运行一下，会发现 User 并没有与 Book 建立联系，这是什么情况呢？但是确实又是在对象里面看到了有`classMethods` 这个东西。

然后我们再来到 models/index.js 修改一下 27 行、

```js
Object.keys(db).forEach(function(modelName) {
  console.dir(db[modelName].options.classMethods.associate);
  console.log(db[modelName].associate);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
```

打印如下（index.js 是项目跟目录下面的）

```
$ node index.js
[Function: associate]
undefined
[Function: associate]
undefined
```

这很明显，classMethods 上面的方法，没有代理到对象上面去。而且在之前也提到过 v4 版本好像不再支持 这种做法，所以，我们可以自己修改一下。

```
Object.keys(db).forEach(function(modelName) {
  const associate = db[modelName].options.classMethods.associate;
  associate && associate(db);
});
```

之后再次运行

```bash
$ node index.js | grep Book
     models: { Book: [Object], User: [Circular] },
   { Books:
        as: 'Books',
        associationAccessor: 'Books',
```

很明显这一次就成功的进行了关联。

### 再次修改并，保存一下联系

```js
associate: function(models) {
   // associations can be defined here
   models.User.Book = models.User.hasOne(models.Book, {
     foreignKey: 'authorId'
   });
   models.Book.User = models.Book.belongsTo(models.User, {
     foreignKey: 'authorId'
   });
 }
```

### seeder 填充

新建一个填充文件

```bash
sequelize seed:create --name create_users
```

安装假数据生成工具

```bash
npm i -D faker
```

假数据生成工具支持的配置[请点这里](https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html#lorem)

修改文件代码如下。

```js
'use strict';

const faker = require('faker');
faker.locale = "zh_CN";

const db = require('../models')

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    const Users = Array.from({length:20}, () => {
      return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        bio: faker.name.jobTitle(),
        Book: {
          title: faker.lorem.word(),
          desc: faker.lorem.sentence()
        }
      }
    });
    const User = db.sequelize.models.User;
    return Promise.all(Users.map((item) => {
      return User.create(item, {
        include: [ User.Book ]
      });
    }))
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Person', null, {});
  }
};

```

> 对于上面代码，觉得很难的自己用最简单的 queryInterface.bulkInsert 去插入数据就行了。
> 嵌套的这种形式，我找了一下 API 发现只有 create 支持。

运行命令 `sequelize db:migrate:status` 查看当前 数据库表创建的情况

```
down 20170628070615-create-user.js
down 20170628070751-create-book.js
```

这里表示我们没有创建表。创建了之后会是 `up` 状态。


运行 `sequelize db:migrate` 

```
$ sequelize db:migrate

Sequelize [Node: 8.1.2, CLI: 2.7.0, ORM: 4.2.0]

Loaded configuration file "config/config.json".
Using environment "development".
== 20170628070615-create-user: migrating =======
== 20170628070615-create-user: migrated (0.100s)
== 20170628070751-create-book: migrating =======
== 20170628070751-create-book: migrated (0.261s)
=
```

此时数据库里面以及有了表了。而且多了一个表`SequelizeMeta` 这个是用来继续迁移的表。


```
$ sequelize db:migrate:undo:all

Sequelize [Node: 8.1.2, CLI: 2.7.0, ORM: 4.2.0]

Loaded configuration file "config/config.json".
Using environment "development".
== 20170628070751-create-book: reverting =======
== 20170628070751-create-book: reverted (0.017s)
== 20170628070615-create-user: reverting =======
== 20170628070615-create-user: reverted (0.008s)

```

`sequelize db:migrate:undo:all` 可以撤销刚刚所迁移的数据表，前提是你的 migarations 文件里面有写这个 down 方法。这种操作被称为回滚。`undo:all` 是撤销全部，而`undo`就是撤销一步。

```
down: function(queryInterface, Sequelize) {
	return queryInterface.dropTable('Books');
}
```

接下来继续运行命令

```
sequelize db:migrate
sequelize db:seed:all
```

便可在数据库里面看到数据，不过此操作也是可以回滚的，通过`seed:undo:all`即可。当然前提是你在代码里面以及定义了如何回滚。也就是`down`方法。

