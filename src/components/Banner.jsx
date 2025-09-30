import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  useEffect(() => {
    // Set background image directly first
    const setBgImage = () => {
      const bannerElement = document.querySelector(".banner.set-bg");
      if (bannerElement) {
        const bg = bannerElement.getAttribute("data-setbg");
        if (bg) {
          bannerElement.style.backgroundImage = `url(/${bg})`;
        }
      }
    };

    // Call setBgImage immediately
    setBgImage();

    // Call the global initialization function if available for Owl Carousel
    if (window.initAshionComponents) {
      // Use a small delay to ensure all DOM elements are ready
      setTimeout(() => {
        window.initAshionComponents();
      }, 100);
    }
  }, []);

  return (
    /* Banner Section Begin */
    <section
      className="banner set-bg"
      data-setbg="/img/banner/banner-1.jpg"
      style={{ height: "500px", display: "block" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8 m-auto">
            <div className="banner__slider owl-carousel">
              <div className="banner__item">
                <div className="banner__text">
                  <span>The Chloe Collection</span>
                  <h1>The Project Jacket</h1>
                  <Link to="/women">Shop now</Link>
                </div>
              </div>
              <div className="banner__item">
                <div className="banner__text">
                  <span>The Chloe Collection</span>
                  <h1>The Project Jacket</h1>
                  <Link to="/women">Shop now</Link>
                </div>
              </div>
              <div className="banner__item">
                <div className="banner__text">
                  <span>The Chloe Collection</span>
                  <h1>The Project Jacket</h1>
                  <Link to="/women">Shop now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    /* Banner Section End */
  );
};

export default Banner;
