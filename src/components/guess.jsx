import React, { useState } from 'react';
import Correct from './correct';
import Wrong from './wrong';
import axios from 'axios';

let numOfGuesses = 0;

function Guess({movie,setMovie}) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isCorrect, setIsCorrct] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [movieUser, setMovieUser] = useState(0);
    const [guessedMovies, setGuessedMovies] = useState([]);
    const randomMovieID = movie.id;
    

    const fetchQueryUser = async (query) =>{
        try{
            if (query.trim() === " "){
                return setSuggestions([]);
            }
            const baseURL = 'https://api.themoviedb.org/3/search/multi';
            const apiKey = process.env.REACT_APP_API_KEY;
            const response = await axios.get(baseURL,{
                params: {
                    api_key: apiKey,
                    query: query
                }
            })
            const movieSuggestions = response.data.results.filter(item => item.media_type === 'movie');
            
            setSuggestions(movieSuggestions);

        }
        catch (error) {
            console.error('Error fetching movie suggestions:', error);
            setSuggestions([]);
        }
    }
    const handleInputChange = async (event) => {
        setQuery(event.target.value);
        await fetchQueryUser(event.target.value);
    }
    const handleSelectedMovie = async (movie) => {
        setQuery(`${movie.title} - ${movie.release_date.substring(0,4)}`);
        setMovieUser(movie);
        setSuggestions([]);
    }

    /*
        randomMovieID == the correct movie id
        ---------------------------------------
        movieUserID == the user chosen movie id
        ---------------------------------------
    */
        const handleSubmit = () => {
            numOfGuesses++;
            if (query === "" && numOfGuesses < 5) {
                setGuessedMovies([...guessedMovies, "Skipped"]);
            } else {
                setGuessedMovies([...guessedMovies, movieUser]);
                if (randomMovieID === movieUser.id) {
                    setIsCorrct(true);
                    setIsDone(true);
                    numOfGuesses = 0;
                } else if (numOfGuesses >= 5 && randomMovieID !== movieUser.id) {
                    setIsWrong(true);
                    setIsDone(true);
                    numOfGuesses = 0;
                }
                setQuery(''); 
            }
        }


    return(
        <form className='form-guess m-100'>
            <div>
                <div className={`form-floating flex-grow-1 me-2 ${isDone ? 'hidden' : ''}`}>
                    <input type="text" value={query} onChange={handleInputChange} className="form-control" id="floatingInput" placeholder="Think you know that movie is this? (press skip if you have no idea)" />
                    <label htmlFor="floatingInput">Think you know that movie is this? (press skip if you have no idea)</label>
                    <button className="btn btn-primary btn-lg font-semibold text-sm btn-submit" type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                    <ul>
                        {suggestions.map(movie => (
                        <li key={movie.id} onClick={() => handleSelectedMovie(movie)}>
                            {movie.title} - {movie.release_date.substring(0,4)}
                        </li>
                        ))}
                    </ul>
                </div>
                {isCorrect && (
                    <Correct movie={movie} />
                )}
                {isWrong && (
                    <Wrong movie={movie} guessedMovies={guessedMovies}/>
                )}
                
            </div>
        </form>
    )
  


}
export default Guess;