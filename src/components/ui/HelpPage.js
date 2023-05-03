import * as React from 'react';
import {Button} from 'components/ui/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import gameScreen from '../../resources/gameScreen.png';
export default function HelpPage() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button width="100%" onClick={handleClickOpen('paper')}>Help Page</Button>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Tutorial</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <h1 style={{textAlign:"center"}}>The big Diabetes Game</h1>
            <hr/>
            <h2>How the game works</h2>
            <p>This game is all about guessing the nutritional values of every day food items. Whether it be a nice cup of coffee, a banana, or that sweet chocolate cake, we ask the important questions.
            <br/><p style={{fontSize:"110%", fontWeight:"bold"}}><u>What's actually in it?</u></p>
            <p style={{textAlign:"justify"}}>
                Typically, the most important nutritional values of foods are:
                <ul>
                    <li>
                        protein
                    </li>
                    <li>
                        fat
                    </li>
                    <li>
                        carbohydrates
                    </li>
                    <li>
                        calories
                    </li>
                </ul>
                These are also the 4 values that you are trying to guess here.
            </p>
            <hr/>
            <p style={{textAlign:"justify"}}>
                <h2>
                    Gameplay
                </h2>
                
                Once the host starts the game, you will be prompted with a randomly selected food item out of the chosen category.
                With the help of the 4 sliders underneath the Food, you can then make your guesses about the nutritional values of it.
                <br/>
                But be aware! There is a timer ticking down in the top left corner. Once it reaches 0, your final guesses are in and it's time to compare scores!
                <br/>
                After each round, points are distributed depending on how close your guess was to the actual value. For each nutritional value, there is a maximum of <strong>100 points</strong> to achieve, meaning if you guess all the correct values, you get <strong>400 points</strong> for a food item.
                <br/>
                <img src={gameScreen} alt={'Game Screen'} style={{width:"100%", height:"100%"}}/>
            </p>
            <h3>
            Now there is nothing left to say except focus up, and good luck on becoming the <strong>Ultimate Diabetic</strong>
            </h3>
            </p>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}