import React from "react";
import { Appbar } from "./Appbar/Appbar";
import { Container } from "@mui/material";

const Layout = ({ children, header = "" }) => {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f6fbff",
      }}
    >
      <Appbar />
      <Container fixed>{children}</Container>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: 8,
          backgroundColor: "cornflowerblue",
        }}
      />
    </div>
  );
};

export default Layout;
