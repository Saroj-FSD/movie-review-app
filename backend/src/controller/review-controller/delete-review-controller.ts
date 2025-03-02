import { Request, Response, NextFunction } from "express";
import { reviewService } from "../../services/review";

export function DeleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
    try {
        const reviewId = Number(req.params.reviewId);
    
        const review = reviewService.getById(reviewId);
        if (!review) {
          next({
            status: 404,
            message: "something wnet wrong",
          });
        }
    
        reviewService.deleteReview(reviewId);
    
        res.json({
          message: "Movie deleted successfully",
        });
      } catch (error) {
        console.log("error", error);
        next({
          message: "failed to delete movie",
          status: 500,
        });
      }
}
