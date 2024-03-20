import React, {useState, useEffect} from 'react';
import Cast from './cast';
import Guess from './guess';
import Header from "./header";
import DifficultyPopUp from './DifficultyPopUp';
import { gettingMovies, movieDetails } from './api';


function App() {
  const ANIMETED_MOVIES = 16;
  const [movie,setMovie] = useState([]);
  const [numOfGuesses,setNumOfGuesses] = useState(5);
  const [castOfMovie, setCastOfMovie] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [numberOfActors, setNumberOfActors] = useState(4);



  // Filtering the movies
  const filterMovies = (movies) => {
    return movies.filter(movie => (
        movie.original_language === "en" &&
        !movie.genre_ids.includes(ANIMETED_MOVIES) &&
        new Date(movie.release_date).getFullYear() >= 1998
    ));
};

  const onStartGame = (selectedOption) => {
    setIsOpen(false);
    setGameStarted(true);
    switch(selectedOption) {
      case 'easy':
        setNumberOfActors(6);
        break;
      case 'medium':
        setNumberOfActors(4);
        break;
      case 'hard':
        setNumberOfActors(2);
        break
      default:
        break
    }
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
                    const firstSixCastMembers = responseFetchMovieDetails.cast.slice(0, 6);
                    setCastOfMovie(firstSixCastMembers);
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
          <Header />
      </header>

    {isOpen && !gameStarted && <DifficultyPopUp onStartGame={onStartGame} />}

    {!isOpen && gameStarted && (
          <div>
            <Cast numOfGuesses={numOfGuesses}  castOfMovie={castOfMovie} numberOfActors={numberOfActors} />
            <Guess movie={movie} numOfGuesses={numOfGuesses} setNumOfGuesses={setNumOfGuesses} />
          </div> 
      )}
    </div>
    
  );
}

export default App;
