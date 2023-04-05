import React, {useContext, useState} from 'react';
import 'styles/views/Slider.scss';
import { WebsocketWrapper } from './WebsocketWrapper';
import BaseContainer from "../../ui/BaseContainer";
import {Slider} from "@mui/material";



const Guesses = () => {


  return (
      <BaseContainer>

          <div className="slider form">
              <h2>Enter Protein</h2>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          </div>

          <div className="slider form">
              <h2>Enter Fat</h2>

              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          </div>

          <div className="slider form">
              <h2>Enter Carbs</h2>

              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          </div>

          <div className="slider form">
              <h2>Enter Sugar</h2>

              <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
          </div>

        </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Guesses;
