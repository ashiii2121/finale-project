<div className="row">
  {/* Product 1 */}
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item wow fadeInUp" data-wow-delay="0.1s">
      <div
        className="product__item__pic set-bg"
        data-setbg={getProductByIndex(0).image}
      >
        {getProductByIndex(0).label && (
          <div className={`label ${getProductByIndex(0).label}`}>
            {getProductByIndex(0).label === "sale" ? "Sale" : "New"}
          </div>
        )}
        <ul className="product__hover">
          <li>
            <a href={getProductByIndex(0).image} className="image-popup">
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
                className={`icon_heart_alt ${
                  isInWishlist(getProductByIndex(0).id) ? "wishlist-active" : ""
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
          <a href="#">{getProductByIndex(0).name}</a>
        </h6>
        <div className="rating">
          {renderRating(getProductByIndex(0).rating)}
        </div>
        <div className="product__price">
          $ {getProductByIndex(0).price.toFixed(2)}
          {getProductByIndex(0).originalPrice && (
            <span> $ {getProductByIndex(0).originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  </div>
  {/* Product 2 */}
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item wow fadeInUp" data-wow-delay="0.2s">
      <div
        className="product__item__pic set-bg"
        data-setbg={getProductByIndex(1).image}
      >
        {getProductByIndex(1).label && (
          <div className={`label ${getProductByIndex(1).label}`}>
            {getProductByIndex(1).label === "sale" ? "Sale" : "New"}
          </div>
        )}
        <ul className="product__hover">
          <li>
            <a href={getProductByIndex(1).image} className="image-popup">
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
                className={`icon_heart_alt ${
                  isInWishlist(getProductByIndex(1).id) ? "wishlist-active" : ""
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
          <a href="#">{getProductByIndex(1).name}</a>
        </h6>
        <div className="rating">
          {renderRating(getProductByIndex(1).rating)}
        </div>
        <div className="product__price">
          $ {getProductByIndex(1).price.toFixed(2)}
          {getProductByIndex(1).originalPrice && (
            <span> $ {getProductByIndex(1).originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  </div>
  {/* Product 3 */}
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item wow fadeInUp" data-wow-delay="0.3s">
      <div
        className="product__item__pic set-bg"
        data-setbg={getProductByIndex(2).image}
      >
        <ul className="product__hover">
          <li>
            <a href={getProductByIndex(2).image} className="image-popup">
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
                className={`icon_heart_alt ${
                  isInWishlist(getProductByIndex(2).id) ? "wishlist-active" : ""
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
          <a href="#">{getProductByIndex(2).name}</a>
        </h6>
        <div className="rating">
          {renderRating(getProductByIndex(2).rating)}
        </div>
        <div className="product__price">
          $ {getProductByIndex(2).price.toFixed(2)}
        </div>
      </div>
    </div>
  </div>
  {/* Product 4 */}
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item wow fadeInUp" data-wow-delay="0.1s">
      <div
        className="product__item__pic set-bg"
        data-setbg={getProductByIndex(3).image}
      >
        <ul className="product__hover">
          <li>
            <a href={getProductByIndex(3).image} className="image-popup">
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
                className={`icon_heart_alt ${
                  isInWishlist(getProductByIndex(3).id) ? "wishlist-active" : ""
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
          <a href="#">{getProductByIndex(3).name}</a>
        </h6>
        <div className="rating">
          {renderRating(getProductByIndex(3).rating)}
        </div>
        <div className="product__price">
          $ {getProductByIndex(3).price.toFixed(2)}
        </div>
      </div>
    </div>
  </div>
  {/* Product 5 */}
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item wow fadeInUp" data-wow-delay="0.2s">
      <div
        className="product__item__pic set-bg"
        data-setbg={getProductByIndex(4).image}
      >
        {getProductByIndex(4).label && (
          <div className={`label ${getProductByIndex(4).label}`}>
            {getProductByIndex(4).label === "sale" ? "Sale" : "New"}
          </div>
        )}
        <ul className="product__hover">
          <li>
            <a href={getProductByIndex(4).image} className="image-popup">
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
                className={`icon_heart_alt ${
                  isInWishlist(getProductByIndex(4).id) ? "wishlist-active" : ""
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
          <a href="#">{getProductByIndex(4).name}</a>
        </h6>
        <div className="rating">
          {renderRating(getProductByIndex(4).rating)}
        </div>
        <div className="product__price">
          $ {getProductByIndex(4).price.toFixed(2)}
        </div>
      </div>
    </div>
  </div>
  {/* Product 6 */}
  <div className="col-lg-4 col-md-6 col-sm-6">
    <div className="product__item wow fadeInUp" data-wow-delay="0.3s">
      <div
        className="product__item__pic set-bg"
        data-setbg={getProductByIndex(5).image}
      >
        <ul className="product__hover">
          <li>
            <a href={getProductByIndex(5).image} className="image-popup">
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
                className={`icon_heart_alt ${
                  isInWishlist(getProductByIndex(5).id) ? "wishlist-active" : ""
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
          <a href="#">{getProductByIndex(5).name}</a>
        </h6>
        <div className="rating">
          {renderRating(getProductByIndex(5).rating)}
        </div>
        <div className="product__price">
          $ {getProductByIndex(5).price.toFixed(2)}
        </div>
      </div>
    </div>
  </div>
</div>;
