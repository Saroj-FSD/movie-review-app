import { Request, Response, NextFunction } from "express";
import { reviewService } from "../../services/review";
import { CreateReviewSchema } from "../../services/movie-review validation";
import { InvalidNotePayload } from "../../services/movie-review error";
import { mongoReviewServices } from "../../mongo/review/mongo-review-service";
import { AppError } from "../../error";
export async function CreateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const parsed = CreateReviewSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidNotePayload(parseError);
      next(invalidPayloadError);
      return;
    }
// check
    const loggedinUser = req.user
    console.log(loggedinUser)

    if (process.env.DATABASE_TYPE === "MYSQL") {
      await reviewService.create({
        movieId: Number(parsed.data.movieId),
        userId: parsed.data.userId,
        rating: parsed.data.rating,
        review: parsed.data.review,
      });
      res.json({
        message: "Review added successfully!",
      });
    } else {
      await mongoReviewServices.createReview({
        userId: loggedinUser?.id || "",
        movieId: parsed.data.movieId,
        rating: parsed.data.rating,
        review: parsed.data.review,
      });
      res.json({
        message: "Review added successfully!!",
      });
    }
  } catch (error) {
    console.log(error);
    const reviewError = new AppError(
      "Failed to create the review. Something went wrong in the server.",
      500
    );
    next(reviewError);
  }
}
