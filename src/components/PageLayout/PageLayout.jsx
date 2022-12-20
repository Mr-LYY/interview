import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

export const PageLayout = ({
  header,
  children,
  buttonCallback = () => false,
  buttonText = "Next",
  isLoading = false,
  disabled = false,
  error = false,
}) => {
  return (
    <>
      <Typography color={"cornflowerblue"} mt={10} mb={1} variant={"h4"}>
        {header}
      </Typography>
      <Box
        p={4}
        position={"relative"}
        sx={{ backgroundColor: "white", overflow: "hidden" }}
        boxShadow={"0 0 5px 5px #9eb6ff12"}
        borderRadius={2}
        height={"50vh"}
      >
        {isLoading ? (
          <Box
            sx={{ display: "flex" }}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <CircularProgress size={80} />
          </Box>
        ) : (
          children
        )}
      </Box>
      <Button
        size={"large"}
        sx={{ display: "block", mt: 3, ml: "auto" }}
        variant={"contained"}
        onClick={buttonCallback}
        color={error ? "error" : "primary"}
        disabled={disabled}
      >
        {buttonText}
      </Button>
    </>
  );
};
