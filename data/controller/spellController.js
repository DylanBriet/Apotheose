import { Spell } from '../models/index.js';
import generateController from './generateController.js';
import { z } from 'zod';

const spellSchema = z.object({
  name: z.string().min(1),
  note: z.string().optional(),
});

const spellController = generateController(Spell, spellSchema);

export default spellController;
