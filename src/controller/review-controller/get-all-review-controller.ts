import { Request, Response, NextFunction } from "express";
import { reviewService, TSort } from "../../services/review";
import { mongoReviewServices } from "../../mongo/review/mongo-review-service";
import { AppError } from "../../error";

export async function GetAllReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (process.env.DATABASE_TYPE === "MYSQL") {
      const reviews = await reviewService.getall();
      res.json({
        data: reviews,
        message: "Reviews get all successfully!!",
      });
    } else {
      const reviews = await mongoReviewServices.getAllReviews();
      res.json({
        data: reviews,
        message: "Reviews get all successfully!!",
      });
    }
  } catch (error) {
    const reviewError = new AppError(
      "Failed to get the movies,Something went wrong",
      500
    );
    next(reviewError);
  }
}
