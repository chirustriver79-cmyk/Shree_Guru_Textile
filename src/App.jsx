import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sarees" element={<CategoryPage category="Sarees" />} />
        <Route path="/mens-kurtas" element={<CategoryPage category="Men's Kurtas" />} />
        <Route path="/bridal" element={<CategoryPage category="Bridal" />} />
        <Route path="/fusion-wear" element={<CategoryPage category="Fusion Wear" />} />
        <Route path="/lehengas" element={<CategoryPage category="Lehengas" />} />
        <Route path="/sherwanis" element={<CategoryPage category="Sherwanis" />} />
        <Route path="/kurta-sets" element={<CategoryPage category="Kurta Sets" />} />
        <Route path="/jewellery" element={<CategoryPage category="Jewellery" />} />
        <Route path="/footwear" element={<CategoryPage category="Footwear" />} />
        <Route path="/women" element={<CategoryPage category="Women" />} />
        <Route path="/men" element={<CategoryPage category="Men" />} />
        <Route path="/kids" element={<CategoryPage category="Kids" />} />
        <Route path="/wedding" element={<CategoryPage category="Wedding" />} />
        <Route path="/festive" element={<CategoryPage category="Festive" />} />
        <Route path="/accessories" element={<CategoryPage category="Accessories" />} />
      </Routes>
    </Router>
  );
}

export default App;
