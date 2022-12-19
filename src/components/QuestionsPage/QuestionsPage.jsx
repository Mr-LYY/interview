import React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Button from "@mui/material/Button";

export const QuestionsPage = () => {
  const navigate = useNavigate();

  const nextPageHandler = () => {
    navigate("/questions");
  };

  return (
    <PageLayout
      header={"Question's section"}
      buttonCallback={null}
      buttonText={"Next question"}
    >
      <Typography variant={"caption"}>
        Subject: The best JavaScript practices
      </Typography>
      <Typography variant={"h6"}>
        Question: The best JavaScript practices
      </Typography>
      {/*<Button>*/}
      {/*  <LooksOneIcon sx={{ width: 50, height: 50 }} color={"primary"} />*/}
      {/*</Button>*/}
      {/*<Button>*/}
      {/*  <LooksTwoIcon sx={{ width: 50, height: 50 }} color={"primary"} />*/}
      {/*</Button>*/}
    </PageLayout>
  );
};
