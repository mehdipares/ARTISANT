import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArtisanList from "./pages/ArtisanList";
import ArtisanDetail from "./pages/ArtisanDetail";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/artisan/:id" element={<ArtisanDetail />} />
        <Route path="/artisans/:categorie" element={<ArtisanList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
  
}

export default App;