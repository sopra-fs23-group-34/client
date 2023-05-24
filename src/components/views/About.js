import 'styles/views/About.scss';
import { GitHub } from "@material-ui/icons";
import TitleGif from '../../resources/TitleGif.gif';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import nico from "../../resources/members/nico.jpg";
import nataell from "../../resources/members/nataell.png";
import andre from "../../resources/members/andre.JPG";
import maurice from "../../resources/members/maurice.jpeg";

const About = () => {

    return (
            <div className="about-content">
            <img src={TitleGif} alt={'titleAnmimation'} className="about-logo"/>
                <div className="about-text">
                    <h2>Welcome, nutri-fans!</h2>
                    <p>
                        This project has been created for the SoPra (Software Engineering Lab) Course at the University of Zurich.
                    </p>
                    <p>
                        The idea for this project stems from one of our group members, who is living with diabetes.
                        Thus, he has to stay on top of what he eats, and keeps track of his calorie intake among other things.
                        He proposed the idea of a game, where you have to find out, which nutritional values different foods have.
                        Our whole team was on board with the idea, and thus we started work on <strong>The Big Diabetes Game</strong>.
                    </p>
                </div>
                <div className="about-explore">
                    <p className="about-header">Explore the project</p>
                    <ul className="explore-list">
                        <li className="explore-item">
                            <a className="explore-item-inner" href="https://github.com/sopra-fs23-group-34" target="_blank">
                                <GitHub className="explore-item-icon" />
                                Check out our code on GitHub!
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="about-team">
                    <p className="about-header">About us</p>
                    <div className="team-container">
                        <div className="team-member">
                            <div className="name-container">
                            <div className="hex">
                                    <div className="hex-background">
                                    <img src={nataell} alt='Nataell' className='member-image'></img>
                                    </div>
                                </div>
                                <a href="https://www.github.com/nataell95" className="member-name">Nataell</a>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">frontend</span>
                                <span className="member-role">backend</span>
                            </div>
                        </div>
                        <div className="team-member">
                            <div className="name-container">
                            <div className="hex">
                                    <div className="hex-background">
                                    <img src={andre} alt='André' className='member-image'></img>
                                    </div>
                                </div>
                                <a href="https://www.github.com/sugar-free55" className="member-name">André</a>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">frontend</span>
                                <span className="member-role">sound & design</span>
                            </div>
                        </div><div className="team-member">
                            <div className="name-container">
                            <div className="hex">
                                    <div className="hex-background">
                                    <img src={nico} alt='Nico' className='member-image'></img>
                                    </div>
                                </div>
                                <a href="https://www.github.com/nizonic" className="member-name">Nico</a>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">frontend</span>
                                <span className="member-role">team lead</span>
                            </div>
                        </div><div className="team-member">
                            <div className="name-container">
                            <div className="hex">
                                    <div className="hex-background">
                                    <img src={maurice} alt='Maurice' className='member-image'></img>
                                    </div>
                                </div>
                                <a href="https://www.github.com/mauhess" className="member-name">Maurice</a>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">backend</span>
                                <span className="member-role">API handling</span>
                            </div>
                        </div><div className="team-member">
                            <div className="name-container">
                                <div className="hex">
                                    <div className="hex-background">
                                    <SelfImprovementIcon className='member-image'></SelfImprovementIcon>
                                    </div>
                                </div>
                                <a href="https://www.github.com/Bye-B" className="member-name">Elias</a>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">backend</span>
                                <span className="member-role">API handling</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default About;