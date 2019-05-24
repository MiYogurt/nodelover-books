import Sequelize from 'sequelize';
import {UserInstance, UserAttributes} from './User'

export interface BookAttributes {
  status: "inSale" | "noSale";
  description: string;
  title: string;
  author: string;

  User?: UserAttributes | Sequelize.BelongsToGetAssociationMixin<UserInstance>;
}


export interface BookInstance extends Sequelize.Instance<BookAttributes>, BookAttributes{
  id: number;
  createdAt: Date;
  updatedAt: Date;

  setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, number>;
  createUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes>;
  User: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
}

export default function BookDefine(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes): Sequelize.Model<BookInstance, BookAttributes> {
  const S = dataTypes;
  const Book =  sequelize.define<BookInstance, BookAttributes>('Book', {
    id: {
        type: S.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    description: S.TEXT,
    status: {
        type: S.ENUM,
        values: ['inSale', 'noSale'],
        validate: {
            isIn: {
                args: [['inSale', 'noSale']],
                msg: "status field must be inSale or noSale"
            }
        }
    },
    title:{
        type: S.STRING,
        allowNull: false,
        get(this: BookInstance) {
            return this.getDataValue('author') + ' - ' + this.getDataValue('title');
        }
    },
    author: {
        type: S.STRING,
        allowNull: false,
        set(val: string){
            this.setDataValue('author', val.toLowerCase());
        }
    }},{
        comment: "图书表", // 表注释
        indexes: [  // 表索引
            {
                fields: ['id']
            }
        ]
    });

    (Book as any).associate = function(this: typeof Book, models: any){
        (Book as any).User = this.belongsTo(models.User);

    }

    return Book;
}