import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { CandidateContext } from "../../App";

export const CandidateCard = ({
  name,
  photo = "",
  id,
  stack,
  isInterviewed = false,
  position: { name: position },
}) => {
  const { candidateId, setCandidateId } = useContext(CandidateContext);
  const chooseCandidate = ({ currentTarget }) => {
    if (currentTarget.id) {
      setCandidateId(currentTarget.id);
    }
  };

  return (
    <Box
      onClick={chooseCandidate}
      id={id}
      p={2}
      mr={2}
      mb={2}
      width={250}
      sx={{
        cursor: "pointer",
        transition: "all 1s ease",
        outline: +candidateId === id && "1px solid cornflowerblue",
        boxShadow: "0 0 5px 5px #6495ed10",

        "&:hover": {
          boxShadow: "0 0 5px 5px #6495ed36",
        },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Avatar
          src={photo}
          variant={"square"}
          sx={{ width: 80, height: 80, mb: 0.7 }}
        />
        <Box>
          <Typography fontWeight={700} align={"right"}>
            {name.split(" ")[0]}
          </Typography>
          <Typography fontWeight={700} align={"right"}>
            {name.split(" ")[1]}
          </Typography>
          <Typography variant={"caption"} align={"right"}>
            {position}
          </Typography>
        </Box>
      </Box>
      <Typography mt={1}>
        <b>Stack</b>: {stack}
      </Typography>
    </Box>
  );
};
