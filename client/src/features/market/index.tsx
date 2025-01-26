import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Card, ComboboxItem } from "@mantine/core";
import marketApi from "../../api/marketApi"
import Market from "./components/Market";
import Filters from "./components/Filters";
import keys from "../../api/keys";
import { useAuth } from "../../hooks/useAuth";
import teamApi from "../../api/teamApi";

const MarketDashboard = () => {
  const [selectedTeam, setSelectedTeam] = useState<ComboboxItem | undefined>();
  const [selectedPlayer, setSelectedPlayer] = useState<string | undefined>();
  const [priceSearch, setPriceSearch] = useState<string | undefined>();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { isLoading, data, error } = useQuery({
    queryFn: () => marketApi.getTransferMarketData({ playerName: selectedPlayer, price: priceSearch, teamId: selectedTeam?.value }),
    queryKey: keys.marketFilterKey({ priceSearch, selectedPlayer, selectedTeam: selectedTeam?.value })
  });
  const teamInfo = useQuery({
    queryFn: () => teamApi.getUserTeamInfo(user?.id as number),
    queryKey: keys.userTeamInfoKey(user?.id as number)
  });
  const buyPlayerMutation = useMutation({
    mutationFn: (data: { playerId: number; inTeamId: number; outTeamId: number; price: number }) => marketApi.buyPlayer(data),
    onSuccess(){
      queryClient.invalidateQueries(keys.marketFilterKey({ priceSearch, selectedPlayer, selectedTeam: selectedTeam?.value }))
    }
  })

  const onTeamChange = (option: ComboboxItem) => {
    setSelectedTeam(option);
  }

  const onPlayerChange = (name: string) => {
    setSelectedPlayer(name);
  }

  const onPriceChange = (price: string) => {
    setPriceSearch(price);
  }

  const onBuyPlayerHandler = (data: { playerId: number; outTeamId: number; price: number }) => {
    buyPlayerMutation.mutate({ ...data, inTeamId: teamInfo.data.id });
  }

  if(error) {
    return <h1>Error occurred</h1>
  }

  return (
    <div>
      <Card shadow="sm" padding="lg" radius="md">
        <Card.Section>
          <Filters selectedTeam={selectedTeam} onTeamChange={onTeamChange} onPlayerChange={onPlayerChange} onPriceChange={onPriceChange} />
          {isLoading || teamInfo.isLoading? <h1>Loading...</h1> : <Market market={data} userTeamId={teamInfo.data.id} onBuyPlayerHandler={onBuyPlayerHandler} />}
        </Card.Section>
      </Card>
    </div>
  )
}

export default MarketDashboard;