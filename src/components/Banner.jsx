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
          // Check if the image is a URL (external) or local path
          const imageUrl = bg.startsWith("http") ? bg : `/${bg}`;
          bannerElement.style.backgroundImage = `url(${imageUrl})`;
        }
      }
    };

    // Initialize Owl Carousel
    const initOwlCarousel = () => {
      const slider = document.querySelector(".banner__slider");
      if (
        slider &&
        typeof window.$ !== "undefined" &&
        window.$.fn.owlCarousel
      ) {
        window.$(slider).owlCarousel({
          items: 1,
          loop: true,
          margin: 0,
          nav: true,
          dots: true,
          autoplay: true,
          autoplayTimeout: 5000,
          autoplayHoverPause: true,
          smartSpeed: 1200,
          responsive: {
            0: {
              nav: false,
              dots: true,
            },
            768: {
              nav: true,
              dots: true,
            },
            1200: {
              nav: true,
              dots: true,
            },
          },
        });
      }
    };

    // Call setBgImage immediately
    setBgImage();

    // Initialize Owl Carousel after a small delay
    const carouselTimeout = setTimeout(() => {
      initOwlCarousel();
    }, 100);

    // Clean up timeout
    return () => clearTimeout(carouselTimeout);
  }, []);

  return (
    /* Banner Section Begin */
    <section className="banner set-bg" data-setbg="img/banner/banner-1.jpg">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8 m-auto">
            <div className="banner__slider owl-carousel">
              <div className="banner__item">
                <div className="banner__text">
                  <span>The Chloe Collection</span>
                  <h1>The Project Jacket</h1>
                  <Link to="/women" className="primary-btn">
                    Shop now
                  </Link>
                </div>
              </div>
              <div className="banner__item">
                <div className="banner__text">
                  <span>The Chloe Collection</span>
                  <h1>The Project Jacket</h1>
                  <Link to="/women" className="primary-btn">
                    Shop now
                  </Link>
                </div>
              </div>
              <div className="banner__item">
                <div className="banner__text">
                  <span>The Chloe Collection</span>
                  <h1>The Project Jacket</h1>
                  <Link to="/women" className="primary-btn">
                    Shop now
                  </Link>
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
