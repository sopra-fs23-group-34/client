import { Spinner } from "components/ui/Spinner";
import { handleError } from "helpers/api";
import { api } from "helpers/api";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, ListItemButton, Typography } from "@mui/material";
import "styles/views/Leaderboard.scss";
import Item from "components/ui/Item";
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
//import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList} from 'react-window';
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const { default: BaseContainer } = require("components/ui/BaseContainer")
const Player = ({user, index}) => {
    return (
      <div className='player container' data-status={index}>
            <div className="player placing">
                {index + 1}
            </div>
            <div className='player username'>
              {user.username}
            </div>
            <div className='player totalscore'>
              {user.totalScore}
            </div>

      </div>
    )
    };
  
  Player.propTypes = {
    user: PropTypes.object
  };
const Leaderboard = () => {
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState([]);
    const history = useHistory();
    const listRef = React.createRef();
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
      const handleClickOpen = () => {
        setShow(true);
      };
    
      const handleClose = () => {
        setErrorMessage("");
        setShow(false);
      };
    function renderRow(props) {
        const { index, style } = props;
        const handleClick = () => {
            setUser(users[index+3]);
            console.log(users, user, index)
            handleClickOpen();
        }
        return (
          <ListItem style={{...style}
          } key={index} component="div" disablePadding>
            <ListItemButton onClick={handleClick} sx={{
                height:"46px",
                width:"100%",
                padding:"0px"
            }}>
              <ListItemText primary={<Player
                                key={users[index + 3].id}
                                user={users[index + 3]}
                                index={index + 3}
                                />} />
                                </ListItemButton>
          </ListItem>
        );
      }
      function renderTop(props) {
        const { index, style } = props;
        const handleClick = () => {
            setUser(users[index]);
            handleClickOpen();
        }
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={handleClick} sx={{
                height:"46px",
                width:"100%",
                padding:"0px"
            }}>
              <ListItemText primary={<Player
                                key={users[index].id}
                                user={users[index]}
                                index={index}
                                />} />
            </ListItemButton>
          </ListItem>
        );
      }

    function findUser(user) {
        return user.token === sessionStorage.getItem('token');
    }
    function moveToMe() {
        listRef.current.scrollToItem(users.indexOf(users.find(findUser)), "center")
    }
    function moveToTop() {
        listRef.current.scrollToItem(0);
    }
    function Hub() {
        history.push("/hub");
    }
    useEffect(() => {
        let ignore = false;
        if (!ignore && listRef.current)  {
            moveToMe()
        }
        return () => { ignore = true; }
        },);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api(sessionStorage.getItem("token"),sessionStorage.getItem("id")).get("/users/ranking");
                console.log(response.data)
                setUsers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, []);

    let content = <Spinner/>;

    if (users) {
        content = (
            <div className = "leaderboard" style={{
                width: "100%"
            }}>
                <Grid container spacing={3} sx={{
                    width: "60%",
                    margin: "auto"
                }}>
                    <Box item xs={3}
                    sx={{
                        width: "100%"
                    }}
                    >
                        <Box item xs={3}
                        sx={{
                            width: "100%",
                            flexDirection: "row",
                            display:"flex",
                            justifyContent:"flex-start"
                        }}>
                            <Item sx={{
                                marginLeft:"2px",
                                textTransform: 'uppercase',
                                fontWeight:"900",
                                color:"white",
                                pl:"0px",
                                width:"11%",
                                marginRight:"1px"

                            }}>
                                Rank
                            </Item>
                            <Item sx={{
                                textTransform: 'uppercase' ,
                                fontWeight:"900",
                                color:"white",
                                pl:"0px",
                                width:"60%",
                                textAlign:"left",
                                marginLeft:"0"
                            }}>
                                Username
                            </Item>
                            <Item sx={{
                                marginRight:"2px",
                                textTransform: 'uppercase',
                                fontWeight:"900",
                                color:"white"
                            }}>
                                Total Score
                            </Item>
                        </Box>
                        <FixedSizeList
                        height={144}
                        width={"100%"}
                        itemSize={46}
                        itemCount={3}
                        overscanCount={0}
                        style={{
                            overflow: "hidden"
                        }}
                        >
                            {renderTop}
                        </FixedSizeList>
                        <FixedSizeList
                        height={400}
                        width={"100%"}
                        itemSize={46}
                        itemCount={users.length - 3}
                        overscanCount={1}
                        ref={listRef}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Box>
                    
        <Dialog fullWidth={true} maxWidth={"md"} sx={{
            
        }} open={show} onClose={handleClose}>
        <DialogTitle >{user.username}'s Stats</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a code to join an existing lobby.
          </DialogContentText>
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
            <Button>Compare against your own Stats</Button>
          <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
                    <Grid container spacing={3}
                    sx={{
                        justifyContent: "space-between"
                    }}>
                        <Grid item xs={2}>
                            <Item>
                                <Button style={{background: "#d9e0d9", color:"black"}}
                                    onClick={() => moveToMe()}
                                    >find me
                                </Button>
                            </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item>
                                <Button style={{background: "#d9e0d9", color:"black"}}
                                    onClick={() => moveToTop()}
                                    >Go to Top
                                </Button>
                            </Item>
                        </Grid>
                        <Grid item xs={3} sx={{
                            justifyContent: "right"
                        }}>
                            <Item sx={{
                            justifyContent: "right"
                        }}>
                                <Button style={{background: "#d9e0d9", color:"black"}}
                                    onClick={() => Hub()}
                                >
                                Hub
                                </Button>
                            </Item>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        )
    }

    return (
        <BaseContainer className="leaderboard container">
            <h2>Global Leaderboard</h2>
            {content}
        </BaseContainer>
    )
}

export default Leaderboard;