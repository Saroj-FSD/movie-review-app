import { Request, Response, NextFunction } from "express";
import { movieService } from "../../services/movie";
import {
  InvalidNotePayload,
  MovieNotFound,
} from "../../services/movie-review error";
import { AppError } from "../../error";
import { MovieMongoService } from "../../mongo/movie/service";

export async function updateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId
    const body = req.body;
    if(!movieId){
      const invalidPayloadError = new InvalidNotePayload(movieId)
      next(invalidPayloadError)
      return
    }
    // if (typeof body.release_year !== "number") {
    //   const InvalidNotePayloadError = new InvalidNotePayload({
    //     message: "release_year should be a number",
    //   });
    //   next(InvalidNotePayloadError);
    //   return;
    // }
if(process.env.DATABASE_TYPE === "MYSQL"){
  const numMovieId = Number(movieId)
  const movie = await movieService.getById(numMovieId);
  if (!movie) {
    const movienotfounderror = new MovieNotFound();
    next(movienotfounderror);
    return;
  }
  movieService.update(numMovieId, {
    title: body.title,
    description: body.description,
    release_year: body.release_year,
    genre: body.genre,
  });

}else{
  await MovieMongoService.UpdateMovie(movieId,{
    title: body.title,
    description: body.description,
    release_year:body.release_year,
    genre:body.genre,
  })
} 
    res.json({
      message: "Movie updated successfully",
    });
  } catch (error) {
    const apperror = new AppError(
      "failed to update the movie. something went wrong in server!",
      500
    );
    next(apperror);
  }
}
