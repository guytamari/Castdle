import {fetchingMoviePoster} from './api'


function ShowPoster({movie}) {
    const POSTER_SIZE = "w185";
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <img alt={movie.name} src={fetchingMoviePoster(movie.poster_path, POSTER_SIZE)}></img>
        </div>
    );
}

export default ShowPoster;
