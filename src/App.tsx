import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import RoomsPage from "./pages/RoomsPage";
import DiningPage from "./pages/DiningPage";
import GalleryPage from "./pages/GalleryPage";
import AttractionsPage from "./pages/AttractionsPage";
import BookingsPage from "./pages/BookingsPage";
import ContactPage from "./pages/ContactPage";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutUs" element={<AboutPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/nearByAttractions" element={<AttractionsPage />} />
          <Route path="/bookYourStay" element={<BookingsPage />} />
          <Route path="/contactUs" element={<ContactPage />} />
        </Routes>

      </Layout>
    </BrowserRouter>
  )
}

export default App;
