import { ComboboxItem, Flex, Input, NumberInput, Select } from "@mantine/core";
import { debounce } from "../../../api/utils";
import useAllTeams from "../hooks/useAllTeams";

type FiltersProps = {
  selectedTeam: ComboboxItem | undefined;
  onTeamChange: (option: ComboboxItem) => void;
  onPlayerChange: (name: string) => void;
  onPriceChange: (price: string) => void;
};

const Filters: React.FC<FiltersProps> = ({
  selectedTeam,
  onTeamChange,
  onPlayerChange,
  onPriceChange,
}) => {
  const { data } = useAllTeams();

  const debouncePlayerChange = debounce<string>(onPlayerChange);
  const debouncePriceChange = debounce<string>(onPriceChange);

  return (
    <Flex gap="md">
      <Select
        label="Seach by team"
        data={data || []}
        value={selectedTeam ? selectedTeam.value : null}
        onChange={(_value, option) => onTeamChange(option)}
        searchable
        clearable
      />
      <Input.Wrapper label="Search by player">
        <Input onChange={(e) => debouncePlayerChange(e.target.value)} />
      </Input.Wrapper>
      <NumberInput
        label="Search by price"
        onChange={(e) => debouncePriceChange(e.toString())}
        min={0}
      />
    </Flex>
  );
};

export default Filters;
