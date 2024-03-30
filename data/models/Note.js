import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/client.js';

class Note extends Model {}

Note.init({
  value: {
    type: DataTypes.TEXT,
    allowNull: false, 
  },
}, {
  sequelize,
  modelName: 'Note',
 
});

export default Note;
