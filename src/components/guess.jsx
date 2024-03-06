import React, { useState } from 'react';
import GuessesList from './guessesList';
import axios from 'axios';
import Confetti from 'react-confetti';


function Guess({movie,setMovie,numOfGuesses,setNumOfGuesses}) {
    
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
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
            setNumOfGuesses(numOfGuesses - 1);
        
            // Check if the user guessed correctly or used up all guesses
            if (query === "" && numOfGuesses > 1) {
                // User chose to skip
                setGuessedMovies([...guessedMovies, "Skipped"]);
            } else {
                // User made a guess
                setGuessedMovies([...guessedMovies, query !== "" ? movieUser : "Skipped"]);
        
                // Check if the guess is correct or if all guesses are used up
                if (randomMovieID === movieUser.id && numOfGuesses >= 1) {
                    setIsCorrect(true); // Correct guess
                    setIsDone(true); // Game ends
                    setNumOfGuesses(0); // Reset the number of guesses
                } else if (numOfGuesses === 1 && randomMovieID !== movieUser.id) {
                    setIsWrong(true); //no guesses left without a correct guess
                    setIsDone(true);
                }
            }
        
            // Reset the query for the next guess
            setQuery('');
        }
        
        return (
            <form autoComplete='off' className='form-guess m-100'>
                <div>
                    <div className={`form-floating flex-grow-1 me-2 ${isDone ? 'hidden' : ''}`}>
                        <div className='row align-items-center'>
                            <div className="col">

                                <input
                                    type="text"
                                    value={query}
                                    onChange={handleInputChange}
                                    className="form-control font"
                                    id="floatingInput"
                                    placeholder="Think you know that movie is this? (press skip if you have no idea)"
                                />
                            </div>
                            <div className="col-auto">
                                <button
                                    className="btn btn-primary btn-lg font text-sm btn-submit"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                        <ul className="list-group">
                            {suggestions.map(movie => (
                                <li
                                    key={movie.id}
                                    className="list-group-item list-group-item-action font"
                                    onClick={() => handleSelectedMovie(movie)}
                                >
                                    {movie.title} - {movie.release_date.substring(0, 4)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {guessedMovies.length > 0 && (
                        <div className={`guesses-history ${isDone ? 'hidden' : ''}`}>
                            <h3>Your Guesses :</h3>
                            <GuessesList movie={movie} guessedMovies={guessedMovies} />
                        </div>
                    )}
                    {(isCorrect || isWrong) && (
                        <div className={isCorrect ? 'correct-message' : 'wrong-message'}>
                            <p>{isCorrect ? 'Correct!' : 'Sorry you were out of guesses...'} The Movie is: <br /> <span style={{backgroundColor:"green", color:"white"}}>{movie.title}</span></p>
                            <p> Your guesses were: </p>
                            <GuessesList guessedMovies={guessedMovies} />
                        </div>
                    )}
                    {isCorrect && <Confetti />}
                </div>
            </form>
        );
        
        
}

export default Guess;