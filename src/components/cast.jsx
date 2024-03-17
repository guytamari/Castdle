import React, { useState } from 'react';
import { fetchingActorPosterURL } from './api';

const POSTER_SIZE = "w185";

function Cast({numOfGuesses, castOfMovie}) { 
    const [numberOfActors] = useState(4);
    

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
        <div className='gridContainer'>
            {getActorsDetails(castOfMovie, numberOfActors).map(actor => (
                <div className='castName' key={actor.id}>
                    {actor.profile_path ? (
                        <img 
                            src={fetchingActorPosterURL(actor.profile_path, POSTER_SIZE)} 
                            className="gridItem"
                            alt=''
                        />
                    ) : (
                        <p>no poster available</p>
                    )}
                    {numOfGuesses <= 4 && (
                        <p>{actor.name}</p>
                    )}
                    {numOfGuesses <= 3 && (
                        <p style={{fontSize:"12px"}}>{actor.character}</p>
                    )}
                    
                
                </div>
            ))}

        </div>
    );
}

export default Cast;
