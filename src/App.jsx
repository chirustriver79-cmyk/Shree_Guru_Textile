import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <WishlistProvider>
      <Router>
        <Routes>
          <Route path="/"            element={<HomePage />} />
          <Route path="/products"    element={<AllProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/wishlist"    element={<WishlistPage />} />
          <Route path="/profile"     element={<ProfilePage />} />
        </Routes>
      </Router>
    </WishlistProvider>
  );
}

export default App;
