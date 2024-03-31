import express from 'express';
import dotenv from 'dotenv';
import jwtMiddleware from './data/jwt/jwtMiddleware.js'; 
import router from './router'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);


app.use(jwtMiddleware);


app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});