import { Box } from "@material-ui/core";
import React from "react";
import Bye from "./Bye";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
    gameData: Props["gameState"],
    setGameData: React.Dispatch<React.SetStateAction<Props["gameState"]>>,
    roundKey: number
}

const ByeContainer: React.FC<IProps> = ({ players, gameData, setGameData, roundKey }) => {

    return (
        <Box className="divBye">
            {players.map((player, key) => {
                return (
                    <Bye 
                        key={key}
                        byeKey={key}
                        player={player} 
                        gameData={gameData} 
                        setGameData={setGameData} 
                        roundKey={roundKey} 
                    />
                )
            })}
        </Box>
    );
}

export default ByeContainer;