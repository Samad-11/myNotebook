const jwt = require("jsonwebtoken");
const secret = "samad11@";

const fetchUser = (req, res, next) => {
  //get user from token & add id to req obj.
  const token = req.header("authToken");
  if (!token) {
    res.status(401).send({ error: "Invalid Token" });
  }
  try {
    const data = jwt.verify(token, secret);
    req.User = data.User;
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid Token" });
  }
};

module.exports = fetchUser;
