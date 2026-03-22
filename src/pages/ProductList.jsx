import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

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
    if (category === "All") return products;
    return products.filter((p) => p.category === category);
  }, [products, category]);

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
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-3">All Products</h4>
            {category !== "All" && (
              <span className="badge bg-secondary">Category: {category}</span>
            )}
          </div>

          {visible.length === 0 && (
            <div className="alert alert-info">No products in this category.</div>
          )}

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
}