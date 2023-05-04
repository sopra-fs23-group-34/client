import { Button } from "components/ui/Button"
import { useHistory } from "react-router-dom"
import { api } from "helpers/api";
import IconDoorExit from "resources/LogOutIcon";

export default function LogoutButton() {
    const history = useHistory();
    const logout = async () => {
        const token = sessionStorage.getItem('token');
        const Id = sessionStorage.getItem('id');
        const guestUser = sessionStorage.getItem('guestUser');
        if (guestUser === true) {
          await api(token, Id).post('/users/logout/guestUser'+Id)
        } else {
          await api(token, Id).post('/users/logout/'+Id)
        }
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('guestUser');
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