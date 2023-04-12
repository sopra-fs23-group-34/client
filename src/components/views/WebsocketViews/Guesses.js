import React, {useContext, useState} from 'react';
import 'styles/views/Slider.scss';
import { WebsocketWrapper } from './WebsocketWrapper';
import BaseContainer from "../../ui/BaseContainer";
import {Slider} from "@mui/material";
import {useHistory} from "react-router-dom";
import {Button} from "../../ui/Button";




const Guesses = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const {ref , msg} = useContext(WebsocketWrapper);
    const [protein, setProtein] = useState(50);
    const [fat, setFat] = useState(50);
    const [carbs, setCarbs] = useState(50);
    const [sugar, setSugar] = useState(50);

    console.log("msg Guesses:", msg)

    const setGuess = () => {
        const gameCode = sessionStorage.getItem('gameCode');
        ref.sendMessage('/app/guess/' + gameCode + '/' + localStorage.getItem("id") , JSON.stringify({'protein': protein, "fat": fat, "carbs": carbs, "sugar": sugar}) );
        history.push("/roundscore");
    }

    const handleProteinChange = (event, newValue) => {
        setProtein(newValue);
    };

    const handleFatChange = (event, newValue) => {
        setFat(newValue);
    };

    const handleCarbsChange = (event, newValue) => {
        setCarbs(newValue);
    }

    const handleSugarChange = (event, newValue) => {
        setSugar(newValue);
    }

  return (
      <BaseContainer>
          <div>
          <img src="https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png" alt="Apple" className="slider image" />
              <h1 className="slider subtitle">Apple</h1>
          </div>

          <div className="slider form">
              <h2 className='slider title'>Protein</h2>
              <Slider
                  defaultValue={50}
                  aria-label="protein"
                  valueLabelDisplay="auto"
                  value={protein}
                  onChange={handleProteinChange}
              />
              <p className='slider description'>Selected protein value: {protein}</p>
          </div>

          <div className="slider form">
              <h2 className='slider title'>Fat</h2>
              <Slider
                  defaultValue={50}
                  aria-label="fat"
                  valueLabelDisplay="auto"
                  value={fat}
                  onChange={handleFatChange}
              />
              <p className='slider description'>Selected fat value: {fat}</p>
          </div>

          <div className="slider form">
              <h2 className='slider title'>Carbs</h2>
              <Slider
                  defaultValue={50}
                  aria-label="carbs"
                  valueLabelDisplay="auto"
                  value={carbs}
                  onChange={handleCarbsChange}
              />
              <p className='slider description'>Selected carbs value: {carbs}</p>
          </div>

          <div className="slider form">
              <h2 className='slider title'>Sugar</h2>
              <Slider
                  defaultValue={50}
                  aria-label="sugar"
                  valueLabelDisplay="auto"
                  value={sugar}
                  onChange={handleSugarChange}
              />
              <p className='slider description'>Selected sugar value: {sugar}</p>
          </div>

          <div className="profile button-container">
              <Button className="profile button-container"
                      onClick={() => setGuess()}
              >
                  Enter guess
              </Button>
          </div>

        </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Guesses;
