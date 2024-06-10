import { TableSkeleton } from '../skeletons/table';
import { Table } from '../table/table';

interface Props {
  data: any;
  columns: string[];
}

export const CurrentWheaterComponentsTable = ({ data, columns }: Props) => {
  return <>{data == null ? <TableSkeleton /> : <Table data={data} columns={columns} />}</>;
};
