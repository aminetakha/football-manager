import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import marketApi from "../../../api/marketApi";
import keys from "../../../api/keys";
import { Filters } from "../../../types";

export default ({
  currentPage,
  priceSearch,
  selectedPlayer,
  selectedTeam,
}: Filters) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
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

  return mutation;
};
