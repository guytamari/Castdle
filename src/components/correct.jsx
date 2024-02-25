

function Correct({ movie, guessedMovies }) {
    return(
        <div className='correct-message rounded-pill'>
            <p> Correct! The Movie is: <br></br> {movie.title} </p>
            <p> Your guesses were: </p>

        <ul>
            <ol type="1">
                {guessedMovies.map((guessedMovie, index) => (
                    guessedMovie === "Skipped" ? (
                    <li key={index}>Skipped</li>
                    ) : (
                    <li key={index}>{guessedMovie.title}</li>
                    )
                ))}
            </ol>
        </ul>
        </div>
    );
  }

export default Correct;