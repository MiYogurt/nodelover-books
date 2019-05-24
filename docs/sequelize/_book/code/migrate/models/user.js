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
        models.User.Book = models.User.hasOne(models.Book, {
          foreignKey: 'authorId'
        });
        models.Book.User = models.Book.belongsTo(models.User, {
          foreignKey: 'authorId'
        });
      }
    }
  });
  return User;
};