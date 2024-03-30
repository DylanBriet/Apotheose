import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/client.js';

class Character extends Model {}

Character.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  health: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100, 
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Character',

  scopes: {
    withStats: {
      include: [{
        association: 'stats', 
      }],
    },
    withClasses: {
      include: [{
        association: 'classes', 
      }],
    },
    withSkills: {
      include: [{
        association: 'skills', 
      }],
    },
    withSpells: {
      include: [{
        association: 'spells', 
      }],
    },
    withInventories: {
      include: [{
        association: 'inventories', 
        where: { is_equipped: true }, 
      }],
    },
    withAll: {
      include: ['stats', 'classes', 'skills', 'spells', 'inventories'] 
    }
  },
});

export default Character;
