import BaseContainer from "components/ui/BaseContainer";
import 'styles/views/About.scss';
const About = () => {

    return (
        <BaseContainer>
            <div className="about-container">
                <div className="about-text">

                </div>
                <div className="about-explore">
                    <p>Explore the project</p>
                    <ul className="explore-list">
                        <li className="explore-item">
                            <a href="https://github.com/sopra-fs23-group-34" target="_blank">
                                Check out our code on GitHub!
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="about-team">
                    <p>About us</p>
                    <div className="team-container">
                        <div className="team-member">
                            <div className="name-container">
                                <p className="member-name">Nataell</p>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">Wizard shit</span>
                            </div>
                        </div>
                        <div className="team-member">
                            <div className="name-container">
                                <p className="member-name">André</p>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">Fancy frontend</span>
                            </div>
                        </div><div className="team-member">
                            <div className="name-container">
                                <p className="member-name">Nico</p>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">frontend</span>
                            </div>
                        </div><div className="team-member">
                            <div className="name-container">
                                <p className="member-name">Maurice</p>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">backend</span>
                            </div>
                        </div><div className="team-member">
                            <div className="name-container">
                                <p className="member-name">Elias</p>
                            </div>
                            <div className="roles-container">
                                <span className="member-role">backend</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseContainer>
    )
}

export default About;