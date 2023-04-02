import { Button } from "components/ui/Button"
import { useHistory } from "react-router-dom"
import IconBarChart from "resources/BarChartIcon"
export default function StatsButton() {
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
            <p>Look at your progress.</p>
            </Button>
    )
}