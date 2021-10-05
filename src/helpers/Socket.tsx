import { IConfig } from "../components/Configuration";
import { IRound } from "../components/RoundRobin";
import { joinSession } from "./SocketHelper";

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
        console.log(data);
        
        if (data.action === "pong") {
          console.log(data.message);
        }
        
        if (data.action === "syncGameState") {
          const gameState = JSON.parse(data.gameState);
          console.log("Syncing game state...", gameState);
    
          setGameStateCallback(gameState);
    
          if (data.config) {
            const config = JSON.parse(data.config);
            setConfigCallback(config);
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
            const gameState = JSON.parse(data.gameState);
    
            setGameStateCallback(gameState);
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
        joinSession(socket, sessionId);
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