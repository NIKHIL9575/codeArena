const checkAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Login required!",
    });
  }

  next();
};

module.exports = checkAuth;