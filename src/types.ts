export interface IConfig {
    rounds: number,
    winningScore: number,
    courts: string[],
    players: IPlayer[]
}

export interface IPlayer {
    userId: string,
    alias: string,
    avatarUrl?: string
}