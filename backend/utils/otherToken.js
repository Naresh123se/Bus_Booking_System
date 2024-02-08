// generateToken.js
import jwt from 'jsonwebtoken';

const otherToken = (userId) => {
  // Define your secret key. It's recommended to store this in environment variables.
  const secretKey = 'your_secret_key_here'; // Replace 'your_secret_key_here' with your actual secret key

  // Generate the token using the jwt.sign method
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '30d' });

  return token;
};

export default otherToken;
