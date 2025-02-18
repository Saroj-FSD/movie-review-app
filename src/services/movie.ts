import { conn } from "../db";
import { connPromise } from "../db-promise";

type Mapp = {
  id: number;
  title: string;
  description: string;
  release_year: number;
  genre: string;
};

let movies: Mapp[] = [];

// create
function create(input: Omit<Mapp, "id">) {
  conn.query(
    `
        INSERT INTO movies
        (title,description,release_year,genre)
        VALUES
        ("${input.title}","${input.description}","${input.release_year}","${input.genre}")
         `,
    (err, result) => {
      if (err) {
        console.log("failed to insert table", err);
      } else {
        console.log("result", result);
      }
    }
  );
}

// get-by-id
async function getById(movieId: number) {
  const conn = await connPromise;
  const [rows] = await conn.execute(`SELECT * FROM movies WHERE id=${movieId}`);
  // @ts-ignore
  return rows[0];
}

// update
function update(toUpdateMovieId: number, input: Omit<Mapp, "id">) {
  conn.query(
    `
    UPDATE movies
    SET 
    title="${input.title}",
    description="${input.description}",
    release_year="${input.release_year}",
    genre="${input.genre}"
    WHERE
    id=${toUpdateMovieId}`,
    (err, result) => {
      if (err) {
        console.log("failed to update", err);
      } else {
        console.log("value updated", result);
      }
    }
  );
}

// getall

// export type TSort = "asc" | "desc";
// export type TSortInput = {
//   sortkey: string;
//   direction: TSort;
// };

// export type Tpagination = {
//   page: number;
//   perpage: number;
// };
async function getall() {
  const conn = await connPromise;

  // const offset = (pagination.page - 1) * pagination.perpage;

  const [rows] = await conn.execute(
    `SELECT * FROM movies`
  );
  return rows;
}

// delete
function deleteMovie(toDeleteMovieId: number) {
  conn.query(
    `DELETE FROM movies WHERE id=${toDeleteMovieId}`,
    (err, result) => {
      if (err) {
        console.log("failed to delete", err);
      } else {
        console.log("value deleted", result);
      }
    }
  );
}

export const movieService = {
  create,
  getById,
  update,
  getall,
  deleteMovie
};
