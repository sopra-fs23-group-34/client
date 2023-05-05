import { Button } from "components/ui/Button"
import { useHistory } from "react-router-dom"
import IconBarChart from "resources/BarChartIcon"
export default function StatsButton(props) {
    const history = useHistory();
    const gotoStats = () => {
        history.push({
          pathname: '/stats'
        })
      }
    return (
        <Button margin = "auto" className="hub hubbutton"
          onClick={() => gotoStats()}
          >
            <IconBarChart></IconBarChart>
        <h2>Stats</h2>
        {props.size === "large" ? <p>Look at your progress.</p> : null}
            </Button>
    )
}