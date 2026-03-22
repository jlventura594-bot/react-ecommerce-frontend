import { useEffect, useState } from "react";

export default function Sidebar({ onSelect, active }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://react-ecommerce-qxa5.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data
              .map((c) => (typeof c === "string" ? c : c?.name))
              .filter(Boolean)
          : [];
        setCategories(normalized);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Categories are unavailable right now.");
      });
  }, []);

  const liClass = (cat) =>
    `list-group-item d-flex justify-content-between align-items-center ${
      active === cat ? "active" : ""
    }`;

  return (
    <div className="card">
      <div className="card-header fw-semibold">Categories</div>

      <ul className="list-group list-group-flush">
        {error && <li className="list-group-item text-danger">{error}</li>}

        {!error && (
          <li
            className={liClass("All")}
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => onSelect?.("All")}
          >
            All
          </li>
        )}

        {!error &&
          categories.map((c) => (
            <li
              key={c}
              className={liClass(c)}
              role="button"
              style={{ cursor: "pointer" }}
              onClick={() => onSelect?.(c)}
            >
              {c}
            </li>
          ))}
      </ul>
    </div>
  );
}