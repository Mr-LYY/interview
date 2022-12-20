import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { PageLayout } from "../PageLayout/PageLayout";
import { SmileAnswers } from "../SmileAnswers/SmileAnswers";
import { makeCustomFetch } from "../../utils";
import { Divider } from "@mui/material";
import { AuthContext, CandidateContext } from "../../App";
import { Timer } from "../Timer/Timer";

export const QuestionsPage = () => {
  const { setIsAuthorized } = useContext(AuthContext);
  const { candidateId } = useContext(CandidateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(null);
  const [score, setScore] = useState(null);
  const [questionData, setQuestionData] = useState({});

  const nextQuestionHandler = () => {
    setIsLoading(true);
    makeCustomFetch(`candidates/${candidateId}/questions/next`)
      .then((r) => {
        if (r.status === 401) {
          setIsAuthorized(false);
        }

        return r.ok && r.json();
      })
      .then((data) => {
        setQuestionData(data.data);
        setType(data.type);
        setScore(null);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    nextQuestionHandler();
  }, [setIsAuthorized]);

  const topicAnswerHandler = () => {
    makeCustomFetch(
      `candidates/${candidateId}/topics/${questionData?.id}/score`,
      "POST",
      { score }
    )
      .then((r) => r.ok && nextQuestionHandler())
      .catch((e) => console.log(e));
  };

  const questionAnswerHandler = () => {
    makeCustomFetch(
      `candidates/${candidateId}/questions/${questionData?.id}/score`,
      "POST",
      { score }
    )
      .then((r) => r.ok && nextQuestionHandler())
      .catch((e) => console.log(e));
  };

  const requestSwitchHandler = (type) => {
    switch (type) {
      case "topic":
        return topicAnswerHandler;
      case "result":
        return questionAnswerHandler;
      case "question":
        return questionAnswerHandler;
      case "pending":
        return questionAnswerHandler;
    }
  };

  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <PageLayout
      header={"Question's section"}
      buttonCallback={
        type === "topic" ? topicAnswerHandler : questionAnswerHandler
      }
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
      <Timer totalTime={questionData?.time} />
      <SmileAnswers setScore={setScore} />
    </PageLayout>
  );
};
