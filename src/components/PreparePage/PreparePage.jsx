import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import { makeCustomFetch } from "../../utils";
import Box from "@mui/material/Box";
import { Card } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Pagination } from "swiper";
import { AuthContext, CandidateContext } from "../../App";

export const PreparePage = () => {
  const { setIsAuthorized } = useContext(AuthContext);
  const { candidateId } = useContext(CandidateContext);
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    makeCustomFetch(`candidates/${candidateId}/topics`)
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("token");
          setIsAuthorized(false);
        }

        return r.ok && r.json();
      })
      .then((res) => {
        setDescription(res.description);
        setTopics(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, [setIsAuthorized]);

  const nextPageHandler = () => {
    navigate("/questions");
  };

  return (
    <PageLayout
      header={"What is the interview going to be about"}
      buttonCallback={nextPageHandler}
      buttonText={"Start interview"}
      isLoading={isLoading}
    >
      <Box
        sx={{ cursor: "grab", userSelect: "none" }}
        overflow={"hidden"}
        position={"relative"}
        height={200}
      >
        <Swiper
          slidesPerView={4}
          spaceBetween={200}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {!!topics?.length &&
            topics.map((topic) => {
              const { id, description, name, questions } = topic;
              return (
                <SwiperSlide key={id} style={{ padding: 4 }}>
                  <Card
                    sx={{
                      p: 2,
                      width: 280,
                      height: 150,
                      mr: 1,
                      boxShadow: "0 0 5px 5px #6495ed12",
                    }}
                  >
                    <Typography fontWeight={700} color={"cornflowerblue"}>
                      {name}
                    </Typography>
                    <Typography sx={{ opacity: 0.5 }}>
                      Quantity of questions: {questions}
                    </Typography>
                    <Typography
                      height={100}
                      overflow={"hidden"}
                      width={"100%"}
                      pt={1}
                    >
                      {description}
                    </Typography>
                  </Card>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>
      <Typography color={"cornflowerblue"} mt={4} mb={1} fontWeight={700}>
        Common description:
      </Typography>
      <Typography>{description}</Typography>
    </PageLayout>
  );
};
