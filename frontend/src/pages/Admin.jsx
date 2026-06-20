import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          form
        );
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5000/api/products", form);
      }

      setForm({ name: "", price: "", category: "", image: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image,
    });
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-10">
      <h1 className="text-3xl font-bold text-white mb-8">
        Admin Dashboard
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mb-10">
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 
             bg-white text-black placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 
             bg-white text-black placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 
             bg-white text-black placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none"
          />

          {/* ✅ IMAGE FIELD */}
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 
             bg-white text-black placeholder-gray-500
             focus:outline-none focus:ring-2 focus:ring-blue-500
             appearance-none"
          />

          <button className="w-full bg-black text-white py-3 rounded">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* PRODUCTS */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow-lg p-4">

            {/* ✅ IMAGE DISPLAY */}
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-green-600 font-semibold">₹ {p.price}</p>
            <p className="text-gray-600">{p.category}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;