import React, { useState } from "react";
import {IState as Props} from "../App";

interface IProps {
    players: Props["players"],
    setPlayers: React.Dispatch<React.SetStateAction<Props["players"]>>
}

const PlayerForm: React.FC<IProps> = ({ players, setPlayers }) => {

    const [input, setInput] = useState({
        name: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = (): void => {
        if (!input.name || isDuplicate(input.name)) {
            return
        }

        setPlayers([
            ...players,
            {
                name: input.name,
                win: 0,
                loss: 0
            }
        ])

        setInput({
            name: ""
        });
    }

    const isDuplicate = (name: string): boolean => {
        for (const player of players) {
            if (player.name.toLowerCase() === input.name.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Name"
                value={input.name}
                onChange={handleChange}
                name="name"
            />
            <button
                onClick={handleClick}
            >
                Add
            </button>
        </div>
    )
}

export default PlayerForm;