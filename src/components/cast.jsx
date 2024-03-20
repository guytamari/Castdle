import { fetchingActorPosterURL } from './api';
import { useState, useEffect } from 'react';

const POSTER_SIZE = "w185";

function Cast({numOfGuesses, castOfMovie, numberOfActors}) { 
    const [shuffledCast, setShuffledCast] = useState([]);

    useEffect(() => {
        const shuffleCast = () => {
            const shuffled = castOfMovie.slice();
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        
        setShuffledCast(shuffleCast());
    }, [castOfMovie]);

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
            {getActorsDetails(shuffledCast, numberOfActors).map(actor => (
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
