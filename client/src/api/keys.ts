type Filter = string | undefined;

export default {
  getMeKey: () => ["me"],
  teamKey: (id: number | undefined) => ["team", id],
  allTeamsKey: () => ["teams"],
  marketFilterKey: ({
    selectedTeam,
    selectedPlayer,
    priceSearch,
    page,
  }: {
    selectedTeam: Filter;
    selectedPlayer: Filter;
    priceSearch: Filter;
    page: number;
  }) => {
    return ["market", selectedTeam, selectedPlayer, priceSearch, page];
  },
  userTeamInfoKey: (userId: number) => ["team-info", userId],
};
