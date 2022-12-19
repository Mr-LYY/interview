import React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import { Avatar } from "@mui/material";

export const MainPage = () => {
  const navigate = useNavigate();

  const nextPageHandler = () => {
    navigate("/prepare");
  };

  return (
    <PageLayout
      header={"Main page"}
      buttonCallback={nextPageHandler}
      buttonText={"Prepare for interview"}
    >
      <Avatar variant={"square"} sx={{ width: 120, height: 120 }} />
      <Typography>Ivanov Ivan</Typography>
    </PageLayout>
  );
};
