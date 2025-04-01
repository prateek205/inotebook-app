const jwt = require("jsonwebtoken");
const JWT_SECRET = "prateek@bahad";

const userDetails = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please use a valid token to authenticate" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please use a valid token to authenticate" });
  }
};

module.exports = userDetails;
