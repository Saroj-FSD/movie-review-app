CREATE TABLE IF NOT EXISTS reviews
(
  id INT AUTO_INCREMENT PRIMARY KEY,
  movieId INT,
  FOREIGN KEY (movieId) REFERENCES movies(id) ON DELETE CASCADE ON UPDATE CASCADE,
  userId INT,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review TEXT 
);