import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";

const CandidateCard = ({
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
        outline: +isChosen.id === id && "1px solid cornflowerblue",
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

const candidates = [
  {
    id: 1,
    name: "Alexey",
    lastname: "Pavluchenko",
    position: "Fullstack developer",
    stack: ["NodeJS, JS, React"],
    experience: [],
  },
  {
    id: 2,
    name: "Sergey",
    lastname: "Karpin",
    position: "Backend developer",
    stack: ["NodeJS, C, C++, Java"],
    experience: [],
  },
  {
    id: 3,
    name: "Ivan",
    lastname: "Nikitin",
    position: "Backend developer",
    stack: ["NodeJS, C, C++, Java"],
    experience: [],
  },
  {
    id: 4,
    name: "Maria",
    lastname: "Alexandrova",
    position: "Backend developer",
    stack: ["NodeJS, C, C++, Java"],
    experience: [],
  },
  {
    id: 5,
    name: "Vadim",
    lastname: "Chernishev",
    position: "Backend developer",
    stack: ["NodeJS, C, C++, Java"],
    experience: [],
  },
];

export const MainPage = () => {
  const navigate = useNavigate();
  const [isChosen, setIsChosen] = useState({ id: null });
  const [isAuthorized, setIsAuthorized] = useState(false);

  const chooseHandler = ({ currentTarget }) => {
    setIsChosen({ id: currentTarget.id });
  };

  const nextPageHandler = () => {
    navigate("/prepare");
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <PageLayout
      header={"Dashboard"}
      buttonCallback={nextPageHandler}
      buttonText={"Prepare for interview"}
      disabled={!isAuthorized || !isChosen.id}
    >
      <Box display={"flex"} flexWrap={"wrap"}>
        {!!candidates?.length &&
          candidates.map((candidate) => {
            const { id, name, lastname, position, stack } = candidate;
            return (
              <CandidateCard
                key={id}
                id={id}
                name={name}
                isChosen={isChosen}
                setIsChosen={chooseHandler}
                lastname={lastname}
                position={position}
                stack={stack}
              />
            );
          })}
      </Box>
    </PageLayout>
  );
};
