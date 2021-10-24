import { createSlice } from '@reduxjs/toolkit'
import { IConfig } from "../types";

const initialState: IConfig = {
	courts: [],
	players: []
}

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		addPlayer: (state, player) => {
			state.players = [...state.players, player.payload];
		},
		removePlayer: (state, player) => {
			for (let i = 0; i < state.players.length; i++) {
				if (state.players[i].userId === player.payload.userId) {
					state.players.splice(i, 1);
					break;
				}
			}
		},
		updatePlayer: (state, player) => {
			for (let i = 0; i < state.players.length; i++) {
				if (state.players[i].userId === player.payload.userId) {
					state.players[i] = player.payload;
					break;
				}
			}
		},
		addCourt: (state, court) => {
			state.courts = [...state.courts, court.payload]
		},
		syncConfig: (state, config) => {
			state.courts = config.payload.courts;
			state.players = config.payload.players;
		}
	},
})

export const { 
	addPlayer, 
	removePlayer, 
	updatePlayer,
	addCourt, 
	syncConfig
} = configSlice.actions;

export default configSlice.reducer;