import {useContext, useEffect, useState} from 'react';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Lobby.scss";
import {WebsocketWrapper} from './WebsocketWrapper';
import * as React from "react";
import {Grid, ListItem, ListItemText, Slider, Typography} from '@mui/material';
import Item from 'components/ui/Item';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { api } from 'helpers/api';
import {  VariableSizeList } from 'react-window';
import HelpPage from 'components/ui/HelpPage';
import { useMediaQuery } from "@material-ui/core";
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Player = ({user}) => (
    
    <div className={`player container ${user.id === parseInt(sessionStorage.getItem("id")) ? "highlighted-row" : "row"}`}>
        <div className="player username"> {`${user.host ? user.username +  " (host)" : user.username}`}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};


const Lobby = () => {
    // use react-router-dom's hook to access the history
    const maxMediumSize = useMediaQuery("(max-width: 600px)");
    const [openTooltip, setOpenTooltip] = useState(false);
    const history = useHistory();
    const {ref, msg} = useContext(WebsocketWrapper);
    const [roundLimit, setRoundLimit] = useState(5);
    const [foodCategory, setFoodCategory] = useState("All");
    const [timerLength, setTimerLength] = useState(20);
    const handleChangeCategory = (event) => {
        setFoodCategory(event.target.value);
    };

    const categories = [
        "All",
        "Fruits",
        "Vegetables",
        "Meat",
        "Snacks"
    ]

    const handleChangeRounds = (event, newValue) => {
        setRoundLimit(newValue);
    }

    const handleChangeTimer = (event) => {
        setTimerLength(event.target.value)
    }
    // define a state variable (using the state hook).
    // if this variable changes, the component will re-render, but the variable will
    // keep its value throughout render cycles.
    // a component can have as many state variables as you like.
    // more information can be found under https://reactjs.org/docs/hooks-state.html
    const [users, setUsers] = useState([]);
    const [errorMessage ,setErrorMessage] = useState("");
function renderTop(props) {
        const { index, style } = props;

        return (
          <ListItem  style={style} key={index} component="div" disablePadding>
                <ListItemText primary={<Player
                    key={users[index].id}
                    user={users[index]}
                    index={index}
                />}
                    rimaryTypographyProps={{ noWrap: true }}
                    style={{ width: '100%', minWidth: 0}}/>
          </ListItem>
        );
      }
    useEffect(() => {
        
        if (msg && msg.topic === "players") {
            setUsers(msg.content);
        }
        if (msg && msg.topic === "error" && msg.content === "host_left") {
            setErrorMessage("The host left the lobby, you will be redirected to the hub.");
            sessionStorage.removeItem('gameCode');
            sessionStorage.removeItem('host');
            setTimeout(() => {  history.push("/hub");  }, 3000);
        }
    }, [msg, history]);

    const leaveLobby = () => {
        ref.sendMessage('/app/leave/' + sessionStorage.getItem('gameCode') + '/' + sessionStorage.getItem("id"))
        sessionStorage.removeItem('gameCode');
        sessionStorage.removeItem('host');
        history.push('/hub');
    }

    
    const startGame = async () => {
        const gameConfig = JSON.stringify({foodCategory, roundLimit,timerLength});
        const gameCode = sessionStorage.getItem("gameCode");
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("id");
        sessionStorage.setItem("roundLimit", roundLimit);
        sessionStorage.setItem("roundCount", 1);
        try {
          await api(token, userId).post("/lobbys/startGame/" + gameCode,gameConfig);
        } catch (error) {
          //not needed to display anything because if you are host and you press start it should work
          console.log(error);
        }
      };

      const handleCopyToClipboardOpen = () => {
        console.log("here")
        navigator.clipboard.writeText(sessionStorage.getItem('gameCode'))
        setOpenTooltip(true)
        console.log(openTooltip)
        
        
      }
      async function handleCopyToClipboardClose() {
        await new Promise(resolve => setTimeout(resolve, 300));

        setOpenTooltip(false)
      }
    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html


    let hostview;
        hostview = (
            <div className="game" style={{
                width: "100%"
            }}>
                <Grid container className='lobby grid'  spacing={maxMediumSize ?  1 : 8} >
                    <Grid className='lobby item' sx={{paddingTop:0}} item  xs={12}  sm={sessionStorage.getItem('host') === 'true' ? 6: 12} >
                    <Typography className='lobby user-list'>User count: {users.length}</Typography>
                        <VariableSizeList
                            align='right'
                            height={maxMediumSize ?  160 : 400}
                            width={"100%"}
                    itemSize={() => 46}
                    itemCount={users.length}
                    overscanCount={1}
                    >
                    {renderTop}
                    </VariableSizeList>
                    </Grid>
                    {sessionStorage.getItem('host') === 'true' && (
                        <Grid item xs={12} sm={6} className='lobby grid'>
                            <h2>Timer Length</h2>
                            <Slider
                                value={timerLength}
                                aria-label='Default'
                                valueLabelDisplay='auto'
                                min={5}
                                max={60}
                                onChange={handleChangeTimer}
                            />
                            <h2>Number of Rounds</h2>
                            <Slider
                                value={roundLimit}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={1}
                                max={10}
                                onChange={handleChangeRounds}
                            />
                            <h2>Food categories</h2>
                            <FormControl fullWidth style={{ paddingBottom: '50px' }}>
                                <Select
                                    sx={{
                                        color: "white"
                                    }}
                                    labelId="food-category-label"
                                    id="food-category-label-select"
                                    value={foodCategory}
                                    label=""
                                    onChange={handleChangeCategory}
                                >
                                    {categories.map((category) => (
                                        <MenuItem
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            
                        </Grid>
                    )}
                    <Grid item xs={sessionStorage.getItem('host') ? 4 : 6 }>
                        <Item>
                            <Button width="100%"
                                    onClick={
                                        () => leaveLobby()}>
                                Leave Lobby
                            </Button>
                        </Item>
                    </Grid>
                    <Grid item xs={sessionStorage.getItem('host') ? 4 : 6}>
                        <Item>
                            <HelpPage/>
                        </Item>
                    </Grid>
                    {sessionStorage.getItem('host') === 'true' && (
                        <Grid item xs={4} sx={{
                            justifyContent: "flex-end"
                        }}>
                            <Item>
                                <Button width="100%"
                                    disabled={!foodCategory}
                                    onClick={
                                        () => startGame()}>
                                    Start Game
                                </Button>
                            </Item>
                        </Grid>)
                        }
                </Grid>
            </div>
        );

    return (
        <BaseContainer style={{maxWidth: sessionStorage.getItem('host') ? "900px" : "500px" }} className="lobby container">
            <h2> Game Lobby </h2>
            <Typography color={"error"}>{errorMessage}</Typography>
            <p className="lobby paragraph">
            <Grid item>   
            <ClickAwayListener onClickAway={handleCopyToClipboardClose}>
            <div>
              <Tooltip
                title={`${openTooltip ? "copied" : "copy to clipboard"}`}
                enterDelay={500}
                leaveDelay={500}
                placement="right-start"
                onClose={handleCopyToClipboardClose}
              >
                <Button style={{margin:"2%"}} onClick={handleCopyToClipboardOpen}>Lobby Code: {sessionStorage.getItem('gameCode')}</Button>
              </Tooltip>
                </div>
          </ClickAwayListener>
          </Grid>
            </p>
            {hostview}
        </BaseContainer>
    );
}

export default Lobby;