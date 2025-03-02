import { Request, Response, NextFunction } from "express";
import { reviewService } from "../../services/review";
import {
  InvalidNotePayload,
  ReviewNotFound,
} from "../../services/movie-review error";
import { mongoReviewServices } from "../../mongo/review/mongo-review-service";
import { AppError } from "../../error";
export async function GetByIdReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (process.env.DATABASE_TYPE === "MYSQL") {
      const reviewId = Number(req.params.reviewId);
      if (!reviewId) {
        const InvalidReviewPayloadError = new InvalidNotePayload(reviewId);
        next(InvalidReviewPayloadError);
      }

      const review = await reviewService.getById(reviewId);

      if (!review) {
        const reviewnotfounderror = new ReviewNotFound();
        next(reviewnotfounderror);
        return;
      }

      res.json({
        data: review,
        message: "Review get by id successfully!!",
      });
    } else {
      const reviewId = req.params.reviewId;
      if (!reviewId) {
        const InvalidReviewPayloadError = new InvalidNotePayload(reviewId);
        next(InvalidReviewPayloadError);
        return;
      }

      const review = await mongoReviewServices.getByIdReview(reviewId);
      if (!review) {
        const reviewnotfounderror = new ReviewNotFound();
        next(reviewnotfounderror);
      }
      res.json({
        data: review,
        message: "Review get by id successfully!!",
      });
    }
  } catch (error) {
    const reviewError = new AppError(
      "Failed to get the review by id.Something went wrong in the server! ",
      500
    );
    next(reviewError);
  }
}
