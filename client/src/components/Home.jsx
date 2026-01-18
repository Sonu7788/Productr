import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = ({ setTab }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const togglePublish = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        published: !status
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter(p => {
    if (filter === 'all') return true;
    return filter === 'published' ? p.published : !p.published;
  });

  if (!loading && products.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-bold mb-3">No Products Found</h3>
        <button
          onClick={() => setTab('add-product')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Add Product
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2 bg-white p-1 rounded-lg border">
          <button onClick={() => setFilter('all')} className={`px-4 py-1.5 rounded-md text-sm ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}>All</button>
          <button onClick={() => setFilter('published')} className={`px-4 py-1.5 rounded-md text-sm ${filter === 'published' ? 'bg-green-100 text-green-700' : 'text-gray-600'}`}>Published</button>
          <button onClick={() => setFilter('unpublished')} className={`px-4 py-1.5 rounded-md text-sm ${filter === 'unpublished' ? 'bg-red-100 text-red-700' : 'text-gray-600'}`}>Unpublished</button>
        </div>

        <button
          onClick={() => setTab('add-product')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product._id} className="bg-white rounded-xl border shadow-sm overflow-hidden">

            <div className="h-48 bg-gray-100 relative">
              {product.imageUrl ? (
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {product.type}
                </span>
                <span className="text-xs text-gray-400">{product.brand}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 truncate">
                {product.name}
              </h3>

              <div className="flex justify-between items-end mt-4">
                <div>
                  <p className="text-xs text-gray-500">Stock</p>
                  <p className="font-medium">{product.stock}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 line-through">₹{product.mrp}</p>
                  <p className="text-lg font-bold">₹{product.sellingPrice}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center gap-3">
                <button
                  onClick={() => togglePublish(product._id, product.published)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium text-white
                    ${product.published ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {product.published ? 'Unpublish' : 'Publish'}
                </button>

                <button
                  onClick={() => setTab('edit-product', product)}
                  className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="w-10 h-10 flex items-center justify-center border rounded-lg text-gray-500 hover:text-red-600"
                >
                  🗑
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
