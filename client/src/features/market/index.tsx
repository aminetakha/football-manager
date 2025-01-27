import { useState } from "react";
import {
  Box,
  ComboboxItem,
  Flex,
  Group,
  Loader,
  Pagination,
} from "@mantine/core";
import Market from "./components/Market";
import Filters from "./components/Filters";
import useTransferMarketData from "./hooks/useTransferMarketData";
import useTeamInfo from "./hooks/useTeamInfo";
import useBuyPlayer from "./hooks/useBuyPlayer";
import TableSkeleton from "../../components/TableSkeleton";

const MarketDashboard = () => {
  const [selectedTeam, setSelectedTeam] = useState<ComboboxItem | undefined>();
  const [selectedPlayer, setSelectedPlayer] = useState<string | undefined>();
  const [priceSearch, setPriceSearch] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data, error, isFetching } = useTransferMarketData({
    currentPage,
    priceSearch,
    selectedPlayer,
    selectedTeam,
  });
  const teamInfo = useTeamInfo();
  const buyPlayerMutation = useBuyPlayer({
    currentPage,
    priceSearch,
    selectedPlayer,
    selectedTeam,
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
          <TableSkeleton rows={10} />
        ) : (
          <Market
            market={data?.result || []}
            userTeamId={teamInfo?.data?.id as number}
            onBuyPlayerHandler={onBuyPlayerHandler}
          />
        )}
        <Box mt="lg">
          {isFetching && !isLoading && (
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
