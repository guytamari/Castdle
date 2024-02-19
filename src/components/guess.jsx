import React, { useState } from 'react';
import axios from 'axios';



function Guess() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchQueryUser = async (query) =>{
        try{
            if (query.trim() === " "){
                return setSuggestions([]);
            }
            const baseURL = 'https://api.themoviedb.org/3/search/movie';
            const apiKey = process.env.REACT_APP_API_KEY;
            const response = await axios.get(baseURL,{
                params: {
                    api_key: apiKey,
                    query: query
                }
            })
            setSuggestions(response.data.results);

        }
        catch (error) {
            console.error('Error fetching movie suggestions:', error);
            setSuggestions([]);
        }
    }
    const handleInputChange = async (event) => {
        setQuery(event.target.value)
        await fetchQueryUser(event.target.value);
    }
    const handleSelectedMovie = async (movie) => {
        setQuery(movie.title);
        setSuggestions([]);
    }


    return(
    <form className='form-guess m-100'>
        <div className="form-floating">
            <input type="text" value={query} onChange={handleInputChange} className="form-control" id="floatingInput" placeholder="Think you know that movie is this? (press skip if you have no idea)" />
            <label htmlFor="floatingInput">Think you know that movie is this? (press skip if you have no idea)</label>
            <ul>
                {suggestions.map(movie => (
                    <li key={movie.id} onClick={() => handleSelectedMovie(movie)}>
                        {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    </form>
    )
  }



export default Guess;