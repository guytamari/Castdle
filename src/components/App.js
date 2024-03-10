import React, {useState} from 'react';
import Cast from './cast';
import Guess from './guess';
import Header from "./header";

function App() {
  const [movie,setMovie] = useState([]);
  const [numOfGuesses,setNumOfGuesses] = useState(5);
  return (
    <div>
      <header className='text-center p-2'>
        <Header numOfGuesses={numOfGuesses}/>
      </header>
      <div>
        <Cast movie={movie} setMovie={setMovie} numOfGuesses={numOfGuesses} setNumOfGuesses={setNumOfGuesses} />
        <Guess movie={movie} setMovie={setMovie} numOfGuesses={numOfGuesses} setNumOfGuesses={setNumOfGuesses} />
      </div>
    </div>
    
  );
}

export default App;
