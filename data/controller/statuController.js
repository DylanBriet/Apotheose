import { Status } from '../models/index.js';
import generateController from './generateController.js';
import { z } from 'zod';

const statusSchema = z.object({
  name: z.string().min(1),
});

const statusController = generateController(Status, statusSchema);

export default statusController;
