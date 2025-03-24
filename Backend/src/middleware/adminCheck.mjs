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
const verifyAdmin = async (req, res, next) => {
  const username = req.body.username;
  if (username) {
    const isAdmin = sequelize.query(
      "SELECT isAdmin FROM Comptes WHERE username = ?",
      [username]
    );
    if (isAdmin) {
      next();
    }
  }
  return res
    .status(401)
    .json("Seuls les Administrateurs peuvent accéder à cette ressource");
};
export { isAdmin, verifyAdmin };
