import GuessesList from "./guessesList";
import ShowPoster from "./showPoster";
function ShowAnwser({ movie , isCorrect, guessedMovies}) {
    return (
        <div className={`font ${isCorrect ? 'correct-message' : 'wrong-message'}`}>
            <p>The Movie is: <br /> <span style={{backgroundColor:"green", color:"white"}}>{movie.title}</span></p>
            {isCorrect && (<p> Your guesses were: </p>)}
            <GuessesList guessedMovies={guessedMovies} />
            <ShowPoster movie={movie} />
        </div>
    );
}

export default ShowAnwser;
