import React, { useEffect } from "react";

const Instagram = () => {
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

  return (
    /* Instagram Begin */
    <div className="instagram">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              data-setbg="img/instagram/insta-1.jpg"
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="#">@ ashion_shop</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              data-setbg="img/instagram/insta-2.jpg"
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="#">@ ashion_shop</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              data-setbg="img/instagram/insta-3.jpg"
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="#">@ ashion_shop</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              data-setbg="img/instagram/insta-4.jpg"
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="#">@ ashion_shop</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              data-setbg="img/instagram/insta-5.jpg"
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="#">@ ashion_shop</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              data-setbg="img/instagram/insta-6.jpg"
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="#">@ ashion_shop</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    /* Instagram End */
  );
};

export default Instagram;
