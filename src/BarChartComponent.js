// import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts"
// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts';
// const chartSetting = {
//     yAxis: [
//     //   {
//     //     label: 'rainfall (mm)',
//     //   },
//     ],
//     width: 500,
//     height: 300,
//     // sx: {
//     //   [`.${axisClasses.left} .${axisClasses.label}`]: {
//     //     transform: 'translate(-20px, 0)',
//     //   },
//     // },
//   };
export default function BarChat(props) {
    console.log(props, '*****props***');
    const CustomBar = (props) => {
        return <rect {...props} fill={props.payload.color} name={props.payload.value}/>;
      };
      const CustomName = (props) => {
        return <span style={{ color: props.color }}>{props.name}</span>;
      };
   
  return (
//     <BarChart
//     dataset={dataset}
//     xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
//     series={props.data}
//     {...chartSetting}
//   />
<BarChart
width={500}
height={300}
data={props.data}
margin={{
  top: 5,
  right: 30,
  left: 20,
  bottom: 5
}}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Legend
  iconSize={20}
  wrapperStyle={{ paddingTop: "10px" }}
  content={(prop) => {
    // const { payload } = props;
    return (
      <ul>
        {props.data.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            <CustomName {...entry} />
          </li>
        ))}
      </ul>
    );
  }}
/>
<Bar dataKey="value" shape={<CustomBar />} />
</BarChart>
  );
}
