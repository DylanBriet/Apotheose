import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/client.js';

class Skill extends Model {}

Skill.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'Skill',
  scopes: {
    activeSkills: {
      where: { is_active: true },
    },
    inactiveSkills: {
      where: { is_active: false },
    },
  },
});

export default Skill;
