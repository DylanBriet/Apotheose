import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/client.js';

class Stat extends Model {}

Stat.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Stat',
});

export default Stat;
