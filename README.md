# The big diabetes Game
## Introduction
Food is a important part of our daily live, but most people have no idea what the nutrition values of the food on their plate are. Additionally, there are some people with diabetis or some other illness, where it is crucial to know how many carbs you are eating, to dose your medication correctly. With this web application we wanted to create a possibility for interested people to learn something about the nutrition values of food in a playful way.

## Getting started

Read and go through these Tutorials. It will make your life easier:--)

- Read the React [Docs](https://reactjs.org/docs/getting-started.html)
- Do this React [Getting Started](https://reactjs.org/tutorial/tutorial.html) Tutorial (it doesn’t assume any existing React knowledge)
- Get an Understanding of [CSS](https://www.w3schools.com/Css/), [SCSS](https://sass-lang.com/documentation/syntax), and [HTML](https://www.w3schools.com/html/html_intro.asp)!

Next, there are two other technologies that you should look at:

* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) offers declarative routing for React. It is a collection of navigational components that fit nicely with the application. 
* [react-hooks](https://reactrouter.com/web/api/Hooks) let you access the router's state and perform navigation from inside your components.

## Prerequisites and Installation
For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
Testing is optional, and you can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Screenshots
Upon visiting the website, the login screen appears, with the possibility to go to the registration page to create a new account, or alternatively, log in as a Guest.
 ![login screen](/screenshots/login_screen.png)
 
Upon logging in, you are redirected to the main hub.
 ![main hub](/screenshots/main_hub.png)
 
When creating a game lobby, the host can change the settings and see the users within the lobby.
 ![lobby screen as the host](/screenshots/lobby-screen_host.png)
 
A regular user can join a game via main hub and is shown the playerlist of the current lobby.
 ![lobby screen as a player](/screenshots/lobby-screen_player.png)

During the game, the user is presented with a food item, for which they must guess the protein and fat contents, as well as how many carbohydrates and calories it contains.
![Gameplay screen, where the top is a food image and its name, and below are sliders for all values to guess](/screenshots/gameplay_screen.png)

After each round, there is an overview screen, showing the actual values of the product, as well as all guesses of the players in the lobby. Your own guesses are highlighted in blue.
![Round overview screen with an overall points table, as well as detailed table with the guesses of this round](/screenshots/round_overview.png)

## Roadmap
For future additions we have some ideas, what one could implement. The following mentionings are not sorted by any means. But are more meant as inspiration for you.
Firstly, there would be the possibility to implement a new game mode. The first additional game mode could be a higher lower implementation of a game. Before starting the game you would choose your food category, like "Fruits" as well as the nutrition value, you would compare the food items. Lets assume one would choose "Fruits" and "carbs". Then you would get as first item an apple. Then a picture of the second item would appear. Lets assume, it is a pineapple. Now you have to decide, if a pineapple has more or less carbs then an apple. If you guessed correctly, you get a positive feedback and the next picture of a food item. If you guessed incorrectly, there will be an end of game screen and you can restart.    
Another new game mode would be, that you get four pictures of different food Items and additionally the correct nutrition values of one of them. Then you have to guess to which food item the displayed nutrition values belong to. If you guessed correctly, you will get new pictures and nutrition values. If not, it is game over.
Another feature for the original game would be a possibility at the end of a game to see all the different questions and answers again, so that one can internalise the different nutrition values of the food items.    
Inspection mode, to be able to go through the different food items after the game to internalise the different values.

## Authors
- [Nico Manzoni](https://www.github.com/nizonic) - *frontend*
- [André Seidenglanz](https://www.github.com/sugar-free55) - *frontend*
- [Nataell Cornu](https://www.github.com/nataell95) - *frontend/backend*
- [Maurice Hess](https://www.github.com/mauhess) - *backend*
- [Elias Suter](https://www.github.com/Bye-B) - *backend*

## License
This project is licensed under [Apache 2.0](LICENSE).
