import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { faker } from '@faker-js/faker';
import { players, teams, transferMarket } from '../db/schema';
import { teams as defaultTeams } from './team-sample.json';
import { inArray } from 'drizzle-orm';

type PlayerType = { player_name: string; position: string; market_price: number; teamId: number };

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


const generatePlayers = (teamId: number) => {
    const teamPlayers: PlayerType[] = [];
    for(const { position, count } of defaultTeamPlayers){
        for(let i=1; i<=count; i++){
            teamPlayers.push({
                player_name: faker.person.fullName({ sex: 'male' }),
                position,
                market_price: +faker.commerce.price({ min: 25_000, max: 100_000, dec: 0 }),
                teamId,
            })
        }
    }
    return teamPlayers;
}

const generateTransferMarketEntry = (playerId: number, outTeamId: number) => ({
  outTeamId,
  inTeamId: null,
  playerId,
  price: faker.number.int({ min: 100000, max: 10000000 }),
});

async function seed() {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });

    const db = drizzle(connection);
    const insertedTeams = await db.insert(teams).values(defaultTeams).$returningId();

    const playerData: PlayerType[] = [];
    for(const team of insertedTeams){
    const player = generatePlayers(team.id);
        playerData.push(...player);
    }

    const createdPlayers = await db.insert(players).values(playerData).$returningId();
    const allPlayers = await db.select().from(players).where(inArray(players.id, createdPlayers.map(p => p.id)));
    const transferMarketData = allPlayers.map(player => generateTransferMarketEntry(player.id, player.teamId!));
    await db.insert(transferMarket).values(transferMarketData);

    console.log('Database seeded successfully!');
    connection.end()
}

seed().catch(err => {
  console.error('Error seeding database:', err);
});