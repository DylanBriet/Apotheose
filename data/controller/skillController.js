import { Skill } from '../models/index.js';
import generateController from '../utils/generateController.js';
import { z } from 'zod';

const skillSchema = z.object({
  name: z.string().min(1),
  note: z.string().optional(),
  is_active: z.boolean(),
});

const skillController = generateController(Skill, skillSchema);

export default skillController;
