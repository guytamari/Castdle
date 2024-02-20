

function Wrong({ movie, guessedMovies }) {
    console.log(guessedMovies);
    
    return(
        <div className='wrong-message rounded-pill'>
            <p> Sorry you were out of guesses... The Movie is: <br />  {movie.title} </p>
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

export default Wrong;