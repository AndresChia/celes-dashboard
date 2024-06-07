import { Charts } from '../chart/charts';

interface Props {
  data: any;
}

//const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

export const AirPollutionChart = ({ data }: Props) => {
  const chart = data.map((element: any) => ({
    month: element.month,
    min: element.min.aqi,
    max: element.max.aqi,
    prom: element.prom.aqi
  }));
  return (
    <>
      {
        <Charts
          data={chart}
          lines={[{ key: 'min', stroke: 'red' }, { key: 'max', stroke: 'green' }, { key: 'prom' }]}
          xAxis={{ dataKey: 'month' }}
        />
      }
    </>
  );
};
