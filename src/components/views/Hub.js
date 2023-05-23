import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Hub.scss";
import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import StatsButton from '../ui/StatsButton';
import CreateLobbyButton from "../ui/CreateLobbyButton";
import LeaderboardButton from "../ui/LeaderboardButton";
import ProfileButton from "../ui/ProfileButton";
import PopUp from "../ui/JoinLobbyButton";
import LogoutButton from "../ui/LogoutButton";
import Item from "components/ui/Item";
import { useMediaQuery } from "@material-ui/core";
import { Typography } from "@mui/material";
import TitleGif from '../../resources/TitleGif.gif';
import { useEffect } from "react";
import AboutButton from "components/ui/AboutButton";


export function BasicGrid() {
    const maxMediumSize = useMediaQuery("(max-width: 600px)");

    useEffect(() => {
        sessionStorage.removeItem("inGame");
    }, []);

    return (
        <Box sx={{flexGrow: 1 , width:"100%"}} >
            <Grid container spacing={maxMediumSize ? 1 : 3} sx={{
                width: "100%",
                margin: "0% -0.8%",
            }}>
                <Grid item xs={6} sm={4} order={{ xs: 4, sm: 1 }}  >
                    <Item>
                        <StatsButton size={maxMediumSize ? "small" : "large"}/>
                    </Item>
                </Grid>
                <Grid item xs={6} sm={4} order={{ xs: 2, sm: 2 }}>
                    <Item>
                        <CreateLobbyButton size={maxMediumSize ? "small" : "large"} />
                    </Item>
                </Grid>
                <Grid item xs={6} sm={4} order={{ xs: 5, sm: 3 }}>
                    <Item>
                        <LeaderboardButton size={maxMediumSize ? "small" : "large"} />
                    </Item>
                </Grid>
                <Grid item xs={6} sm={4} order={{ xs: 3, sm: 4 }}>
                    <Item>
                        <ProfileButton size={maxMediumSize ? "small" : "large"} />
                    </Item>
                </Grid>
                <Grid item xs={6} sm={4} order={{ xs: 2, sm: 5 }}>
                    <Item>
                        <PopUp size={maxMediumSize ? "small" : "large"} />
                    </Item>
                </Grid>
                <Grid item xs={6} sm={4} order={{ xs: 6, sm: 6 }}>
                    <Item>
                        <LogoutButton size={maxMediumSize ? "small" : "large"}/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

const Hub = () => {
    const maxMediumSize = useMediaQuery("(max-width: 600px)");
    return (
        <BaseContainer margin="auto" className="hub container">
<AboutButton/>
            <img src={TitleGif} alt={'titleAnmimation'} style={{width: '100%', height: 'auto'}}/>
            <h3>Welcome back, {sessionStorage.getItem("username")}!</h3>
            <BasicGrid/>
        </BaseContainer>
    );
}

export default Hub;
