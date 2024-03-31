import express from 'express';
import dotenv from 'dotenv';
import jwtMiddleware from './data/jwt/jwtHandler.wjs'; 
import authRoutes from './data/router/authRoutes.js';

import router from './data/router/router.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);


app.use(jwtMiddleware);




app.use(router);

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});