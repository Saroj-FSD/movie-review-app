import { MovieModel } from "./model";

type Mapp = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string;
};

async function CreateMovie(input: Omit<Mapp, "id">) {
  const movie = new MovieModel({
    title: input.title,
    description: input.description,
    release_year: input.release_year,
    genre: input.genre,
  });

  await movie.save();

  return movie;
}

// update
async function UpdateMovie(toUpdateMovieId: string, input: Omit<Mapp, "id">) {
  const movie = await MovieModel.findById(toUpdateMovieId);

  if (!movie) {
    throw new Error("movie not found");
  }

  // await MovieModel.replaceOne(
  //   { _id: toUpdateMovieId },
  //   {
  //     title: input.title,
  //     description: input.description,
  //     genre: input.genre,
  //     release_year: input.release_year,
  //   }
  // );

  await MovieModel.updateOne(
    {
      _id: toUpdateMovieId,
    },
    {
      title: input.title,
      description: input.description,
      genre: input.genre,
      release_year: input.release_year,
    }
  );
}

// getall
async function getAllMovie() {
  const movies = await MovieModel.find();
  return movies;
}

// getbyid
async function getById(movieId: string) {
  const movie = await MovieModel.findById(movieId);
  return movie;
}

// delete
async function deleteMovie(toDeleteMovieId: string) {
  const movie = await MovieModel.findByIdAndDelete({
    _id: toDeleteMovieId,
  });
  return movie;
}

export const MovieMongoService = {
  CreateMovie,
  UpdateMovie,
  getAllMovie,
  getById,
  deleteMovie,
};
