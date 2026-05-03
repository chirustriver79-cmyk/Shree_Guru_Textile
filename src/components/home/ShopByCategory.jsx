import Card from "../Card";
import { shopCategories } from "../../data/mockData";
import "../css/home.css";

function ShopByCategory() {
  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__title">Shop By Category</h2>
        <p className="section__subtitle">Curated selections for every occasion</p>
        <div className="section__divider">
          <span className="section__divider-icon">✦</span>
        </div>
      </div>

      <div className="category-grid">
        {shopCategories.map((cat) => (
          <Card
            key={cat.id}
            title={cat.title}
            image={cat.image}
            link={cat.link}
          />
        ))}
      </div>
    </section>
  );
}

export default ShopByCategory;
