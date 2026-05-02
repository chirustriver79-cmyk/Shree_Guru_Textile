// ─── Hero Slides ────────────────────────────────────────────
export const heroSlides = [
  {
    id: 1, badge: "FESTIVE COLLECTION '24",
    title: "The Art of", titleItalic: "Modern Heritage",
    description: "Elevate your wardrobe with our meticulously crafted fusion wear, blending traditional embroidery with contemporary silhouettes.",
    btnText: "EXPLORE COLLECTION", btnLink: "/products",
    bg: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80",
  },
  {
    id: 2, badge: "WEDDING SEASON '24",
    title: "Crafted for", titleItalic: "Your Big Day",
    description: "Discover our exclusive bridal and groom wear, where timeless tradition meets opulent craftsmanship.",
    btnText: "SHOP BRIDAL", btnLink: "/products?collection=bestsellers",
    bg: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&q=80",
  },
  {
    id: 3, badge: "NEW ARRIVALS",
    title: "Fusion", titleItalic: "Redefined",
    description: "Contemporary silhouettes, rooted in tradition. Explore our latest fusion collection for the modern Indian.",
    btnText: "EXPLORE FUSION", btnLink: "/products?collection=new",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
  },
];

// ─── Filter Pills (home page) ────────────────────────────────
export const filterPills = [
  { label: "All", value: "all", link: "/products" },
  { label: "Sarees", value: "sarees", link: "/products?gender=female&category=sarees" },
  { label: "Kurtas", value: "kurtas", link: "/products?gender=female&category=kurtas" },
  { label: "Lehengas", value: "lehengas", link: "/products?gender=female&category=lehengas" },
  { label: "Sherwanis", value: "sherwanis", link: "/products?gender=male&category=sherwanis" },
  { label: "Kurta Sets", value: "kurta-sets", link: "/products?gender=male&category=kurtas" },
  { label: "Jewellery", value: "jewellery", link: "/products?collection=accessories" },
  { label: "Footwear", value: "footwear", link: "/products?collection=accessories" },
];

// ─── Shop By Category (home page) ───────────────────────────
export const shopCategories = [
  { id: 1, title: "Sarees", link: "/products?gender=female&category=sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80" },
  { id: 2, title: "Men's Kurtas", link: "/products?gender=male&category=kurtas", image: "https://images.unsplash.com/photo-1594938298603-c8148c4b1e2e?w=800&q=80" },
  { id: 3, title: "Bridal", link: "/products?gender=female&category=lehengas&collection=bestsellers", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80" },
  { id: 4, title: "Fusion Wear", link: "/products?gender=female&category=dresses", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" },
];

// ─── Nav links ───────────────────────────────────────────────
export const navLinks = [
  { label: "HOME", path: "/" },
  { label: "WOMEN", path: "/products?gender=female" },
  { label: "MEN", path: "/products?gender=male" },
  { label: "KIDS", path: "/products?gender=kids" },
  { label: "WEDDING", path: "/products?collection=bestsellers" },
  { label: "FESTIVE", path: "/products?collection=new" },
  { label: "FUSION", path: "/products?gender=female&category=dresses" },
  { label: "ACCESSORIES", path: "/products?collection=accessories" },
];

// ─── Full Products Catalog ───────────────────────────────────
export const allProducts = [
  // Female / Sarees
  { id: 1, gender: "female", category: "sarees", collection: "bestsellers", fabric: "Kanjivaram", occasion: "Wedding", name: "Emerald Green Zari Woven Silk Saree", price: 8499, originalPrice: 10625, rating: 4.8, reviews: 214, badge: "20% OFF", badgeType: "off", sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80" },
  { id: 2, gender: "female", category: "sarees", collection: "new", fabric: "Organza", occasion: "Festive", name: "Pastel Floral Print Organza Saree", price: 5200, originalPrice: null, rating: 4.6, reviews: 98, badge: null, badgeType: null, sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80" },
  { id: 3, gender: "female", category: "sarees", collection: "new", fabric: "Chanderi", occasion: "Casual", name: "Ivory Chanderi Handwoven Saree", price: 3799, originalPrice: null, rating: 4.9, reviews: 310, badge: "NEW", badgeType: "new", sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=601&q=80" },
  { id: 4, gender: "female", category: "sarees", collection: "bestsellers", fabric: "Pure Silk", occasion: "Wedding", name: "Royal Banarasi Silk Saree", price: 12999, originalPrice: 16000, rating: 4.9, reviews: 412, badge: "BESTSELLER", badgeType: "new", sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { id: 5, gender: "female", category: "sarees", collection: null, fabric: "Cotton", occasion: "Casual", name: "Block Printed Cotton Saree", price: 1899, originalPrice: null, rating: 4.3, reviews: 187, badge: null, badgeType: null, sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=601&q=80" },
  { id: 6, gender: "female", category: "sarees", collection: "new", fabric: "Georgette", occasion: "Festive", name: "Embroidered Georgette Party Saree", price: 4599, originalPrice: 5999, rating: 4.5, reviews: 73, badge: "15% OFF", badgeType: "off", sizes: ["Free Size"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=602&q=80" },
  // Female / Lehengas
  { id: 7, gender: "female", category: "lehengas", collection: "bestsellers", fabric: "Velvet", occasion: "Wedding", name: "Maroon Heavy Embroidered Bridal Lehenga", price: 24999, originalPrice: 29410, rating: 5.0, reviews: 128, badge: "15% OFF", badgeType: "off", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=602&q=80" },
  { id: 8, gender: "female", category: "lehengas", collection: "new", fabric: "Georgette", occasion: "Festive", name: "Blush Pink Embroidered Semi-Stitched Lehenga", price: 14500, originalPrice: null, rating: 4.5, reviews: 201, badge: null, badgeType: null, sizes: ["XS","S","M","L"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=601&q=80" },
  { id: 9, gender: "female", category: "lehengas", collection: "bestsellers", fabric: "Pure Silk", occasion: "Wedding", name: "Royal Banarasi Silk Lehenga", price: 18999, originalPrice: 24999, rating: 4.9, reviews: 312, badge: "BESTSELLER", badgeType: "new", sizes: ["S","M","L"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=603&q=80" },
  { id: 10, gender: "female", category: "lehengas", collection: "new", fabric: "Net", occasion: "Party", name: "Baby Pink Net Floral Lehenga", price: 8200, originalPrice: null, rating: 4.4, reviews: 95, badge: "NEW", badgeType: "new", sizes: ["XS","S","M"], image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=603&q=80" },
  // Female / Kurtas & Suits
  { id: 11, gender: "female", category: "kurtas", collection: "new", fabric: "Cotton", occasion: "Casual", name: "Sage Green Anarkali Suit", price: 2899, originalPrice: null, rating: 4.6, reviews: 210, badge: null, badgeType: null, sizes: ["XS","S","M","L","XL"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=602&q=80" },
  { id: 12, gender: "female", category: "kurtas", collection: "bestsellers", fabric: "Georgette", occasion: "Festive", name: "Indigo Blue Block Printed Anarkali Suit", price: 3150, originalPrice: null, rating: 4.2, reviews: 143, badge: null, badgeType: null, sizes: ["S","M","L","XL","2XL"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=604&q=80" },
  { id: 13, gender: "female", category: "kurtas", collection: "new", fabric: "Silk Blend", occasion: "Festive", name: "Mustard Embroidered Kurta Set", price: 4299, originalPrice: null, rating: 4.9, reviews: 178, badge: "NEW", badgeType: "new", sizes: ["XS","S","M","L"], image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=604&q=80" },
  { id: 14, gender: "female", category: "kurtas", collection: null, fabric: "Linen", occasion: "Casual", name: "Festive Palazzo Set", price: 2499, originalPrice: null, rating: 4.4, reviews: 201, badge: null, badgeType: null, sizes: ["S","M","L","XL","2XL"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=603&q=80" },
  // Female / Dresses
  { id: 15, gender: "female", category: "dresses", collection: "new", fabric: "Crepe", occasion: "Party", name: "Black & Gold Foil Print Fusion Co-ord Set", price: 3899, originalPrice: null, rating: 4.4, reviews: 66, badge: null, badgeType: null, sizes: ["XS","S","M","L"], image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=605&q=80" },
  { id: 16, gender: "female", category: "dresses", collection: "bestsellers", fabric: "Silk Blend", occasion: "Wedding", name: "Burgundy Fusion Indo-Western Gown", price: 7200, originalPrice: 9000, rating: 4.7, reviews: 88, badge: "20% OFF", badgeType: "off", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=605&q=80" },
  // Male / Kurtas
  { id: 17, gender: "male", category: "kurtas", collection: "new", fabric: "Silk Blend", occasion: "Festive", name: "Mustard Yellow Embroidered Kurta Set", price: 4299, originalPrice: null, rating: 4.9, reviews: 178, badge: "NEW", badgeType: "new", sizes: ["S","M","L","XL","2XL"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4b1e2e?w=600&q=80" },
  { id: 18, gender: "male", category: "kurtas", collection: "bestsellers", fabric: "Cotton", occasion: "Casual", name: "Midnight Silk Kurta Set", price: 4999, originalPrice: 7999, rating: 4.8, reviews: 124, badge: "BESTSELLER", badgeType: "new", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=600&q=80" },
  { id: 19, gender: "male", category: "kurtas", collection: "new", fabric: "Linen", occasion: "Casual", name: "Earthy Linen Nehru Collar Kurta", price: 2199, originalPrice: null, rating: 4.3, reviews: 89, badge: "NEW", badgeType: "new", sizes: ["M","L","XL","2XL"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4b1e2e?w=601&q=80" },
  { id: 20, gender: "male", category: "kurtas", collection: null, fabric: "Chanderi", occasion: "Festive", name: "Teal Chanderi Straight Kurta", price: 3499, originalPrice: null, rating: 4.5, reviews: 142, badge: null, badgeType: null, sizes: ["S","M","L","XL","2XL"], image: "https://images.unsplash.com/photo-1517677208171-0bc6132b3898?w=600&q=80" },
  // Male / Sherwanis
  { id: 21, gender: "male", category: "sherwanis", collection: "bestsellers", fabric: "Raw Silk", occasion: "Wedding", name: "Ivory White Embroidered Sherwani Set", price: 18500, originalPrice: null, rating: 4.7, reviews: 215, badge: null, badgeType: null, sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1517677208171-0bc6132b3898?w=601&q=80" },
  { id: 22, gender: "male", category: "sherwanis", collection: "bestsellers", fabric: "Brocade", occasion: "Wedding", name: "Classic Cream Brocade Sherwani", price: 12499, originalPrice: 15999, rating: 4.8, reviews: 98, badge: "20% OFF", badgeType: "off", sizes: ["M","L","XL"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4b1e2e?w=602&q=80" },
  { id: 23, gender: "male", category: "sherwanis", collection: "new", fabric: "Velvet", occasion: "Wedding", name: "Royal Navy Velvet Sherwani", price: 21000, originalPrice: 26000, rating: 4.9, reviews: 67, badge: "NEW", badgeType: "new", sizes: ["S","M","L","XL"], image: "https://images.unsplash.com/photo-1517677208171-0bc6132b3898?w=602&q=80" },
  // Male / Suits
  { id: 24, gender: "male", category: "suits", collection: "new", fabric: "Linen", occasion: "Casual", name: "Printed Bandi Jacket Linen Set", price: 5299, originalPrice: null, rating: 4.7, reviews: 54, badge: null, badgeType: null, sizes: ["M","L","XL","2XL"], image: "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=601&q=80" },
  // Kids
  { id: 25, gender: "kids", category: "kurtas", collection: "new", fabric: "Cotton", occasion: "Festive", name: "Kids Festive Kurta Pyjama Set", price: 1299, originalPrice: null, rating: 4.6, reviews: 134, badge: "NEW", badgeType: "new", sizes: ["2-3Y","4-5Y","6-7Y","8-9Y"], image: "https://images.unsplash.com/photo-1594938298603-c8148c4b1e2e?w=603&q=80" },
  { id: 26, gender: "kids", category: "lehengas", collection: "bestsellers", fabric: "Silk", occasion: "Wedding", name: "Kids Silk Lehenga Choli Set", price: 1799, originalPrice: 2299, rating: 4.8, reviews: 88, badge: "BESTSELLER", badgeType: "new", sizes: ["2-3Y","4-5Y","6-7Y"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=604&q=80" },
];

// ─── Trending Now (for home page) ────────────────────────────
export const trendingProducts = allProducts.slice(0, 8).map((p) => ({
  ...p,
  liked: p.id === 2,
  link: `/product/${p.id}`,
}));
