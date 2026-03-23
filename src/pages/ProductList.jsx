import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import Sidebar from "../components/Sidebar.jsx";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All"); // category filter
  const [search, setSearch] = useState(""); // search text
  const [sortBy, setSortBy] = useState(""); // sorting option

  useEffect(() => {
    fetch("https://react-ecommerce-qxa5.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((item) => ({
          ...item,
          oldPrice:
            item.oldPrice !== undefined
              ? item.oldPrice
              : Number(item.price) * 1.25,
        }));
        setProducts(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const visible = useMemo(() => {
    let filtered = category === "All"
      ? products
      : products.filter(
          (p) =>
            (p.category ?? "")
              .trim()
              .toLowerCase() === category.trim().toLowerCase()
        );

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "rating-desc") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [products, category, search, sortBy]);

  if (loading) {
    return (
      <div className="container py-4">
        <h5>Loading products...</h5>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Sidebar */}
        <aside className="col-12 col-md-3">
          <Sidebar onSelect={setCategory} active={category} />
        </aside>

        {/* Products */}
        <section className="col-12 col-md-9">

          {/* Search + Sorting UI */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-2">
            {/* Title (left) */}
            <h4 className="mb-0">All Products</h4>

            {/* Search Bar (center-left) */}
            <input
              type="text"
              className="form-control w-100 w-md-50"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Sorting Dropdown (right on desktop) */}
            <select
              className="form-select w-100 w-md-25"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort by...</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>

          {/* Category Label */}
          {category !== "All" && (
            <span className="badge bg-secondary mb-2">Category: {category}</span>
          )}

          {/* Empty state */}
          {visible.length === 0 && (
            <div className="alert alert-info">No products found.</div>
          )}

          {/* Product Grid */}
          <div className="row g-3">
            {visible.map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-lg-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductList;