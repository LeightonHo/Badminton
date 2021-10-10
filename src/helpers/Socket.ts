import { IConfig } from "../components/Configuration";
import { IRound } from "../components/RoundRobin";

let sessionId: string;
let socket: WebSocket = new WebSocket("wss://op47bt7cik.execute-api.ap-southeast-2.amazonaws.com/test");
let setGameStateCallback: (gameState: IRound[]) => void;
let setJoinedSessionCallback: (joinedSession: boolean) => void;
let setConfigCallback: (config: IConfig) => void;
let setSessionIdCallback: (sessionId: string) => void;
let setIsConnectedCallback: (isConnected: boolean) => void;

const heartbeat = () => {
    const payload: any = {
      action: "ping"
    }

    socket.send(JSON.stringify(payload));
    setTimeout(heartbeat, 30000);
}

export const initSocket = (session: string) => {
    console.log("Initialising web socket.");
    
    if (session) {
      sessionId = session;
    }

    if (socket.readyState !== WebSocket.CONNECTING && socket.readyState === WebSocket.CLOSED) {
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
          // history.push("/configuration");
        }
    
        if (data.action === "joinedSession") {
          console.log(data.message);
          setJoinedSessionCallback(true);

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
        console.log("Joining session");
        setIsConnectedCallback(true);
        joinSession(sessionId);
        heartbeat();
      }
  
      socket.addEventListener("open", () => {
        console.log("WebSocket is connected.");
      });
  
      socket.addEventListener("close", (e) => {
        setIsConnectedCallback(false);
        console.log(e);
        console.log("WebSocket is closed.");
      });
}

export const getSocket = () => {
  return socket;
}

export const setCallback_GameState = (cb: (gameState: IRound[]) => void) => {
  setGameStateCallback = cb;
}

export const setCallback_JoinedSession = (cb: (joinedSession: boolean) => void) => {
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

// setTimeout(() => {
//   socket.close();
// }, 5000);

// Mechanism for re-connecting automatically.
let scrollEventTriggered: boolean = false;

window.addEventListener("scroll", () => {
  if (!scrollEventTriggered && socket.readyState === WebSocket.CLOSED) {
    scrollEventTriggered = true;
    
    initSocket(sessionId);

    setTimeout(() => {
      scrollEventTriggered = false;
    }, 1000);
  }
});

// Public Socket Helper functions

export function pushGameState(sessionId: string, config: IConfig, gameState: IRound[]) {
  const payload: any = {
      action: "session",
      method: "pushGameState",
      sessionId: sessionId,
      config: JSON.stringify(config),
      gameState: JSON.stringify(gameState)
  };

  socket.send(JSON.stringify(payload));
}

export function pushMatchScore(sessionId: string, roundKey: number, matchKey: number, team: number, score: number) {
  const payload: any = {
      action: "session",
      method: "pushMatchScore",
      sessionId: sessionId,
      roundKey: roundKey,
      matchKey: matchKey,
      team: team,
      score: score
  };

  socket.send(JSON.stringify(payload));
}

export function updatePlayer(sessionId: string, roundKey: number, matchKey: number, player: number, name: string) {
  const payload: any = {
      action: "session",
      method: "updatePlayer",
      sessionId: sessionId,
      roundKey: roundKey,
      matchKey: matchKey,
      player: player,
      name: name
  };

  socket.send(JSON.stringify(payload));
}

export function updateBye(sessionId: string, roundKey: number, byeKey: number, name: string) {
  const payload: any = {
      action: "session",
      method: "updateBye",
      sessionId: sessionId,
      roundKey: roundKey,
      byeKey: byeKey,
      name: name
  };

  socket.send(JSON.stringify(payload));
}

export function createSession() {
  const sessionId = generateSessionId(4);
  const payload: any = {
      action: "session",
      method: "create",
      sessionId: sessionId
  };

  socket.send(JSON.stringify(payload));

  return sessionId;
}

export function joinSession(sessionId: string) {
  const payload: any = {
      action: "session",
      method: "join",
      sessionId: sessionId
  };

  socket.send(JSON.stringify(payload));
}

export function leaveSession(sessionId: string) {
  const payload: any = {
      action: "session",
      method: "leave",
      sessionId: sessionId
  };

  socket.send(JSON.stringify(payload));
}

const generateSessionId = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}