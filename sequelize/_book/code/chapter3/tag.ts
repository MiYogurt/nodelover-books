import Sequelize from 'sequelize';
import {UserAttributes, UserInstance} from './user';

export interface TagAttributes {
  name: string;
}

export interface TagInstance extends Sequelize.Instance<TagAttributes>, TagAttributes {
  id: number;

  getUsers: Sequelize.BelongsToManyGetAssociationsMixin<UserInstance>,
  addUsers: Sequelize.BelongsToManyAddAssociationsMixin<UserInstance, number, any>,
  addUser: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, number, any>,
  setUser: Sequelize.BelongsToManySetAssociationsMixin<UserInstance, number, any>,
  countUsers: Sequelize.BelongsToManyCountAssociationsMixin,
  createUser: Sequelize.BelongsToManyCreateAssociationMixin<UserAttributes, UserInstance, any>,
  hasUser: Sequelize.BelongsToManyHasAssociationMixin<UserInstance, number>,
  hasUsers: Sequelize.BelongsToManyHasAssociationsMixin<UserInstance, number>,
  removeUser: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, number>,
  removeUsers: Sequelize.BelongsToManyRemoveAssociationsMixin<UserInstance, number>,
  
}

export default function TagDefine(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): Sequelize.Model<TagInstance, TagAttributes>  {
    const S = dataTypes;
    const Tag = sequelize.define<TagInstance, TagAttributes>('Tag', {
        name: S.STRING
    }, {
        timestamps: false
    });

    (Tag as any).associate = function(this: typeof Tag, models){
        this.belongsToMany(models.User, {through: 'user_tag'});
    }
    
    return Tag;
}