import React, { useState, useEffect } from 'react';
import { gettingMovies, movieDetails, fetchingActorPosterURL } from './api';
import Box from "./component-style/actorBox"

const ANIMETED_MOVIES = 16;
const POSTER_SIZE = "w185";

function Cast({movie,setMovie}) { 
    const [castOfMovie, setCastOfMovie] = useState([]);
    const [numberOfActors, setNumberOfActors] = useState(5);
        useEffect(() => {
            async function fetchAndFilterMovies() {
                try {
                    const responseTopRated = await gettingMovies("top_rated", 50);
                    const responsePopular = await gettingMovies("popular", 30);
    
                    if (responseTopRated && responsePopular) {
                        const filteredTopRated = responseTopRated.results.filter(movie => {
                            return (
                                movie.original_language === "en" &&
                                !movie.genre_ids.includes(ANIMETED_MOVIES) &&
                                new Date(movie.release_date).getFullYear() >= 1998
                            );
                        });
                        const filteredPopular = responsePopular.results.filter(movie => {
                            return (
                                movie.original_language === "en" &&
                                !movie.genre_ids.includes(ANIMETED_MOVIES) &&
                                new Date(movie.release_date).getFullYear() >= 1998
                            );
                        });
                        const allMovies = filteredTopRated.concat(filteredPopular);
                        const randomIndex = Math.floor(Math.random() * allMovies.length);
                        const selectedMovie = allMovies[randomIndex];
                        const randomMovieID = selectedMovie.id;
                        const responseFetchMovieDetails = await movieDetails(randomMovieID);
                        setCastOfMovie(responseFetchMovieDetails.cast);
                        setMovie(selectedMovie);
                    }
                } catch (error) {
                    console.error("Error fetching and filtering movies:", error);
                }
            }
            fetchAndFilterMovies();
        }, []); 

    // get actor image and idetify if it has any
    function getActorsDetails(castOfMovie, numberOfActors) {
        const actorsWithProfilePath = castOfMovie.filter(actor => actor.profile_path);
        const actorsToDisplay = [];
    
        let count = 0;
        for (let i = 0; i < actorsWithProfilePath.length; i++) {
            if (count === numberOfActors) break;
            actorsToDisplay.push(actorsWithProfilePath[i]);
            count++;
        }
    
        return actorsToDisplay;
    }


    
    return (
        <div className="container center-container">
            <div className="row justify-content-center">
                {movie.title}
                {getActorsDetails(castOfMovie, numberOfActors).map(actor => (
                    <div key={actor.id} className="col-6 col-md-3 text-center">
                    <Box>
                        {actor.profile_path ? (
                            <img 
                                src={fetchingActorPosterURL(actor.profile_path, POSTER_SIZE)} 
                                className="img-fluid actor"
                            />
                        ) : (
                            <p>no poster available</p>
                        )}
                    </Box>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Cast;
