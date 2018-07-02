import Sequelize from 'sequelize';

const S = Sequelize;

export interface PhoneAttributes {
  type: string;
  name: string;
}

export interface PhoneInstance extends Sequelize.Instance<PhoneAttributes> {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  type: string;
  name: string;
}

export default function PhoneDefine(sequelize: Sequelize.Sequelize, dataTypes: Sequelize.DataTypes) {
  return sequelize.define<PhoneInstance, PhoneAttributes>('Phone', {
    type: dataTypes.STRING,
    name: dataTypes.STRING
  })
}





