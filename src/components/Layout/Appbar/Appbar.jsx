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
import { AuthContext } from "../../../App";

export const Appbar = () => {
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Drawer anchor={"right"} open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 400, padding: "8px 16px" }}>
          <Box display={"flex"} alignItems={"center"}>
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
              <CloseIcon />
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
              <Typography mr={1}>Interviewer</Typography>
              <Avatar src={""} />
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