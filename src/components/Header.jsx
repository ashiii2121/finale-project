import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

const Header = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

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

    // Initialize jQuery components after component mounts
    const initScripts = () => {
      // Check if jQuery is loaded
      if (typeof window.$ === "undefined") {
        console.warn("jQuery is not loaded yet");
      }

      // Canvas Menu
      const canvasOpen = document.querySelector(".canvas__open");
      const offcanvasMenuWrapper = document.querySelector(
        ".offcanvas-menu-wrapper"
      );
      const offcanvasMenuOverlay = document.querySelector(
        ".offcanvas-menu-overlay"
      );
      const offcanvasClose = document.querySelector(".offcanvas__close");

      if (canvasOpen) {
        // Remove any existing event listeners to prevent duplicates
        const newCanvasOpen = canvasOpen.cloneNode(true);
        canvasOpen.parentNode.replaceChild(newCanvasOpen, canvasOpen);
        newCanvasOpen.addEventListener("click", function (e) {
          e.preventDefault();
          if (offcanvasMenuWrapper && offcanvasMenuOverlay) {
            offcanvasMenuWrapper.classList.add("active");
            offcanvasMenuOverlay.classList.add("active");
          }
        });
      }

      if (offcanvasMenuOverlay) {
        // Remove any existing event listeners to prevent duplicates
        const newOffcanvasMenuOverlay = offcanvasMenuOverlay.cloneNode(true);
        offcanvasMenuOverlay.parentNode.replaceChild(
          newOffcanvasMenuOverlay,
          offcanvasMenuOverlay
        );
        newOffcanvasMenuOverlay.addEventListener("click", function (e) {
          e.preventDefault();
          if (offcanvasMenuWrapper) {
            offcanvasMenuWrapper.classList.remove("active");
            newOffcanvasMenuOverlay.classList.remove("active");
          }
        });
      }

      if (offcanvasClose) {
        // Remove any existing event listeners to prevent duplicates
        const newOffcanvasClose = offcanvasClose.cloneNode(true);
        offcanvasClose.parentNode.replaceChild(
          newOffcanvasClose,
          offcanvasClose
        );
        newOffcanvasClose.addEventListener("click", function (e) {
          e.preventDefault();
          if (offcanvasMenuWrapper && offcanvasMenuOverlay) {
            offcanvasMenuWrapper.classList.remove("active");
            offcanvasMenuOverlay.classList.remove("active");
          }
        });
      }

      // Search switch functionality
      const searchSwitch = document.querySelector(".search-switch");
      if (searchSwitch) {
        // Remove any existing event listeners to prevent duplicates
        const newSearchSwitch = searchSwitch.cloneNode(true);
        searchSwitch.parentNode.replaceChild(newSearchSwitch, searchSwitch);
        newSearchSwitch.addEventListener("click", function (e) {
          e.preventDefault();
          const searchModel = document.querySelector(".search-model");
          if (searchModel) {
            searchModel.style.display = "block";
          }
        });
      }

      const searchCloseSwitch = document.querySelector(".search-close-switch");
      if (searchCloseSwitch) {
        // Remove any existing event listeners to prevent duplicates
        const newSearchCloseSwitch = searchCloseSwitch.cloneNode(true);
        searchCloseSwitch.parentNode.replaceChild(
          newSearchCloseSwitch,
          searchCloseSwitch
        );
        newSearchCloseSwitch.addEventListener("click", function (e) {
          e.preventDefault();
          const searchModel = document.querySelector(".search-model");
          const searchInput = document.querySelector("#search-input");
          if (searchModel) {
            searchModel.style.display = "none";
          }
          if (searchInput) {
            searchInput.value = "";
          }
        });
      }

      // Call the global initialization function if available
      if (window.initAshionComponents) {
        // Use a small delay to ensure all DOM elements are ready
        setTimeout(() => {
          window.initAshionComponents();
        }, 100);
      }
    };

    // Wait for DOM to be ready and jQuery to be loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initScripts);
    } else {
      // Also call it directly in case DOM is already ready
      setTimeout(initScripts, 100);
    }

    // Cleanup event listeners on component unmount
    return () => {
      const canvasOpen = document.querySelector(".canvas__open");
      const offcanvasMenuOverlay = document.querySelector(
        ".offcanvas-menu-overlay"
      );
      const offcanvasClose = document.querySelector(".offcanvas__close");

      if (canvasOpen) {
        const clone = canvasOpen.cloneNode(true);
        canvasOpen.parentNode.replaceChild(clone, canvasOpen);
      }

      if (offcanvasMenuOverlay) {
        const clone = offcanvasMenuOverlay.cloneNode(true);
        offcanvasMenuOverlay.parentNode.replaceChild(
          clone,
          offcanvasMenuOverlay
        );
      }

      if (offcanvasClose) {
        const clone = offcanvasClose.cloneNode(true);
        offcanvasClose.parentNode.replaceChild(clone, offcanvasClose);
      }
    };
  }, []);

  return (
    <div style={{ display: "block" }}>
      {/* Page Preloder */}
      <div id="preloder" style={{ display: "none" }}>
        <div className="loader"></div>
      </div>

      {/* Offcanvas Menu Begin */}
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__close">+</div>
        <ul className="offcanvas__widget">
          <li>
            <span className="icon_search search-switch"></span>
          </li>
          <li>
            <Link to="/wishlist">
              <span className="icon_heart_alt"></span>
              <div className="tip">{wishlistCount}</div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <span className="icon_bag_alt"></span>
              <div className="tip">{cartCount}</div>
            </Link>
          </li>
        </ul>
        <div className="offcanvas__logo">
          <Link to="/">
            <img src="/img/logo.png" alt="" />
          </Link>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__auth">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      {/* Offcanvas Menu End */}

      {/* Header Section Begin */}
      <header className="header" style={{ display: "block" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-2">
              <div className="header__logo">
                <Link to="/">
                  <img src="/img/logo.png" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <nav className="header__menu">
                <ul>
                  <li className="active">
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/women">Women's</Link>
                  </li>
                  <li>
                    <Link to="/men">Men's</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/pages">Pages</Link>
                    <ul className="dropdown">
                      <li>
                        <Link to="/product-details">Product Details</Link>
                      </li>
                      <li>
                        <Link to="/shop-cart">Shop Cart</Link>
                      </li>
                      <li>
                        <Link to="/checkout">Checkout</Link>
                      </li>
                      <li>
                        <Link to="/blog-details">Blog Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__right">
                <div className="header__right__auth">
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div>
                <ul className="header__right__widget">
                  <li>
                    <span className="icon_search search-switch"></span>
                  </li>
                  <li>
                    <Link to="/wishlist">
                      <span className="icon_heart_alt"></span>
                      <div className="tip">{wishlistCount}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <span className="icon_bag_alt"></span>
                      <div className="tip">{cartCount}</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
      {/* Header Section End */}
    </div>
  );
};

export default Header;
