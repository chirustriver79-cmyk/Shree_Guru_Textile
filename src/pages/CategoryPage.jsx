import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../components/css/footer.css";

function CategoryPage({ category }) {
  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: "#f5f2ed", minHeight: "100vh" }}>
      <Header />

      {/* Breadcrumb */}
      <div
        style={{
          padding: "14px 60px",
          borderBottom: "1px solid #ece8e2",
          background: "#fff",
          fontSize: "12px",
          color: "#999",
          letterSpacing: "0.05em",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        <Link to="/" style={{ color: "#999", textDecoration: "none" }}>
          HOME
        </Link>
        <span style={{ margin: "0 10px" }}>›</span>
        <span style={{ color: "#2c1810", fontWeight: 500 }}>
          {category.toUpperCase()}
        </span>
      </div>

      {/* Page Hero */}
      <div
        style={{
          minHeight: "58vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "1px",
            background: "#c9a84c",
            margin: "0 auto 8px",
          }}
        />
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 500,
            color: "#1a1a1a",
            letterSpacing: "0.01em",
          }}
        >
          {category}
        </h1>
        <p style={{ color: "#999", fontSize: "14px", maxWidth: "400px", lineHeight: 1.7 }}>
          Our curated {category} collection will be available here once connected
          to your backend or database.
        </p>
        <Link
          to="/"
          style={{
            marginTop: "16px",
            display: "inline-block",
            padding: "13px 32px",
            background: "#2c1810",
            color: "#fff",
            textDecoration: "none",
            fontFamily: "'Jost', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#c9a84c")}
          onMouseLeave={(e) => (e.target.style.background = "#2c1810")}
        >
          ← BACK TO HOME
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default CategoryPage;
