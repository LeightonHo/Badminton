import { joinSession } from "./SocketHelper";

let socket: WebSocket = new WebSocket("wss://op47bt7cik.execute-api.ap-southeast-2.amazonaws.com/test");

const heartbeat = () => {
    console.log(`Heartbeat running.. ${new Date()}`);

    const payload: any = {
      action: "ping"
    }

    socket.send(JSON.stringify(payload));
    setTimeout(heartbeat, 30000);
}

export const initSocket = () => {
    console.log("Initialising web socket.");

    if (socket.readyState !== WebSocket.CONNECTING && socket.readyState === WebSocket.CLOSED) {
      socket = new WebSocket("wss://op47bt7cik.execute-api.ap-southeast-2.amazonaws.com/test");
    }

    socket.onopen = () => {
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

initSocket();

setTimeout(() => {
  socket.close();
}, 5000);

let scrollEventTriggered: boolean = false;
window.addEventListener("scroll", () => {
  if (!scrollEventTriggered && socket.readyState === WebSocket.CLOSED) {
    scrollEventTriggered = true;
    console.log("Web socket was closed, attempting to reconnect..", socket.readyState);
    initSocket();

    setTimeout(() => {
      scrollEventTriggered = false;
    }, 1000);
  }
});