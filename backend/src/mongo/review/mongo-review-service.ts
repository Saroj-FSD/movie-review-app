// type declaratioin

import { InvalidNotePayload } from "../../services/movie-review error";
import { ReviewModel } from "./mongo-review-model";

type TReviews = {
  id: string;
  userId: string;
  movieId: string;
  rating: number;
  review: string;
};

// create review
async function createReview(input: Omit<TReviews, "id">) {
  const review = new ReviewModel({
    userId: input.userId,
    movieId: input.movieId,
    rating: input.rating,
    review: input.review,
  });
  await review.save();
}

// update:
async function updateReview(
  toUpdateReviewId: string,
  input: Omit<TReviews, "id" | "movieId" | "userId">
) {
  const review = await ReviewModel.findById(toUpdateReviewId);
  if (!review) {
    throw new Error("Review not found");
  }
  await ReviewModel.replaceOne(
    {
      _id: toUpdateReviewId,
    },
    {
      // userId: input.userId,
      // movieId: input.movieId,
      rating: input.rating,
      review: input.review,
    }
  );
}

// get all reviews:
async function getAllReviews() {
  const reviews = await ReviewModel.find();
  return reviews;
}

// getbyid reviews:
async function getByIdReview(toGetReviewId: string) {
  const review = await ReviewModel.findById(toGetReviewId);
  if (!review) {
    throw new Error("Review not found!");
  }
  return review;
}

// delete review:
async function deleteReview(toDeleteReviewId: string) {
  const review = await ReviewModel.findByIdAndDelete(toDeleteReviewId);
  if (!review) {
    throw InvalidNotePayload;
  }
  await ReviewModel.deleteOne({
    _id: toDeleteReviewId,
  });
  return review;
}

export const mongoReviewServices = {
  createReview,
  updateReview,
  getAllReviews,
  getByIdReview,
  deleteReview
};
