import React, {useContext, useState} from 'react';
import 'styles/views/Login.scss';
import { WebsocketWrapper } from './WebsocketWrapper';



const RoundScore = () => {
  const { ref, lastMessage } = useContext(WebsocketWrapper);
  console.log(lastMessage)

  return (
      <div>
      <h1>aasdfgasdgasdgsdf</h1>
    </div>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default RoundScore;
