import { IConfig } from "../types";
import { IRound } from "../components/RoundRobin";

let userId: string;
let sessionId: string;
let socket: any = null;
let setGameStateCallback: (gameState: IRound[]) => void;
let setJoinedSessionCallback: (joinedSession: boolean) => void;
let setConfigCallback: (config: IConfig) => void;
let setSessionIdCallback: (sessionId: string) => void;
let setIsConnectedCallback: (isConnected: boolean) => void;
let setIsHostCallback: (isHost: boolean) => void;

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
        
        if (data.action === "syncGameState") {
          setGameStateCallback(JSON.parse(data.gameState));
    
          if (data.config) {
            setConfigCallback(JSON.parse(data.config));
          }
        }
    
        if (data.action === "createSession") {
          console.log(data.message);
          setJoinedSessionCallback(true);
          setIsHostCallback(data.isHost);
        }
    
        if (data.action === "joinedSession") {
          console.log(data.message);
          setJoinedSessionCallback(true);
          setIsHostCallback(data.isHost);

          // If no game state is returned, then the game hasn't started yet, so show a loading screen until data is pushed.
          if (data.gameState.length > 0) {
            setGameStateCallback(JSON.parse(data.gameState));

            if (data.config) {
              setConfigCallback(JSON.parse(data.config))
            }
          }
        }
    
        if (data.action === "joinFailed") {
          setSessionIdCallback("");
          setJoinedSessionCallback(false);
        }
      }

      socket.onopen = () => {
        console.log("WebSocket is connected.");
        console.log("Joining session");
        setIsConnectedCallback(true);
        joinSession(sessionId);
        heartbeat();
      }
  
      socket.addEventListener("close", () => {
        setIsConnectedCallback(false);
        console.log("WebSocket is closed.");
      });
}

export const getSocket = () => {
  return socket;
}

export const setCallback_SetGameState = (cb: (gameState: IRound[]) => void) => {
  setGameStateCallback = cb;
}

export const setCallback_SetJoinedSession = (cb: (joinedSession: boolean) => void) => {
  setJoinedSessionCallback = cb;
}

export const setCallback_SetConfig = (cb: (setConfig: IConfig) => void) => {
  setConfigCallback = cb;
}

export const setCallback_SetSessionId = (cb: (sessionId: string) => void) => {
  setSessionIdCallback = cb;
}

export const setCallback_SetIsConnected = (cb: (isConnected: boolean) => void) => {
  setIsConnectedCallback = cb;
}

export const setCallback_SetIsHost = (cb: (isHost: boolean) => void) => {
  setIsHostCallback = cb;
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
export function pushGameState(sessionId: string, config: IConfig, gameState: IRound[]) {
  send({
    action: "session",
    method: "pushGameState",
    userId: userId,
    sessionId: sessionId,
    config: JSON.stringify(config),
    gameState: JSON.stringify(gameState)
  });
}

export function pushMatchScore(sessionId: string, roundKey: number, matchKey: number, team: number, score: number) {
  send({
    action: "session",
    method: "pushMatchScore",
    userId: userId,
    sessionId: sessionId,
    roundKey: roundKey,
    matchKey: matchKey,
    team: team,
    score: score
  });
}

export function updatePlayer(sessionId: string, roundKey: number, matchKey: number, player: number, name: string) {
  send({
    action: "session",
    method: "updatePlayer",
    userId: userId,
    sessionId: sessionId,
    roundKey: roundKey,
    matchKey: matchKey,
    player: player,
    name: name
  });
}

export function updateBye(sessionId: string, roundKey: number, byeKey: number, name: string) {
  send({
    action: "session",
    method: "updateBye",
    userId: userId,
    sessionId: sessionId,
    roundKey: roundKey,
    byeKey: byeKey,
    name: name
  });
}

export function createSession() {
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

export function joinSession(sessionId: string) {
  send({
    action: "session",
    method: "join",
    userId: userId,
    sessionId: sessionId
  });
}

export function leaveSession(sessionId: string) {
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