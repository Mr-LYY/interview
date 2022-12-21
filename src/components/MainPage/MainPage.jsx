import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import Box from "@mui/material/Box";
import { AuthContext, CandidateContext } from "../../App";
import { CandidateCard } from "../CandidateCard/CandidateCard";
import { makeCustomFetch } from "../../utils";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";

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
          sessionStorage.removeItem("candidateId");
          setIsAuthorized(false);
        }

        return r.ok && r.json();
      })
      .then(({ data }) => setCandidates(data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [isAuthorized]);

  return (
    <PageLayout
      header={"Dashboard"}
      buttonCallback={nextPageHandler}
      buttonText={"Prepare for interview"}
      isLoading={isLoading}
      disabled={!isAuthorized || !candidateId}
    >
      <Box display={"flex"} flexWrap={"wrap"}>
        {!!candidates?.length && isAuthorized ? (
          candidates.map((candidate) => {
            const { id, name, position, stack, photo } = candidate;

            return (
              <CandidateCard
                key={id}
                id={id}
                photo={photo}
                name={name}
                position={position}
                stack={stack}
              />
            );
          })
        ) : (
          <Box
            width={"100%"}
            height={400}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ opacity: 0.3 }}
          >
            <LockIcon sx={{ width: 150, height: 150 }} color={"primary"} />
            <Typography color={"primary"} variant={"h5"}>
              You have to sign in
            </Typography>
          </Box>
        )}
      </Box>
    </PageLayout>
  );
};
