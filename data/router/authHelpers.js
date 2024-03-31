// authHelpers.js
import bcrypt from 'bcrypt';
import User from './models/User';

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

export const saveRefreshToken = async (userId, refreshToken) => {
  await User.update({ refreshToken }, { where: { id: userId } });
};

export const verifyRefreshToken = async (refreshToken) => {
  const user = await User.findOne({ where: { refreshToken } });
  return !!user;
};
e