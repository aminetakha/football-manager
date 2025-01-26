import { faker } from '@faker-js/faker';
import { db } from "../db";
import { players, teams } from "../db/schema";
import { teams as defaultTeams} from '../data/team-sample.json';

const defaultTeamPlayers = [
    {
        position: 'GK',
        count: 3
    },
    {
        position: 'CD',
        count: 6
    },
    {
        position: 'CM',
        count: 6
    },
    {
        position: 'CF',
        count: 5
    },
];

const wait = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(null);
        }, 5000)
    })
}

process.on('message', async ({ userId }) => {
    await wait();
    const defaultTeam = defaultTeams[Math.floor(Math.random() * defaultTeamPlayers.length)];
    const team = await db.insert(teams).values({ name: defaultTeam.name, short_name: defaultTeam.short_name, badge: defaultTeam.badge, userId });
    const teamPlayers: { player_name: string; position: string; market_price: number; teamId: number }[] = [];
    for(const { position, count } of defaultTeamPlayers){
        for(let i=1; i<=count; i++){
            teamPlayers.push({
                player_name: faker.person.fullName({ sex: 'male' }),
                position,
                market_price: +faker.commerce.price({ min: 25_000, max: 100_000, dec: 0 }),
                teamId: team[0].insertId,
            })
        }
    }

    await db.transaction(async tx => {
        for(const player of teamPlayers){
            await tx.insert(players).values(player);
        }
    })

    process?.send?.({ userId })
    process.exit(0);
});
