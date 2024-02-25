import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ANIMETEDMOVIES = 16;

function Cast({movie,setMovie}) { 
    const [castOfMovie, setCastOfMovie] = useState([]);
    const [numberOfActors, setNumberOfActors] = useState(4);
    function fetchingActorPosterURL(profilePath, posterSize) {
        const baseURLProfile = "https://image.tmdb.org/t/p/";
        return `${baseURLProfile}${posterSize}${profilePath}`;
    }


    useEffect(() => {
        async function fetchMovies() {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;
                const baseURL = "https://api.themoviedb.org/3/movie/";

                const responseTopRated = await axios.get(`${baseURL}top_rated`, {
                    params: {
                        api_key: apiKey,
                        language: "en-US",
                        page: Math.floor(Math.random() * 50 ) + 1
                    }
                });

                const responsePopular = await axios.get(`${baseURL}popular`, {
                    params: {
                        api_key: apiKey,
                        language: "en-US",
                        page: Math.floor(Math.random() * 30 ) + 1
                    }
                });

                // filtering results:
                const filteredTopRated = responseTopRated.data.results.filter(movie => {
                    return movie.original_language === "en" && 
                           !movie.genre_ids.includes(ANIMETEDMOVIES) &&
                           new Date(movie.release_date).getFullYear() >= 1998;
                });
                const filteredPopular = responsePopular.data.results.filter(movie => {
                    return movie.original_language === "en" && 
                           !movie.genre_ids.includes(ANIMETEDMOVIES) &&
                           new Date(movie.release_date).getFullYear() >= 1998;
                });
                const allMovies = filteredTopRated.concat(filteredPopular);
                const randomIndex = Math.floor(Math.random() * allMovies.length);
                const selectedMovie = allMovies[randomIndex];
                const randomMovieID = selectedMovie.id;
                
                const responseFetchMovieDetails = await axios.get(`${baseURL}${randomMovieID}/credits`, {
                    params: { api_key: apiKey }
                });
                
                setCastOfMovie(responseFetchMovieDetails.data.cast);
                setMovie(selectedMovie);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchMovies();
    }, []);
    function getActorsDetails (cast,numberOfActors) {
        return cast.slice(0, numberOfActors);
      };


    return (
<div className="container center-container">
        <div className="row no-wrap">
            {movie.title}
            {getActorsDetails(castOfMovie, 4).map(actor=>(
                actor.profile_path ? (
                    <img 
                    key={actor.id}
                    src={fetchingActorPosterURL(actor.profile_path, "original")} 
                    className="img-fluid"
                />
                ) : (
                    <p>no poster available</p>
                )
            ))}
        </div>
</div>
    );
}

export default Cast;
