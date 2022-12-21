import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BASE_URL, makeCustomFetch } from "../../utils";
import { AuthContext } from "../../App";

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm();
  const { setIsAuthorized } = useContext(AuthContext);

  const resetHandler = () => {
    resetField("email");
    resetField("password");
  };

  const onSubmitHandler = (data) => {
    fetch(`${BASE_URL}/api/tokens`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      }),
    })
      .then((r) => r.ok && r.json())
      .then(({ data }) => {
        if (data?.token) {
          sessionStorage.setItem("token", data?.token);
          setIsAuthorized(true);
        } else {
          throw new Error("No token!");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box sx={{ marginTop: 4, p: 2 }}>
      <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <Controller
          defaultValue="interviewer@sirenltd.com"
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mt: 2 }}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              variant="outlined"
              label="Email"
              fullWidth
            />
          )}
          name="email"
          control={control}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
        />
        <Controller
          defaultValue="interviewer"
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ mt: 2 }}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              variant="outlined"
              label="Password"
              type="password"
              fullWidth
            />
          )}
          name="password"
          control={control}
          rules={{
            required: { value: true, message: "This field is required" },
          }}
        />
        <Box sx={{ mt: 4 }} display={"flex"} justifyContent={"space-between"}>
          <Button variant="outlined" onClick={resetHandler}>
            reset
          </Button>
          <Button variant="contained" type="submit">
            submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
