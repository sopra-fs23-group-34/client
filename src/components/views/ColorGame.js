import React, {useEffect, useState} from 'react';
import {Button} from 'components/ui/Button';
import 'styles/views/ColorGame.scss';
import BaseContainer from "components/ui/BaseContainer";


const ColorGame = ({ blink }) => {
    const [cellWidth, setCellWidth] = useState((window.innerWidth)/4);
    const [cellHeight, setCellHeight] = useState((window.innerHeight)/4);
    const [fontSize, setFontSize] = useState((window.innerHeight)/40);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const cellWidth = (screenWidth - 100) / 3;
      const cellHeight = (screenHeight - 100) / 4;
      const width = cellWidth > 400 ? '400px' : `${cellWidth}px`;
      const height = cellHeight > 300 ? '300px' : `${cellHeight}px`;
      const fsize = parseInt(height) / 8 + 'px';
      setCellWidth(width);
      setCellHeight(height);
      setFontSize(fsize);
      }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },  [cellWidth, cellHeight, fontSize]);

    const [categoryToGuessDisplay, setCategoryToGuessDisplay] =  useState("text");
    const [colorToGuess, setColorToGuess] = useState("white");
    const [count, setCount] = useState(0);

    const allValuesDisplay = ["background-color", "font-color", "text"];
    const colorsAndRgb = new Map([
        ["brown", "rgb(150, 75, 0)"],
        ["orange", "rgb(255, 165, 0)"],
        ["yellow", "rgb(255, 255, 0)"],
        ["green", "rgb(0, 255, 0)"],
        ["white", "rgb(255, 255, 255)"],
        ["black", "rgb(0, 0, 0)"],
        ["blue", "rgb(0, 0, 255)"],
        ["red", "rgb(255, 0, 0)"],
        ["purple", "rgb(160, 32, 240)"]
        ]);

    function setNewValues() {
        const randomCategory = Math.floor(Math.random() * 3);
        const randomColor = Math.floor(Math.random() * 9);
        const category = allValuesDisplay[randomCategory];
        const color = Array.from(colorsAndRgb.keys())[randomColor];
        setCategoryToGuessDisplay(category);
        setColorToGuess(color);
    }

    const [showRightAnswerMessage, setShowRightAnswerMessage] = useState(false);
    const [showWrongAnswerMessage, setShowWrongAnswerMessage] = useState(false);

    function handleButtonClick(event) {
        if (categoryToGuessDisplay==="background-color") {
            const backgroundColorRgba = window.getComputedStyle(event.target).getPropertyValue('background-color');
            const backgroundColor = backgroundColorRgba.replace('rgba', 'rgb').replace(', 0.9', '');
            if (backgroundColor===colorsAndRgb.get(colorToGuess)) {
                rightAnswer();
            } else {
                wrongAnswer();
            }
        }
        if (categoryToGuessDisplay==="font-color") {
              const fontColor = window.getComputedStyle(event.target).getPropertyValue('color');
              if (fontColor===colorsAndRgb.get(colorToGuess)) {
                  console.log(' true');
                  rightAnswer();
              } else {
                  console.log('false');
                  wrongAnswer();
              }
        }
        if (categoryToGuessDisplay==="text") {
              const text = event.target.textContent;
              if(text===colorToGuess) {
                console.log("true");
                rightAnswer();
              } else {
                console.log("false");
                wrongAnswer();
              }
        }
      setNewValues();
    }

    function rightAnswer() {
        setCount(count + 1);
        setShowRightAnswerMessage(true);
        setTimeout(() => {
            setShowRightAnswerMessage(false);
        }, 120);
    }

    function wrongAnswer() {
        setCount(count - 1);
        setShowWrongAnswerMessage(true);
        setTimeout(() => {
          setShowWrongAnswerMessage(false);
        }, 120);
    }

    return (
        <BaseContainer>
        {showRightAnswerMessage && (
          <div className="ColorGame right-answer"> +1
        </div>
        )}
        {showWrongAnswerMessage && (
          <div className="ColorGame wrong-answer"> -1
        </div>
        )}

        <div className="ColorGame counter">
            points: {count}
        </div>
        <div className = "ColorGame guess-container">
            <div className="ColorGame guess-field">
                press where: {categoryToGuessDisplay} = {colorToGuess}
            </div>
        </div>
            <div className="ColorGame grid-container">
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                    background: 'rgba(150, 75, 0, 0.9)',
                    color: colorsAndRgb.get("orange"),
                    height : cellHeight,
                    width : cellWidth,
                    fontSize: fontSize
                }}>
                red
              </Button>
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                  background: 'rgba(160, 32, 240, 0.9)',
                  color: colorsAndRgb.get('yellow'),
                  height : cellHeight,
                  width : cellWidth,
                  fontSize: fontSize
                  }}>
                green
              </Button>
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  color: colorsAndRgb.get('green'),
                  height : cellHeight,
                  width : cellWidth,
                  fontSize: fontSize
                }}>
                orange
              </Button>
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: colorsAndRgb.get('brown'),
                  height : cellHeight,
                  width : cellWidth,
                  fontSize: fontSize
                }}>
                white
              </Button>
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                  background: 'rgba(0, 255, 0, 0.9)',
                  color: colorsAndRgb.get('white'),
                  height : cellHeight,
                  width : cellWidth,
                  fontSize: fontSize
                }}>
                brown
              </Button>
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                  background: 'rgba(255, 0, 0, 0.9)',
                  color: colorsAndRgb.get('black'),
                  height : cellHeight,
                  width : cellWidth,
                  fontSize: fontSize
                }}>
                blue
              </Button>
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                  background: 'rgba(255, 165, 0, 0.9)',
                  color: colorsAndRgb.get('blue'),
                  height : cellHeight,
                  width : cellWidth,
                  fontSize: fontSize
                }}>
                yellow
              </Button>
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                  background: 'rgba(0, 0, 255, 0.9)',
                  color: colorsAndRgb.get('red'),
                  height : cellHeight,
                  width : cellWidth,
                  fontSize: fontSize
                }}>
                black
              </Button>
              <Button className="ColorGame cell" onClick={handleButtonClick}
                style={{
                  background: 'rgba(255, 255, 0, 0.9)',
                  color: colorsAndRgb.get('purple'),
                  height : cellHeight,
                  width : cellWidth,
                  fontSize: fontSize
                }}>
                purple
              </Button>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default ColorGame;