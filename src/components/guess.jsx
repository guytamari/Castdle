import React, { useState, useEffect } from 'react';
import GuessesList from './guessesList';
import axios from 'axios';
import Confetti from 'react-confetti';
import ShowAnwser from './showanwser';
function Guess({movie,numOfGuesses,setNumOfGuesses}) {
    
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isSkipped, setIsSkipped] = useState(false);
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
    // use debound to reduce spams on the api
    const debounce = (func, delay) => {
        let timeoutId;
        return function(...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const debouncedFetchQueryUser = debounce(fetchQueryUser, 500);
    const handleInputChange = (event) => {
        setQuery(event.target.value);
        debouncedFetchQueryUser(event.target.value);
    }
    const handleSelectedMovie = async (movie) => {
        setQuery(`${movie.title} - ${movie.release_date.substring(0,4)}`);
        setMovieUser(movie);
        setSuggestions([]);
    }
    // handle enter keyboard press
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
          }
        };
    
        document.addEventListener('keypress', handleKeyPress);
    
        return () => {
          document.removeEventListener('keypress', handleKeyPress);
        };
      });

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

        function refreshPage(){
            window.location.reload();
        } 
        const showAnwser = () =>{
            setNumOfGuesses(0);
            setIsSkipped(true);
            setIsDone(true);
        }
       
        
        return (
            <form autoComplete='off' className='form-guess m-100'>
                <p className='font' style={{ color: "ghostwhite", textAlign:"center", fontSize:"14px"}}>GUESSES LEFT: {numOfGuesses}</p>
                <div>
                    <div className={`form-floating flex-grow-1 me-2 ${isDone || isSkipped ? 'hidden' : ''}`}>
                        
                            <div className="form-buttons">
                                {/* show awnser button  */}
                                <button type="button"
                                    className='button'
                                    onClick={showAnwser}>
                                    <span>Show Awnser</span>
                                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
                                    </svg>
                                </button>
                                {/* shuffle button */}
                                <button type="button"
                                    className='button'
                                    onClick={refreshPage}>
                                    <span>Shuffle</span>
                                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
                                    </svg>
                                </button>
                                {/* submit button */}
                                <button type="button"
                                    className='button'
                                    onClick={handleSubmit}>
                                    <span>Submit</span>
                                    <svg viewBox="-5 -5 110 110" preserveAspectRatio="none" aria-hidden="true">
                                        <path d="M0,0 C0,0 100,0 100,0 C100,0 100,100 100,100 C100,100 0,100 0,100 C0,100 0,0 0,0"/>
                                    </svg>
                                </button>
                                {/* input awnser */}
                                <input
                                    type="text"
                                    value={query}
                                    onChange={handleInputChange}
                                    className="form-control font"
                                    id="floatingInput form-buttons"
                                    placeholder="Think you know that movie is this? (press skip if you have no idea)"
                                />    
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
                            {movie ? <GuessesList movie={movie} guessedMovies={guessedMovies} /> : null}
                        </div>
                    )}
                    {(isCorrect || isWrong) && (
                        <div>
                            <p className='font' style={{ color: "ghostwhite", textAlign:"center", fontSize:"20px"}}>{isCorrect ? 'Correct!' : 'Sorry you were out of guesses...'} </p>  
                            <ShowAnwser movie={movie} isCorrect={isCorrect} guessedMovies={guessedMovies} refreshPage={refreshPage} isDone={isDone} isSkipped={isSkipped}/>
                        </div>
                    )}
                    {isCorrect && <Confetti />}
                    {isSkipped && (
                        <ShowAnwser movie={movie} isCorrect={isCorrect} guessedMovies={guessedMovies} refreshPage={refreshPage} isDone={isDone} isSkipped={isSkipped}/>
                    )}
                </div>
            </form>
        );
        
        
}

export default Guess;