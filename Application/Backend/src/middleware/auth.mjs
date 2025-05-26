//les imports
import jwt from "jsonwebtoken";
import { privateKey } from "./private_key.js";

//déclaration de la fonction auth qui va permettre de vérifier le token donné par l'utilisateur avant de laisser une requête s'executer avec la fonction next();
const verifyToken = async (req, res, next) => {
  const receivedToken = req.cookies?.auth_token ?? null;
  if (receivedToken) {
    try {
      const decoded = jwt.verify(receivedToken, privateKey);

      //Ajouter user_id à la requête
      const username = decoded.username;                                  //
      const connection = await mysql.createConnection(config.dbConfig);   //
      const id = await connection.execute(                                //
        "SELECT compte_id FROM t_compte WHERE username = ?",              //
        [username]                                                        //
      );
      req.user_id = id

    } catch (error) {
      console.log({ message: "token invalide ou expiré" + error });
      return res.redirect("/login");
    }
  } else {
    return res.redirect("/login");
  }
  
  next();
};

export { verifyToken };
