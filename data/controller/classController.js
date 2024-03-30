import { Class } from '../models/index.js';
import generateController from './generateController.js';
import { z } from 'zod';

const classSchema = z.object({
  name: z.string().min(1),
  note: z.string().optional(),
});

const classController = generateController(Class, classSchema);

export default classController;
