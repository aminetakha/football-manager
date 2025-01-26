type Filter = string | undefined;

export default {
    getMeKey: () => ['me'],
    teamKey: (id: number | undefined) => ['team', id],
    allTeamsKey: () => ['teams'],
    marketFilterKey: ({ selectedTeam, selectedPlayer, priceSearch }: { selectedTeam: Filter; selectedPlayer: Filter; priceSearch: Filter }) => {
        return ['market', selectedTeam, selectedPlayer, priceSearch]
    },
    userTeamInfoKey: (userId: number) => ['team-info', userId]
}