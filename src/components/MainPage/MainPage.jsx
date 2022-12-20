import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import Box from "@mui/material/Box";
import { AuthContext } from "../../App";
import { candidates } from "../../utils";
import { CandidateCard } from "../CandidateCard/CandidateCard";

export const MainPage = () => {
  const navigate = useNavigate();
  const [isChosen, setIsChosen] = useState({ id: null });
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);

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
  }, [setIsAuthorized]);

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
