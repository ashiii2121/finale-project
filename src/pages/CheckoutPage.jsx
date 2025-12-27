import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "./CheckoutPage.css";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        // Billing Details
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",

        // Payment Details
        paymentMethod: "cod", // cod, card, upi

        // Card Details (if card payment)
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",

        // UPI Details (if UPI payment)
        upiId: "",

        // Order Notes
        orderNotes: "",
    });

    const [errors, setErrors] = useState({});
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Calculate totals
    const subtotal = cartTotal;
    const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 50) : 0;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !orderPlaced) {
            navigate("/cart");
        }
    }, [cartItems, navigate, orderPlaced]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Billing validation
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = "Phone must be 10 digits";
        }
        if (!formData.address.trim()) newErrors.address = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.zipCode.trim()) {
            newErrors.zipCode = "ZIP code is required";
        } else if (!/^\d{6}$/.test(formData.zipCode)) {
            newErrors.zipCode = "ZIP code must be 6 digits";
        }

        // Payment validation
        if (formData.paymentMethod === "card") {
            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber = "Card number is required";
            } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
                newErrors.cardNumber = "Card number must be 16 digits";
            }
            if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
            if (!formData.expiryDate.trim()) {
                newErrors.expiryDate = "Expiry date is required";
            } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
                newErrors.expiryDate = "Format: MM/YY";
            }
            if (!formData.cvv.trim()) {
                newErrors.cvv = "CVV is required";
            } else if (!/^\d{3}$/.test(formData.cvv)) {
                newErrors.cvv = "CVV must be 3 digits";
            }
        }

        if (formData.paymentMethod === "upi") {
            if (!formData.upiId.trim()) {
                newErrors.upiId = "UPI ID is required";
            } else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) {
                newErrors.upiId = "Invalid UPI ID format";
            }
        }

        if (!agreedToTerms) {
            newErrors.terms = "You must agree to the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector(".error-message");
            if (firstError) {
                firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            return;
        }

        setLoading(true);

        // Simulate order processing
        setTimeout(() => {
            setLoading(false);
            setOrderPlaced(true);
            clearCart();

            // Scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 2000);
    };

    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <section className="checkout-success">
                    <div className="container">
                        <div className="success-card">
                            <div className="success-icon">
                                <i className="fa fa-check-circle"></i>
                            </div>
                            <h1>Order Placed Successfully!</h1>
                            <p className="order-number">Order #ORD-{Date.now().toString().slice(-8)}</p>
                            <p className="success-message">
                                Thank you for your order! We've sent a confirmation email to{" "}
                                <strong>{formData.email}</strong>
                            </p>
                            <div className="order-summary">
                                <h3>Order Summary</h3>
                                <div className="summary-row">
                                    <span>Items:</span>
                                    <span>{cartItems.length} items</span>
                                </div>
                                <div className="summary-row">
                                    <span>Total Amount:</span>
                                    <span className="total-amount">₹{total.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Payment Method:</span>
                                    <span className="payment-method">
                                        {formData.paymentMethod === "cod"
                                            ? "Cash on Delivery"
                                            : formData.paymentMethod === "card"
                                                ? "Credit/Debit Card"
                                                : "UPI"}
                                    </span>
                                </div>
                            </div>
                            <div className="success-actions">
                                <button onClick={() => navigate("/")} className="btn-primary">
                                    Continue Shopping
                                </button>
                                <button onClick={() => navigate("/orders")} className="btn-secondary">
                                    View Orders
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            {/* Breadcrumb */}
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Checkout</h4>
                                <div className="breadcrumb__links">
                                    <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); navigate("/cart"); }}>Shopping Cart</a>
                                    <span>Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Checkout Section */}
            <section className="checkout spad">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Billing Details */}
                            <div className="col-lg-8">
                                <h6 className="checkout-title">Billing Details</h6>
                                <div className="checkout__form">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    First Name<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    className={errors.firstName ? "error" : ""}
                                                />
                                                {errors.firstName && (
                                                    <span className="error-message">{errors.firstName}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Last Name<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    className={errors.lastName ? "error" : ""}
                                                />
                                                {errors.lastName && (
                                                    <span className="error-message">{errors.lastName}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Email<span>*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={errors.email ? "error" : ""}
                                                />
                                                {errors.email && (
                                                    <span className="error-message">{errors.email}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    Phone<span>*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="10 digit mobile number"
                                                    className={errors.phone ? "error" : ""}
                                                />
                                                {errors.phone && (
                                                    <span className="error-message">{errors.phone}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="checkout__input">
                                        <label>
                                            Address<span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Street address"
                                            className={errors.address ? "error" : ""}
                                        />
                                        {errors.address && (
                                            <span className="error-message">{errors.address}</span>
                                        )}
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    City<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className={errors.city ? "error" : ""}
                                                />
                                                {errors.city && (
                                                    <span className="error-message">{errors.city}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    State<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    className={errors.state ? "error" : ""}
                                                />
                                                {errors.state && (
                                                    <span className="error-message">{errors.state}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>
                                                    ZIP Code<span>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    placeholder="6 digits"
                                                    className={errors.zipCode ? "error" : ""}
                                                />
                                                {errors.zipCode && (
                                                    <span className="error-message">{errors.zipCode}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <label>Country<span>*</span></label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="checkout__input">
                                        <label>Order Notes (Optional)</label>
                                        <textarea
                                            name="orderNotes"
                                            value={formData.orderNotes}
                                            onChange={handleInputChange}
                                            placeholder="Notes about your order, e.g. special notes for delivery"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <h6 className="checkout-title">Payment Method</h6>
                                <div className="checkout__payment">
                                    <div className="payment-methods">
                                        <div className="payment-method">
                                            <input
                                                type="radio"
                                                id="cod"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={formData.paymentMethod === "cod"}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="cod">
                                                <i className="fa fa-money"></i>
                                                Cash on Delivery
                                            </label>
                                        </div>

                                        <div className="payment-method">
                                            <input
                                                type="radio"
                                                id="card"
                                                name="paymentMethod"
                                                value="card"
                                                checked={formData.paymentMethod === "card"}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="card">
                                                <i className="fa fa-credit-card"></i>
                                                Credit/Debit Card
                                            </label>
                                        </div>

                                        <div className="payment-method">
                                            <input
                                                type="radio"
                                                id="upi"
                                                name="paymentMethod"
                                                value="upi"
                                                checked={formData.paymentMethod === "upi"}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="upi">
                                                <i className="fa fa-mobile"></i>
                                                UPI Payment
                                            </label>
                                        </div>
                                    </div>

                                    {/* Card Details */}
                                    {formData.paymentMethod === "card" && (
                                        <div className="card-details">
                                            <div className="checkout__input">
                                                <label>Card Number<span>*</span></label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength="19"
                                                    className={errors.cardNumber ? "error" : ""}
                                                />
                                                {errors.cardNumber && (
                                                    <span className="error-message">{errors.cardNumber}</span>
                                                )}
                                            </div>

                                            <div className="checkout__input">
                                                <label>Cardholder Name<span>*</span></label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    placeholder="Name on card"
                                                    className={errors.cardName ? "error" : ""}
                                                />
                                                {errors.cardName && (
                                                    <span className="error-message">{errors.cardName}</span>
                                                )}
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <label>Expiry Date<span>*</span></label>
                                                        <input
                                                            type="text"
                                                            name="expiryDate"
                                                            value={formData.expiryDate}
                                                            onChange={handleInputChange}
                                                            placeholder="MM/YY"
                                                            maxLength="5"
                                                            className={errors.expiryDate ? "error" : ""}
                                                        />
                                                        {errors.expiryDate && (
                                                            <span className="error-message">{errors.expiryDate}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="checkout__input">
                                                        <label>CVV<span>*</span></label>
                                                        <input
                                                            type="text"
                                                            name="cvv"
                                                            value={formData.cvv}
                                                            onChange={handleInputChange}
                                                            placeholder="123"
                                                            maxLength="3"
                                                            className={errors.cvv ? "error" : ""}
                                                        />
                                                        {errors.cvv && (
                                                            <span className="error-message">{errors.cvv}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* UPI Details */}
                                    {formData.paymentMethod === "upi" && (
                                        <div className="upi-details">
                                            <div className="checkout__input">
                                                <label>UPI ID<span>*</span></label>
                                                <input
                                                    type="text"
                                                    name="upiId"
                                                    value={formData.upiId}
                                                    onChange={handleInputChange}
                                                    placeholder="yourname@upi"
                                                    className={errors.upiId ? "error" : ""}
                                                />
                                                {errors.upiId && (
                                                    <span className="error-message">{errors.upiId}</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Terms and Conditions */}
                                <div className="checkout__terms">
                                    <div className="terms-checkbox">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        />
                                        <label htmlFor="terms">
                                            I have read and agree to the{" "}
                                            <a href="#" onClick={(e) => { e.preventDefault(); navigate("/terms"); }}>terms and conditions</a>
                                            <span>*</span>
                                        </label>
                                    </div>
                                    {errors.terms && (
                                        <span className="error-message">{errors.terms}</span>
                                    )}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="col-lg-4">
                                <div className="checkout__order">
                                    <h6 className="order-title">Your Order</h6>
                                    <div className="checkout__order__products">
                                        <span>Product</span>
                                        <span>Total</span>
                                    </div>
                                    <ul className="checkout__order__list">
                                        {cartItems.map((item, index) => (
                                            <li key={index}>
                                                <span className="product-name">
                                                    {item.name} × {item.quantity}
                                                </span>
                                                <span className="product-price">
                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="checkout__order__subtotal">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="checkout__order__shipping">
                                        <span>Shipping</span>
                                        <span>
                                            {shipping === 0 ? (
                                                <span className="free-shipping">Free</span>
                                            ) : (
                                                `₹${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="checkout__order__tax">
                                        <span>Tax (GST 18%)</span>
                                        <span>₹{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="checkout__order__total">
                                        <span>Total</span>
                                        <span className="total-price">₹{total.toFixed(2)}</span>
                                    </div>
                                    <button
                                        type="submit"
                                        className="site-btn"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            "Place Order"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CheckoutPage;
