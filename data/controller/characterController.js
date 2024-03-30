import { Character, Game, Skill, Spell, User, Inventory, Class } from '../models/index.js';
import generateController from './generateController.js';
import { z } from 'zod';

const characterSchema = z.object({
    name: z.string().min(1),
    experience: z.number().int().min(0),
    level: z.number().int().min(1),
    health: z.number().int().min(1),
    user_id: z.number().int(),
    game_id: z.number().int(),
  });


const characterControllerGenerique = generateController(Character, characterSchema);


const characterController = {
    ...characterControllerGenerique,
  
    clone: async (req, res) => {
        const { id } = req.params;
        try {
            const clonedCharacter = await characterController.cloneCharacter(id); 
            res.json(clonedCharacter);
        } catch (error) {
            res.status(500).send({ message: error.message || 'Internal Server Error' });
        }
    },
    
      cloneCharacter: async (characterId) => {
        try {
          const originalCharacter = await Character.findByPk(characterId, {
            include: [{ all: true }]
          });
    
          if (!originalCharacter) {
            throw new Error('Character not found');
          }
    
          const clonedData = { ...originalCharacter.get({ plain: true }), id: undefined, created_at: undefined, updated_at: undefined };
          const clonedCharacter = await Character.create(clonedData);
    
          return clonedCharacter;
        } catch (error) {
          console.error('Error cloning character:', error);
          throw error;
        }
      },

    async addSkillToCharacter(req, res) {
      const { characterId, skillId } = req.params;
      try {
        const character = await Character.findByPk(characterId);
        const skill = await Skill.findByPk(skillId);
  
        if (!character || !skill) {
          return res.status(404).send({ message: "Character or Skill not found." });
        }
  
        await character.addSkill(skill);
  
        const updatedCharacter = await Character.findByPk(characterId, {
          include: ['skills', 'spells', 'inventories'], 
        });
  
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  
    async removeSkillFromCharacter(req, res) {
      const { characterId, skillId } = req.params;
      try {
        const character = await Character.findByPk(characterId);
        const skill = await Skill.findByPk(skillId);
  
        if (!character || !skill) {
          return res.status(404).send({ message: "Character or Skill not found." });
        }
  
        await character.removeSkill(skill);
  
        const updatedCharacter = await Character.findByPk(characterId, {
          include: ['skills', 'spells', 'inventories'], 
        });
  
        res.json(updatedCharacter);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },

    async assignCharacterToUser(req, res) {
        const { characterId, userId } = req.params;
        try {
          const user = await User.findByPk(userId);
          const character = await Character.findByPk(characterId);
      
          if (!user) {
            return res.status(404).send({ message: "User not found." });
          }
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
      
          await character.setUser(user);
      
          const updatedCharacter = await Character.findByPk(characterId, {
            include: [{ association: 'user' }]
          });
      
          res.json(updatedCharacter);
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },

      async removeCharacterFromUser(req, res) {
        const { characterId } = req.params;
        try {
          const character = await Character.findByPk(characterId);
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }

          await character.setUser(null);

          res.status(200).send({ message: "Character disassociated from user successfully." });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
  
      async addClassToCharacter(req, res) {
        const { characterId, classId } = req.params;
        try {
          const character = await Character.findByPk(characterId);
          const characterClass = await Class.findByPk(classId);

          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
          if (!characterClass) {
            return res.status(404).send({ message: "Class not found." });
          }
      
          await character.addClass(characterClass);

          res.status(200).send({ message: "Class added to character successfully." });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      async removeClassFromCharacter(req, res) {
        const { characterId, classId } = req.params;

        const characterClass = await Class.findByPk(classId);

        try {
          const character = await Character.findByPk(characterId);
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }

          if (!characterClass) {
            return res.status(404).send({ message: "Class not found." });
          }
      
        await character.removeClass(characterClass);
      
          res.status(200).send({ message: "Class removed from character successfully." });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },

      async addSpellToCharacter(req, res) {
        const { characterId, spellId } = req.params;
        try {
          const character = await Character.findByPk(characterId);
          const spell = await Spell.findByPk(spellId);
          
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
      
          if (!spell) {
            return res.status(404).send({ message: "Spell not found." });
          }
      
          await character.addSpell(spell);
      
          res.status(200).send({ message: "Spell added to character successfully." });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      async removeSpellFromCharacter(req, res) {
        const { characterId, spellId } = req.params;
        try {
          const character = await Character.findByPk(characterId);
          const spell = await Spell.findByPk(spellId);
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
      
          if (!spell) {
            return res.status(404).send({ message: "Spell not found." });
          }
      
          await character.removeSpell(spell);
      
          res.status(200).send({ message: "Spell removed from character successfully." });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      async addInventoryToCharacter(req, res) {
        const { characterId, inventoryId } = req.params;
        const { isEquipped } = req.body; 
        try {
          const character = await Character.findByPk(characterId);
          const inventoryItem = await Inventory.findByPk(inventoryId);
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
          if (!inventoryItem) {
            return res.status(404).send({ message: "Inventory item not found." });
          }
      
          await character.addInventory(inventoryItem, { through: { is_equipped: isEquipped } });
      
          res.status(200).send({ message: "Inventory item added to character successfully." }); 
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      async removeInventoryFromCharacter(req, res) {
        const { characterId, inventoryId } = req.params;
        try {
          const character = await Character.findByPk(characterId);
          const inventoryItem = await Inventory.findByPk(inventoryId);
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
          if (!inventoryItem) {
            return res.status(404).send({ message: "Inventory item not found." });
          }
      
          await character.removeInventory(inventoryItem);
      
          res.status(200).send({ message: "Inventory item removed from character successfully." });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      async addStatToCharacter(req, res) {
        const { characterId, statId } = req.params;
        try {
          const character = await Character.findByPk(characterId);
          const stat = await Stat.findByPk(statId);
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
          if (!stat) {
            return res.status(404).send({ message: "Stat not found." });
          }
      
          await character.addStat(stat);
      
          res.status(200).send({ message: "Stat added to character successfully." });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
      async removeStatFromCharacter(req, res) {
        const { characterId, statId } = req.params;
        try {
          const character = await Character.findByPk(characterId);
          const stat = await Stat.findByPk(statId);
      
          if (!character) {
            return res.status(404).send({ message: "Character not found." });
          }
          if (!stat) {
            return res.status(404).send({ message: "Stat not found." });
          }
      
          await character.removeStat(stat);
      
          res.status(200).send({ message: "Stat removed from character successfully." });
        } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
      },
      
  
  };
  
  export default characterController;
  