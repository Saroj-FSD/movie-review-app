import { Express } from "express";
import { signUpController } from "../controller/auth-controllers/signup-controller";
import { loginController } from "../controller/auth-controllers/login-controller";
import { logoutController } from "../controller/auth-controllers/logout-controller";
import { authMiddleware } from "../utils/auth-middleware";

export function createAuthRoutes(app: Express) {
  // mutation
  app.post("/auth/signup", signUpController);
  app.post("/auth/login", loginController);
  app.post("/auth/logout", authMiddleware ,logoutController);
}
