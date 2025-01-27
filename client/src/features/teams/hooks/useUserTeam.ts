import { useQuery } from "react-query";
import teamApi from "../../../api/teamApi";
import keys from "../../../api/keys";
import { useAuth } from "../../../hooks/useAuth";

export default (shouldFetchTeam: boolean) => {
  const { user } = useAuth();
  return useQuery({
    queryFn: () => teamApi.getUserTeam(user?.id as number),
    queryKey: keys.teamKey(user?.id),
    enabled: user?.hasTeam || shouldFetchTeam,
  });
};
