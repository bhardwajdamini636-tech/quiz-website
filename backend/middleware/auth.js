const jwt = require("jsonwebtoken");

module.exports = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(401);

    try {
      const decoded = jwt.verify(token, "secret");
      if (roles.length && !roles.includes(decoded.role)) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    } catch {
      res.sendStatus(401);
    }
  };
};
