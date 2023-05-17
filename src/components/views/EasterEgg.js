import React from 'react';
import 'styles/views/EasterEgg.scss';
import BaseContainer from "components/ui/BaseContainer";
import {Box} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

const EasterEgg = () => {

    return (
        <BaseContainer>
            <div className="EasterEgg container">
                <div className="EasterEgg form">
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '10px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', boxShadow: '0px 0px 200px 0px rgba(255,165,0,2)', border: '2px solid white', backgroundColor: 'white', width: '290px', height: '290px' , paddingTop: '20px'}}>
                        <QRCodeCanvas value={'https://www.youtube.com/shorts/SXHMnicI6Pg'} size={250} fgColor={'black'} bgColor={'white'} includeMargin={false} />
                      </Box>
                    </Box>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default EasterEgg;
