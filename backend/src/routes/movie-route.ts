import { Express } from "express";
import {CreateMovieController} from "../controller/movie-controller/create-movie-controller"
import { updateMovieController } from "../controller/movie-controller/update-movie-controller";
import { deleteMovieController } from "../controller/movie-controller/delete-movie-controller";
import { getallMovieController } from "../controller/movie-controller/get-all-movie";
import { getbyidMovieController } from "../controller/movie-controller/get-by-id-movie";

export function CreateMovieRoutes(app:Express){
    app.post("/movies/add",CreateMovieController)
    app.put("/movies/update/:movieId",updateMovieController)
    app.delete("/movies/delete/:movieId",deleteMovieController)
    app.get("/movies",getallMovieController)
    app.get("/movies/:movieId",getbyidMovieController)
}