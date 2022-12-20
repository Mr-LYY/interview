import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import { SmileAnswers } from "../SmileAnswers/SmileAnswers";
import { BASE_URL, dispatchIsAuthorizedEvent } from "../../utils";
import { Divider } from "@mui/material";

export const QuestionsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(null);
  const [questionData, setQuestionData] = useState({});
  // const navigate = useNavigate();
  //
  // const nextPageHandler = () => {
  //   navigate("/questions");
  // };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/questions/next`, {
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
      .then((data) => {
        setQuestionData(data.data);
        setType(data.type);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PageLayout
      header={"Question's section"}
      buttonCallback={null}
      buttonText={"Next question"}
      isLoading={isLoading}
    >
      <Typography variant={"caption"} textTransform={"capitalize"}>
        {type}
      </Typography>
      <Typography variant={"h6"}>{questionData?.question}</Typography>
      <Divider sx={{ mt: 2, mb: 1 }} />
      <Typography variant={"caption"}>
        <b>Description</b>: {questionData?.description}
      </Typography>
      <SmileAnswers />
    </PageLayout>
  );
};
