import { Dialog, IconButton } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React from "react";
import About from "../views/About.js";
import CloseIcon from '@mui/icons-material/Close';
export default function AboutButton() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div style={{marginLeft:"auto", marginRight:"0px", marginBottom:"1%"}}>
        <IconButton color="inherit" aria-label="InfoOutlined" onClick={handleClickOpen}>
            <InfoOutlinedIcon/>
        </IconButton>
        <Dialog class="about-popup" open={open} onClose={handleClose}>
            <div className="about-close-button">
            <IconButton color="inherit" arial-label="closeAbout" onClick={handleClose}>
                <CloseIcon/>
            </IconButton>
            </div>
            <About/>
        </Dialog>
        </div>
    )
}