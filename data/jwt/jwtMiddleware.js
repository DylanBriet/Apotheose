import { verifyToken } from './jwtHandler.js';

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    next();
  }
};

export default jwtMiddleware;
