import { Button } from 'components/ui/Button';
import React, {  useState } from 'react';
import SockJsClient from 'react-stomp';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';


    
const WebSocketElement = () => {
  const [ref, setRef] = useState(null);
  const [counter, setCounter] = useState(0);
  const [header, setHeader] = useState("aosigdnoaisngd");
  const [players, setPlayers] = useState([]);
  const [roundScore, setRoundScore] = useState(0);

  const startGame = () => {
    ref.sendMessage('/app/startGame/test',JSON.stringify({'roundLimit': 2, "foodCategory": "FRUITS"}) );
  };

  const joinGame = () => {
    ref.sendMessage('/app/join/test/10',JSON.stringify({'content': "startGame"}) );
  };

  const makeGuess = () => {
    ref.sendMessage('/app/guess/test/10',JSON.stringify({'carbs': 100}) );
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

  const topicHandlers = {
    'players': handlePlayers,
    'startGame': handleStartGame,
    'timer': handleTimer,
    'RoundScore': handleRoundScore
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
              topics={['/topic/lobbies/test',  '/topic/players/'+10]}
              onMessage={(msg) => {
                handleMessage(msg);
              }}
              ref={(client) => { setRef(client)}}
              onConnect={console.log("sdgoinaosgin")}
            />
       <h3>{header}</h3>
       <Button onClick={joinGame} > Join game</Button>
       <Button onClick={startGame} > Start Game</Button>
       <Button onClick={makeGuess} > Guess 10</Button>
       <h2 style={{color: 'red'}}>Your score is: {roundScore}</h2>
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

    </div>
  );
};
/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */

export default WebSocketElement;