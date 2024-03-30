import { Game, Character } from '../models/index.js';
import { z } from 'zod';
import generateController from './generateController.js';


const gameSchema = z.object({
    name: z.string().min(1),
    campaign: z.string().optional(),
    status_id: z.number().int(),
    note_id: z.number().int().optional(),
  });

  const gameControllerGenerique = generateController(Game, gameSchema);

  const gameController = {
    ...gameControllerGenerique,
  
    async addCharacterToGame(req, res) {
      const { gameId, characterId } = req.params;
      try {
        const game = await Game.findByPk(gameId);
        const character = await Character.findByPk(characterId);
  
        if (!game || !character) {
          return res.status(404).send({ message: "Game or Character not found." });
        }
  
        await game.addCharacter(character); 
  
        const updatedGame = await Game.findByPk(gameId, {
          include: 'characters', 
        });
  
        res.json(updatedGame);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  
    async removeCharacterFromGame(req, res) {
      const { gameId, characterId } = req.params;
      try {
        const game = await Game.findByPk(gameId);
        const character = await Character.findByPk(characterId);
  
        if (!game || !character) {
          return res.status(404).send({ message: "Game or Character not found." });
        }
  
        await game.removeCharacter(character); 
        const updatedGame = await Game.findByPk(gameId, {
          include: 'characters', 
        });
  
        res.json(updatedGame);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    },
  };
  
  export default gameController;
  