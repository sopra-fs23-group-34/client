import React, { useEffect, useState } from 'react';
import SockJsClient from 'react-stomp';

// Define a separate context to hold the states from SockJsClient
export const WebsocketWrapper = React.createContext();

export function WebsocketWrapperComponent({children}) {
  const [ref, setRef] = useState(null);
  const [msg, setMsg] = useState(null);
  const [gameCode, setGameCode] = useState(null);
  const [userid, setuserid] = useState(null);
  const joinGame = () => {
    ref.sendMessage('/app/join/' + gameCode + '/' + sessionStorage.getItem("id"), JSON.stringify({'content': "startGame"}));
  }
  useEffect(() => {
    setGameCode(sessionStorage.getItem("gameCode"));
    setuserid(sessionStorage.getItem("id"));
    console.log('ref:', ref);
    console.log('msg:', msg);

  }, [ref, msg]);

  const handleMessage = (msg) => {
    console.log(msg)
    setMsg(msg);
  };

  return (
    <WebsocketWrapper.Provider value={{ ref , msg }}>
      <SockJsClient
        url='http://localhost:8080/ws'
        topics={['/topic/lobbies/' + gameCode , '/topic/players/' + userid]}
        onMessage={(msg) => {
          handleMessage(msg);
        }}
        ref={(client) => { setRef(client)}}
        onConnect={() => joinGame()}
      />
      {children}
    </WebsocketWrapper.Provider>
  );
}