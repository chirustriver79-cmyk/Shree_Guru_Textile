// src/App.jsx
// Simple state-based routing — no react-router-dom needed.
// If you already have react-router-dom installed, see the commented version at the bottom.

import { useState } from "react";
import HomePage     from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage  from "./pages/ProductPage";

export default function App() {
  // 'page' can be: "home" | "category" | "product"
  const [page, setPage] = useState("home");

  // Pass navigate down so child components can switch pages.
  // Usage in any child: props.navigate("product")  or  props.navigate("home")
  function navigate(destination) {
    setPage(destination);
    window.scrollTo(0, 0);
  }

  if (page === "product")  return <ProductPage  navigate={navigate} />;
  if (page === "category") return <CategoryPage navigate={navigate} />;
  return <HomePage navigate={navigate} />;
}


/* ─────────────────────────────────────────────────────────────────────────────
   ALTERNATIVE: If you have react-router-dom installed (run: npm install react-router-dom)
   replace the entire file above with this:

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage     from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage  from "./pages/ProductPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product"  element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
───────────────────────────────────────────────────────────────────────────── */
