

function GuessesList({ movie, guessedMovies }) {
    return(
        <ul className="list-group" style={{paddingRight: "40px"}}>
            <ol type="1">
                {guessedMovies.map((guessedMovie, index) => (
                    guessedMovie === "Skipped" ? (
                    <li className="list-group-item" key={index}>Skipped</li>
                    ) : (
                    <li className="list-group-item" key={index}>{guessedMovie.title}</li>
                    )
                ))}
            </ol>
        </ul>
    );
  }

export default GuessesList;