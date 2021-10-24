import { IConfig } from "../types";
import store from "../redux/Store";
import { 
	setIsConnected,
	setIsHost,
	setIsLoading,
	setJoinedSession, 
} from "../redux/General";
import { 
	addPlayer as reduxAddPlayer, 
	removePlayer as reduxRemovePlayer,
	syncConfig,
	updatePlayer as reduxUpdatePlayer
} from "../redux/Config";
import {
	addRound, 
	updateScore as reduxUpdateScore,
	syncGameState 
} from "../redux/GameState";

let userId: string;
let sessionId: string;
let socket: any = null;
let setSessionIdCallback: (sessionId: string) => void;

const heartbeat = () => {
	const payload: any = {
		action: "ping"
	}

	send(payload);
	setTimeout(heartbeat, 30000);
}

export const initSocket = (user: string, session: string) => {
	console.log("Initialising web socket.");

	if (user) {
		userId = user;
	}

	if (session) {
		sessionId = session;
	}

	if (!socket || (socket.readyState !== WebSocket.CONNECTING && socket.readyState === WebSocket.CLOSED)) {
		socket = new WebSocket("wss://op47bt7cik.execute-api.ap-southeast-2.amazonaws.com/test");
	}

	socket.onmessage = (ev: MessageEvent<any>) => {
		const data = JSON.parse(ev.data);

		switch (data.action) {
			case "add_player":
				store.dispatch(reduxAddPlayer(JSON.parse(data.player)));
				break;
			case "remove_player":
				store.dispatch(reduxRemovePlayer(JSON.parse(data.player)));
				break;
			case "update_player":
				store.dispatch(reduxUpdatePlayer(JSON.parse(data.player)));
				break;
			case "update_config":
				store.dispatch(syncConfig(JSON.parse(data.config)));
				break;
			case "add_round":
				store.dispatch(addRound(JSON.parse(data.round)));
				store.dispatch(syncConfig(JSON.parse(data.config)));
				store.dispatch(setIsLoading(false));
				break;
			case "update_score":
				store.dispatch(reduxUpdateScore(JSON.parse(data.data)));
				break;
			case "update_gamestate":
				store.dispatch(syncGameState(JSON.parse(data.gameState)));
				store.dispatch(syncConfig(JSON.parse(data.config)));
				break;
			case "create_session":
				console.log(data.message);
				store.dispatch(syncConfig(JSON.parse(data.config)));
				store.dispatch(setJoinedSession(true));
				store.dispatch(setIsHost(data.isHost));
				break;
			case "joined_session":
				console.log(data.message);
				store.dispatch(setJoinedSession(true));
				store.dispatch(setIsHost(data.isHost));

				// If no game state is returned, then the game hasn't started yet, so show a loading screen until data is pushed.
				store.dispatch(syncGameState(JSON.parse(data.gameState)));
				store.dispatch(syncConfig(JSON.parse(data.config)));
				store.dispatch(setIsLoading(false));
				break;
			case "join_failed":
				setSessionIdCallback("");
				store.dispatch(setJoinedSession(false));
				break;
		}
	}

	socket.onopen = () => {
		console.log("WebSocket is connected.");
		console.log("Joining session");
		store.dispatch(setIsConnected(true));
		store.dispatch(setIsLoading(true));
		joinSession(sessionId);
		heartbeat();
	}

	socket.addEventListener("close", () => {
		store.dispatch(setIsConnected(false));
		console.log("WebSocket is closed.");
	});
}

export const getSocket = () => {
	return socket;
}

export const setCallback_SetSessionId = (cb: (sessionId: string) => void) => {
	setSessionIdCallback = cb;
}

// setTimeout(() => {
//   socket.close();
// }, 5000);

// Mechanism for re-connecting automatically.
let scrollEventTriggered: boolean = false;

window.addEventListener("scroll", () => {
	if (!socket) {
		return;
	}

	if (!scrollEventTriggered && socket.readyState === WebSocket.CLOSED) {
		scrollEventTriggered = true;

		initSocket(userId, sessionId);

		setTimeout(() => {
			scrollEventTriggered = false;
		}, 1000);
	}
});

// Public Socket Helper functions
export const generateRound = (sessionId: string, config: IConfig) => {
	send({
		action: "generate_round",
		userId: userId,
		sessionId: sessionId,
		config: JSON.stringify(config)
	});
}

export const addCourt = (sessionId: string, court: string) => {
	send({
		action: "session",
		method: "add_court",
		userId: userId,
		sessionId: sessionId,
		court: court
	});
}

export const removeCourt = (sessionId: string, court: string) => {
	send({
		action: "session",
		method: "remove_court",
		userId: userId,
		sessionId: sessionId,
		court: court
	});
}

export const addPlayer = (sessionId: string, playerId: string, alias: string, avatarUrl: string) => {
	send({
		action: "session",
		method: "add_player",
		userId: userId,
		sessionId: sessionId,
		playerId: playerId,
		alias: alias,
		avatarUrl: avatarUrl
	});
}

export const removePlayer = (sessionId: string, playerId: string) => {
	send({
		action: "session",
		method: "remove_player",
		userId: userId,
		sessionId: sessionId,
		playerId: playerId
	});
}

export const updatePlayer = (sessionId: string, playerId: string) => {
	send({
		action: "session",
		method: "update_player",
		userId: userId,
		sessionId: sessionId,
		playerId: playerId
	});
}

export const updateScore = (sessionId: string, roundKey: number, matchKey: number, team: number, score: number) => {
	send({
		action: "session",
		method: "update_score",
		userId: userId,
		sessionId: sessionId,
		roundKey: roundKey,
		matchKey: matchKey,
		team: team,
		score: score
	});
}

// export const updatePlayer = (sessionId: string, roundKey: number, matchKey: number, player: number, name: string) => {
// 	send({
// 		action: "session",
// 		method: "update_player",
// 		userId: userId,
// 		sessionId: sessionId,
// 		roundKey: roundKey,
// 		matchKey: matchKey,
// 		player: player,
// 		name: name
// 	});
// }

export const updateBye = (sessionId: string, roundKey: number, byeKey: number, name: string) => {
	send({
		action: "session",
		method: "update_bye",
		userId: userId,
		sessionId: sessionId,
		roundKey: roundKey,
		byeKey: byeKey,
		name: name
	});
}

export const createSession = () => {
	const sessionId = generateSessionId(4);
	console.log(userId);

	send({
		action: "session",
		method: "create",
		userId: userId,
		sessionId: sessionId
	});

	return sessionId;
}

export const joinSession = (sessionId: string) => {
	store.dispatch(setIsLoading(true));

	send({
		action: "session",
		method: "join",
		userId: userId,
		sessionId: sessionId
	});
}

export const leaveSession = (sessionId: string) => {
	send({
		action: "session",
		method: "leave",
		userId: userId,
		sessionId: sessionId
	});
}

const generateSessionId = (length: number) => {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";

	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return result;
}

const send = (payload: any) => {
	socket.send(JSON.stringify(payload));
}