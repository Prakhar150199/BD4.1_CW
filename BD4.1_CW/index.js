let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4.1_CW/database.sqlite',
    driver: sqlite3.Database,
  });
})();

async function fetchAllMovies() {
  let query = 'SELECT * FROM movies';
  let response = await db.all(query, []);
  return { movies: response };
}

app.get('/movies', async (req, res) => {
  let results = await fetchAllMovies();

  res.status(200).json(results);
});

async function fetchMoviesByGenre(genre) {
  let query = 'SELECT * FROM movies WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { movies: response };
}

app.get('/movies/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchMoviesByGenre(genre);
  res.status(200).json(results);
});

async function fetchMoviesById(id) {
  let query = 'SELECT * FROM movies WHERE id = ?';
  let response = await db.all(query, [id]);
  return { movies: response };
}

app.get('/movies/details/:id', async (req, res) => {
  let id = req.params.id;
  let results = await fetchMoviesById(id);
  res.status(200).json(results);
});

async function fetchMoviesByReleaseYear(release_year) {
  let query = 'SELECT * FROM movies WHERE release_year = ?';
  let response = await db.all(query, [release_year]);
  return { movies: response };
}

app.get('/movies/release-year/:release_year', async (req, res) => {
  let release_year = req.params.release_year;
  let results = await fetchMoviesByReleaseYear(release_year);
  res.status(200).json(results);
});

app.listen(PORT, () => console.log('Server running on port 3000'));
