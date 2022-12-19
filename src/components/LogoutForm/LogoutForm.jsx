import React from "react";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BASE_URL } from "../../utils";

export const LogoutForm = () => {
  const handleLogout = () => {
    fetch(`${BASE_URL}/api/tokens`, {
      method: "POST",
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      }),
    })
      .then((r) => r.ok && r.json())
      .then(({ data }) => {
        if (data?.token) {
          sessionStorage.setItem("token", data?.token);
        } else {
          throw new Error("No token!");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-end"}
      justifyContent={"space-between"}
      marginTop={4}
      p={2}
    >
      <Box
        width={"100%"}
        display={"flex"}
        alignItems={"flex-end"}
        justifyContent={"space-between"}
      >
        <Avatar variant={"square"} sx={{ width: 100, height: 100 }} src={""} />
        <Box>
          <Typography align={"right"}>SirenGroup</Typography>
          <Typography sx={{ lineHeight: 1 }} variant={"h4"}>
            Interviewer
          </Typography>
        </Box>
      </Box>
      <Button
        onClick={handleLogout}
        sx={{ mt: 2 }}
        variant={"outlined"}
        color={"error"}
      >
        Logout
      </Button>
    </Box>
  );
};
