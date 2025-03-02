import { Request, Response, NextFunction } from "express";
import { movieService } from "../../services/movie";
import {
  InvalidNotePayload,
  MovieNotFound,
} from "../../services/movie-review error";
import { MovieMongoService } from "../../mongo/movie/service";
import { AppError } from "../../error";

export async function getbyidMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const movieIdNum = Number(movieId);
      const movie = await movieService.getById(movieIdNum);
      if (!movieIdNum) {
        const invalidPayloadError = new InvalidNotePayload(movieIdNum);
        next(invalidPayloadError);
        return;
      }

      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        // res.status(404).json({
        //   message: "movie not found",
        // });
        return;
      }
      res.json({
        data: movie,
        message: "movie getbyid successfuly",
      });
    } else {
      const movie = await MovieMongoService.getById(movieId);

      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }
      res.json({
        data: movie,
        message: "Movie get successfully",
      });
    }
  } catch (error) {
    const movieError = new AppError(
      "Failed to give the movie. Something went wrong in server.",
      500
    );
    next(movieError);
  }
}
