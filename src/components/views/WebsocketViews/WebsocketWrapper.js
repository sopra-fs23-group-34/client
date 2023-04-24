import React, { useEffect, useState } from "react";
import SockJsClient from "react-stomp";
import { getDomain } from 'helpers/getDomain';
// Define a separate context to hold the states from SockJsClient
export const WebsocketWrapper = React.createContext();

export function WebsocketWrapperComponent({ children }) {
  const [ref, setRef] = useState(null);
  const [msg, setMsg] = useState(null);
  const [gameCode, setGameCode] = useState(null);
  const [userid, setuserid] = useState(null);
  const updateLobbyPlayers = () => {
    ref.sendMessage("/app/update/" + gameCode);
  };
  useEffect(() => {
    setGameCode(sessionStorage.getItem("gameCode"));
    setuserid(sessionStorage.getItem("id"));
  }, [ref, msg]);

  const handleMessage = (msg) => {
    console.log(msg);
    setMsg(msg);
  };

  return (
    <WebsocketWrapper.Provider value={{ ref, msg, gameCode, userid }}>
      <SockJsClient
        url= {getDomain() + "/ws"}
        topics={["/topic/lobbies/" + gameCode, "/topic/players/" + userid]}
        onMessage={(msg) => {
          handleMessage(msg);
        }}
        ref={(client) => {
          setRef(client);
        }}
        onConnect={() => updateLobbyPlayers()}
      />
      {children}
    </WebsocketWrapper.Provider>
  );
}
