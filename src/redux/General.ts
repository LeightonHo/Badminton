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
    isMobile: false,
    isSessionActive: true,
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
        setIsMobile: (state, action) => {
			state.isMobile = action.payload;
		},
        setNavigation: (state, action) => {
            state.navigation = action.payload;
        },
        setIsSessionActive: (state, action) => {
            state.isSessionActive = action.payload;
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
    setIsMobile,
    setNavigation,
    setIsSessionActive
} = configSlice.actions;

export default configSlice.reducer;