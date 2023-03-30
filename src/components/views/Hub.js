import {api} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Hub.scss";
import IconBarChart from 'resources/BarChartIcon';
import IconPlusCircle from 'resources/PlusCircleIcon';
import IconRankingStar from 'resources/RankingStarIcon';
import IconProfile from 'resources/ProfileIcon';
import IconPersonPlus from 'resources/PersonPlusIcon';
import IconDoorExit from 'resources/LogOutIcon';

const Player = ({user}) => (
  <div className="player container">
    <div className="player username">{user.username}</div>
    <div className="player name">{user.name}</div>
    <div className="player id">id: {user.id}</div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object
};

const Hub = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html

  const logout = async () => {
    const token = localStorage.getItem('token');
    const Id = localStorage.getItem('id');
    await api(token, Id).put('/users/logout/'+Id)
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    history.push({
      pathname: '/login'
    });
  }

  const gotoUser = () => {
    const id = localStorage.getItem("id");
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

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  

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
          <Button className="hub hubbutton">
            <IconPersonPlus></IconPersonPlus>
            <h2>Join a game</h2>
            <p>Join a game of one of your friends.</p>
          </Button>
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
