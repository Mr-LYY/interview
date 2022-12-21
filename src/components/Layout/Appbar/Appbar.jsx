import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Avatar, Drawer } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoginForm } from "../../LoginForm/LoginForm";
import { LogoutForm } from "../../LogoutForm/LogoutForm";
import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SirenLogo } from "../../SirenLogo";
import { AuthContext, InterviewerContext } from "../../../App";
import { makeCustomFetch } from "../../../utils";

export const Appbar = () => {
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
  const { interviewer, setInterviewer } = useContext(InterviewerContext);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setIsAuthorized(false);
    }
  }, [setIsAuthorized]);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isAuthorized) return;

    makeCustomFetch("self")
      .then((r) => r.ok && r.json())
      .then((data) => setInterviewer(data || null))
      .catch((e) => console.log(e));
  }, [isAuthorized]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer anchor={"right"} open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 400, padding: "8px 16px" }}>
          <Box
            display={"flex"}
            alignItems={"center"}
            borderBottom={"1px solid cornflowerblue"}
          >
            <Typography color={"cornflowerblue"} variant={"h6"} paddingLeft={2}>
              {isAuthorized ? "Personal info" : "Sign in"}
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ marginLeft: "auto" }}
            >
              <CloseIcon sx={{ fill: "cornflowerblue" }} />
            </IconButton>
          </Box>
          {isAuthorized ? <LogoutForm /> : <LoginForm />}
        </Box>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <NavLink to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Box display={"flex"} alignItems={"center"}>
              <SirenLogo />
            </Box>
          </NavLink>
          {isAuthorized ? (
            <Box
              style={{ cursor: "pointer", marginLeft: "auto" }}
              onClick={toggleDrawer}
              alignItems={"center"}
              display={"flex"}
            >
              <Box
                justifyContent={"end"}
                mr={1}
                display={"flex"}
                alignItems={"flex-end"}
                flexDirection={"column"}
              >
                <Typography>{interviewer?.name || "Interviewer"}</Typography>
                <Typography variant={"caption"}>
                  {interviewer?.email || ""}
                </Typography>
              </Box>
              <Avatar variant={"square"} src={interviewer?.photo || ""} />
            </Box>
          ) : (
            <Button
              style={{ marginLeft: "auto" }}
              onClick={toggleDrawer}
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
