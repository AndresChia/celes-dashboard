import { AreaCharts } from '../charts/area-charts';
import { ChartSkeleton } from '../skeletons/chart';

interface Props {
  data: any;
}

export const PrecipitationProbabilityChart = ({ data }: Props) => {
  return (
    <>
      {data == null ? (
        <ChartSkeleton height={350} />
      ) : (
        <AreaCharts
          data={data}
          areas={[
            { key: 'pop', stroke: 'gray', fill: 'gray' },
            { key: 'temp', stroke: 'black' },
            { key: 'temp_max', stroke: 'red' },
            { key: 'temp_min', stroke: 'blue' }
          ]}
          xAxis={{ dataKey: 'day' }}
        />
      )}
    </>
  );
};
