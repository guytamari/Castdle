import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cast({movie,setMovie}) { 
    const [castOfMovie, setCastOfMovie] = useState([]);
    function constructActorPosterURL(profilePath, posterSize) {
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
                const filteredTopRated = responseTopRated.data.results.filter(movie => { return movie.original_language === "en" && !movie.genre_ids.includes(16)});
                const filteredPopular = responsePopular.data.results.filter(movie => { return movie.original_language === "en" && !movie.genre_ids.includes(16)});
                const allMovies = filteredTopRated.concat(filteredPopular);
                const randomIndex = Math.floor(Math.random() * allMovies.length);
                const selectedMovie = allMovies[randomIndex];
                const randomMovieID = allMovies[randomIndex].id;
                
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

    return (
<div className="container center-container">
        <div className="row no-wrap">
            {movie.title}
            {castOfMovie.slice(0, 4).map((actor, key) => (
                <div key={key} className="col-md-3">
                    <img 
                        src={constructActorPosterURL(actor.profile_path, "original")} 
                        className="img-fluid"
                    />
                </div>
            ))}
        </div>
    </div>
    );
}

export default Cast;
