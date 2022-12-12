import * as React from 'react';
import {PieChart, Pie, ResponsiveContainer} from 'recharts';

const data = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300},
  {name: 'Group D', value: 200},
  {name: 'Group E', value: 278},
  {name: 'Group F', value: 189},
];

class CustomPie extends React.Component {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/pb1jwdt1/';
  render () {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={110}
            cy={200}
            outerRadius={60}
            fill="#E66793"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
export default CustomPie;
