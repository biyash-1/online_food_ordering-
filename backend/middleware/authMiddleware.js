
import jwt from "jsonwebtoken"

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    console.log('Decoded User:', decoded); // Verify the decoded user
    next();
  } catch (error) {
    console.error('Invalid token error:', error);
    res.status(401).json({ msg: 'Invalid token' });
  }
};

export default authenticate
