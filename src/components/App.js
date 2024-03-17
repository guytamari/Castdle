import React, {useState, useEffect} from 'react';
import Cast from './cast';
import Guess from './guess';
import Header from "./header";
import { gettingMovies, movieDetails } from './api';


function App() {
  const ANIMETED_MOVIES = 16;
  const [movie,setMovie] = useState([]);
  const [numOfGuesses,setNumOfGuesses] = useState(5);
  const [castOfMovie, setCastOfMovie] = useState([]);

  // Filtering the movies
  const filterMovies = (movies) => {
    return movies.filter(movie => (
        movie.original_language === "en" &&
        !movie.genre_ids.includes(ANIMETED_MOVIES) &&
        new Date(movie.release_date).getFullYear() >= 1998
    ));
};
    
    useEffect(() => {
        async function fetchAndFilterMovies() {
            try {
                const responseTopRated = await gettingMovies("top_rated", 70);
                const responsePopular = await gettingMovies("popular", 50);
                if (responseTopRated && responsePopular) {
                    const filteredTopRated = filterMovies(responseTopRated.results);
                    const filteredPopular = filterMovies(responsePopular.results);
                    const allMovies = filteredTopRated.concat(filteredPopular);
                    const randomIndex = Math.floor(Math.random() * allMovies.length);
                    const selectedMovie = allMovies[randomIndex];
                    const randomMovieID = selectedMovie.id;
                    const responseFetchMovieDetails = await movieDetails(randomMovieID);
                    setCastOfMovie(responseFetchMovieDetails.cast);
                    setMovie(selectedMovie);
                }
            } catch (error) {
                console.error("Error fetching and filtering movies:", error);
            }
        }
        fetchAndFilterMovies();
    }, [setMovie]); 
  return (
    <div>
      <header className='text-center p-2'>
        <Header numOfGuesses={numOfGuesses}/>
      </header>
      <div>
        <Cast numOfGuesses={numOfGuesses}  castOfMovie={castOfMovie} />
        <Guess movie={movie} numOfGuesses={numOfGuesses} setNumOfGuesses={setNumOfGuesses} />
      </div>
    </div>
    
  );
}

export default App;
