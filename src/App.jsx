import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CgpaCalculator from './pages/CgpaCalculator';
import InternalMarks2Year from './pages/InternalMarks2Year';
import InternalMarks3Year from './pages/InternalMarks3Year';
import useDevToolsBlocker from "./hooks/useDevToolsBlocker";
import usePageTracking from "./hooks/usePageTracking";
import ScrollToTop from "./ScrollToTop";

function App() {
  useDevToolsBlocker();
  usePageTracking();

  return (
    <>
      <ScrollToTop />   {/* ← Yeh Routes ke bahar hona chahiye */}
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="cgpa" element={<CgpaCalculator />} />
          <Route path="internal-2y" element={<InternalMarks2Year />} />
          <Route path="internal-3y" element={<InternalMarks3Year />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
