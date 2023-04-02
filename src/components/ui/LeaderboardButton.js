import { Button } from "components/ui/Button"
import { useHistory } from "react-router-dom"
import IconRankingStar from "resources/RankingStarIcon";

export default function LeaderboardButton() {
    const history = useHistory();
    const gotoLeaderboard = () => {
        history.push({
          pathname: '/leaderboard'
        });
      }
    return (
<Button className="hub hubbutton"
          onClick={() => gotoLeaderboard()}
          >
            <IconRankingStar></IconRankingStar>
            <h2>Global leaderboard</h2>
            <p>Take a look at the global leaderboard.</p>
          </Button>
    )
}