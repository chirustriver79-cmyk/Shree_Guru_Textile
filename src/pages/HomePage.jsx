import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FilterPills from "../components/home/FilterPills";
import HeroSlider from "../components/home/HeroSlider";
import ShopByCategory from "../components/home/ShopByCategory";
import TrendingNow from "../components/home/TrendingNow";

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <FilterPills />
      <HeroSlider />
      <ShopByCategory />
      <TrendingNow />
      <Footer />
    </div>
  );
}

export default HomePage;
