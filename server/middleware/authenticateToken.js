const jwt = require('jsonwebtoken');

module.exports.authenticateToken = (req, res, next) => {
  // console.log(req.cookies);
  const token = req.cookies.jwt; 

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

