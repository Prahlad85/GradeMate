import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CgpaCalculator from "./pages/CgpaCalculator";
import InternalMarks2Year from "./pages/InternalMarks2Year";
import InternalMarks1Year from "./pages/InternalMarks1Year";
import InternalMarks3Year from "./pages/InternalMarks3Year";
import AptitudeCalculator from "./pages/AptitudeCalculator";
import useDevToolsBlocker from "./hooks/useDevToolsBlocker";
import usePageTracking from "./hooks/usePageTracking";
import ScrollToTop from "./ScrollToTop";
import LinkedInPopup from "./components/LinkedInPopup";

function App() {
  useDevToolsBlocker();
  usePageTracking();

  return (
    <>
      {/* LinkedIn Popup */}
      <LinkedInPopup />

      {/* Scroll Top */}
      <ScrollToTop />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cgpa" element={<CgpaCalculator />} />
          <Route path="internal-1y" element={<InternalMarks1Year />} />
          <Route path="internal-2y" element={<InternalMarks2Year />} />
          <Route path="internal-3y" element={<InternalMarks3Year />} />
          <Route path="aptitude" element={<AptitudeCalculator />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;