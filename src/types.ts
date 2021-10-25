export interface IConfig {
    courts: string[],
    players: IPlayer[]
}

export interface IPlayer {
    userId: string,
    alias: string,
    avatarUrl?: string,
    active: boolean
}

export interface IUser {
    userId: string,
    name: string,
    email: string,
    avatarUrl: string,
    currentSessionId: string,
    isGuest: boolean
}

export interface IMatch {
    court: string,
    team1: {
        player1: IPlayer,
        player2: IPlayer,
        score: number
    },
    team2: {
        player3: IPlayer,
        player4: IPlayer,
        score: number
    }
}

export interface IRound {
    round: number,
    matches: IMatch[],
    byes: IPlayer[]
}

export interface IGameState {
    rounds: IRound[]
}