import express from 'express';
const router = express.Router();

router.get('/user', userController.getUserInfo);

router.get('/user/games', gameController.getUserGames);

router.get('/games/:gameId/characters', characterController.getGameCharacters);

router.get('/characters/:characterId', characterController.getCharacterDetails);

router.get('/characters/:characterId', characterController.getCharacterStats);
router.put('/characters/:characterId', characterController.updateCharacterStats);

router.get('/characters/:characterId/spells', characterController.getCharacterSpells);
router.post('/characters/:characterId/spells', characterController.addSpellToCharacter);
router.delete('/characters/:characterId/spells/:spellId', characterController.removeSpellFromCharacter);

router.get('/characters/:characterId/skills', characterController.getCharacterSkills);
router.post('/characters/:characterId/skills', characterController.addSkillToCharacter);
router.delete('/characters/:characterId/skills/:skillId', characterController.removeSkillFromCharacter);

router.get('/characters/:characterId/class', characterController.getCharacterClass);
router.put('/characters/:characterId/class', characterController.updateCharacterClass);

router.get('/characters/:characterId/inventory', characterController.getCharacterInventory);
router.post('/characters/:characterId/inventory', characterController.addItemToInventory);
router.delete('/characters/:characterId/inventory/:itemId', characterController.removeItemFromInventory);

router.get('/characters/:characterId/stats', characterController.getCharacterStats);
router.put('/characters/:characterId/stats/:statId', characterController.updateCharacterStat);

export default router;
