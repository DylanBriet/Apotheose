import { z } from 'zod';
import { User, Game } from '../models/index.js';
import generateController from './generateController.js';

const userSchema = z.object({
  pseudo: z.string().min(1),
  password: z.string().min(1), 
});


const userControllerGenerique = generateController(User, userSchema);

const userController = {
    ...userControllerGenerique,
  
    async associateUserToGame(req, res, next) {
      const userId = req.params.userId;
      const gameId = req.body.gameId;
      try {
        const game = await Game.findByPk(gameId);
        const user = await User.findByPk(userId);
  
        if (!game || !user) {
          next(); 
          return;
        }
        await user.addGame(game);
  
        const userWithGames = await User.findByPk(userId, {
          include: 'games', 
        });
  
        res.json(userWithGames);
      } catch (error) {
        console.trace(error);
        res.status(500).send('Internal Server Error');
      }
    },
  
    async dissociateUserFromGame(req, res, next) {
      const userId = req.params.userId;
      const gameId = req.params.gameId;
      try {
        const game = await Game.findByPk(gameId);
        const user = await User.findByPk(userId);
  
        if (!game || !user) {
          next(); 
          return;
        }
        await user.removeGame(game);
  
        const userWithGames = await User.findByPk(userId, {
          include: 'games',
        });
  
        res.json(userWithGames);
      } catch (error) {
        console.trace(error);
        res.status(500).send('Internal Server Error');
      }
    },
  };
  
  export default userController;
  