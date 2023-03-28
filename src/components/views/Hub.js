import {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
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
  const [users, setUsers] = useState(null);

  const logout = async () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    const Id = localStorage.getItem('Id');
    localStorage.removeItem('Id');
    await api.post({
      pathname: '/users/logout/' + Id,
      headers: {
        'token': token
      }
    })
    history.push({
      pathname: '/login'
    });
  }

  const gotoUser = () => {
    history.push({
      pathname: '/profile',
     state: {userId: sessionStorage.getItem("userId")}
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

  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        const response = await api.get('/users');

        // delays continuous execution of an async operation for 1 second.
        // This is just a fake async call, so that the spinner can be displayed
        // feel free to remove it :)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get the returned users and update the state.
        setUsers(response.data);

        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log('request to:', response.request.responseURL);
        console.log('status code:', response.status);
        console.log('status text:', response.statusText);
        console.log('requested data:', response.data);

        // See here to get more data.
        console.log(response);
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
      <div className="hub">
          <BaseContainer className="hub buttoncontainer">
          <Button className="hub hubbutton"
          onClick={() => gotoStats()}
          >
            <IconBarChart></IconBarChart>
            <h2>Stats</h2>
            <p>Look at your progress.</p>
            </Button>
          <Button className="hub hubbutton">
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
  }

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
