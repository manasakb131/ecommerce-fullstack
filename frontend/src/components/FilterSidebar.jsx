export default function FilterSidebar({ setFilter }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-64 h-fit sticky top-5">

      <h2 className="text-lg font-bold mb-4">Filters</h2>

      <label className="block mb-2">Category</label>
      <select
        className="w-full border p-2 mb-4"
        onChange={(e) =>
          setFilter(prev => ({ ...prev, category: e.target.value }))
        }
      >
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
      </select>

      <label className="block mb-2">Max Price</label>
      <input
        type="number"
        placeholder="e.g. 1000"
        className="w-full border p-2"
        onChange={(e) =>
          setFilter(prev => ({ ...prev, price: e.target.value }))
        }
      />
    </div>
  );
}