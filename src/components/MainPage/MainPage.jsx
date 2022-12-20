import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import Box from "@mui/material/Box";
import { AuthContext, CandidateContext } from "../../App";
import { CandidateCard } from "../CandidateCard/CandidateCard";
import { makeCustomFetch } from "../../utils";

export const MainPage = () => {
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
  const { candidateId } = useContext(CandidateContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState([]);

  const nextPageHandler = () => {
    navigate("/prepare");
  };

  useEffect(() => {
    setIsLoading(true);
    makeCustomFetch("candidates")
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("token");
          setIsAuthorized(false);
        }

        return r.ok && r.json();
      })
      .then(({ data }) => setCandidates(data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <PageLayout
      header={"Dashboard"}
      buttonCallback={nextPageHandler}
      buttonText={"Prepare for interview"}
      isLoading={isLoading}
      disabled={!isAuthorized || !candidateId}
    >
      <Box display={"flex"} flexWrap={"wrap"}>
        {!!candidates?.length &&
          candidates.map((candidate) => {
            const { id, name, position, stack } = candidate;

            return (
              <CandidateCard
                key={id}
                id={id}
                name={name}
                position={position}
                stack={stack}
              />
            );
          })}
      </Box>
    </PageLayout>
  );
};
