import express from "express";
import passport from "passport";
import "../../config/passportGoogle";
import AuthController from "../../controllers/v1/authController";
import {
  emailValidateur,
  loginValidateur,
  registerValidateur,
  resetValidateur,
  tokenValidateur,
} from "../../validator/authValidator";
const authRoutes = express.Router();

authRoutes.post("/register", registerValidateur, AuthController.register);
authRoutes.post("/login", loginValidateur, AuthController.login);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
    accessType: "offline",
    prompt: "consent",
  })
);

authRoutes.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Google OAuth Error:", err);
      return res.status(500).json({
        error: "Erreur d'authentification Google",
        details: err.message,
        code: err.code,
      });
    }
    if (!user) {
      console.error("Authentication failed:", info);
      return res.status(401).json({
        error: "Authentification échouée",
        details: info,
      });
    }
    req.user = user;
    return AuthController.loginWithOAuth(req, res);
  })(req, res, next);
});

authRoutes.post("/validate", tokenValidateur, AuthController.validate);
authRoutes.post(
  "/message/validate",
  emailValidateur,
  AuthController.validateMessage
);
authRoutes.post("/reset", resetValidateur, AuthController.reset);
authRoutes.post("/message/reset", emailValidateur, AuthController.resetMessage);

export default authRoutes;
