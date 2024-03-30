import { Inventory } from '../models/index.js';
import generateController from './generateController.js';
import { z } from 'zod';

const inventorySchema = z.object({
  name: z.string().min(1),
  note: z.string().optional(),
});

const inventoryController = generateController(Inventory, inventorySchema);

export default inventoryController;
