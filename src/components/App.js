import React, {useState} from 'react';
import Cast from './cast';
import Guess from './guess';
import Header from "./header";

function App() {
  const [movie,setMovie] = useState([]);
  return (
    <div className='bg-primary-subtle'>
      <header className='text-center p-2'>
        <Header />
      </header>
      <div className='bg-secondary-subtle'>
        <Cast movie={movie} setMovie={setMovie} />
        <Guess movie={movie} setMovie={setMovie} />
      </div>
      <footer>
        <div>
          Footer Here !
        </div>
      </footer>
    </div>
    
  );
}

export default App;
