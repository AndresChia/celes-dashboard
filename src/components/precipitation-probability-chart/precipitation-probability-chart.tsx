import { useState } from 'react';
import { Charts } from '../chart/charts';

//const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

export const PrecipitationProbabilityChart = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      {
        <Charts
          data={[]}
          lines={[{ key: 'min', stroke: 'red' }, { key: 'max', stroke: 'green' }, { key: 'prom' }]}
          xAxis={{ dataKey: 'month' }}
        />
      }
    </>
  );
};
