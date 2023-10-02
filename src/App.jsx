import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import TinyMce from "./components/TinyMce/TinyMce";
import { Toaster } from "react-hot-toast";
import TextEditor from "./components/TextEditor";
// import Practice from "./pages/Practice";

function App() {
  return (
    <>
      {/* <Practice /> */}
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
