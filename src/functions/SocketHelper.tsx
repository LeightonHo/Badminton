import { IState } from "../components/Main";

export function pushGameState(socket: WebSocket, sessionId: string, gameState: IState["gameState"]) {
    const payload: any = {
        action: "session",
        method: "pushGameState",
        sessionId: sessionId,
        gameState: JSON.stringify(gameState)
    }

    socket.send(JSON.stringify(payload));
}