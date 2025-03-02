import { Request, Response, NextFunction } from "express";
import { reviewService } from "../../services/review";
import {
  InvalidNotePayload,
  ReviewNotFound,
  UnAuthorized,
} from "../../services/movie-review error";
import { AppError } from "../../error";
import { mongoReviewServices } from "../../mongo/review/mongo-review-service";

export async function UpdateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;

    const body = req.body;

    if (!reviewId) {
      const InvalidReviewPayloadError = new InvalidNotePayload(reviewId);
      next(InvalidReviewPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const numReviewId = Number(reviewId);
      const review = reviewService.getById(numReviewId);
      if (!review) {
        const reviewnotfounderror = new ReviewNotFound();
        next(reviewnotfounderror);
        return;
      }

      reviewService.update(numReviewId, {
        movieId: body.movieId,
        userId: body.userId,
        rating: body.rating,
        review: body.review,
      });

      res.json({
        message: "Review updated successfully!!",
      });
    } else {
      const reviewToBeUpdated = await mongoReviewServices.getByIdReview(reviewId) 
      if(!reviewToBeUpdated){
        const reviewnotfounderror = new ReviewNotFound();
        next(reviewnotfounderror);
        return;
      }
      const isUserOwner = req.user?.id === reviewToBeUpdated.userId?.toString()
      console.log({isUserOwner,user:req.user,reviewToBeUpdated,id:reviewToBeUpdated.userId?.toString()})
      if(!isUserOwner){
        const unAuthorizedError = new UnAuthorized();
        next(unAuthorizedError);
        return;
      }
      await mongoReviewServices.updateReview(reviewId, {
        // movieId: body.movieId,
        // userId: body.userId,
        rating: body.rating,
        review: body.review,
      });
      res.json({
        message: "Review updated successfully!!",
      });
    }
  } catch (error) {
    const apperror = new AppError(
      "failed to update the review. something went wrong in server!",
      500
    );
    next(apperror);
  }
}
