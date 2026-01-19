import React, { useState, useEffect } from "react";
import API from "../api";

const ProductForm = ({ setTab, editData }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Food",
    stock: "",
    mrp: "",
    sellingPrice: "",
    brand: "",
    exchangeOrReturn: "No",
    published: true,
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        exchangeOrReturn: editData.exchangeOrReturn ? "Yes" : "No",
      });

      if (editData.imageUrls) {
        setPreviews(
          editData.imageUrls.map(
            img => `${import.meta.env.VITE_API_URL}${img}`
          )
        );
      }
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    setPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      if (key === "exchangeOrReturn") {
        data.append(key, formData[key] === "Yes");
      } else {
        data.append(key, formData[key]);
      }
    });

    images.forEach(img => data.append("images", img));

    try {
      if (editData) {
        await API.put(`/products/${editData._id}`, data);
      } else {
        await API.post("/products", data);
      }
      setTab("home");
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-xl max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-base font-semibold text-gray-800">
            {editData ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={() => setTab("home")}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 space-y-4 overflow-y-auto"
        >

          <div>
            <label className="text-sm text-gray-600">Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Product Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              <option>Food</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Beauty</option>
              <option>Others</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Quantity Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">MRP</label>
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Brand Name</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Upload Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              id="images"
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="images"
              className="mt-2 h-24 flex flex-col items-center justify-center border border-dashed rounded-md text-sm text-gray-500 cursor-pointer"
            >
              <span>Enter Description</span>
              <span className="text-indigo-600 font-medium">Browse</span>
            </label>

            {previews.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {previews.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} className="h-16 w-16 rounded object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-white border rounded-full px-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Exchange or return eligibility
            </label>
            <select
              name="exchangeOrReturn"
              value={formData.exchangeOrReturn}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="pt-4 border-t sticky bottom-0 bg-white flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-md"
            >
              {editData ? "Update" : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProductForm;
