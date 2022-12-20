import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import { BASE_URL, dispatchIsAuthorizedEvent } from "../../utils";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";

export const PreparePage = () => {
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/topics`, {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }),
    })
      .then((r) => {
        if (r.status === 401) {
          dispatchIsAuthorizedEvent(false);
        }

        return r.ok && r.json();
      })
      .then((res) => {
        setDescription(res.description);
        setTopics(res.data);
        console.log(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  const nextPageHandler = () => {
    navigate("/questions");
  };

  return (
    <PageLayout
      header={"What is the interview going to be about"}
      buttonCallback={nextPageHandler}
      buttonText={"Start the interview"}
      isLoading={isLoading}
    >
      <Box display={"flex"} overflow={"hidden"} width={topics?.length * 320}>
        {topics.map((topic) => {
          const { id, description, name, questions } = topic;
          return (
            <Card
              sx={{ p: 2, width: 300, height: 150, mr: 2 }}
              variant={"outlined"}
              key={id}
            >
              <Typography fontWeight={700} color={"cornflowerblue"}>
                {name}
              </Typography>
              <Typography sx={{ opacity: 0.5 }}>
                Quantity of questions: {questions}
              </Typography>
              <Typography
                height={100}
                overflow={"hidden"}
                width={"100%"}
                pt={1}
              >
                {description}
              </Typography>
            </Card>
          );
        })}
      </Box>
      <Typography color={"cornflowerblue"} mt={4} mb={1} fontWeight={700}>
        Common description:
      </Typography>
      <Typography>{description}</Typography>
    </PageLayout>
  );
};
