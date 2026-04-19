import { useState } from "react";
import { Link } from "react-router-dom";
import { filterPills } from "../../data/mockData";
import "../css/home.css";

function FilterPills() {
  const [active, setActive] = useState("all");

  return (
    <div className="filter-pills">
      {filterPills.map((pill) =>
        pill.value === "all" ? (
          <button
            key={pill.value}
            className={`filter-pill${active === pill.value ? " active" : ""}`}
            onClick={() => setActive(pill.value)}
          >
            {pill.label}
          </button>
        ) : (
          <Link
            key={pill.value}
            to={pill.link}
            className={`filter-pill${active === pill.value ? " active" : ""}`}
            onClick={() => setActive(pill.value)}
          >
            {pill.label}
          </Link>
        )
      )}
    </div>
  );
}

export default FilterPills;
