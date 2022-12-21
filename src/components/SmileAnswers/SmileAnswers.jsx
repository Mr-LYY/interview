import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";

const AnswerButton = ({ children, name, value, onClick, backgroundColor }) => {
  return (
    <Tooltip placement={"top"} arrow title={name}>
      <Button
        onClick={onClick}
        value={value}
        name={name}
        sx={{
          m: 2,
          boxSizing: "border-box",
          outline: `2px solid ${
            name === backgroundColor.name && backgroundColor.color
          }`,
        }}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

const answersArrNames = [
  {
    text: "Very bad",
    value: "1",
    icon: (
      <SentimentVeryDissatisfiedRoundedIcon
        sx={{ width: 60, height: 60, fill: "cornflowerblue" }}
        color={"primary"}
      />
    ),
  },
  {
    text: "Bad",
    value: "2",
    icon: (
      <SentimentDissatisfiedRoundedIcon
        sx={{ width: 60, height: 60, fill: "cornflowerblue" }}
        color={"primary"}
      />
    ),
  },
  {
    text: "Normal",
    value: "3",
    icon: (
      <SentimentSatisfiedIcon
        sx={{ width: 60, height: 60, fill: "cornflowerblue" }}
        color={"primary"}
      />
    ),
  },
  {
    text: "Good",
    value: "4",
    icon: (
      <SentimentSatisfiedAltRoundedIcon
        sx={{ width: 60, height: 60, fill: "cornflowerblue" }}
        color={"primary"}
      />
    ),
  },
  {
    text: "Perfect",
    value: "5",
    icon: (
      <SentimentVerySatisfiedRoundedIcon
        sx={{ width: 60, height: 60, fill: "cornflowerblue" }}
      />
    ),
  },
];

export const SmileAnswers = ({ setScore, data }) => {
  const [hints, setHints] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("");

  const prepareHints = (allData) => {
    if (!allData) return;
    return Object.entries(allData)
      .filter((key) => key[0].includes("hint"))
      .map((item) => item[1]);
  };

  useEffect(() => {
    if (!data) return;
    setHints(prepareHints(data));
  }, [data]);

  const onClick = useCallback(
    ({ currentTarget }) => {
      setScore(currentTarget?.value);
      setBackgroundColor({
        name: currentTarget.name,
        color: "cornflowerblue",
      });
    },
    [setScore]
  );

  return (
    <>
      <Box
        position={"absolute"}
        bottom={0}
        mb={4}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
      >
        {answersArrNames.map((button, index) => {
          return (
            <AnswerButton
              key={button.text}
              name={hints[index] || button.text}
              value={button.value}
              onClick={onClick}
              backgroundColor={backgroundColor}
            >
              {button.icon}
            </AnswerButton>
          );
        })}
      </Box>
    </>
  );
};
