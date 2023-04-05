import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import Hub from "components/views/Hub";
import Register from "../../views/Register";
import WebSocket from "../../views/Websocket";
import Profile from "../../views/Profile";
import Password from "../../views/Password";
import Lobby from "components/views/Lobby";
import {WebsocketWrapperComponent } from "components/views/WebsocketViews/WebsocketWrapper";
import Guesses from "components/views/WebsocketViews/Guesses";
import RoundScore from "components/views/WebsocketViews/RoundScore";
import FinalScore from "components/views/WebsocketViews/FinalScore";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/hub">
          <GameGuard>
            <Hub/>
          </GameGuard>
        </Route>
        <Route exact path="/login">
          <LoginGuard>
            <Login/>
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <LoginGuard>
            <Register/>
          </LoginGuard>
        </Route>
        <Route path="/profile/:id">
          <GameGuard>
            <Profile/>
          </GameGuard>
        </Route>
        <Route path="/password/:id">
          <GameGuard>
            <Password/>
          </GameGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/hub"/>
        </Route>
        <Route path="/websocket">
          <WebSocket />{/*This has to be changed, its only for easier testing*/}
        </Route>
        <Route path="/*">
          <WebsocketWrapperComponent> 
            <Route path="/lobby">
                <Lobby/>
            </Route>
              <Route path="/guesses">
                <Guesses />{/*This has to be changed, its only for easier testing*/}
              </Route>
              <Route path="/roundScore">
                <RoundScore/>
              </Route>
              <Route path="/finalScore">
                <FinalScore/>
            </Route>
          </WebsocketWrapperComponent>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

/*
* Don't forget to export your component !
 */
export default AppRouter;
