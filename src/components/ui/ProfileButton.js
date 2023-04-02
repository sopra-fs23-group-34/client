import { Button } from "components/ui/Button"
import { useHistory } from "react-router-dom"
import IconProfile from "resources/ProfileIcon";
export default function ProfileButton() {
    const history = useHistory();
    const gotoUser = () => {
        const id = sessionStorage.getItem("id");
        history.push({
          pathname: '/profile/' + id,
         state: {id: id}
        });
      }
    return (
<Button className="hub hubbutton"
          onClick={() => gotoUser()}
          >
            <IconProfile></IconProfile>
            <h2>Profile</h2>
            <p>See your Profile</p>
            
          </Button>
    )
}