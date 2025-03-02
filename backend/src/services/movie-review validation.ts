import { z } from "zod";

// movie
export const CreateMovieReviewSchema = z.object({
  title: z.string().min(1).max(20),
  description: z.string().min(5).max(255),
  release_year: z.number().min(1900).max(2025),
  genre: z.string().min(1).max(20),
});

// review
export const CreateReviewSchema = z.object({
  movieId: z.string().min(1).max(100),
  userId: z.number().min(1).max(100),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(255),
});
