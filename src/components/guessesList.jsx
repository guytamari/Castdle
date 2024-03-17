/* <li className="list-group-item" key={index}>{guessedMovie.title}</li> */


function GuessesList({ movie, guessedMovies }) {
  // (<span>🟩 {guessedMovie.title}</span>) : (<span>🟥 {guessedMovie.title}</span>)

    return(
        guessedMovies ? (
            <ul className="list-group" style={{ paddingRight: "40px", marginBottom: "20px" }}>
              <ol type="1">
                {guessedMovies.map((guessedMovie, index) => (
                  guessedMovie === "Skipped" ? (
                    <li className="list-group-item" key={index}>🟥 Skipped</li>
                  ) : (
                    <li className="list-group-item" key={index}>{guessedMovie.title}</li>
                  )
                ))}
                
              </ol>
            </ul>
          ) : (
            <p>Didn't have any guesses</p>
          )
        );
  }

export default GuessesList;

