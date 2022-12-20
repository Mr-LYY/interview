import "./App.css";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage/MainPage";
import { PreparePage } from "./components/PreparePage/PreparePage";
import { QuestionsPage } from "./components/QuestionsPage/QuestionsPage";
import { SummaryPage } from "./components/SummaryPage/SummaryPage";

function App() {
  return (
    <Layout header={"Siren"}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/prepare" element={<PreparePage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
