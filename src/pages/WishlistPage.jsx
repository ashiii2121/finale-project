import React, { useEffect } from "react";
import useWishlist from "../hooks/useWishlist"; // Fixed import
import { useCart } from "../hooks/useCart";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist(); // Fixed import
  const { addToCart } = useCart();

  useEffect(() => {
    // Set background images directly first
    const setBgImages = () => {
      const elements = document.querySelectorAll(".set-bg");
      elements.forEach((element) => {
        const bg = element.getAttribute("data-setbg");
        if (bg) {
          element.style.backgroundImage = `url(/${bg})`;
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

  // Function to handle adding product to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id);
  };

  // Function to render star ratings
  const renderRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i key={i} className={`fa fa-star${i < rating ? "" : "-o"}`}></i>
    ));
  };

  return (
    <div>
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Wishlist</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <span>Wishlist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* Wishlist Section Begin */}
      <section className="shop-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Stock Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.length > 0 ? (
                      wishlistItems.map((item) => (
                        <tr key={item.id}>
                          <td className="cart__product__item">
                            <img src={`/${item.image}`} alt={item.name} />
                            <div className="cart__product__item__title">
                              <h6>{item.name}</h6>
                              <div className="rating">
                                {renderRating(item.rating || 5)}
                              </div>
                            </div>
                          </td>
                          <td className="cart__price">
                            $ {item.price.toFixed(2)}
                          </td>
                          <td className="cart__stock">In Stock</td>
                          <td className="cart__btn">
                            <a
                              href="#"
                              className="primary-btn"
                              onClick={(e) => {
                                e.preventDefault();
                                handleAddToCart(item);
                              }}
                            >
                              Add to cart
                            </a>
                          </td>
                          <td className="cart__close">
                            <span
                              className="icon_close"
                              onClick={() => removeFromWishlist(item.id)}
                            ></span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          <h5>Your wishlist is empty</h5>
                          <p>Add items to your wishlist from the shop</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="cart__btn">
                <a href="/">Continue Shopping</a>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="cart__btn update__btn">
                <a href="#">
                  <span className="icon_loading"></span> Update wishlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Wishlist Section End */}
    </div>
  );
};

export default WishlistPage;
