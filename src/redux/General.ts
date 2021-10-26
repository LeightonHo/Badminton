import { createSlice } from '@reduxjs/toolkit'

const initialState: any = {
    userId: "",
    sessionId: "",
	isGuest: true,
	isHost: false,
    isConnected: false,
    isLoading: false,
    isJoiningSession: false,
    joinedSession: false,
    isMobileView: false,
    navigation: ""
}

export const configSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        },
        setIsGuest: (state, action) => {
			state.isGuest = action.payload;
		},
		setIsHost: (state, action) => {
			state.isHost = action.payload;
		},
        setIsConnected: (state, action) => {
			state.isConnected = action.payload;
		},
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
		},
        setJoinedSession: (state, action) => {
			state.joinedSession = action.payload;
		},
        setIsMobileView: (state, action) => {
			state.isMobileView = action.payload;
		},
        setNavigation: (state, action) => {
            state.navigation = action.payload;
        }
	},
})

export const { 
    setUserId,
    setSessionId,
	setIsGuest,
	setIsHost,
    setIsConnected,
    setIsLoading,
    setJoinedSession,
    setIsMobileView,
    setNavigation
} = configSlice.actions;

export default configSlice.reducer;