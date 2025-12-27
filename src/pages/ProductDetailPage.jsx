import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { productService } from "../services/productService";
import "./ProductDetailPage.css";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("");
    const [activeTab, setActiveTab] = useState("description");

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await productService.getProduct(id);
            setProduct(response.product);
            setError("");
        } catch (err) {
            setError(err.message || "Failed to load product");
            console.error("Error fetching product:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity, selectedSize, selectedColor });
            alert(`${product.name} added to cart!`);
        }
    };

    const handleAddToWishlist = () => {
        if (product) {
            addToWishlist(product);
            const message = isInWishlist(product._id)
                ? `${product.name} removed from wishlist!`
                : `${product.name} added to wishlist!`;
            alert(message);
        }
    };

    const renderRating = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i key={i} className={`fa fa-star${i < rating ? "" : "-o"}`}></i>
        ));
    };

    if (loading) {
        return (
            <div className="product-detail-loading">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-error">
                <div className="alert alert-danger">
                    <h4>Error Loading Product</h4>
                    <p>{error || "Product not found"}</p>
                    <button onClick={() => navigate(-1)} className="btn btn-primary">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            {/* Breadcrumb */}
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Product Details</h4>
                                <div className="breadcrumb__links">
                                    <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); navigate("/shop"); }}>Shop</a>
                                    <span>{product.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Product Details */}
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        {/* Product Image */}
                        <div className="col-lg-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img
                                        className="product__details__pic__item--large"
                                        src={product.image?.startsWith("http") ? product.image : `/${product.image}`}
                                        alt={product.name}
                                    />
                                </div>
                                {product.label && (
                                    <div className={`label ${product.label}`}>
                                        {product.label === "new"
                                            ? "New"
                                            : product.label === "sale"
                                                ? "Sale"
                                                : product.label === "hot"
                                                    ? "Hot"
                                                    : product.label}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="col-lg-6">
                            <div className="product__details__text">
                                <h3>{product.name}</h3>
                                <div className="product__details__rating">
                                    {renderRating(product.rating || 5)}
                                    <span>({product.reviews || 0} reviews)</span>
                                </div>
                                <div className="product__details__price">
                                    ₹ {product.price?.toFixed(2)}
                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <span className="original-price">
                                            ₹ {product.originalPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                <p className="product__details__description">
                                    {product.description ||
                                        "Experience premium quality with this carefully crafted product. Made with attention to detail and designed for your comfort and style."}
                                </p>

                                {/* Size Selection */}
                                <div className="product__details__option">
                                    <div className="product__details__option__size">
                                        <span>Size:</span>
                                        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                            <label
                                                key={size}
                                                className={selectedSize === size ? "active" : ""}
                                            >
                                                {size}
                                                <input
                                                    type="radio"
                                                    name="size"
                                                    value={size}
                                                    checked={selectedSize === size}
                                                    onChange={(e) => setSelectedSize(e.target.value)}
                                                />
                                            </label>
                                        ))}
                                    </div>

                                    {/* Color Selection */}
                                    <div className="product__details__option__color">
                                        <span>Color:</span>
                                        {["Black", "White", "Blue", "Red", "Gray"].map((color) => (
                                            <label
                                                key={color}
                                                className={`color-${color.toLowerCase()} ${selectedColor === color ? "active" : ""
                                                    }`}
                                                onClick={() => setSelectedColor(color)}
                                            >
                                                <input type="radio" name="color" value={color} />
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity and Add to Cart */}
                                <div className="product__details__cart__option">
                                    <div className="quantity">
                                        <div className="pro-qty">
                                            <span
                                                className="dec qtybtn"
                                                onClick={() => handleQuantityChange(-1)}
                                            >
                                                -
                                            </span>
                                            <input type="text" value={quantity} readOnly />
                                            <span
                                                className="inc qtybtn"
                                                onClick={() => handleQuantityChange(1)}
                                            >
                                                +
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="primary-btn"
                                        onClick={handleAddToCart}
                                    >
                                        Add to cart
                                    </button>
                                </div>

                                {/* Wishlist and Share */}
                                <div className="product__details__btns__option">
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleAddToWishlist(); }}>
                                        <i className={`fa fa-heart ${isInWishlist(product._id) ? "active" : ""}`}></i>
                                        Add to wishlist
                                    </a>
                                </div>

                                {/* Product Meta */}
                                <div className="product__details__last__option">
                                    <ul>
                                        <li>
                                            <span>SKU:</span> {product._id?.slice(-8).toUpperCase()}
                                        </li>
                                        <li>
                                            <span>Categories:</span> {product.category || "Fashion"}
                                        </li>
                                        <li>
                                            <span>Stock:</span>{" "}
                                            <span className={product.stock > 0 ? "in-stock" : "out-of-stock"}>
                                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Tabs */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === "description" ? "active" : ""}`}
                                            onClick={() => setActiveTab("description")}
                                            href="#"
                                        >
                                            Description
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === "specification" ? "active" : ""}`}
                                            onClick={() => setActiveTab("specification")}
                                            href="#"
                                        >
                                            Specification
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
                                            onClick={() => setActiveTab("reviews")}
                                            href="#"
                                        >
                                            Reviews ({product.reviews || 0})
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    {activeTab === "description" && (
                                        <div className="tab-pane fade show active">
                                            <div className="product__details__tab__content">
                                                <p className="note">
                                                    {product.description ||
                                                        "This product is crafted with premium materials and designed to provide exceptional quality and comfort. Perfect for everyday wear or special occasions."}
                                                </p>
                                                <div className="product__details__tab__content__item">
                                                    <h5>Features</h5>
                                                    <ul>
                                                        <li>Premium quality materials</li>
                                                        <li>Comfortable fit</li>
                                                        <li>Durable construction</li>
                                                        <li>Easy to care for</li>
                                                        <li>Available in multiple sizes and colors</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "specification" && (
                                        <div className="tab-pane fade show active">
                                            <div className="product__details__tab__content">
                                                <div className="product__details__tab__content__item">
                                                    <h5>Product Specifications</h5>
                                                    <ul>
                                                        <li>Material: Premium Cotton Blend</li>
                                                        <li>Weight: 200g</li>
                                                        <li>Care: Machine washable</li>
                                                        <li>Origin: Made with quality standards</li>
                                                        <li>Warranty: 30-day return policy</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === "reviews" && (
                                        <div className="tab-pane fade show active">
                                            <div className="product__details__tab__content">
                                                <div className="product__details__tab__content__item">
                                                    <h5>Customer Reviews</h5>
                                                    <div className="rating-summary">
                                                        <div className="rating">{renderRating(product.rating || 5)}</div>
                                                        <p>{product.rating || 5}.0 out of 5 stars</p>
                                                    </div>
                                                    <p className="text-muted">
                                                        Be the first to review this product!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;
