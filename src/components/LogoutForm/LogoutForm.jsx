import React from "react";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BASE_URL, dispatchIsAuthorizedEvent } from "../../utils";
import { useNavigate } from "react-router-dom";

export const LogoutForm = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    fetch(`${BASE_URL}/api/tokens`, {
      method: "DELETE",
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      }),
    })
      .then((r) => {
        if (r.ok) {
          dispatchIsAuthorizedEvent(false);
          navigate("/");
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
