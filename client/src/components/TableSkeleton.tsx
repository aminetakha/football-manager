import { Grid, Skeleton } from "@mantine/core";

const TableSkeleton: React.FC<{ rows: number }> = ({ rows }) => {
  return Array.from({ length: rows }, () => (
    <Grid mb="lg">
      <Grid.Col span={3}>
        <Skeleton height={15} radius="xl" />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={15} radius="xl" />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={15} radius="xl" />
      </Grid.Col>
      <Grid.Col span={3}>
        <Skeleton height={15} radius="xl" />
      </Grid.Col>
    </Grid>
  ));
};

export default TableSkeleton;
