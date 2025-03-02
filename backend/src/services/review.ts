import { conn } from "../db";
import { connPromise } from "../db-promise";

type Rev = {
  id: number;
  movieId: number;
  userId: number;
  rating: number;
  review: string;
};

let reviews: Rev[] = [];

// create-reviews
function create(input: Omit<Rev, "id">) {
  conn.query(
    `
        INSERT INTO reviews
        (movieId,userId,rating,review)
        VALUES
        ("${input.movieId}","${input.userId}","${input.rating}","${input.review}")
        `,
    (error, result) => {
      if (error) {
        console.log("failed to insert table", error);
      } else {
        console.log("result", result);
      }
    }
  );
}

// get-by-id
async function getById(reviewId: number) {
  const conn = await connPromise;
  const [rows] = await conn.execute(
    `SELECT * FROM reviews WHERE id=${reviewId}`
  );
  // @ts-ignore
  return rows[0];
}

// update
function update(toUpdateReviewId: number, input: Omit<Rev, "id">) {
  conn.query(
    `
    UPDATE reviews
    SET
    movieId="${input.movieId}",
    userId="${input.userId}",
    rating="${input.rating}",
    review="${input.review}"
    WHERE 
    id=${toUpdateReviewId}
    `,
    (error, result) => {
      if (error) {
        console.log("failed to update", error);
      } else {
        console.log("value updated", result);
      }
    }
  );
}

// getall

export type TSort = "asc" | "desc";
export type TSortInput = {
  sortkey: string;
  direction: TSort;
};
export type Tpagination = {
  page: number;
  perpage: number;
};

async function getall() {
  const conn = await connPromise;
  const [rows] = await conn.execute(`
    SELECT * FROM reviews `);
  return rows;
}

// delete
function deleteReview(toDeleteReviewId: number) {
  conn.query(
    `DELETE FROM reviews WHERE id=${toDeleteReviewId}`,
    (err, result) => {
      if (err) {
        console.log("failed to delete", err);
      } else {
        console.log("value deleted successfully!!", result);
      }
    }
  );
}

export const reviewService = {
  create,
  getById,
  update,
  getall,
  deleteReview,
};
