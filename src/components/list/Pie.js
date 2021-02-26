import React from "react";
import { ResponsivePie } from "@nivo/pie";

function Pie(props) {
  const data = [
    {
      id: "in-progress",
      label: "In Progress",
      value: props.inProgress,
    },
    {
      id: "completed",
      label: "completed",
      value: props.completed,
    },
  ];

  return (
    <ResponsivePie
      data={data}
      innerRadius={0.9}
      colors={["rgb(74, 63, 119)", "#298a5d"]}
      enableRadialLabels={false}
      enableSliceLabels={false}
      isInteractive={false}
      fill={[
        {
          match: {
            id: "in-progress",
          },
        },
        {
          match: {
            id: "completed",
          },
        },
      ]}
      legends={[]}
    />
  );
}

export default Pie;
