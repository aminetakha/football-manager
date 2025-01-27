import { useMutation, useQueryClient } from "react-query";
import marketApi from "../../../api/marketApi";
import keys from "../../../api/keys";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../../hooks/useAuth";

export default () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (data: { playerId: number; outTeamId: number }) =>
      marketApi.removePlayerToMarket(data),
    onSuccess() {
      queryClient.invalidateQueries(keys.teamKey(user?.id));
    },
    onError(error: Error) {
      const errorData = JSON.parse(error.message);
      notifications.show({
        message: errorData.message,
        title: "Error while removing player to market",
        position: "top-right",
        color: "red",
      });
    },
  });
};
