import { useQuery } from "react-query";
import marketApi from "../../../api/marketApi";
import keys from "../../../api/keys";
import { Filters } from "../../../types";

export default ({
  selectedPlayer,
  priceSearch,
  selectedTeam,
  currentPage,
}: Filters) => {
  const query = useQuery({
    queryFn: () =>
      marketApi.getTransferMarketData({
        playerName: selectedPlayer,
        price: priceSearch,
        teamId: selectedTeam?.value,
        page: currentPage,
      }),
    queryKey: keys.marketFilterKey({
      priceSearch,
      selectedPlayer,
      selectedTeam: selectedTeam?.value,
      page: currentPage,
    }),
    keepPreviousData: true,
  });

  return query;
};
