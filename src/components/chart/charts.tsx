import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  XAxisProps,
  YAxisProps,
  TooltipProps,
  Legend
} from 'recharts';
import { Chart, LineI } from './chart';

interface Props {
  data: Chart[];
  lines: LineI[];
  xAxis?: XAxisProps;
  yAxis?: YAxisProps;
  tooltip?: TooltipProps<any, any>;
  width?: number;
  height?: number;
}

export const Charts = ({
  data = [],
  lines,
  xAxis,
  yAxis,
  tooltip,
  width = 600,
  height = 300
}: Props) => {
  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      {lines.map((line) => (
        <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.stroke ?? '#8884d8'} />
      ))}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis {...xAxis} />
      <YAxis {...yAxis} />
      <Tooltip {...tooltip} />
      <Legend />
    </LineChart>
  );
};
