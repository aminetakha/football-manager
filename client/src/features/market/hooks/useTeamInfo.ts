import { useQuery } from "react-query";
import teamApi from "../../../api/teamApi";
import keys from "../../../api/keys";
import { useAuth } from "../../../hooks/useAuth";

export default () => {
  const { user } = useAuth();
  const query = useQuery({
    queryFn: () => teamApi.getUserTeamInfo(user?.id as number),
    queryKey: keys.userTeamInfoKey(user?.id as number),
  });

  return query;
};
