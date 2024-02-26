

function Correct({ movie, guessedMovies }) {
    return(
        <div className='correct-message'>
            <p> Correct! The Movie is: <br></br> {movie.title} </p>
            <p> Your guesses were: </p>

        <ul class="list-group" style={{paddingRight: "40px"}}>
            <ol type="1">
                {guessedMovies.map((guessedMovie, index) => (
                    guessedMovie === "Skipped" ? (
                    <li class="list-group-item" key={index}>Skipped</li>
                    ) : (
                    <li class="list-group-item" key={index}>{guessedMovie.title}</li>
                    )
                ))}
            </ol>
        </ul>
        </div>
    );
  }

export default Correct;