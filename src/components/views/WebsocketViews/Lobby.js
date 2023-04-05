import { useContext, useEffect, useState } from 'react';
import { api, handleError } from 'helpers/api';
import { Spinner } from 'components/ui/Spinner';
import { Button } from 'components/ui/Button';
import { useHistory } from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Lobby.scss";
import { WebsocketWrapper } from './WebsocketWrapper';

const Player = ({ user }) => ( 
    <div className = "player container" >
    <div className = "player username" > { user.username } </div> 
    <div className = "player name" > { user.name } </div> 
    <div className = "player id" > id: { user.id } </div> 
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};

const Lobby = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const {ref, msg} = useContext(WebsocketWrapper);
    const [gameCode, setGameCode] = useState(null);
    
    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState(null);

    const logout = () => {
        sessionStorage.removeItem('token');
        history.push('/login');
    }

    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                
                // delays continuous execution of an async operation for 1 second.

            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    let content = <Spinner/> ;

    if (users) {
        content = ( 
        <div className = "game" >
            <ul className = "game user-list" >
            </ul> 
            <Button width = "100%"
            onClick = {
                () => logout() } >
            Logout 
            </Button> 
            </div>
        );
    }

    return ( 
    <BaseContainer className = "lobby container" >
        <h2> Game Lobby </h2> 
        <p className = "lobby paragraph" >
        WIP 
        </p> { content } 
        </BaseContainer>
    );
}

export default Lobby;