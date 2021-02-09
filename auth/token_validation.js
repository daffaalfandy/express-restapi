const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    if (req.get("authorization")) {
      const token = req.get("authorization").slice(7);
      verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid token",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access denied! Unauthorized user",
      });
    }
  },
};
