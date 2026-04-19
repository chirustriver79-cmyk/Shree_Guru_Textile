// Mock hero slides data
export const heroSlides = [
  {
    id: 1,
    badge: "FESTIVE COLLECTION '24",
    title: "The Art of",
    titleItalic: "Modern Heritage",
    description:
      "Elevate your wardrobe with our meticulously crafted fusion wear, blending traditional embroidery with contemporary silhouettes.",
    btnText: "EXPLORE COLLECTION",
    btnLink: "/festive",
    bg: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=80",
  },
  {
    id: 2,
    badge: "WEDDING SEASON '24",
    title: "Crafted for",
    titleItalic: "Your Big Day",
    description:
      "Discover our exclusive bridal and groom wear, where timeless tradition meets opulent craftsmanship.",
    btnText: "SHOP BRIDAL",
    btnLink: "/bridal",
    bg: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&q=80",
  },
  {
    id: 3,
    badge: "NEW ARRIVALS",
    title: "Fusion",
    titleItalic: "Redefined",
    description:
      "Contemporary silhouettes, rooted in tradition. Explore our latest fusion collection for the modern Indian.",
    btnText: "EXPLORE FUSION",
    btnLink: "/fusion-wear",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
  },
];

// Category filter pills
export const filterPills = [
  { label: "All", value: "all" },
  { label: "Sarees", value: "sarees", link: "/sarees" },
  { label: "Kurtas", value: "kurtas", link: "/mens-kurtas" },
  { label: "Lehengas", value: "lehengas", link: "/lehengas" },
  { label: "Sherwanis", value: "sherwanis", link: "/sherwanis" },
  { label: "Kurta Sets", value: "kurta-sets", link: "/kurta-sets" },
  { label: "Jewellery", value: "jewellery", link: "/jewellery" },
  { label: "Footwear", value: "footwear", link: "/footwear" },
];

// Shop By Category data
export const shopCategories = [
  {
    id: 1,
    title: "Sarees",
    link: "/sarees",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
  },
  {
    id: 2,
    title: "Men's Kurtas",
    link: "/mens-kurtas",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b1e2e?w=800&q=80",
  },
  {
    id: 3,
    title: "Bridal",
    link: "/bridal",
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=80",
  },
  {
    id: 4,
    title: "Fusion Wear",
    link: "/fusion-wear",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

// Trending Now products
export const trendingProducts = [
  {
    id: 1,
    name: "Midnight Silk Kurta Set",
    description: "Premium raw silk with zari work",
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    reviews: 124,
    badge: "NEW",
    badgeType: "new",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=600&q=80",
    link: "/mens-kurtas",
  },
  {
    id: 2,
    name: "Ivory Chanderi Saree",
    description: "Handwoven pure chanderi",
    price: 8499,
    originalPrice: null,
    rating: 4.9,
    reviews: 86,
    badge: null,
    badgeType: null,
    liked: true,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    link: "/sarees",
  },
  {
    id: 3,
    name: "Sage Green Anarkali",
    description: "Georgette with thread embroidery",
    price: 6399,
    originalPrice: 7999,
    rating: 4.6,
    reviews: 210,
    badge: "20% OFF",
    badgeType: "off",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    link: "/women",
  },
  {
    id: 4,
    name: "Printed Bandi Jacket Set",
    description: "Linen blend with floral motifs",
    price: 5299,
    originalPrice: null,
    rating: 4.7,
    reviews: 54,
    badge: null,
    badgeType: null,
    liked: false,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b1e2e?w=600&q=80",
    link: "/men",
  },
  {
    id: 5,
    name: "Royal Banarasi Lehenga",
    description: "Pure silk with zardozi embroidery",
    price: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviews: 312,
    badge: "BESTSELLER",
    badgeType: "new",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    link: "/lehengas",
  },
  {
    id: 6,
    name: "Classic Cream Sherwani",
    description: "Brocade with intricate threadwork",
    price: 12499,
    originalPrice: 15999,
    rating: 4.8,
    reviews: 98,
    badge: "20% OFF",
    badgeType: "off",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1517677208171-0bc6132b3898?w=600&q=80",
    link: "/sherwanis",
  },
  {
    id: 7,
    name: "Embroidered Kota Saree",
    description: "Lightweight kota with mirror work",
    price: 3799,
    originalPrice: null,
    rating: 4.5,
    reviews: 173,
    badge: "NEW",
    badgeType: "new",
    liked: false,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    link: "/sarees",
  },
  {
    id: 8,
    name: "Festive Palazzo Set",
    description: "Cotton blend with block print",
    price: 2899,
    originalPrice: null,
    rating: 4.4,
    reviews: 201,
    badge: null,
    badgeType: null,
    liked: false,
    image:
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    link: "/women",
  },
];

// Nav links
export const navLinks = [
  { label: "HOME", path: "/" },
  { label: "WOMEN", path: "/women" },
  { label: "MEN", path: "/men" },
  { label: "KIDS", path: "/kids" },
  { label: "WEDDING", path: "/wedding" },
  { label: "FESTIVE", path: "/festive" },
  { label: "FUSION", path: "/fusion-wear" },
  { label: "ACCESSORIES", path: "/accessories" },
];
