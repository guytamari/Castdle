import axios from "axios";

const baseURLProfile = process.env.REACT_APP_API_POSTER;
const baseURLApi = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
// pages
// top rated = 50
// popular = 30

export function fetchingActorPosterURL(profilePath, posterSize) {
    return `${baseURLProfile}${posterSize}${profilePath}`;
}
export function fetchingMoviePoster(posterPath, posterSize) {    
    return `${baseURLProfile}${posterSize}${posterPath}`;
}



export async function gettingMovies(catagory, numOfPages) {
    
    try {        
        const response = await axios.get(`${baseURLApi}${catagory}`, {
            params: {
                api_key: apiKey,
                language: "en-US",
                page: Math.floor(Math.random() * numOfPages) + 1
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function movieDetails(movieID) {
    try {
        const response = await axios.get(`${baseURLApi}${movieID}/credits`, {
            params: {
                api_key: apiKey,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
