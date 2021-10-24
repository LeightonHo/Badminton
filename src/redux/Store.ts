import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./General";
import configReducer from "./Config";
import gameStateReducer from "./GameState";

const store = configureStore({
    reducer: {
        general: generalReducer,
        config: configReducer,
        gameState: gameStateReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;