import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AnswerButton = ({
  children,
  name,
  value,
  onClick,
  onMouseOver,
  onMouseLeave,
  backgroundColor,
}) => {
  return (
    <Button
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
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
  const [helperText, setHelperText] = useState("");
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

  const onMouseOver = useCallback(({ currentTarget }) => {
    setHelperText(currentTarget?.name);
  }, []);
  const onMouseLeave = useCallback(() => {
    setHelperText("");
  }, []);
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
              onMouseLeave={onMouseLeave}
              onMouseOver={onMouseOver}
            >
              {button.icon}
            </AnswerButton>
          );
        })}
      </Box>
      <Box ml={8} justifyContent={"center"} display={"flex"}>
        <Typography
          variant={"h6"}
          align={"center"}
          sx={{
            position: "absolute",
            display: "block",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            bottom: 10,
            width: 500,
            textAlign: "center",
            color: "#44444460",
          }}
        >
          {helperText}
        </Typography>
      </Box>
    </>
  );
};
