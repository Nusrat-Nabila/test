import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductDetail from "./components/ProductDetail";

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-5xl mx-auto p-4">
        {/* Header */}
        <header className="flex items-center justify-between py-6">
          <h1 className="text-2xl font-bold">DawnProducts • Product API UI</h1>
          <nav className="flex gap-3">
            <Link to="/" className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition">Home</Link>
            <Link to="/products" className="px-3 py-1 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition">Products</Link>
            <Link to="/products/new" className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition">Add Product</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id/edit" element={<ProductForm editMode={true} />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// Home Page
function Home() {
  return (
    <div className="p-6 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-semibold">Welcome to Product API UI</h2>
      <p className="mt-2 text-gray-600">
        Create, view, edit, and delete products backed by your Django API.
      </p>
    </div>
  );
}
