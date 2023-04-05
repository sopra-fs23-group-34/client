import React, { useState, useContext } from 'react';
import SockJsClient from 'react-stomp';

// Define a separate context to hold the states from SockJsClient
export const WebsocketWrapper = React.createContext();

export function WebsocketWrapperComponent({children}) {
  const [ref, setRef] = useState(null);
  const [msg, setMsg] = useState(null);
  

  const handleMessage = (msg) => {
    setMsg(msg);
  };

  return (
    <WebsocketWrapper.Provider value={{ ref , msg }}>
      <SockJsClient
        url='http://localhost:8080/ws'
        topics={['/topic/lobbies/' + "" , '/topic/players/' + ""]}
        onMessage={(msg) => {
          handleMessage(msg);
        }}
        ref={(client) => { setRef(client)}}
        onConnect={() => console.log("connected")}
      />
      {children}
    </WebsocketWrapper.Provider>
  );
}