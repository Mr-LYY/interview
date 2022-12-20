import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { PageLayout } from "../PageLayout/PageLayout";
import { SmileAnswers } from "../SmileAnswers/SmileAnswers";
import { makeCustomFetch } from "../../utils";
import { Divider } from "@mui/material";
import { AuthContext } from "../../App";

export const QuestionsPage = () => {
  const { setIsAuthorized } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(null);
  const [score, setScore] = useState(null);
  const [questionData, setQuestionData] = useState({});

  const nextQuestionHandler = () => {
    setIsLoading(true);
    makeCustomFetch("questions/next")
      .then((r) => {
        if (r.status === 401) {
          setIsAuthorized(false);
        }

        return r.ok && r.json();
      })
      .then((data) => {
        setQuestionData(data.data);
        setType(data.type);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    nextQuestionHandler();
  }, [setIsAuthorized]);

  const topicAnswerHandler = () => {
    makeCustomFetch(`topics/${questionData?.id}/score`, "POST", { score })
      .then((r) => r.ok && nextQuestionHandler())
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <PageLayout
      header={"Question's section"}
      buttonCallback={type === "topic" ? topicAnswerHandler : null}
      buttonText={"Next question"}
      isLoading={isLoading}
      disabled={!score}
    >
      <Typography variant={"caption"} textTransform={"capitalize"}>
        {type}
      </Typography>
      <Typography variant={"h6"}>{questionData?.question}</Typography>
      <Divider sx={{ mt: 2, mb: 1 }} />
      <Typography variant={"caption"}>
        <b>Description</b>: {questionData?.description}
      </Typography>
      <SmileAnswers setScore={setScore} />
    </PageLayout>
  );
};
