import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/products/";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(e => { setErr(e.message); setLoading(false); });
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`${API}${id}/`, { method: "DELETE" });
    if (res.status === 204) {
      setProducts(products.filter(p => p.id !== id));
      alert("Product deleted!");
    } else {
      alert("Delete failed");
    }
  }

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-500">Error: {err}</div>;

  return (
    <div className="space-y-4 mt-4">
      {products.length === 0 && <div className="p-4 bg-white rounded shadow">
        No products yet. <Link className="text-indigo-600" to="/products/new">Create one</Link>.
      </div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.description || "—"}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">৳ {p.price}</div>
                <div className="text-sm text-gray-500">Stock: {p.stock}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Link to={`/products/${p.id}`} className="px-3 py-1 border rounded text-sm">View</Link>
              <Link to={`/products/${p.id}/edit`} className="px-3 py-1 border rounded text-sm">Edit</Link>
              <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
