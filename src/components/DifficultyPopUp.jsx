import "./Diff.css";
import { useState } from "react";

function DifficultyPopUp({ onStartGame }) {
    const [selectedOption, setSelectedOption] = useState('easy');
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleStartGame = () => {
      onStartGame(selectedOption);
    };
  
      return(
          <div className="pop_div">
            <div className="pop_header">
                
                Choose Your Difficulty!
            </div>
            <div className="toggle-switch">
                <input
                    type="radio"
                    id="easy"
                    name="toggle"
                    value="easy"
                    checked={selectedOption === 'easy'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="easy">Easy</label>
                
                <input
                    type="radio"
                    id="medium"
                    name="toggle"
                    value="medium"
                    checked={selectedOption === 'medium'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="medium">Medium</label>
                
                <input
                    type="radio"
                    id="hard"
                    name="toggle"
                    value="hard"
                    checked={selectedOption === 'hard'}
                    onChange={handleOptionChange}
                />
                <label htmlFor="hard">Hard</label>
                </div>
                <div className="button_div">
                <button className="start-button" onClick={handleStartGame}>
                    Start Game
                </button>
                </div>

          </div>
          );
    }
  
  export default DifficultyPopUp;
  
  