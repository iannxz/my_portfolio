import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "@/features/landing/LandingPage";
import NotFound from "@/pages/NotFound";
import { AppProviders } from "./providers";

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default App;
