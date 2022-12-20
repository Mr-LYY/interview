import React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const WireChart = ({ data }) => {
  function prepareWireChart(data) {
    if (!data) return;

    let localData = data;
    if (!Array.isArray(data)) {
      localData = Object.entries(data);
    }

    return localData.map((item) => ({
      subject: item[0],
      A: +item[1].actual,
      fullMark: 100,
    }));
  }

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <RadarChart
        cx={300}
        cy={150}
        outerRadius={120}
        width={600}
        height={400}
        data={prepareWireChart(data)}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        height={200}
        mb={10}
        width={300}
        border={"1px solid grey"}
        borderRadius={4}
      >
        <Typography
          fontWeight={900}
          fontSize={80}
          align={"center"}
          lineHeight={1}
          maxWidth={800}
          color={"cornflowerblue"}
        >
          {data?.overall?.actual}
        </Typography>
        <Typography fontWeight={700} fontSize={20} align={"center"}>
          Total score
        </Typography>
      </Box>
    </Box>
  );
};
