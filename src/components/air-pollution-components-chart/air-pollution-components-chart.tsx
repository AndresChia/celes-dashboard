import { Charts } from '../chart/charts';
import { ChartSkeleton } from '../skeletons/chart';

interface Props {
  data: any;
}

export const AirPollutionComponentsChart = ({ data }: Props) => {
  return (
    <>
      {data == null ? (
        <ChartSkeleton height={350} />
      ) : (
        <Charts
          data={data}
          lines={[
            { key: 'co', stroke: 'red' },
            { key: 'no', stroke: 'green' },
            { key: 'no2', stroke: 'blue' },
            { key: 'o3', stroke: 'orange' },
            { key: 'so2', stroke: 'black' },
            { key: 'pm2_5', stroke: 'gray' },
            { key: 'pm10', stroke: 'purple' },
            { key: 'nh3', stroke: 'brown' }
          ]}
          xAxis={{ dataKey: 'month' }}
        />
      )}
    </>
  );
};
