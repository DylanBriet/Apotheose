import { Stat } from '../models/index.js';
import generateController from './generateController.js';
import { z } from 'zod';

const statSchema = z.object({
  name: z.string().min(1),
});

const statController = generateController(Stat, statSchema);

export default statController;
