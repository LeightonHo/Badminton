import { Box, TextField, Typography } from "@material-ui/core";
import React, { useState, KeyboardEvent } from "react";
import Bye from "./Bye";
import { IState as Props} from "./Main";

interface IProps {
    players: Props["config"]["players"]
    gameData: Props["gameData"],
    setGameData: React.Dispatch<React.SetStateAction<Props["gameData"]>>,
    roundKey: number
}

const ByeContainer: React.FC<IProps> = ({ players, gameData, setGameData, roundKey }) => {

    return (
        <Box className="divBye">
            {players.map((player, key) => {
                return (
                    <Bye 
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