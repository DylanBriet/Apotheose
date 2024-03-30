
import { User, Character, Stat, Class, Skill, Spell, Inventory, Status, Note, Game } from './models';
import sequelize from './client.js';



User.hasMany(Character, { foreignKey: 'user_id', as: 'characters' });
User.hasMany(Game, { foreignKey: 'user_id', as: 'games' });


Character.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Character.belongsTo(Game, { foreignKey: 'game_id', as: 'game' });
Character.belongsToMany(Stat, { through: 'char_has_stat', foreignKey: 'char_id', otherKey: 'stat_id', as: 'stats' });
Character.belongsToMany(Class, { through: 'char_is_class', foreignKey: 'char_id', otherKey: 'class_id', as: 'classes' });
Character.belongsToMany(Skill, { through: 'char_knows_skill', foreignKey: 'char_id', otherKey: 'skill_id', as: 'skills' });
Character.belongsToMany(Spell, { through: 'char_masters_spell', foreignKey: 'char_id', otherKey: 'spell_id', as: 'spells' });
Character.belongsToMany(Inventory, { through: 'char_possesses_inventory', foreignKey: 'char_id', otherKey: 'inventory_id', as: 'inventories' });


Game.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });
Game.belongsTo(Note, { foreignKey: 'note_id', as: 'note' });
Game.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Game.hasMany(Character, { foreignKey: 'game_id', as: 'characters' });


export {
  sequelize,
  User,
  Character,
  Stat,
  Class,
  Skill,
  Spell,
  Inventory,
  Status,
  Note,
  Game,
};
