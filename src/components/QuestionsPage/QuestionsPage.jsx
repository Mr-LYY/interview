import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { PageLayout } from "../PageLayout/PageLayout";
import { SmileAnswers } from "../SmileAnswers/SmileAnswers";
import { makeCustomFetch } from "../../utils";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  LinearProgress,
} from "@mui/material";
import { AuthContext, CandidateContext } from "../../App";
import { Timer } from "../Timer/Timer";
import { Circle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const QuestionsPage = () => {
  const { setIsAuthorized } = useContext(AuthContext);
  const { candidateId } = useContext(CandidateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [score, setScore] = useState(null);
  const [questionData, setQuestionData] = useState({});
  const navigate = useNavigate();

  const nextQuestionHandler = (shouldLoading = true) => {
    shouldLoading && setIsLoading(true);
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

  const resultHandler = () => {
    setIsWaiting(false);
    navigate("/summary");
  };

  useEffect(() => {
    let intevalId;
    if (type === "pending") {
      setIsWaiting(true);

      intevalId = setInterval(() => nextQuestionHandler(false), 2000);
    } else {
      clearInterval(intevalId);
      setIsWaiting(false);
      if (type === "result") {
        resultHandler();
      }
    }

    return () => clearInterval(intevalId);
  }, [type]);

  const requestSwitchHandler = (type) => {
    switch (type) {
      case "topic":
        return topicAnswerHandler;
      case "question":
        return questionAnswerHandler;
      case "pending": {
        return questionAnswerHandler;
      }
      case "result":
        return resultHandler;
      default:
        return () => false;
    }
  };

  return (
    <PageLayout
      header={"Question's section"}
      buttonCallback={requestSwitchHandler(type)}
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
      <SmileAnswers data={questionData} setScore={setScore} />

      <Dialog open={isWaiting}>
        <DialogContent>
          <DialogContentText variant={"h6"} mb={1}>
            {"Waiting for the second reviewer"}
          </DialogContentText>
          <LinearProgress />
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};
