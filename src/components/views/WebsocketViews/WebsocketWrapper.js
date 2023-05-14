import React, { useEffect, useState } from "react";
import SockJsClient from "react-stomp";
import { getDomain } from 'helpers/getDomain';
import Guesses from "./Guesses";
import Lobby from "./Lobby";
import FinalScore from "./FinalScore";
import RoundScore from "./RoundScore";
// Define a separate context to hold the states from SockJsClient
export const WebsocketWrapper = React.createContext();



export function WebsocketWrapperComponent() {
  const [ref, setRef] = useState(null);
  const [msg, setMsg] = useState("");
  const [gameCode, setGameCode] = useState(null);
  const [userid, setuserid] = useState(null);
  const [page, setPage] = useState(sessionStorage.getItem("page") || "lobby");
  const [websocketConnected, setWebsocketConnected] = useState(false);

  const updateLobbyPlayers = () => {
    ref.sendMessage("/app/update/" + gameCode);
  };

  const pageHandler = {
  "lobby":            <Lobby/>,
  "RoundStart":       <Guesses/>,
  "FinalScoreStart":  <FinalScore/>,
  "RoundScoreStart":  <RoundScore/>,
  };
  
  useEffect(() => {
    console.log(msg);
    if (msg && (msg.topic === "RoundStart" || msg.topic === "FinalScoreStart" || msg.topic === "RoundScoreStart")) {
      sessionStorage.setItem("page", msg.topic);
      setPage(msg.topic);
    }
  }, [msg]);

  useEffect(() => {
    setGameCode(sessionStorage.getItem("gameCode"));
    setuserid(sessionStorage.getItem("id"));
  }, [ref, msg]);

  const handleMessage = (msg) => {
    setMsg(msg);
  };

  const handleWebSocketConnect = () => {
    ref.sendMessage("/app/reconnect/" + sessionStorage.getItem("gameCode") + "/" + sessionStorage.getItem("id"));
    setWebsocketConnected(true);
    updateLobbyPlayers();
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
        onConnect={() => handleWebSocketConnect()}
      />
    {websocketConnected ? pageHandler[page] : <p>Connecting to WebSocket...</p>}
    </WebsocketWrapper.Provider>
  );
}
