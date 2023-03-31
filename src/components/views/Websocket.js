import { Button } from 'components/ui/Button';
import React, {  useState } from 'react';
import SockJsClient from 'react-stomp';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';


    
const WebSocketElement = () => {
  const [ref, setRef] = useState(null);
  const [counter, setCounter] = useState(0);
  const [header, setHeader] = useState("aosigdnoaisngd");
  const [players, setPlayers] = useState([]);

  const startGame = () => {
    console.log("oasdg");
    ref.sendMessage('/app/startGame/test',JSON.stringify({'content': "startGame"}) );
  };

  const joinGame = () => {
    console.log("oasdg");
    ref.sendMessage('/app/join/test',JSON.stringify({'content': "startGame"}) );
  };

  const HandleMessage = (msg) => {
    if (typeof msg === 'number') {
      setCounter(msg);
    }
    else if (Array.isArray(msg)) { 
      setPlayers(msg);
    }
    else {
      setHeader(msg.content);
    }
  };


   return (
    <div className="register field">
           <h2>ahsdfasasogunpaoidgnpoaisngpoianpogin</h2>
      <SockJsClient url='http://localhost:8080/ws'
              topics={['/lobbys/messages']}
              onMessage={(msg) => {
                HandleMessage(msg);
              }}
              ref={(client) => { setRef(client)}}
              onConnect={console.log("sdgoinaosgin")}
            />
       <h3>{header}</h3>
       <Button onClick={joinGame} > Join game</Button>
       <Button onClick={startGame} > Start Game</Button>
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