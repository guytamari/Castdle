import axios from 'axios';



// top_rated / popular
// make an array of movies by using 2 req one toprated and the other one popular
function Cast() { 
    const apiKey = process.env.REACT_APP_API_KEY;
    const baseURL = "https://api.themoviedb.org/3/movie/";

    async function fetchMovies() {
    try {
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
                page: Math.floor(Math.random() * 50 ) + 1
            }
        });
        const data = [responseTopRated.data.results,responsePopular.data.results];        

        data[0].map(movie =>{
            console.log(movie.title)
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    }
    fetchMovies();
    // Call fetchData function when needed
        

    return (
        <div className='container'>
            hello
        </div>
        )

    }
export default Cast;