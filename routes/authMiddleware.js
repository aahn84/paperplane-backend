const jwt = require('jsonwebtoken');

function authorize (req, res, next) {
  const token = req.headers.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return next({ status: 401, message: `Unauthorized user.` });
    req.claim = payload;
    next();
  });
}

module.exports = authorize;
