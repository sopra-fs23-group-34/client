import { Spinner } from "components/ui/Spinner";
//import { handleError } from "helpers/api";
//import { api } from "helpers/api";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import User from "models/User";
import { Box, Button, Grid } from "@mui/material";
import "styles/views/Leaderboard.scss";
import Item from "components/ui/Item";
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList} from 'react-window';
import { useHistory } from "react-router-dom";


const { default: BaseContainer } = require("components/ui/BaseContainer")
const Player = ({user, index}) => {
    return (
      <div className='player container'>
            <div className="player placing">
                {index + 1}
            </div>
            <div className='player username'>
              {user.username}
            </div>
            <div className='player totalscore'>
              {user.totalscore}
            </div>

      </div>
    )
    };
  
  Player.propTypes = {
    user: PropTypes.object
  };
const Leaderboard_v2 = () => {
    const [users, setUsers] = useState(null);
    const history = useHistory();
    const listRef = React.createRef();
    function renderRow(props) {
        const { index, style } = props;
      
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
              <ListItemText primary={<Player
                                key={users[index].id}
                                user={users[index]}
                                index={index}
                                />} />
          </ListItem>
        );
      }
    useEffect(() => {
        let user1 = new User({
            username: "babui",
            totalscore: "1291"
        })
        let me = new User({
            username: "me",
            totalscore: "1290",
            token:"b822132d-a03d-45af-b6e1-efe36e1fb92f"
        })
        setUsers(
            [
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                me,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1,
                user1
            ]
        )
    }, [])
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
        },[users]);

    /*
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api(null,null).get("/users/ranking");
                setUsers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, []);
    */
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
                                marginRight:"1px",
                                textTransform: 'uppercase',
                                fontWeight:"900",
                                color:"white",
                                pl:"0px"

                            }}>
                                Rank
                            </Item>
                            <Item sx={{
                                marginLeft:"1px",
                                textTransform: 'uppercase' ,
                                fontWeight:"900",
                                color:"white",
                                pl:"0px"
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
                        height={400}
                        width={"100%"}
                        itemSize={46}
                        itemCount={users.length}
                        overscanCount={5}
                        ref={listRef}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Box>
                    <Grid container spacing={3}
                    sx={{
                        justifyContent: "space-between"
                    }}>
                        <Grid item xs={2}>
                            <Item>
                                <Button
                                    onClick={() => moveToMe()}
                                    >find me
                                </Button>
                            </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item>
                                <Button
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
                                <Button
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

export default Leaderboard_v2;