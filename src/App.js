import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage/MainPage";
import { PreparePage } from "./components/PreparePage/PreparePage";
import { QuestionsPage } from "./components/QuestionsPage/QuestionsPage";
import { SummaryPage } from "./components/SummaryPage/SummaryPage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
export const CandidateContext = createContext(null);
function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [candidateId, setCandidateId] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
      <CandidateContext.Provider value={{ candidateId, setCandidateId }}>
        <Layout header={"Siren"}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/prepare" element={<PreparePage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </Layout>
      </CandidateContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
