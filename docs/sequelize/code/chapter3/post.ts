export default (sequelize, dataTypes) => {
  const Post = sequelize.define('Post', {
    title: dataTypes.STRING,
    content: dataTypes.TEXT,
  });

  Post.associate = function(models) {
    this.hasMany(models.Comment, {
      foreignKey: 'type_id',
      constraints: false,
      scope: {
        type: 'post'
      }
    });
  }

 return Post;
}