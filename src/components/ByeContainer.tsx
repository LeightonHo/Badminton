import { Box } from "@material-ui/core";
import React from "react";
import Bye from "./Bye";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
    gameState: Props["gameState"],
    setGameState: React.Dispatch<React.SetStateAction<Props["gameState"]>>,
    roundKey: number,
    socket: WebSocket,
    sessionId: string
}

const ByeContainer: React.FC<IProps> = ({ players, gameState, setGameState, roundKey, socket, sessionId }) => {

    return (
        <Box className="divBye">
            {players.map((player, key) => {
                return (
                    <Bye 
                        key={key}
                        byeKey={key}
                        player={player} 
                        gameState={gameState} 
                        setGameState={setGameState} 
                        roundKey={roundKey}
                        socket={socket}
                        sessionId={sessionId}
                    />
                )
            })}
        </Box>
    );
}

export default ByeContainer;