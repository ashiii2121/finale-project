import React, { useState, useEffect } from "react";
import "./ProductsManagement.css";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "", // Added image URL field
  });

  // Mock data for products
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Summer Dress",
          category: "Women",
          price: 49.99,
          stock: 25,
          description: "Lightweight summer dress",
          imageUrl: "https://via.placeholder.com/150", // Added image URL
        },
        {
          id: 2,
          name: "Casual T-Shirt",
          category: "Men",
          price: 29.99,
          stock: 40,
          description: "Comfortable cotton t-shirt",
          imageUrl: "https://via.placeholder.com/150", // Added image URL
        },
        {
          id: 3,
          name: "Running Shoes",
          category: "Sports",
          price: 89.99,
          stock: 15,
          description: "Lightweight running shoes",
          imageUrl: "https://via.placeholder.com/150", // Added image URL
        },
        {
          id: 4,
          name: "Leather Wallet",
          category: "Accessories",
          price: 39.99,
          stock: 30,
          description: "Genuine leather wallet",
          imageUrl: "https://via.placeholder.com/150", // Added image URL
        },
        {
          id: 5,
          name: "Sunglasses",
          category: "Accessories",
          price: 59.99,
          stock: 20,
          description: "UV protection sunglasses",
          imageUrl: "https://via.placeholder.com/150", // Added image URL
        },
        {
          id: 6,
          name: "Winter Jacket",
          category: "Men",
          price: 129.99,
          stock: 12,
          description: "Insulated winter jacket",
          imageUrl: "https://via.placeholder.com/150", // Added image URL
        },
        {
          id: 7,
          name: "Summer Hat",
          category: "Women",
          price: 19.99,
          stock: 35,
          description: "Wide brim summer hat",
          imageUrl: "https://via.placeholder.com/150", // Added image URL
        },
        {
          id: 8,
          name: "Sports Watch",
          category: "Accessories",
          price: 79.99,
          stock: 18,
          description: "Water resistant sports watch",
          imageUrl: "https://via.placeholder.com/150", // Added image URL
        },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = products;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    result.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

    setFilteredProducts(result);
  }, [products, searchTerm, sortBy, sortOrder]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showEditForm) {
      // Edit existing product
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id
            ? {
              ...formData,
              id: currentProduct.id,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock),
            }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };
      setProducts([...products, newProduct]);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      imageUrl: product.imageUrl || "", // Added image URL
    });
    setShowEditForm(true);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      imageUrl: "", // Added image URL
    });
    setShowAddForm(false);
    setShowEditForm(false);
    setCurrentProduct(null);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="products-management">
      <div className="header">
        <div>
          <h1>Products Management</h1>
          <p className="subtitle">Manage your product inventory</p>
        </div>
        <button
          className="add-button"
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
        >
          + Add Product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="filter-actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
          </select>
          <button
            className="sort-btn"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-form-overlay">
          <div className="add-form">
            <div className="form-header">
              <h2>{showEditForm ? "Edit Product" : "Add New Product"}</h2>
              <button className="close-btn" onClick={resetForm}>
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price (₹)</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  {showEditForm ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-table">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <>
            <div className="table-header">
              <p>{filteredProducts.length} products found</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("name")}>
                    Name{" "}
                    {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("category")}>
                    Category{" "}
                    {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("price")}>
                    Price{" "}
                    {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("stock")}>
                    Stock{" "}
                    {sortBy === "stock" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-info">
                        <div className="product-image-placeholder">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="product-image"
                            />
                          ) : (
                            "No Image"
                          )}
                        </div>
                        <div>
                          <div className="product-name">{product.name}</div>
                          <div className="product-description">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{product.category}</span>
                    </td>
                    <td>₹{product.price.toFixed(2)}</td>
                    <td>
                      <span
                        className={`stock-badge ${product.stock < 20 ? "low" : ""
                          }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="no-products">
                <p>No products found matching your criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;
