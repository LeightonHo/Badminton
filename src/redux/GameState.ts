import { createSlice } from '@reduxjs/toolkit'
import { IGameState } from "../types";

const initialState: IGameState = {
	rounds: []
}

export const configSlice = createSlice({
	name: "gameState",
	initialState,
	reducers: {
		addRound: (state, action) => {
			state.rounds = [...state.rounds, action.payload];
		},
        updateScore: (state, action) => {
            const payload = action.payload;

            if (payload.team === 1) {
                state.rounds[payload.roundKey].matches[payload.matchKey].team1.score = payload.score;
            } else {
                state.rounds[payload.roundKey].matches[payload.matchKey].team2.score = payload.score;
            }
        },
        syncGameState: (state, action) => {
            state.rounds = action.payload;
        }
	},
})

export const { 
	addRound,
    updateScore,
    syncGameState
} = configSlice.actions;

export default configSlice.reducer;