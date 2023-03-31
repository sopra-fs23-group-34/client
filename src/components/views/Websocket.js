import { Button } from 'components/ui/Button';
import React, {  useState } from 'react';
import SockJsClient from 'react-stomp';


    
export default WebSocketElement = () => {
  const [ref, setRef] = useState(null);
  const [counter, setCounter] = useState(0);
  const [header, setHeader] = useState("aosigdnoaisngd");

  const sendMessage2 = (msg) => {
    if (ref !== null) {
      ref.sendMessage('/lobby/testMessage', msg);
    }
  }
  const handleSendMessage = () => {
    const message = 'Hello, WebSocket!';
    sendMessage2(JSON.stringify({'content': message}));
  };

  const startGame = () => {
    ref.sendMessage('/lobby/startGame',JSON.stringify({'content': "startGame"}) );
  };

  const MessageHandler = (msg) => {

    if (typeof msg === 'number') {
      setCounter(msg);
    }
    else {
      setHeader(msg.content);
    }
  };

   return (
    <div className="register field">
           <h2>ahsdfasasogunpaoidgnpoaisngpoianpogin</h2>
      <SockJsClient url='http://localhost:8080/ws'
              topics={['/topic/messages']}
              onMessage={(msg) => { MessageHandler(msg) }}
              ref={(client) => { setRef(client)}}
              onConnect={console.log("sdgoinaosgin")}
            />
       <h3>{header}</h3>
       <Button onClick={handleSendMessage} > asodfina</Button>
       <Button onClick={startGame} > StartTheGame</Button>
       <h2>{counter}</h2>

    </div>
  );
};
/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */

