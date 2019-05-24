/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    o: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'bs'
  });
};
