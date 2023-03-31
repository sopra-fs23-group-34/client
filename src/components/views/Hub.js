import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Hub.scss";
import IconBarChart from 'resources/BarChartIcon';
import IconPlusCircle from 'resources/PlusCircleIcon';
import IconRankingStar from 'resources/RankingStarIcon';
import IconProfile from 'resources/ProfileIcon';
import IconPersonPlus from 'resources/PersonPlusIcon';
import IconDoorExit from 'resources/LogOutIcon';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

const FormField = props => {
  return (
    <div className="login field">
      <label className="login label">
        {props.label}
      </label>
      <input
        className="login input"
        placeholder="enter here.."
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
    </div>
  );
};


const FormDialog = (props) => {
  return (
    <Button className="hub hubbutton"
      onClick={e => props.onChange(e.target.value)}
    >
      <IconPersonPlus></IconPersonPlus>
      <h2>Join a game</h2>
      <p>Join a game of one of your friends.</p>
      <Dialog open={e => props.onChange(e.target.value)} onClose={e => props.onClose(e.target.value)}>
        <DialogTitle>Join a Lobby</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a code to join an existing lobby.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Lobby code"
            fullWidth
            variant="standard"
            value={props.lobbyKey}
            placeholder=""
            onChange={e => props.onChange(e.lobbyKey)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={e => props.onChange(e.target.value)}>Cancel</Button>
          <Button onClick={e => props.onChange(e.target.value)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Button>
  )
};


const Hub = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const [lobbyKey, setLobbyKey] = React.useState("");
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const logout = async () => {
    const token = sessionStorage.getItem('token');
    const Id = sessionStorage.getItem('id');
    await api(token, Id).post('/users/logout/'+Id)
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
    history.push({
      pathname: '/login'
    });
  }

  const gotoUser = () => {
    const id = sessionStorage.getItem("id");
    history.push({
      pathname: '/profile/' + id,
     state: {id: id}
    });
  }

  const gotoLeaderboard = () => {
    history.push({
      pathname: '/leaderboard'
    });
  }

  const gotoStats = () => {
    history.push({
      pathname: '/stats'
    })
  }

  const createLobby = () => {
    history.push({
      pathname: '/lobby'
    })
  }

  const joinLobby = async () => {
    try{
      console.log(lobbyKey)
      await api(false,false).post('/lobby/join/' + lobbyKey);

      history.push({
        pathname: '/lobby'
      })
    }catch (error) {
      console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
      console.error("Details:", error);
      alert("Something went wrong while fetching the users! See the console for details.");
  }

    
  }



  let content = <Spinner/>;

    content = (
      <div className="hub">
          <BaseContainer className="hub buttoncontainer">
          <Button className="hub hubbutton"
          onClick={() => gotoStats()}
          >
            <IconBarChart></IconBarChart>
            <h2>Stats</h2>
            <p>Look at your progress.</p>
            </Button>
          <Button className="hub hubbutton"
          onClick={() => createLobby()}
          >
            <IconPlusCircle></IconPlusCircle>
            <h2>Create a game</h2>
            <p>Create a new game to play with your friends.</p>
          </Button>
          <Button className="hub hubbutton"
          onClick={() => gotoLeaderboard()}
          >
            <IconRankingStar></IconRankingStar>
            <h2>Global leaderboard</h2>
            <p>Take a look at the global leaderboard.</p>
          </Button>
          </BaseContainer>
          <BaseContainer className="hub buttoncontainer">
          <Button className="hub hubbutton"
          onClick={() => gotoUser()}
          >
            <IconProfile></IconProfile>
            <h2>Profile</h2>
            <p>See your Profile</p>
            
          </Button>
          <FormDialog
            lobbyKey={lobbyKey}
            onChange={e => console.log(e)}
          />
          <Button
          className="hub hubbutton"
          onClick={() => logout()}
        >
          <IconDoorExit></IconDoorExit>
          <h2>Logout</h2>
          <p>Log out to play another day.</p>
        </Button>
          </BaseContainer>

        
      </div>
    );


  return (
    <BaseContainer margin="auto" className="hub container">
      <h1>The big diabetes game</h1>
      <p className="game paragraph">
        Hub
      </p>
      {content}
    </BaseContainer>
  );
}

export default Hub;
