import { IState } from "../components/Main";

export function pushGameState(socket: IState["socket"], sessionId: string, config: IState["config"], gameState: IState["gameState"]) {
    const payload: any = {
        action: "session",
        method: "pushGameState",
        sessionId: sessionId,
        config: JSON.stringify(config),
        gameState: JSON.stringify(gameState)
    };

    socket.send(JSON.stringify(payload));
}

export function pushMatchScore(socket: IState["socket"], sessionId: string, roundKey: number, matchKey: number, team: number, score: number) {
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

export function updatePlayer(socket: IState["socket"], sessionId: string, roundKey: number, matchKey: number, player: number, name: string) {
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

export function updateBye(socket: IState["socket"], sessionId: string, roundKey: number, byeKey: number, name: string) {
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

function createSession() {

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