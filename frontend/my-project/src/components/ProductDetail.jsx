import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/products/";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`${API}${id}/`)
      .then(r => {
        if (!r.ok) throw new Error("Failed to fetch product");
        return r.json();
      })
      .then(data => { setProduct(data); setLoading(false); })
      .catch(e => { setErr(e.message); setLoading(false); });
  }, [id]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-500">Error: {err}</div>;

  return (
    <div className="p-6 bg-white rounded shadow mt-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-500 mb-2">{product.description || "No description"}</p>
      <p className="font-bold mb-1">Price: ৳ {product.price}</p>
      <p className="text-sm text-gray-500 mb-4">Stock: {product.stock}</p>
      <div className="flex gap-2">
        <Link to={`/products/${id}/edit`} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</Link>
        <Link to="/products" className="px-3 py-1 bg-indigo-600 text-white rounded">Back to Products</Link>
      </div>
    </div>
  );
}
