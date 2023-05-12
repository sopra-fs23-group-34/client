import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/easterEgg.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Alert, AlertTitle, Box} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";


const FormField = props => {
    return (
        <div className="easterEgg field">
            <label className="easterEgg label">
            </label>
        </div>
    );
};

const EasterEgg = () => {

    return (
        <BaseContainer>
            <div className="easterEgg container">
                <div className="easterEgg form">
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
