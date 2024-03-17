import GuessesList from "./guessesList";
import ShowPoster from "./showPoster";
import { GoSync } from "react-icons/go";

function ShowAnwser({ movie , isCorrect, guessedMovies,refreshPage, isDone, isSkipped }) {
    return (
        <div className={`font results-div ${isCorrect ? 'correct-message' : 'wrong-message'}`}>
            <p>The Movie is: <br /> <span style={{backgroundColor:"green", color:"white"}}>{movie.title}</span></p>
            <button className='custom-button' onClick={refreshPage}><GoSync style={{width:"5em", height: "5em"}} /></button>
            <div>
                {isDone && (<p> Your guesses were: </p>)}
                {guessedMovies && guessedMovies.length > 0 ? <GuessesList guessedMovies={guessedMovies} /> : <p>No Guesses were made</p>}
            </div>
            <ShowPoster movie={movie} />
        </div>
    );
}

export default ShowAnwser;
