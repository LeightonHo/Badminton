import { IConfig } from "../components/Configuration";
import { IState as Props } from "../components/Main";
import { IMatch, IRound } from "../components/RoundRobin";

export const generateRoundRobin = (config: IConfig): Props["gameState"] => {
    const numPlayersOnBye = config.players.length - (config.courts.length * 4);
    const rounds = config.rounds;
    let bracket: IRound[] = [];
    let playersAlreadyOnBye: Props["config"]["players"] = [];

    initDataStructures(config.players, config.courts);

    for (let i = 1; i < rounds + 1; i++) {
        let matches: IMatch[] = [];
        let playersOnBye: Props["config"]["players"] = [];

        matchKeyList.sort(sortMatches);

        if (numPlayersOnBye === 0) {
            matches = generateMatches(config.courts, playersOnBye);
        } else {
            // Use the bye dictionary to select next byes.  Sort by number of times on bye.
            byeKeyList.sort(sortByes);

            for (const byeKey of byeKeyList) {
                const players = byeKey.split(",");

                // Skip these byes if some of them were already on bye last time.
                if (players.some(element => playersAlreadyOnBye.includes(element))) {
                    continue;
                }

                for (const player of players) {
                    byeDictionary[player]++;
                }

                matches = generateMatches(config.courts, players);

                if (matches.length !== config.courts.length) {
                    continue;
                }

                playersOnBye = players;
                playersAlreadyOnBye = players;

                break;
            }
        }

        const round: IRound = {
            number: i,
            matches: matches,
            byes: playersOnBye
        }

        bracket.push(round);
    }

    return bracket;
}

let byeKeyList: string[] = [];
let matchKeyList: string[] = [];
let teamDictionary: { [name: string]: number } = {};
let opponentDictionary: { [name: string]: { [name: string]: number } } = {};
let byeDictionary: { [name: string]: number } = {};

const initDataStructures = (players: IConfig["players"], courts: IConfig["courts"]) => {
    for (const player1 of players) {
        byeDictionary[player1] = 0;
        opponentDictionary[player1] = {};

        for (const player2 of players) {
            if (player1 === player2) {
                continue;
            }

            teamDictionary[[player1, player2].sort().toString()] = 0;
            opponentDictionary[player1][player2] = 0;
        }
    }

    for (const team1 of Object.keys(teamDictionary)) {
        for (const team2 of Object.keys(teamDictionary)) {
            if (team1 === team2) {
                continue;
            }

            const team1List = team1.split(",");
            const team2List = team2.split(",");

            if (team1List.some(element => team2List.includes(element))) {
                continue;
            }

            const matchKey = team1List.sort().toString() + ":" + team2List.sort().toString();

            if (matchKeyList.indexOf(matchKey) >= 0) {
                continue;
            }

            matchKeyList.push(matchKey);
        }
    }

    const numPlayersOnBye = players.length - (courts.length * 4);

    for (const player1 of players) {
        if (numPlayersOnBye === 1) {
            byeKeyList.push(player1);
        } else {
            for (const player2 of players) {
                if (numPlayersOnBye === 2 && player1 !== player2) {
                    const byeKey = [player1, player2].sort().toString();

                    if (byeKeyList.indexOf(byeKey) >= 0) {
                        continue;
                    }

                    byeKeyList.push(byeKey);
                } else {
                    for (const player3 of players) {
                        if (numPlayersOnBye === 3 && player1 !== player2 && player1 !== player3 && player2 !== player3) {
                            const byeKey = [player1, player2, player3].sort().toString();

                            if (byeKeyList.indexOf(byeKey) >= 0) {
                                continue;
                            }

                            byeKeyList.push(byeKey);
                        }
                    }
                }
            }
        }
    }
}

const sortByes = (a: string, b: string): number => {
    // Split the lists into players and calculate the totals.
    const aPlayers = a.split(",");
    let aTotal = 0;

    for (const player of aPlayers) {
        aTotal += byeDictionary[player];
    }

    const bPlayers = b.split(",");
    let bTotal = 0;

    for (const player of bPlayers) {
        bTotal += byeDictionary[player];
    }

    if (aTotal === bTotal) {
        // Secondary sort is random if they've played the same number of byes.
        return 0.5 - Math.random();
    }

    return aTotal - bTotal;
}

const sortMatches = (a: string, b: string): number => {
    // Sort on matches with teams with the lowest number of games played together.
    const aTeam1Key = a.split(":")[0];
    const aTeam2Key = a.split(":")[1];
    const bTeam1Key = b.split(":")[0];
    const bTeam2Key = b.split(":")[1];

    const aTeamTotal = (teamDictionary[aTeam1Key] + teamDictionary[aTeam2Key]);
    const bTeamTotal = (teamDictionary[bTeam1Key] + teamDictionary[bTeam2Key])

    if (aTeamTotal === bTeamTotal) {
        // Secondary sort based on lowest total games played against each other.
        const aTeam1 = aTeam1Key.split(",");
        const aTeam2 = aTeam2Key.split(",");
        const aPlayer1 = aTeam1[0];
        const aPlayer2 = aTeam1[1];
        const aPlayer3 = aTeam2[0];
        const aPlayer4 = aTeam2[1];

        const bTeam1 = bTeam1Key.split(",");
        const bTeam2 = bTeam2Key.split(",");
        const bPlayer1 = bTeam1[0];
        const bPlayer2 = bTeam1[1];
        const bPlayer3 = bTeam2[0];
        const bPlayer4 = bTeam2[1];

        const aTotal = opponentDictionary[aPlayer1][aPlayer3] + opponentDictionary[aPlayer1][aPlayer4] + opponentDictionary[aPlayer2][aPlayer3] + opponentDictionary[aPlayer2][aPlayer4];
        const bTotal = opponentDictionary[bPlayer1][bPlayer3] + opponentDictionary[bPlayer1][bPlayer4] + opponentDictionary[bPlayer2][bPlayer3] + opponentDictionary[bPlayer2][bPlayer4];

        return aTotal - bTotal;
    }

    return aTeamTotal - bTeamTotal;
}

let previousMatchKey = "";

const wasPreviousMatch = (currentMatchKey: string, previousMatchKey: string): boolean => {
    const currentTeams = currentMatchKey.split(":");
    const previousTeams = previousMatchKey.split(":");

    return currentTeams.sort().toString() === previousTeams.sort().toString();
}

// Function for rendering each match takes in a list of players and generates the bracket
const generateMatches = (courts: IConfig["courts"], playersOnBye: IConfig["players"]): IMatch[] => {
    let result: IMatch[] = []
    let currentPlayers: string[] = [];

    for (let i = 0; i < courts.length; i++) {
        const invalidPlayers = [...currentPlayers, ...playersOnBye];
        let team1: string[] = [];
        let team2: string[] = [];
        let matchFound = false;

        for (const matchKey of matchKeyList) {
            if (wasPreviousMatch(matchKey, previousMatchKey)) {
                continue;
            }

            const team1Key = matchKey.split(":")[0];
            const team2Key = matchKey.split(":")[1];

            team1 = team1Key.split(",");
            team2 = team2Key.split(",");

            const allPlayers = team1.concat(team2);

            // Check that none of these players have already been selected for this round.
            if (allPlayers.some(element => invalidPlayers.includes(element))) {
                continue;
            }

            const player1 = team1[0];
            const player2 = team1[1];
            const player3 = team2[0];
            const player4 = team2[1];

            // Otherwise add them to the list.
            currentPlayers = currentPlayers.concat(allPlayers);

            // Update team dictionary.
            teamDictionary[team1Key]++;
            teamDictionary[team2Key]++;

            // Update opponent dictionary.
            opponentDictionary[player1][player3]++;
            opponentDictionary[player1][player4]++;

            opponentDictionary[player2][player3]++;
            opponentDictionary[player2][player4]++;

            opponentDictionary[player3][player1]++;
            opponentDictionary[player3][player2]++;

            opponentDictionary[player4][player1]++;
            opponentDictionary[player4][player2]++;

            matchFound = true;
            previousMatchKey = matchKey;

            break;
        }

        if (matchFound) {
            const match: IMatch = {
                court: courts[i],
                team1: {
                    player1: team1[0],
                    player2: team1[1],
                    score: 0
                },
                team2: {
                    player3: team2[0],
                    player4: team2[1],
                    score: 0
                }
            }

            result.push(match);
        }
    }

    return result;
}