// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
  const admin = req.user && req.user.isAdmin;
  if (admin) {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Accès refusé, administrateur requis." });
};

export { isAdmin };
