import React, { FC } from "react";
import { IState as Props } from "./Main";

interface IProps {
    gameData: Props["gameData"]
}

const Scoreboard:React.FC<IProps> = ({ gameData }) => {
    console.log(gameData);

    return (
        <div>
           This is the scoreboard 
        </div>
    );
}

export default Scoreboard;