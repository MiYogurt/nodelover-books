import Sequelize from 'sequelize';
import {BookAttributes,BookInstance} from './book';
import { TagAttributes, TagInstance } from './tag';

export interface UserAttributes {
  email: string;
  name: string;
  Tags?: TagAttributes[];
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  say(): void;

//   Book: Sequelize.HasOneGetAssociationMixin<BookInstance>,
//   setBook: Sequelize.HasOneSetAssociationMixin<BookAttributes, number>,
//   createBook: Sequelize.HasOneCreateAssociationMixin<BookAttributes>,


  getBooks: Sequelize.HasManyGetAssociationsMixin<BookInstance>,
  createBook: Sequelize.HasManyCreateAssociationMixin<BookAttributes, BookInstance>,
  addBook: Sequelize.HasManyAddAssociationMixin<BookInstance, number>,
  addBooks: Sequelize.HasManyAddAssociationsMixin<BookInstance, number>,
  hasBook: Sequelize.HasManyHasAssociationMixin<BookInstance, number>,
  hasBooks: Sequelize.HasManyHasAssociationsMixin<BookInstance, number>,
  removeBook: Sequelize.HasManyRemoveAssociationMixin<BookInstance, number>,
  removeBooks: Sequelize.HasManyRemoveAssociationsMixin<BookInstance, number>,
  countBooks: Sequelize.HasManyCountAssociationsMixin,


  getTags: Sequelize.BelongsToManyGetAssociationsMixin<TagInstance>,
  addTags: Sequelize.BelongsToManyAddAssociationsMixin<TagInstance, number, any>,
  addTag: Sequelize.BelongsToManyAddAssociationMixin<TagInstance, number, any>,
  setTag: Sequelize.BelongsToManySetAssociationsMixin<TagInstance, number, any>,
  countTags: Sequelize.BelongsToManyCountAssociationsMixin,
  createTag: Sequelize.BelongsToManyCreateAssociationMixin<TagAttributes, TagInstance, any>,
  hasTag: Sequelize.BelongsToManyHasAssociationMixin<TagInstance, number>,
  hasTags: Sequelize.BelongsToManyHasAssociationsMixin<TagInstance, number>,
  removeTag: Sequelize.BelongsToManyRemoveAssociationMixin<TagInstance, number>,
  removeTags: Sequelize.BelongsToManyRemoveAssociationsMixin<TagInstance, number>,
}

export default function UserDefine(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes>  {
    const S = dataTypes;
    const User = sequelize.define<UserInstance, UserAttributes>
    ('User', {
        email: S.STRING,
        name: S.STRING
    });

    (User as any).prototype.say = function(this: UserInstance) {
        console.log('name ' + this.name);
    };

    (User as any).associate = function(this: typeof User,models){
        // this.hasOne(models.Book);
        (User as any).Book = this.hasMany(models.Book);
        (User as any).Tag = this.belongsToMany(models.Tag, { through: 'user_tag'});
    }
    return User;
}