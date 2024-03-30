import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/client.js';

class CharPossessesInventory extends Model {}

CharPossessesInventory.init({
  char_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Character', 
      key: 'id',
    },
  },
  inventory_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Inventory',
      key: 'id',
    },
  },
  is_equipped: DataTypes.BOOLEAN,
}, { 
  sequelize, 
  modelName: 'CharPossessesInventory', 
  tableName: 'char_possesses_inventory' 
});

export default CharPossessesInventory;