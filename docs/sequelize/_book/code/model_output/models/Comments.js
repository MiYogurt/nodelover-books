/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type_id: {
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
    },
    PostId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Posts',
        key: 'id'
      }
    },
    ImageId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Images',
        key: 'id'
      }
    }
  }, {
    tableName: 'Comments'
  });
};
