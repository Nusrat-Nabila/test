import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = "http://127.0.0.1:8000/api/products/";

export default function ProductForm({ editMode }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editMode && id) {
      fetch(`${API}${id}/`)
        .then(r => r.json())
        .then(data => {
          setName(data.name);
          setDescription(data.description || "");
          setPrice(data.price);
          setStock(data.stock);
        })
        .catch(e => setError(e.message));
    }
  }, [editMode, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const data = { name, description, price, stock };
    const url = editMode ? `${API}${id}/` : API;
    const method = editMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert(editMode ? "Product updated!" : "Product created!");
        navigate("/products");
      } else {
        const errorData = await res.json();
        setError(JSON.stringify(errorData));
      }
    } catch (e) {
      setError("Network error: " + e.message);
    }
  }

  return (
    <div className="p-6 bg-white rounded shadow mt-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">{editMode ? "Edit Product" : "Create Product"}</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border rounded px-2 py-1" required />
        </div>
        <div>
          <label className="block">Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block">Price</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full border rounded px-2 py-1" required />
        </div>
        <div>
          <label className="block">Stock</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="w-full border rounded px-2 py-1" required />
        </div>

        <div className="flex gap-2 mt-2">
          <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">{editMode ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}
