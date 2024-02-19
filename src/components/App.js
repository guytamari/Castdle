import React from 'react';
import Cast from './cast';
import Guess from './guess';

function App() {
  

  return (
    <div className='bg-primary-subtle'>
      <div>
        Header Here !
      </div>
      <div className='bg-secondary-subtle'>
        <Cast />
        <Guess />
      </div>
      <div>
        Footer Here !
      </div>

    </div>
    
  );
}

export default App;
