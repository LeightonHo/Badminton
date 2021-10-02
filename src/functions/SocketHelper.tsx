import { IState } from "../components/Main";

export function initSocket(socket: WebSocket) {

}

export function pushGameState(socket: IState["socket"], sessionId: string, gameState: IState["gameState"]) {
    const payload: any = {
        action: "session",
        method: "pushGameState",
        sessionId: sessionId,
        gameState: JSON.stringify(gameState)
    };

    socket.send(JSON.stringify(payload));
}

export function pushMatchScore(socket: IState["socket"], sessionId: string, roundKey: number, matchKey: number, team1Score: number | null, team2Score: number | null) {
    const payload: any = {
        action: "session",
        method: "pushMatchScore",
        sessionId: sessionId,
        roundKey: roundKey,
        matchKey: matchKey,
        team1Score: team1Score,
        team2Score: team2Score
    };

    socket.send(JSON.stringify(payload));
}

export function joinSession(socket: IState["socket"], sessionId: string) {
    const payload: any = {
        action: "session",
        method: "join",
        sessionId: sessionId
    };

    socket.send(JSON.stringify(payload));
}

export function leaveSession(socket: IState["socket"], sessionId: string) {
    const payload: any = {
        action: "session",
        method: "leave",
        sessionId: sessionId
    };

    socket.send(JSON.stringify(payload));
}