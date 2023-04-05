import { Button } from 'components/ui/Button';
import React, {  useState } from 'react';
import SockJsClient from 'react-stomp';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';


    
const WebSocketElement = () => {
  const [ref, setRef] = useState(null);
  const [counter, setCounter] = useState(0);
  const [header, setHeader] = useState("aosigdnoaisngd");
  const [players, setPlayers] = useState([]);
  const [roundScore, setRoundScore] = useState({});
  const [finalScore, setFinalScore] = useState({});
  const [food, setFood] = useState(null);
  const [roundEnd, setRoundEnd] = useState({});
  const [gameScore, setGameScore] = useState({});

  console.log(roundEnd)
  const gameCode = "MI1MGN";
  const user_id = 19; 
  const startGame = () => {
    ref.sendMessage('/app/startGame/' + gameCode , JSON.stringify({'roundLimit': 1, "foodCategory": "FRUITS"}) );
  };

  const joinGame = () => {
    ref.sendMessage('/app/join/' + gameCode + '/' + user_id,JSON.stringify({'content': "startGame"}) );
  };

  const makeGuess = () => {
    ref.sendMessage('/app/guess/'+ gameCode +'/' + user_id,JSON.stringify({
      content: {
        'carbs': 10
      }
    }) );
  };

  const handlePlayers = (msg) => {
    console.log(msg.content)
    setPlayers(msg.content);
  };

  const handleStartGame = (msg) => {
    setHeader(msg.content);
  };

  const handleTimer = (msg) => {
    setCounter(msg.content);
  };

  const handleRoundScore = (msg) => {
    setRoundScore(msg.content);
  };

  const handleGameScore = (msg) => {
    setGameScore(msg.content);
  };

  const handleFinalScore = (msg) => {
    setFinalScore(msg.content);
  };

  const handleFood = (msg) => {
    setFood(msg.content);
  };

  const handleRoundEnd = (msg) => {
    setRoundEnd(msg.content);
  };

  const topicHandlers = {
    'players': handlePlayers,
    'startGame': handleStartGame,
    'Timer': handleTimer,
    'RoundScore': handleRoundScore,
    'GameScore': handleGameScore,
    'FinalScore': handleFinalScore,
    'Food': handleFood,
    'RoundEnd': handleRoundEnd,
  };
  

  function handleMessage(msg) {
    const handler = topicHandlers[msg.topic];
    if (handler) {
      handler(msg);
    }
  }
  


   return (
    <div className="register field">
           <h2>ahsdfasasogunpaoidgnpoaisngpoianpogin</h2>
      <SockJsClient url='http://localhost:8080/ws'
              topics={['/topic/lobbies/' + gameCode,  '/topic/players/' + user_id]}
              onMessage={(msg) => {
                handleMessage(msg);
              }}
              ref={(client) => { setRef(client)}}
              onConnect={console.log("sdgoinaosgin")}
            />
       <h3>{header}</h3>
       <Button onClick={joinGame} > Join game</Button>
       <Button onClick={startGame} > Start Game</Button>
       <h2>hallo</h2>
       <Link to={{ pathname: "/bliblablub", data: ref }}>Bliblablub</Link>
        <h2>hallo</h2>
       <TableContainer component={Paper} style={{ width: '50%', margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
               <TableCell>Nr</TableCell>
               <TableCell>Usernames</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {players.map((player, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{player.username}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
       <h2>{counter}</h2>
       <Typography align='center'>Round Timer: {counter}</Typography>
       <Typography align='center'>The food is: {food}</Typography>
       <Button onClick={makeGuess} > Guess 10</Button>
       {Object.keys(roundScore).map((key)  => (
         <div key={key}>
           <h3>{key}</h3>
           <ul>
             <li>Actual values: {roundScore[key][0].actualValues}</li>
             <li>Guessed values: {roundScore[key][1].guessedValues}</li>
             <li>Deviations: {roundScore[key][2].deviations}</li>
           </ul>
         </div>
                    
         ))}
       <Typography align='center'>Game Score: {Object.values(gameScore).join(", ")}</Typography>
       <Typography align='center'>Final Scores: {Object.values(finalScore).join(", ")}</Typography>

     </div>
     
  );
};
/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */

export default WebSocketElement;

