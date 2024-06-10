import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  XAxisProps,
  YAxisProps,
  TooltipProps,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { AreaI, Chart } from './chart';

interface Props {
  type?: string;
  data: Chart[];
  areas: AreaI[];
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip?: TooltipProps<any, any>;
}

export const AreaCharts = ({ data = [], areas, xAxis, yAxis, tooltip }: Props) => {
  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis {...xAxis} />
        <YAxis {...yAxis} />
        <Tooltip {...tooltip} />
        <Legend />

        {areas.map((area) => (
          <Area
            key={area.key}
            type="monotone"
            dataKey={area.key}
            stroke={area.stroke ?? '#8884d8'}
            fill={area.fill ?? '#8884d8'}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};
