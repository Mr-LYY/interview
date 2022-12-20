import React, { memo, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Timer = memo(({ totalTime }) => {
  const [time, setTime] = useState(totalTime);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return totalTime ? (
    <Box position={"absolute"} bottom={48}>
      <Typography color={time < 60 ? "red" : "black"} variant={"h6"}>
        Time left: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
        {`${time % 60}`.padStart(2, 0)}
      </Typography>
    </Box>
  ) : null;
});
