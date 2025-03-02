import { Request, Response, NextFunction } from "express";
import { movieService } from "../../services/movie";
import { MovieMongoService } from "../../mongo/movie/service";

export async function getallMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.DATABASE_TYPE === "MYSQL") {
    const movies = await movieService.getall();
    res.json({
      data: movies,
      message: "Movie get all successfully.",
    });
  } else {
    const movies = await MovieMongoService.getAllMovie();
    res.json({
      data: movies,
      message: "Movie get all successfully.",
    });
  }
  // try{
  //   console.log("req query param", req.query)

  //   const sortkey = (req.query.sort_key as string) || "release_year"
  //   const sortDirection = (req.query.direction as TSort) || "asc"
  //   const page = (req.query.page as string) || 1
  //   const perpage = (req.query.perpage as string) || 10

  //   const movies = await movieService.getall({
  //     sortkey: sortkey,
  //     direction: sortDirection
  //   },{
  //     page: Number(page),
  //     perpage: Number(perpage)
  //   })
  //   res.json({
  //     data:movies,
  //     message:"Movie get all successfully!"
  //   })

  // }catch(error){
  //   console.log(error)
  //   next((error as any).message)
  // }
}
