import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Box from "@mui/material/Box";

export const BigChart = ({ data }) => {
  function prepareBigChart(data) {
    if (!data) return;

    let localData = data;
    if (!Array.isArray(data)) {
      localData = Object.entries(data);
    }

    return localData
      .map((item) => ({
        name: item[0],
        uv: item[1].actual,
        pv: 0,
        amt: 0,
      }))
      .filter((x) => x.name !== "overall");
  }

  return (
    <Box
      display={"flex"}
      margin={"0 auto"}
      justifyContent={"center"}
      style={{ width: "90%", height: 300 }}
    >
      <ResponsiveContainer>
        <AreaChart
          data={prepareBigChart(data)}
          margin={{
            top: 30,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis dataKey={"uv"} />
          <Tooltip />
          <Area
            type="natural"
            dataKey="uv"
            stroke="#8884d8"
            strokeWidth={3}
            fill="cornflowerblue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
