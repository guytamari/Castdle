import React from 'react';


function App() {
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Call fetchData function when needed
  fetchData();

  return (
    <div>

    </div>
    
  );
}

export default App;
