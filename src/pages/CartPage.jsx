import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState({});

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

    // Initialize quantities state
    const initialQuantities = {};
    cartItems.forEach((item) => {
      const itemId = item._id || item.id;
      initialQuantities[itemId] = item.quantity;
    });
    setQuantities(initialQuantities);

    // Call the global initialization function if available
    if (window.initAshionComponents) {
      // Use a small delay to ensure all DOM elements are ready
      setTimeout(() => {
        window.initAshionComponents();
      }, 100);
    }
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (productId, value) => {
    const newQuantity = parseInt(value) || 1;
    setQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
    updateQuantity(productId, newQuantity);
  };

  // Handle quantity input blur
  const handleQuantityBlur = (productId) => {
    if (quantities[productId] < 1) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: 1,
      }));
      updateQuantity(productId, 1);
    }
  };

  // Render star ratings
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
                <h4>Shopping Cart</h4>
                <div className="breadcrumb__links">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}

      {/* Shopping Cart Section Begin */}
      <section className="shop-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {cartItems.length === 0 ? (
                <div className="text-center">
                  <h3>Your cart is empty</h3>
                  <p>
                    Looks like you haven't added any items to your cart yet.
                  </p>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="primary-btn mt-3">
                    Continue Shopping
                  </a>
                </div>
              ) : (
                <div className="shop__cart__table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => {
                        const itemId = item._id || item.id;
                        return (
                          <tr key={itemId}>
                            <td className="cart__product__item">
                              <img src={item.image} alt={item.name} />
                              <div className="cart__product__item__title">
                                <h6>{item.name}</h6>
                                <div className="rating">{renderRating(5)}</div>
                              </div>
                            </td>
                            <td className="cart__price">
                              ₹{item.price.toFixed(2)}
                            </td>
                            <td className="cart__quantity">
                              <div className="pro-qty">
                                <input
                                  type="text"
                                  value={quantities[itemId] || item.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(itemId, e.target.value)
                                  }
                                  onBlur={() => handleQuantityBlur(itemId)}
                                />
                              </div>
                            </td>
                            <td className="cart__total">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="cart__close">
                              <span
                                className="icon_close"
                                onClick={() => removeFromCart(itemId)}
                              ></span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="cart__btn">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Continue Shopping</a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="cart__btn update__btn">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      <span className="icon_loading"></span> Update cart
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="discount__content">
                    <h6>Discount codes</h6>
                    <form action="#">
                      <input type="text" placeholder="Enter your coupon code" />
                      <button type="submit" className="site-btn">
                        Apply
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 offset-lg-2">
                  <div className="cart__total__procced">
                    <h6>Cart total</h6>
                    <ul>
                      <li>
                        Subtotal <span>₹{cartTotal.toFixed(2)}</span>
                      </li>
                      <li>
                        Total <span>₹{cartTotal.toFixed(2)}</span>
                      </li>
                    </ul>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigate("/checkout"); }} className="primary-btn">
                      Proceed to checkout
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {/* Shopping Cart Section End */}
    </div>
  );
};

export default CartPage;
