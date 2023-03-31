import {api} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Hub.scss";
import IconBarChart from 'resources/BarChartIcon';
import IconPlusCircle from 'resources/PlusCircleIcon';
import IconRankingStar from 'resources/RankingStarIcon';
import IconProfile from 'resources/ProfileIcon';
import IconDoorExit from 'resources/LogOutIcon';
import * as React from 'react';
import PopUp from 'resources/PopUp'

const Hub = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();




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
          <PopUp/>
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
