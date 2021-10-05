import { IConfig } from "../components/Configuration";
import { IRound } from "../components/RoundRobin";
import { joinSession } from "./SocketHelper";

let sessionId: string;
let socket: WebSocket = new WebSocket("wss://op47bt7cik.execute-api.ap-southeast-2.amazonaws.com/test");
let setGameStateCallback: (gameState: IRound[]) => void;
let setJoinedSessionCallback: (joinedSession: boolean) => void;
let setConfigCallback: (config: IConfig) => void;

const heartbeat = () => {
    console.log(`Heartbeat running.. ${new Date()}`);

    const payload: any = {
      action: "ping"
    }

    socket.send(JSON.stringify(payload));
    setTimeout(heartbeat, 30000);
}

export const initSocket = (sessionId: string) => {
    console.log("Initialising web socket.");
    

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
    
          // if (data.config) {
          //   const config = JSON.parse(data.config);
          //   setConfig(config);
          // }
        }
    
        // if (data.action === "createSession") {
        //   console.log(data.message);
        //   history.push("/configuration");
        // }
    
        if (data.action === "joinedSession") {
          console.log(data.message);
          setJoinedSessionCallback(true);

          // If no game state is returned, then the game hasn't started yet, so show a loading screen until data is pushed.
          if (data.gameState.length > 0) {
            const gameState = JSON.parse(data.gameState);
    
            setGameStateCallback(gameState);
          }
        }
    
        // if (data.action === "joinFailed") {
        //   setSessionId("");
        //   setJoinedSession(false);
        // }
      }

      socket.onopen = () => {
        console.log("Joining session")
        joinSession(socket, sessionId);
        heartbeat();
      }
  
      socket.addEventListener("open", () => {
        console.log("WebSocket is connected.");
      });
  
      socket.addEventListener("close", (e) => {
        console.log(e);
        console.log("WebSocket is closed.");
      });
}

export const getSocket = () => {
    return socket;
}

// initSocket();

// setTimeout(() => {
//   socket.close();
// }, 5000);

// let scrollEventTriggered: boolean = false;
// window.addEventListener("scroll", () => {
//   if (!scrollEventTriggered && socket.readyState === WebSocket.CLOSED) {
//     scrollEventTriggered = true;
//     console.log("Web socket was closed, attempting to reconnect..", socket.readyState);
//     initSocket();

//     setTimeout(() => {
//       scrollEventTriggered = false;
//     }, 1000);
//   }
// });

export const setCallback_GameState = (cb: (gameState: IRound[]) => void) => {
  setGameStateCallback = cb;
}

export const setCallback_JoinedSession = (cb: (joinedSession: boolean) => void) => {
  setJoinedSessionCallback = cb;
}

export const socket_setSessionId = (sessionId: string): void => {
  sessionId = sessionId;
}