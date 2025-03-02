import { Request, Response, NextFunction } from "express";
import { movieService } from "../../services/movie";
import {
  InvalidNotePayload,
  MovieNotFound,
} from "../../services/movie-review error";
import { MovieMongoService } from "../../mongo/movie/service";
import { AppError } from "../../error";

export async function deleteMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;

    if (!movieId) {
      const invalidPayloadError = new InvalidNotePayload(movieId);
      next(invalidPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const movieIdNum = Number(movieId);
      const movie = movieService.getById(Number(movieIdNum));
      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
        // next({
        //   status: 404,
        //   message: "something wnet wrong",
        // });
      }
      movieService.deleteMovie(movieIdNum);
    } else {
      await MovieMongoService.deleteMovie(movieId);
    }

    res.json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    const movieError = new AppError("Not found the MovieId", 500);
    next(movieError);
    // console.log("error", error);
    // next({
    //   message: "failed to delete movie",
    //   status: 500,
    // });
  }
}
