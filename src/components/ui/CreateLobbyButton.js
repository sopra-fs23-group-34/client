import { Button } from "components/ui/Button"
import { useHistory } from "react-router-dom"
import IconPlusCircle from "resources/PlusCircleIcon";
import { api } from "helpers/api";
export default function CreateLobbyButton() {
    const history = useHistory();
    const createLobby = async () => {

      const userId = sessionStorage.getItem('id');
      const response = await api(false, userId).post('/lobbys/create');
      console.log(response.data)
      sessionStorage.setItem("gameCode", response.data);
      sessionStorage.setItem("host", true);
        history.push({
          pathname: '/lobby',
          state: {
            gameCode:response.data
          }
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