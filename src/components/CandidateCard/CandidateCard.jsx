import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";

export const CandidateCard = ({
  name,
  id,
  lastname,
  position,
  stack = [],
  isChosen,
  setIsChosen,
}) => {
  return (
    <Box
      id={id}
      onClick={setIsChosen}
      boxShadow={"0 0 5px 5px #6495ed12"}
      p={2}
      mr={2}
      mb={2}
      width={250}
      sx={{
        cursor: "pointer",
        transition: "all 1s ease",
        outline: +isChosen.id === id && "1px solid cornflowerblue",

        "&:hover": {
          boxShadow: "0 0 5px 5px #6495ed26",
        },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Avatar variant={"square"} sx={{ width: 80, height: 80, mb: 0.7 }} />
        <Box>
          <Typography fontWeight={700} align={"right"}>
            {name}
          </Typography>
          <Typography fontWeight={700} align={"right"}>
            {lastname}
          </Typography>
          <Typography variant={"caption"} align={"right"}>
            {position}
          </Typography>
        </Box>
      </Box>
      <Typography mt={1} fontWeight={700}>
        Stack:{" "}
      </Typography>
      {!!stack.length &&
        stack.map((item) => {
          return <Typography key={item}>{item}</Typography>;
        })}
    </Box>
  );
};
