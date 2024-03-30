import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/client.js';

class Inventory extends Model {}

Inventory.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
 
}, {
  sequelize,
  modelName: 'Inventory',
});

export default Inventory;
