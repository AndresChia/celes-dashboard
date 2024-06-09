import { Charts } from '../chart/charts';
import { ChartSkeleton } from '../skeletons/chart';

interface Props {
  data: any;
}

//const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

export const AirPollutionChart = ({ data }: Props) => {
  return (
    <>
      {data == null ? (
        <ChartSkeleton height={350} />
      ) : (
        <Charts
          data={data}
          lines={[{ key: 'min', stroke: 'red' }, { key: 'max', stroke: 'green' }, { key: 'prom' }]}
          xAxis={{ dataKey: 'month' }}
        />
      )}
    </>
  );
};
