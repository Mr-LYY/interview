import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../PageLayout/PageLayout";
import { makeCustomFetch } from "../../utils";
import { AuthContext, CandidateContext } from "../../App";
import { BigChart } from "./charts/BigChart/BigChart";
import { WireChart } from "./charts/WireChart/WireChart";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";

export const SummaryPage = () => {
  const { setIsAuthorized } = useContext(AuthContext);
  const { candidateId } = useContext(CandidateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [allChartsData, setAllChartsData] = useState(null);
  const [summary, setSummary] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    makeCustomFetch(
      `candidates/${
        candidateId || sessionStorage.getItem("candidateId")
      }/summary`
    )
      .then((r) => {
        if (r.status === 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("candidateId");
          setIsAuthorized(false);
        }

        return r.ok && r.json();
      })
      .then((res) => {
        setAllChartsData(res?.scores);
        setSummary(res?.summary);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  const nextPageHandler = () => {
    navigate("/");
  };

  return (
    <PageLayout
      header={"Summary page"}
      buttonCallback={nextPageHandler}
      buttonText={"Finish interview"}
      isLoading={isLoading}
      error
    >
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <Typography variant={"h6"} align={"center"} mb={4}>
            Big overall chart
          </Typography>
          <BigChart data={allChartsData} />
        </SwiperSlide>
        <SwiperSlide style={{ overflow: "hidden" }}>
          <Typography variant={"h6"} align={"center"} mb={4}>
            Wire overall slice
          </Typography>
          <WireChart data={allChartsData} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            overflow: "hidden",
            minHeight: 400,
          }}
        >
          <Typography variant={"h6"} align={"center"} mb={4}>
            Candidate summary
          </Typography>
          <Typography maxWidth={800} margin={"16px auto"}>
            {summary}
          </Typography>
        </SwiperSlide>
      </Swiper>
    </PageLayout>
  );
};
