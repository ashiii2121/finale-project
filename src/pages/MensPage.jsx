import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const MensPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);
  const [wishlistMessage, setWishlistMessage] = useState("");

  // Product data for men's collection
  const products = [
    {
      id: 1,
      name: "Slim-fit Oxford Shirt",
      price: 59.0,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "men",
      rating: 5,
      label: null,
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 75.0,
      originalPrice: 89.0,
      image: "img/product/product-2.jpg",
      category: "men",
      rating: 5,
      label: "sale",
    },
    {
      id: 3,
      name: "Casual T-Shirt",
      price: 35.0,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "men",
      rating: 4,
      label: null,
    },
    {
      id: 4,
      name: "Formal Suit",
      price: 199.0,
      image: "img/product/product-4.jpg",
      category: "men",
      rating: 4,
      label: null,
    },
    {
      id: 5,
      name: "Sporty Polo Shirt",
      price: 45.0,
      image:
        "https://images.unsplash.com/photo-1581655353564-df1d0163f0f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      category: "men",
      rating: 4,
      label: "new",
    },
    {
      id: 6,
      name: "Winter Jacket",
      price: 129.0,
      image: "img/product/product-6.jpg",
      category: "men",
      rating: 5,
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

  // Get product by index (0-5) for the 6 products displayed
  const getProductByIndex = (index) => {
    return products[index];
  };

  return (
    <div>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Men's Collection</h4>
                <div className="breadcrumb__links">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
                  <span>Men's Collection</span>
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
                                <a href="#">Jackets & Coats</a>
                              </li>
                              <li>
                                <a href="#">Shirts</a>
                              </li>
                              <li>
                                <a href="#">Pants & Jeans</a>
                              </li>
                              <li>
                                <a href="#">Suits & Blazers</a>
                              </li>
                              <li>
                                <a href="#">Shorts</a>
                              </li>
                              <li>
                                <a href="#">Swimwear</a>
                              </li>
                              <li>
                                <a href="#">Activewear</a>
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
                            <label htmlFor="3xl">
                              3xl
                              <input type="radio" id="3xl" />
                            </label>
                            <label htmlFor="4xl">
                              4xl
                              <input type="radio" id="4xl" />
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
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseSix">
                          Tags
                        </a>
                      </div>
                      <div
                        id="collapseSix"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__tags">
                            <a href="#">Product</a>
                            <a href="#">Bags</a>
                            <a href="#">Shoes</a>
                            <a href="#">Brand</a>
                            <a href="#">Jeans</a>
                            <a href="#">Suits</a>
                            <a href="#">Trend</a>
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
                      <p>Showing 1–12 of 126 results</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="shop__product__option__right">
                      <p>Sort by Price:</p>
                      <select>
                        <option value="">Low To High</option>
                        <option value="">$0 - $55</option>
                        <option value="">$55 - $100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Product 1 */}
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic set-bg"
                      data-setbg={getProductByIndex(0).image}
                    >
                      <ul className="product__hover">
                        <li>
                          <a
                            href={getProductByIndex(0).image}
                            className="image-popup"
                          >
                            <span className="arrow_expand"></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToWishlist(getProductByIndex(0));
                            }}
                          >
                            <span
                              className={`icon_heart_alt ${isInWishlist(getProductByIndex(0).id)
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
                              handleAddToCart(getProductByIndex(0));
                            }}
                          >
                            <span className="icon_bag_alt"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${getProductByIndex(0).id}`);
                          }}
                        >
                          {getProductByIndex(0).name}
                        </a>
                      </h6>
                      <div className="rating">
                        {renderRating(getProductByIndex(0).rating)}
                      </div>
                      <div className="product__price">
                        ₹ {getProductByIndex(0).price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product 2 */}
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic set-bg"
                      data-setbg={getProductByIndex(1).image}
                    >
                      {getProductByIndex(1).label && (
                        <div className="label">Sale</div>
                      )}
                      <ul className="product__hover">
                        <li>
                          <a
                            href={getProductByIndex(1).image}
                            className="image-popup"
                          >
                            <span className="arrow_expand"></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToWishlist(getProductByIndex(1));
                            }}
                          >
                            <span
                              className={`icon_heart_alt ${isInWishlist(getProductByIndex(1).id)
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
                              handleAddToCart(getProductByIndex(1));
                            }}
                          >
                            <span className="icon_bag_alt"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${getProductByIndex(1).id}`);
                          }}
                        >
                          {getProductByIndex(1).name}
                        </a>
                      </h6>
                      <div className="rating">
                        {renderRating(getProductByIndex(1).rating)}
                      </div>
                      <div className="product__price">
                        ₹ {getProductByIndex(1).price.toFixed(2)}{" "}
                        <span>
                          ₹ {getProductByIndex(1).originalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product 3 */}
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic set-bg"
                      data-setbg={getProductByIndex(2).image}
                    >
                      <ul className="product__hover">
                        <li>
                          <a
                            href={getProductByIndex(2).image}
                            className="image-popup"
                          >
                            <span className="arrow_expand"></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToWishlist(getProductByIndex(2));
                            }}
                          >
                            <span
                              className={`icon_heart_alt ${isInWishlist(getProductByIndex(2).id)
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
                              handleAddToCart(getProductByIndex(2));
                            }}
                          >
                            <span className="icon_bag_alt"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${getProductByIndex(2).id}`);
                          }}
                        >
                          {getProductByIndex(2).name}
                        </a>
                      </h6>
                      <div className="rating">
                        {renderRating(getProductByIndex(2).rating)}
                      </div>
                      <div className="product__price">
                        ₹ {getProductByIndex(2).price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product 4 */}
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic set-bg"
                      data-setbg={getProductByIndex(3).image}
                    >
                      <ul className="product__hover">
                        <li>
                          <a
                            href={getProductByIndex(3).image}
                            className="image-popup"
                          >
                            <span className="arrow_expand"></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToWishlist(getProductByIndex(3));
                            }}
                          >
                            <span
                              className={`icon_heart_alt ${isInWishlist(getProductByIndex(3).id)
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
                              handleAddToCart(getProductByIndex(3));
                            }}
                          >
                            <span className="icon_bag_alt"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${getProductByIndex(3).id}`);
                          }}
                        >
                          {getProductByIndex(3).name}
                        </a>
                      </h6>
                      <div className="rating">
                        {renderRating(getProductByIndex(3).rating)}
                      </div>
                      <div className="product__price">
                        ₹ {getProductByIndex(3).price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product 5 */}
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic set-bg"
                      data-setbg={getProductByIndex(4).image}
                    >
                      {getProductByIndex(4).label && (
                        <div className="label">New</div>
                      )}
                      <ul className="product__hover">
                        <li>
                          <a
                            href={getProductByIndex(4).image}
                            className="image-popup"
                          >
                            <span className="arrow_expand"></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToWishlist(getProductByIndex(4));
                            }}
                          >
                            <span
                              className={`icon_heart_alt ${isInWishlist(getProductByIndex(4).id)
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
                              handleAddToCart(getProductByIndex(4));
                            }}
                          >
                            <span className="icon_bag_alt"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${getProductByIndex(4).id}`);
                          }}
                        >
                          {getProductByIndex(4).name}
                        </a>
                      </h6>
                      <div className="rating">
                        {renderRating(getProductByIndex(4).rating)}
                      </div>
                      <div className="product__price">
                        ₹ {getProductByIndex(4).price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product 6 */}
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="product__item">
                    <div
                      className="product__item__pic set-bg"
                      data-setbg={getProductByIndex(5).image}
                    >
                      <ul className="product__hover">
                        <li>
                          <a
                            href={getProductByIndex(5).image}
                            className="image-popup"
                          >
                            <span className="arrow_expand"></span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToWishlist(getProductByIndex(5));
                            }}
                          >
                            <span
                              className={`icon_heart_alt ${isInWishlist(getProductByIndex(5).id)
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
                              handleAddToCart(getProductByIndex(5));
                            }}
                          >
                            <span className="icon_bag_alt"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${getProductByIndex(5).id}`);
                          }}
                        >
                          {getProductByIndex(5).name}
                        </a>
                      </h6>
                      <div className="rating">
                        {renderRating(getProductByIndex(5).rating)}
                      </div>
                      <div className="product__price">
                        ₹ {getProductByIndex(5).price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
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

export default MensPage;
