import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Box,
  ComboboxItem,
  Flex,
  Group,
  Loader,
  Pagination,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import marketApi from "../../api/marketApi";
import Market from "./components/Market";
import Filters from "./components/Filters";
import keys from "../../api/keys";
import { useAuth } from "../../hooks/useAuth";
import teamApi from "../../api/teamApi";

const MarketDashboard = () => {
  const [selectedTeam, setSelectedTeam] = useState<ComboboxItem | undefined>();
  const [selectedPlayer, setSelectedPlayer] = useState<string | undefined>();
  const [priceSearch, setPriceSearch] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { isLoading, data, error, isFetching } = useQuery({
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
  const teamInfo = useQuery({
    queryFn: () => teamApi.getUserTeamInfo(user?.id as number),
    queryKey: keys.userTeamInfoKey(user?.id as number),
  });
  const buyPlayerMutation = useMutation({
    mutationFn: (data: {
      playerId: number;
      inTeamId: number;
      outTeamId: number;
      price: number;
    }) => marketApi.buyPlayer(data),
    onSuccess() {
      queryClient.invalidateQueries(
        keys.marketFilterKey({
          priceSearch,
          selectedPlayer,
          selectedTeam: selectedTeam?.value,
          page: currentPage,
        })
      );
    },
    onError(error: Error) {
      const errorData = JSON.parse(error.message);
      notifications.show({
        message: errorData.message,
        title: "Error while buying the player",
        position: "top-right",
        color: "red",
      });
    },
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onTeamChange = (option: ComboboxItem) => {
    setSelectedTeam(option);
    onPageChange(1);
  };

  const onPlayerChange = (name: string) => {
    setSelectedPlayer(name);
    onPageChange(1);
  };

  const onPriceChange = (price: string) => {
    setPriceSearch(price);
    onPageChange(1);
  };

  const onBuyPlayerHandler = (data: {
    playerId: number;
    outTeamId: number;
    price: number;
  }) => {
    if (teamInfo.data) {
      buyPlayerMutation.mutate({ ...data, inTeamId: teamInfo.data.id });
    }
  };

  if (error) {
    return <h1>Error occurred</h1>;
  }

  return (
    <Box>
      <Filters
        selectedTeam={selectedTeam}
        onTeamChange={onTeamChange}
        onPlayerChange={onPlayerChange}
        onPriceChange={onPriceChange}
      />
      <>
        {isLoading || teamInfo.isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <Market
            market={data?.result || []}
            userTeamId={teamInfo?.data?.id as number}
            onBuyPlayerHandler={onBuyPlayerHandler}
          />
        )}
        <Box mt="lg">
          {isFetching && (
            <Flex my="lg" justify="center">
              <Loader color="blue" />
            </Flex>
          )}
          <Pagination.Root
            total={Math.ceil((data?.totalCount || 0) / 10)}
            onChange={onPageChange}
            value={currentPage}
          >
            <Group gap={5} justify="center">
              <Pagination.First />
              <Pagination.Previous />
              <Pagination.Items />
              <Pagination.Next />
              <Pagination.Last />
            </Group>
          </Pagination.Root>
        </Box>
      </>
    </Box>
  );
};

export default MarketDashboard;
