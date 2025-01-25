import { aliasedTable, and, eq, inArray, like, lte, or, SQL, sql } from "drizzle-orm";
import { players, teams, transferMarket } from "../../db/schema";
import { db } from "../../db";

export const getMarketTransfers = async ({ player_name, team_id, price }: { player_name: string | undefined; team_id: number | undefined; price?: number }) => {
    const inTeam = aliasedTable(teams, 'in_team');
    const outTeam = aliasedTable(teams, 'out_team');

    const playerIds = await db.select({ id: players.id }).from(players).where(like(players.player_name, `${player_name}%`));

    const conditions: (SQL | undefined)[] = [];
    if(team_id){
        conditions.push(
            or(
                eq(transferMarket.inTeamId, team_id),
                eq(transferMarket.outTeamId, team_id)
            )
        )
    }

    if(price){
        conditions.push(lte(transferMarket.price, price));
    }

    if(playerIds.length > 0){
        conditions.push(inArray(transferMarket.playerId, playerIds.map(player => player.id)));
    }

    const result = await db
        .select({
            id: transferMarket.id,
            player_name: players.player_name,
            player_position: players.position,
            player_price: players.market_price,
            in_team: inTeam.name,
            in_team_badge: inTeam.badge,
            out_team: outTeam.name,
            out_team_badge: outTeam.badge,
            price: transferMarket.price
        })
        .from(transferMarket)
        .leftJoin(inTeam, eq(transferMarket.inTeamId, inTeam.id))
        .leftJoin(outTeam, eq(transferMarket.outTeamId, outTeam.id))
        .leftJoin(players, eq(transferMarket.playerId, players.id))
        .where(conditions.length > 0? and(...conditions) : undefined);

    return result;
}

export const canAddToMarket = async (teamId: number) => {
    const playerInTransferMarket = await db.$count(transferMarket, eq(transferMarket.outTeamId, teamId));
    const teamPlayersCount = await db.$count(players, eq(players.teamId, teamId));

    return teamPlayersCount - playerInTransferMarket > 15;
}

export const addPlayerToMarker = async ({ outTeamId, playerId, price }: { outTeamId: number, playerId: number, price: number }) => {
    await db.insert(transferMarket).values({ outTeamId, playerId, price });
}

export const removePlayerFromMarket = async (playerId: number, outTeamId: number) => {
    await db.delete(transferMarket).where(and(eq(transferMarket.playerId, playerId), eq(transferMarket.outTeamId, outTeamId)));
}

export const buyPlayer = async ({ inTeamId, outTeamId, playerId, price }: { inTeamId: number; outTeamId: number; playerId: number; price: number }) => {
    await db.transaction(async tx => {
        // update player team id
        await tx.update(players).set({ teamId: inTeamId }).where(eq(players.id, playerId));
        // update in/out teams budget
        const priceToBuy = price * 0.95;
        await tx.update(teams).set({ budget: sql`budget - ${priceToBuy}` }).where(eq(teams.id, inTeamId));
        await tx.update(teams).set({ budget: sql`budget + ${priceToBuy}` }).where(eq(teams.id, outTeamId));
        // add in team to player transfer market
        await tx.update(transferMarket).set({ inTeamId }).where(eq(transferMarket.playerId, playerId));
    })
}

export const getTeamPlayersCount = async (teamId: number) => {
    const teamPlayersCount = await db.$count(players, eq(players.teamId, teamId));
    return teamPlayersCount;
}
