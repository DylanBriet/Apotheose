import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/client.js';

class User extends Model {}

User.init({
  pseudo: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  modelName: 'User', 
  scopes: {
    withCharacters: {
      include: [{
        association: 'characters', 
      }],
    },
    withGames: {
      include: [{
        association: 'games', 
      }],
    },
    withCharactersAndGames: {
      include: [
        { association: 'characters' },
        { association: 'games' },
      ],
    },
  },
});

export default User;
