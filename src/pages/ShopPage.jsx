import React, { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const ShopPage = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Extended product data with more items, including external image links
  const products = [
    {
      id: 1,
      name: "Buttons tweed blazer",
      price: 59.0,
      originalPrice: 69.0,
      image: "img/product/product-1.jpg",
      category: "women",
      rating: 5,
      label: "new",
    },
    {
      id: 2,
      name: "Flowy striped skirt",
      price: 49.0,
      image: "img/product/product-2.jpg",
      category: "women",
      rating: 5,
      label: null,
    },
    {
      id: 3,
      name: "Cotton T-Shirt",
      price: 59.0,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "men",
      rating: 5,
      label: "stockout",
    },
    {
      id: 4,
      name: "Slim striped pocket shirt",
      price: 49.0,
      image:
        "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "men",
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
      originalPrice: 89.0,
      image:
        "https://images.unsplash.com/photo-1502716119720-b23a93e0f25e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "women",
      rating: 5,
      label: "sale",
    },
    {
      id: 7,
      name: "Denim jacket",
      price: 89.0,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "men",
      rating: 4,
      label: null,
    },
    {
      id: 8,
      name: "Basic flowy tank",
      price: 29.0,
      image: "img/product/product-8.jpg",
      category: "women",
      rating: 3,
      label: null,
    },
    {
      id: 9,
      name: "Striped T-shirt",
      price: 35.0,
      image:
        "https://images.unsplash.com/photo-1581655353564-df1d0163f0f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "men",
      rating: 4,
      label: "new",
    },
    {
      id: 10,
      name: "Summer dress",
      price: 65.0,
      originalPrice: 75.0,
      image:
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "women",
      rating: 5,
      label: "sale",
    },
    {
      id: 11,
      name: "Casual sneakers",
      price: 75.0,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      rating: 4,
      label: null,
    },
    {
      id: 12,
      name: "Designer handbag",
      price: 120.0,
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "accessories",
      rating: 5,
      label: "new",
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

  useEffect(() => {
    // Filter products based on selected category
    let filtered = products;
    if (selectedCategory !== "all") {
      filtered = products.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products based on selected sort option
    switch (sortBy) {
      case "lowToHigh":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Default sorting (by ID)
        filtered = [...filtered].sort((a, b) => a.id - b.id);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy]);

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
    <div>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Shop</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop__sidebar">
                <div className="shop__sidebar__search">
                  <form action="#">
                    <input type="text" placeholder="Search..." />
                    <button type="submit">
                      <span className="icon_search"></span>
                    </button>
                  </form>
                </div>
                <div className="shop__sidebar__accordion">
                  <div className="accordion" id="accordionExample">
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseOne">
                          Categories
                        </a>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__categories">
                            <ul className="nice-scroll">
                              <li>
                                <a
                                  href="#"
                                  className={
                                    selectedCategory === "all" ? "active" : ""
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCategory("all");
                                  }}
                                >
                                  All
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className={
                                    selectedCategory === "women" ? "active" : ""
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCategory("women");
                                  }}
                                >
                                  Women's
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className={
                                    selectedCategory === "men" ? "active" : ""
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCategory("men");
                                  }}
                                >
                                  Men's
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className={
                                    selectedCategory === "accessories"
                                      ? "active"
                                      : ""
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCategory("accessories");
                                  }}
                                >
                                  Accessories
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseTwo">
                          Brand
                        </a>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__brand">
                            <ul>
                              <li>
                                <a href="#">Calvin Klein</a>
                              </li>
                              <li>
                                <a href="#">Diesel</a>
                              </li>
                              <li>
                                <a href="#">Polo</a>
                              </li>
                              <li>
                                <a href="#">Tommy Hilfiger</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseThree">
                          Filter Price
                        </a>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__price">
                            <ul>
                              <li>
                                <a href="#">$0.00 - $50.00</a>
                              </li>
                              <li>
                                <a href="#">$50.00 - $100.00</a>
                              </li>
                              <li>
                                <a href="#">$100.00 - $150.00</a>
                              </li>
                              <li>
                                <a href="#">$150.00 - $200.00</a>
                              </li>
                              <li>
                                <a href="#">$200.00 - $250.00</a>
                              </li>
                              <li>
                                <a href="#">250.00+</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFour">
                          Size
                        </a>
                      </div>
                      <div
                        id="collapseFour"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__size">
                            <label htmlFor="xs">
                              xs
                              <input type="radio" id="xs" />
                            </label>
                            <label htmlFor="sm">
                              s
                              <input type="radio" id="sm" />
                            </label>
                            <label htmlFor="md">
                              m
                              <input type="radio" id="md" />
                            </label>
                            <label htmlFor="lg">
                              l
                              <input type="radio" id="lg" />
                            </label>
                            <label htmlFor="xl">
                              xl
                              <input type="radio" id="xl" />
                            </label>
                            <label htmlFor="xxl">
                              xxl
                              <input type="radio" id="xxl" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFive">
                          Colors
                        </a>
                      </div>
                      <div
                        id="collapseFive"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__color">
                            <label className="c-1" htmlFor="color-1">
                              <input type="radio" id="color-1" />
                            </label>
                            <label className="c-2" htmlFor="color-2">
                              <input type="radio" id="color-2" />
                            </label>
                            <label className="c-3" htmlFor="color-3">
                              <input type="radio" id="color-3" />
                            </label>
                            <label className="c-4" htmlFor="color-4">
                              <input type="radio" id="color-4" />
                            </label>
                            <label className="c-5" htmlFor="color-5">
                              <input type="radio" id="color-5" />
                            </label>
                            <label className="c-6" htmlFor="color-6">
                              <input type="radio" id="color-6" />
                            </label>
                            <label className="c-7" htmlFor="color-7">
                              <input type="radio" id="color-7" />
                            </label>
                            <label className="c-8" htmlFor="color-8">
                              <input type="radio" id="color-8" />
                            </label>
                            <label className="c-9" htmlFor="color-9">
                              <input type="radio" id="color-9" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="shop__product__option">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__left">
                      <p>
                        Showing {filteredProducts.length} of {products.length}{" "}
                        results
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                      <p>Sort by:</p>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="default">Default</option>
                        <option value="lowToHigh">Low To High</option>
                        <option value="highToLow">High To Low</option>
                        <option value="name">Name</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
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
                                  isInWishlist(product.id)
                                    ? "wishlist-active"
                                    : ""
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
                        <div className="rating">
                          {renderRating(product.rating)}
                        </div>
                        <div className="product__price">
                          $ {product.price.toFixed(2)}
                          {product.originalPrice &&
                            product.originalPrice > product.price && (
                              <span> $ {product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="product__pagination">
                    <a className="active" href="#">
                      1
                    </a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#">
                      <i className="fa fa-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shop Section End */}

      {/* Wishlist message popup */}
      {showWishlistMessage && (
        <div className="wishlist-message-popup">{wishlistMessage}</div>
      )}
    </div>
  );
};

export default ShopPage;
