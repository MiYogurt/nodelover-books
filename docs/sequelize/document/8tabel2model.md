# 根据 Table 生成 Model

实现这个需求其实非常的简单，因为官方已经提供给了我们解决方案使用 `sequelize-auto`

这个插件的地址 github repo `https://github.com/sequelize/sequelize-auto`

```
npm install -g sequelize-auto mysql
```

之所以安装 mysql 而不是 mysql2 是因为这个插件里面的 sequelize 还是3.x 版本。

之后运行

```
sequelize-auto -o "./models" -d nodelover -h 127.0.0.1 -u root -p 3306 -x '' -e mysql
```

-d 是数据库名称
-e 是数据库类别
-x 是密码
-o 是输出地址

目前我得到以下输出

```ts
Executing (default): SHOW TABLES;
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'Books'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'Comments'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'Images'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'Posts'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'Tags'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'Users'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'as'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'bs'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): SELECT         K.CONSTRAINT_NAME as constraint_name       , K.CONSTRAINT_SCHEMA as source_schema       , K.TABLE_SCHEMA as source_table       , K.COLUMN_NAME as source_column       , K.REFERENCED_TABLE_SCHEMA AS target_schema       , K.REFERENCED_TABLE_NAME AS target_table       , K.REFERENCED_COLUMN_NAME AS target_column       , C.extra       , C.COLUMN_KEY AS column_key       FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS K       LEFT JOIN INFORMATION_SCHEMA.COLUMNS AS C         ON C.TABLE_NAME = K.TABLE_NAME AND C.COLUMN_NAME = K.COLUMN_NAME       WHERE         K.TABLE_NAME = 'user_tag'         AND K.CONSTRAINT_SCHEMA = 'nodelover';
Executing (default): DESCRIBE `Books`;
Executing (default): DESCRIBE `Comments`;
Executing (default): DESCRIBE `Images`;
Executing (default): DESCRIBE `Posts`;
Executing (default): DESCRIBE `Tags`;
Executing (default): DESCRIBE `Users`;
Executing (default): DESCRIBE `as`;
Executing (default): DESCRIBE `bs`;
Executing (default): DESCRIBE `user_tag`;
Done!
```

打开文件也看到了对应的文件。

