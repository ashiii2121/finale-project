import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const Products = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");

  // Sample product data with external image links
  const products = [
    {
      id: 1,
      name: "Buttons tweed blazer",
      price: 59.0,
      image: "img/product/product-1.jpg",
      category: "women",
      rating: 5,
      label: "new",
    },
    {
      id: 2,
      name: "Flowy striped skirt",
      price: 49.0,
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "men",
      rating: 5,
      label: null,
    },
    {
      id: 3,
      name: "Cotton T-Shirt",
      price: 59.0,
      image: "img/product/product-3.jpg",
      category: "accessories",
      rating: 5,
      label: "stockout",
    },
    {
      id: 4,
      name: "Slim striped pocket shirt",
      price: 49.0,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "cosmetic",
      rating: 5,
      label: null,
    },
    {
      id: 5,
      name: "Boxy heather t-shirt",
      price: 39.0,
      image: "img/product/product-5.jpg",
      category: "women",
      rating: 4,
      label: null,
    },
    {
      id: 6,
      name: "Floral print dress",
      price: 79.0,
      image:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "women",
      rating: 5,
      label: "sale",
    },
    {
      id: 7,
      name: "Denim jacket",
      price: 89.0,
      image: "img/product/product-7.jpg",
      category: "men",
      rating: 4,
      label: null,
    },
    {
      id: 8,
      name: "Basic flowy tank",
      price: 29.0,
      image:
        "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "women",
      rating: 3,
      label: null,
    },
  ];

  useEffect(() => {
    // Set background images directly first
    const setBgImages = () => {
      const elements = document.querySelectorAll(".set-bg");
      elements.forEach((element) => {
        const bg = element.getAttribute("data-setbg");
        if (bg) {
          // Check if the image is a URL (external) or local path
          const imageUrl = bg.startsWith("http") ? bg : `/${bg}`;
          element.style.backgroundImage = `url(${imageUrl})`;
        }
      });
    };

    // Call setBgImages immediately
    setBgImages();

    // Call the global initialization function if available
    if (window.initAshionComponents) {
      // Use a small delay to ensure all DOM elements are ready
      setTimeout(() => {
        window.initAshionComponents();
      }, 100);
    }
  }, []);

  // Function to render star ratings
  const renderRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fa fa-star${i < rating ? "" : "-o"}`}></i>
    ));
  };

  // Function to handle adding product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    // Show a visual feedback (optional)
    alert(`${product.name} added to cart!`);
  };

  // Function to handle adding product to wishlist
  const handleAddToWishlist = (product) => {
    const wasInWishlist = isInWishlist(product.id);
    addToWishlist(product);

    // Show message
    if (wasInWishlist) {
      setWishlistMessage(`${product.name} removed from wishlist!`);
    } else {
      setWishlistMessage(`${product.name} added to wishlist!`);
    }
    setShowWishlistMessage(true);

    // Hide message after 2 seconds
    setTimeout(() => {
      setShowWishlistMessage(false);
    }, 2000);
  };

  return (
    /* Product Section Begin */
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
              <li data-filter=".kid">Kid's</li>
              <li data-filter=".accessories">Accessories</li>
              <li data-filter=".cosmetic">Cosmetics</li>
            </ul>
          </div>
        </div>
        <div className="row property__gallery">
          {products.map((product) => (
            <div
              key={product.id}
              className={`col-xl-3 col-lg-4 col-md-6 col-sm-6 mix ${product.category}`}
            >
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  data-setbg={product.image}
                >
                  {product.label && (
                    <div
                      className={`label ${
                        product.label === "stockout"
                          ? "stockout"
                          : product.label
                      }`}
                    >
                      {product.label === "stockout"
                        ? "Out Of Stock"
                        : product.label === "sale"
                        ? "Sale"
                        : "New"}
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
                          className={`icon_heart_alt ${
                            isInWishlist(product.id) ? "wishlist-active" : ""
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist message popup */}
      {showWishlistMessage && (
        <div className="wishlist-message-popup">{wishlistMessage}</div>
      )}
    </section>
    /* Product Section End */
  );
};

export default Products;
