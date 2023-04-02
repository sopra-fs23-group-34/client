import { Button } from "components/ui/Button"
import { useHistory } from "react-router-dom"
import { api } from "helpers/api";
import IconDoorExit from "resources/LogOutIcon";

export default function LogoutButton() {
    const history = useHistory();
    const logout = async () => {
        const token = sessionStorage.getItem('token');
        const Id = sessionStorage.getItem('id');
        await api(token, Id).post('/users/logout/'+Id)
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');
        history.push({
          pathname: '/login'
        });
      }
    return (
<Button
          className="hub hubbutton"
          onClick={() => logout()}
        >
          <IconDoorExit></IconDoorExit>
          <h2>Logout</h2>
          <p>Log out to play another day.</p>
        </Button>
    )
}