import "./index.css";
import Header from "./Components/Header";
import Frontpage from "./Components/Frontpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import MapTest from "./Components/FrontpageMap";
import Agentpanel from "./Pages/Agentpanel";
import CasePage from "./Components/CasePage";
import TestingPurposes from "./Components/TestingPurposes";
import CreateCase from "./Components/CreateCase";
import { ToastContainer } from "react-toastify";
import HelpPage from "./Components/helpPage";
import SearchPage from "./Components/searchPage";
import EditCase from "./Components/EditCase";
import Dashboard from "./Components/Dashboard";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/addcase" element={<CreateCase />} />
          <Route path="/editcase/:id" element={<EditCase />} />
          <Route path="/case/:id" element={<CasePage />} />
          <Route path="/agentpanel" element={<Agentpanel />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Frontpage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
