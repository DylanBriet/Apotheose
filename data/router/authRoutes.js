// authRoutes.js
import express from 'express';
import { authenticateUser, saveRefreshToken, verifyRefreshToken } from './authHelpers';
import { createAccessToken, createRefreshToken } from './jwtHandler';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);
  
  if (!user) {
    return res.status(401).json({ message: 'Email ou mot de passe invalide' });
  }
  
  const accessToken = createAccessToken({ userId: user.id });
  const refreshToken = createRefreshToken({ userId: user.id });
  
  await saveRefreshToken(user.id, refreshToken);
  
  res.json({ accessToken, refreshToken });
});

router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!await verifyRefreshToken(refreshToken)) {
    return res.status(403).json({ message: 'Token de rafraîchissement invalide' });
  }
  
  const { userId } = verifyToken(refreshToken, process.env.REFRESH_SECRET); // Supposant que votre verifyToken gère les erreurs
  const newAccessToken = createAccessToken({ userId });
  
  res.json({ accessToken: newAccessToken });
});

export default router;
