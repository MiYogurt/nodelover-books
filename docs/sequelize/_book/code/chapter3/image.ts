export default (sequelize, dataTypes) => {
  const Image = sequelize.define('Image', {
    title: dataTypes.STRING,
    imageURL: dataTypes.STRING,
  });

  Image.associate = function(models) {
    this.hasMany(models.Comment, {
      foreignKey: 'type_id',
      constraints: false,
      scope: {
        type: 'image'
      }
    });
  }

  return Image;
}