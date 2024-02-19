import React, {useState} from 'react';
import Cast from './cast';
import Guess from './guess';

function App() {
  const [movie,setMovie] = useState([]);
  return (
    <div className='bg-primary-subtle'>
      <div>
        Header Here !
      </div>
      <div className='bg-secondary-subtle'>
        <Cast movie={movie} setMovie={setMovie} />
        <Guess movie={movie} setMovie={setMovie} />
      </div>
      <div>
        Footer Here !
      </div>

    </div>
    
  );
}

export default App;
