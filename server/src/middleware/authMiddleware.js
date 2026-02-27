export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized user!" });
};

export const ensureAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Access denied! Admins only" });
};
