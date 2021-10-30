import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./General";
import configReducer from "./Config";
import gameStateReducer from "./GameState";
import lobbyReducer from "./Lobby";

const store = configureStore({
    reducer: {
        general: generalReducer,
        config: configReducer,
        gameState: gameStateReducer,
        lobby: lobbyReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;