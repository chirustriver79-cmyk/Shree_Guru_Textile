import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import AllProductsPage from "./pages/AllProductsPage";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
=======
    <WishlistProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/"            element={<HomePage />} />
            <Route path="/products"    element={<AllProductsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/wishlist"    element={<WishlistPage />} />
            <Route path="/cart"        element={<CartPage />} />
            <Route path="/checkout"    element={<CheckoutPage />} />
            <Route path="/profile"     element={<ProfilePage />} />
          </Routes>
        </Router>
      </CartProvider>
    </WishlistProvider>
>>>>>>> ed94cfe8b2a6f3c4eb5abece76f00378ee368459
  );
}

export default App;
