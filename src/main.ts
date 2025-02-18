import express, { Request, Response, NextFunction } from "express";
import { homeController } from "./controller/home-movie-controller";
import { CreateMovieRoutes } from "./routes/movie-route";
import { CreateReviewRoutes } from "./routes/review-route";
import cookieParser from "cookie-parser";

import "./db";

import { connectMongoDb } from "./mongo-db";
import { createAuthRoutes } from "./routes/auth-route";

const app = express();

app.use(express.json());

app.use(cookieParser())

// app.get("/",(req,res)=>{
//    res.write("hello from movie-review")
//    res.end()
// })

app.get("/", homeController);

CreateMovieRoutes(app);
CreateReviewRoutes(app);
createAuthRoutes(app);

// mongodb
connectMongoDb().then(() => {
  console.log(`MongoDB connect!!`);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("error", error);
  res.status(error.status || 500).json({
    message: error.message,
  });
});

app.listen(4002, () => {
  console.log("server started on http://localhost:4002");
});

// session /state = database ma save garne
// clear cookie
