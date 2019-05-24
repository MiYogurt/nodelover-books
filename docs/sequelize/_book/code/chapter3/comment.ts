export default (sequelize, dataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: dataTypes.STRING,
    type: dataTypes.STRING,
    type_id: dataTypes.INTEGER
  });

  Comment.associate = function(models) {
    this.belongsTo(models.Post);
    this.belongsTo(models.Image);
  }

  return Comment;

}