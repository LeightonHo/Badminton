import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./Config";
import gameStateReducer from "./GameState";

const store = configureStore({
    reducer: {
        config: configReducer,
        gameState: gameStateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;