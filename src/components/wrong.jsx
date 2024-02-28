

function Wrong({ movie, guessedMovies }) {
    return(
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
        </ul>    );
  }

export default Wrong;

