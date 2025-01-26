import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { players, teams, transferMarket } from "../../db/schema";

type Team = typeof teams.$inferSelect;
type Player = typeof players.$inferSelect;
type TeamOutput = Record<'team', Team & { players: (Player & { in_market: boolean; })[] }>;

export const getUserTeamInfo = async (userId: number) => {
    const team = await 
        db.select()
        .from(teams)
        .where(eq(teams.userId, userId))
        .limit(1);
    return team[0];
}

export const getUserTeamData = async (userId: number) => {
    const teamData = await 
        db.select()
        .from(teams)
        .leftJoin(players, eq(teams.id, players.teamId))
        .leftJoin(transferMarket, and(eq(transferMarket.outTeamId, teams.id), eq(transferMarket.playerId, players.id)))
        .where(eq(teams.userId, userId))
        .orderBy(players.id);
    
    const formattedTeams = teamData.reduce<TeamOutput>((prev, curr) => {
        const isPlayerInMarket = !!curr.transfer_market && curr.transfer_market.inTeamId === null;
        if(!prev.team){
            prev.team = {
                ...curr.teams,
                players: curr.players? [{...curr.players, in_market: isPlayerInMarket}] : []
            }
        }else {
            if(curr.players){
                prev.team.players.push({...curr.players, in_market: isPlayerInMarket})
            }
        }
        return prev;
    }, {} as TeamOutput);

    return formattedTeams;
}

export const getAllTeams = async () => {
    const result = await db.select({ value: teams.id, label: teams.name }).from(teams);
    return result.map(team => ({ value: team.value.toString(), label: team.label }));
}
