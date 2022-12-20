import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import Box from "@mui/material/Box";
import { AuthContext } from "../../App";
import { candidates, makeCustomFetch } from "../../utils";
import { CandidateCard } from "../CandidateCard/CandidateCard";

export const MainPage = () => {
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
  const [isChosen, setIsChosen] = useState({ id: null });

  const chooseHandler = ({ currentTarget }) => {
    setIsChosen({ id: currentTarget.id });
  };

  const nextPageHandler = () => {
    navigate("/prepare");
  };

  useEffect(() => {
    makeCustomFetch("candidates")
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("token");
          setIsAuthorized(false);
        }

        return r.ok && r.json();
      })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
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
