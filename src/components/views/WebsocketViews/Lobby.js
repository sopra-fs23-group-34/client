import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'components/ui/Spinner';
import { Button } from 'components/ui/Button';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Lobby.scss";
import { WebsocketWrapper } from './WebsocketWrapper';
import * as React from "react";
import Box from '@mui/material/Box';


const Player = ({ user }) => ( 
    <div className = "player container" >
    <div className = "player username" > { user.username } </div> 
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};


const Lobby = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const {msg} = useContext(WebsocketWrapper);

    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState([]);

    useEffect(() => {
      console.log("msg Lobby:", msg)
      if (msg && msg.topic === "players") {
        setUsers(msg.content);

      }
    }, [msg]);

    const leaveLobby = () => {
        sessionStorage.removeItem('gameCode');
        history.push('/hub');
    }

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html


    let content = <Spinner/> ;

    if (users) {
        content = ( 
        <div className = "game"  style={{
            width: "100%"
        }}>
            <Box
                sx={{ 
                width:"100%", 
                height: 400, 
                maxWidth: 360,
                margin: "left",
                marginLeft: "30px"}}
            >
                {users.map((user) => (
                  <Player
                  key={user.id}
                  user={user} />
                ))}   
            </Box>
            <Button width = "100%"
            onClick = {
                () => leaveLobby() } >
            Leave Lobby 
            </Button> 
            </div>
        );
    }

    return ( 
    <BaseContainer className = "lobby container">
        <h2> Game Lobby </h2> 
        <p className = "lobby paragraph" >
        WIP 
        </p>
        {content}
        </BaseContainer>
    );
}

export default Lobby;