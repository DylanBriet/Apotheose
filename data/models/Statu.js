import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/client.js';

class Status extends Model {}

Status.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Status',
});

export default Status;
