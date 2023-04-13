import { Spinner } from "components/ui/Spinner";
//import { handleError } from "helpers/api";
//import { api } from "helpers/api";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import User from "models/User";
import { Box, Grid } from "@mui/material";
import "styles/views/Leaderboard.scss";
import Item from "components/ui/Item";

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
const Leaderboard = () => {
    const [users, setUsers] = useState(null);


    useEffect(() => {
        let user1 = new User({
            username: "babui",
            totalscore: "1291"
        })
        setUsers(
            [
                user1,
                user1,
                user1
            ]
        )
    }, [])
 

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
                        {users.map((user, index) => (
                            <Player
                            key={user.id}
                            user={user}
                            index={index}
                            />
                        ))}
                    </Box>
                </Grid>
            </div>
        )
    }

    return (
        <BaseContainer className="leaderboard container">
            <h2>Leaderbnoard</h2>
            {content}
        </BaseContainer>
    )
}

export default Leaderboard;