import Sequelize from 'sequelize';

const sequelize = new Sequelize('nodelover', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

const Post = sequelize.define('Post', {});

const ItemTag = sequelize.define('item_tag', {
  tag_id: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.STRING
  },
  type_id: {
    type: Sequelize.INTEGER
  }
});

const Tag = sequelize.define('tag', {
  name: Sequelize.STRING
});

Post.belongsToMany(Tag, {
  through: {
    model: ItemTag,
    scope: {
      type: 'post'
    }
  },
  foreignKey: 'type_id',
  constraints: false
});

Tag.belongsToMany(Post, {
  through: {
    model: ItemTag,
    scope: {
      type: 'post'
    }
  },
  foreignKey: 'tag_id',
  constraints: false
});


(async () => {
  await sequelize.sync();
  let post = await Post.create();
  await (post as any).createTag({name: '春风'});

  let tag = await Tag.create({name:'夏雨'});

  await (tag as any).createPost();
})();

