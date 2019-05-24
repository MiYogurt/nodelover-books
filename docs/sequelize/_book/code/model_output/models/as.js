/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('as', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    a: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    bId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'bs',
        key: 'id'
      }
    }
  }, {
    tableName: 'as'
  });
};
