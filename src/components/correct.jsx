

function Correct(props) {
    const {movie} = props;
    return(
        <div className='correct-message rounded-pill'>
            <p> Correct! The Movie is: <br></br> {movie.title} </p>
        </div>
    );
  }

export default Correct;