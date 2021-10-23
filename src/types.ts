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
    avatarUrl: string
}