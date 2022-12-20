import React, { useCallback, useState } from "react";
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
    icon: (
      <SentimentVeryDissatisfiedRoundedIcon
        sx={{ width: 60, height: 60 }}
        color={"primary"}
      />
    ),
  },
  {
    text: "Bad",
    icon: (
      <SentimentDissatisfiedRoundedIcon
        sx={{ width: 60, height: 60 }}
        color={"primary"}
      />
    ),
  },
  {
    text: "Normal",
    icon: (
      <SentimentSatisfiedIcon
        sx={{ width: 60, height: 60 }}
        color={"primary"}
      />
    ),
  },
  {
    text: "Good",
    icon: (
      <SentimentSatisfiedAltRoundedIcon
        sx={{ width: 60, height: 60 }}
        color={"primary"}
      />
    ),
  },
  {
    text: "Perfect",
    icon: (
      <SentimentVerySatisfiedRoundedIcon
        sx={{ width: 60, height: 60 }}
        color={"primary"}
      />
    ),
  },
];

export const SmileAnswers = () => {
  const [helperText, setHelperText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const onMouseOver = useCallback(({ currentTarget }) => {
    setHelperText(currentTarget?.name);
  }, []);
  const onMouseLeave = useCallback(() => {
    setHelperText("");
  }, []);
  const onClick = useCallback(({ currentTarget }) => {
    setBackgroundColor({
      name: currentTarget.name,
      color: "cornflowerblue",
    });
  }, []);

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
        {answersArrNames.map((button) => {
          return (
            <AnswerButton
              key={button.text}
              name={button.text}
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
      <Typography
        variant={"h6"}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        {helperText}
      </Typography>
    </>
  );
};
