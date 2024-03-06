import React, {useState, useEffect} from 'react';
import Cast from './cast';
import Guess from './guess';
import Header from "./header";

function App() {
  const [movie,setMovie] = useState([]);
  const [numOfGuesses,setNumOfGuesses] = useState(5);
  const [gradient, setGradient] = useState('');

  useEffect(() => {
    // Function to generate a random gradient color
    const generateGradient = () => {
      // Here you can implement your logic to generate a gradient color based on the current date
      // For simplicity, let's generate a random gradient color
      const color1 = '#' + Math.floor(Math.random()*16777215).toString(16); // Random color 1
      const color2 = '#' + Math.floor(Math.random()*16777215).toString(16); // Random color 2

      // Set the gradient style
      const newGradient = `linear-gradient(to right, ${color1}, ${color2})`;
      setGradient(newGradient);
    };

    // Call the generateGradient function initially
    generateGradient();

    // Update the gradient color every day (24 hours)
    const interval = setInterval(() => {
      generateGradient();
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);
  return (
    <div style={{ background: gradient, height: "100vh" }}>
      <header className='text-center p-2'>
        <Header numOfGuesses={numOfGuesses}/>
      </header>
      <div>
        <Cast movie={movie} setMovie={setMovie} />
        <Guess movie={movie} setMovie={setMovie} numOfGuesses={numOfGuesses} setNumOfGuesses={setNumOfGuesses} />
      </div>
    </div>
    
  );
}

export default App;
