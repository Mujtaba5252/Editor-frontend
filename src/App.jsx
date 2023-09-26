import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import TinyMce from "./components/TinyMce/TinyMce";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/documents/:id" element={<TinyMce />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
