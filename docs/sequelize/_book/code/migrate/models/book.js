'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    authorId: DataTypes.INTEGER,
    desc: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Book;
};