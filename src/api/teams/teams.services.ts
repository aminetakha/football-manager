import { eq } from "drizzle-orm";
import { db } from "../../db";
import { players, teams } from "../../db/schema";

type Team = typeof teams.$inferSelect;
type Player = typeof players.$inferSelect;
type TeamOutput = Record<'team', Team & { players: Player[] }>;

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
        .where(eq(teams.userId, userId))
        .orderBy(players.id);
    
    const formattedTeams = teamData.reduce<TeamOutput>((prev, curr) => {
        if(!prev.team){
            prev.team = {
                ...curr.teams,
                players: curr.players? [curr.players] : []
            }
        }else {
            if(curr.players){
                prev.team.players.push(curr.players)
            }
        }
        return prev;
    }, {} as TeamOutput);

    return formattedTeams;
}
