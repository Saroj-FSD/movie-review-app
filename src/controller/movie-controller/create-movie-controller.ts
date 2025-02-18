import { Request, Response, NextFunction } from "express";
import { InvalidNotePayload } from "../../services/movie-review error";
import { CreateMovieReviewSchema } from "../../services/movie-review validation";
import { movieService } from "../../services/movie";
import { MovieMongoService } from "../../mongo/movie/service";
import { TPayload } from "../../utils/jwt";
import { AppError } from "../../error";

export async function CreateMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try{

    // @ts-ignore
    const authenticatedUser = req.user as TPayload


    const body = req.body;

    const parsed = CreateMovieReviewSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidNotePayload(parseError);
      next(invalidPayloadError);
      return;
    }
  
    if (process.env.DATABASE_TYPE === "MYSQL") {
      movieService.create({
        title: parsed.data.title,
        description: parsed.data.description,
        release_year: parsed.data.release_year,
        genre: parsed.data.genre,
      });
    } else {
      await MovieMongoService.CreateMovie({
        title: parsed.data.title,
        description: parsed.data.description,
        release_year: parsed.data.release_year,
        genre: parsed.data.genre,
      });
    }
  
    res.json({
      message: "Movie added successfully",
    });

  }catch(error){
    if((error as any).errorResponse?.code === 11000){
      const movieError = new AppError(
        "Failed to create the movie. Please choose unique title",400
      )
      next(movieError)
      return
    }
    const movieError = new AppError(
      "Failed to create the movie. Something went wrong in server.",500
    )
    next(movieError)
  }
}
