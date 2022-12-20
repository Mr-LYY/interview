import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import { dispatchIsAuthorizedEvent, makeCustomFetch } from "../../utils";
import Box from "@mui/material/Box";

export const SummaryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    makeCustomFetch("topics")
      .then((r) => {
        if (r.status === 401) {
          dispatchIsAuthorizedEvent(false);
        }

        return r.ok && r.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  const nextPageHandler = () => {
    navigate("/");
  };

  return (
    <PageLayout
      header={"finish interview"}
      buttonCallback={nextPageHandler}
      buttonText={"Start interview"}
      isLoading={isLoading}
      error
    >
      <Box
        sx={{ cursor: "grab", userSelect: "none" }}
        overflow={"hidden"}
        position={"relative"}
        height={200}
      >
        <Typography>Content</Typography>
      </Box>
    </PageLayout>
  );
};
