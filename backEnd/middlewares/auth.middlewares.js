import jwt from "jsonwebtoken";

const verifyWebToken = async (req, res, next) => {
  try {
    // Taking the token
    const token = req.headers("Authorization");

    if (!token) {
      return res.status(401).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyWebToken;
