import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";
import { productService } from "../services/productService";

const Products = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts({ limit: 8 });
      setProducts(response.products || []);
    } catch (err) {
      setError(err.message || "Failed to load products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      // Set background images
      const setBgImages = () => {
        const elements = document.querySelectorAll(".set-bg");
        elements.forEach((element) => {
          const bg = element.getAttribute("data-setbg");
          if (bg) {
            const imageUrl = bg.startsWith("http") ? bg : `/${bg}`;
            element.style.backgroundImage = `url(${imageUrl})`;
          }
        });
      };

      setBgImages();

      if (window.initAshionComponents) {
        setTimeout(() => {
          window.initAshionComponents();
        }, 100);
      }
    }
  }, [products]);

  const renderRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fa fa-star${i < rating ? "" : "-o"}`}></i>
    ));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    const wasInWishlist = isInWishlist(product._id);
    addToWishlist(product);

    if (wasInWishlist) {
      setWishlistMessage(`${product.name} removed from wishlist!`);
    } else {
      setWishlistMessage(`${product.name} added to wishlist!`);
    }
    setShowWishlistMessage(true);

    setTimeout(() => {
      setShowWishlistMessage(false);
    }, 2000);
  };

  if (loading) {
    return (
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading products...</span>
              </div>
              <p>Loading products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
              <button onClick={fetchProducts} className="site-btn">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="section-title">
              <h4>New product</h4>
            </div>
          </div>
          <div className="col-lg-8 col-md-8">
            <ul className="filter__controls">
              <li className="active" data-filter="*">
                All
              </li>
              <li data-filter=".women">Women's</li>
              <li data-filter=".men">Men's</li>
              <li data-filter=".accessories">Accessories</li>
              <li data-filter=".shoes">Shoes</li>
              <li data-filter=".bags">Bags</li>
            </ul>
          </div>
        </div>
        <div className="row property__gallery">
          {products.map((product) => (
            <div
              key={product._id}
              className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 mix ${product.category}`}
            >
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg={product.image}
                >
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
                  <ul className="product__hover">
                    <li>
                      <a href={product.image} className="image-popup">
                        <span className="arrow_expand"></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToWishlist(product);
                        }}
                      >
                        <span
                          className={`icon_heart_alt ${isInWishlist(product._id) ? "wishlist-active" : ""
                            }`}
                        ></span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        <span className="icon_bag_alt"></span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6>
                    <a href="#">{product.name}</a>
                  </h6>
                  <div className="rating">{renderRating(product.rating)}</div>
                  <div className="product__price">
                    $ {product.price.toFixed(2)}
                    {product.originalPrice && (
                      <span> ${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showWishlistMessage && (
        <div className="wishlist-message-popup">{wishlistMessage}</div>
      )}
    </section>
  );
};

export default Products;
