import { Request, Response, NextFunction } from "express";
import { TPayload, verifyToken } from "./jwt";
import { TokenService } from "../mongo/auth/token-service";

export async function authMiddleware(
  req: Request & { user?: TPayload },
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.headers,req.cookies)
    const authorizationHeader =
      req.headers.authorization || req.cookies['authorization'];

    `Bearer eyldfjldfdlfj.sflsfsj.djfs`;

    if (!authorizationHeader) {
      res.status(401).json({
        message: "Token not found in header",
      });
      return;
    }

    if (typeof authorizationHeader !== "string") {
      res.status(401).json({
        message: "Token is not a string",
      });
      return;
    }

    const token = authorizationHeader?.split(" ")[1] || "";
    if (!token) {
      res.status(401).json({
        message: "Token not found",
      });
    }

    const payload = verifyToken(token);

    const tokenInDb = await TokenService.getToken({
      token: authorizationHeader,
    });
    if (!tokenInDb) {
      res.status(401).json({
        message: "Token not found in database. It seems you are loggedout!!",
      });
      return;
    }

    req.user = payload;

    next();
  } catch (error) {
    console.error(error);
    if ((error as any).name === "TokenExpiredError") {
      next({
        status: 400,
        message: "Token expired",
      });
      return;
    }
    if ((error as any).name === "JsonWebTokenError") {
      next({
        status: 400,
        message: "Invalid token",
      });
      return;
    }

    next({ message: "Internal server error", status: 500 });
  }
}
