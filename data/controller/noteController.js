import { Note } from '../models/index.js';
import generateController from './generateController.js';
import { z } from 'zod';

const noteSchema = z.object({
  value: z.string().min(1),
});

const noteController = generateController(Note, noteSchema);

export default noteController;
