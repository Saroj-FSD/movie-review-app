import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId ,
    ref: "User",
  },
  movieId: {
    type: mongoose.Schema.ObjectId ,
    ref: "movie",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

export const ReviewModel = mongoose.model("review", reviewSchema);
