import {fetchingMoviePoster} from './api'


function ShowPoster({movie}) {
    const POSTER_SIZE = "w185";
    return (
        <img alt={movie.name} src={fetchingMoviePoster(movie.poster_path, POSTER_SIZE)}></img>
    );
}

export default ShowPoster;
