import { Button } from "components/ui/Button"
import { useHistory } from "react-router-dom"
import IconPlusCircle from "resources/PlusCircleIcon";
export default function CreateLobbyButton() {
    const history = useHistory();
    const createLobby = () => {
        history.push({
          pathname: '/lobby'
        })
      }
    return (
<Button className="hub hubbutton"
          onClick={() => createLobby()}
          >
            <IconPlusCircle></IconPlusCircle>
            <h2>Create a game</h2>
            <p>Create a new game to play with your friends.</p>
          </Button>
    )
}