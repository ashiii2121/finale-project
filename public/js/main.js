/*  ---------------------------------------------------
Template Name: Ashion
Description: Ashion ecommerce template
Author: Colorib
Author URI: https://colorlib.com/
Version: 1.0
Created: Colorib
---------------------------------------------------------  */

/* global $, mixitup */

'use strict';

// Function to initialize all components
function initAshionComponents() {
    try {
        /*------------------
            Preloader
        --------------------*/
        if (typeof $ !== 'undefined' && $(".loader").length > 0) {
            $(".loader").fadeOut();
            $("#preloder").delay(200).fadeOut("slow");
        }

        /*------------------
            Product filter
        --------------------*/
        if (typeof $ !== 'undefined' && $('.filter__controls li').length > 0) {
            $('.filter__controls li').off('click').on('click', function () {
                $('.filter__controls li').removeClass('active');
                $(this).addClass('active');
            });
        }

        if (typeof $ !== 'undefined' && $('.property__gallery').length > 0) {
            var containerEl = document.querySelector('.property__gallery');
            if (window.mixitup && containerEl) {
                // Destroy existing mixer if it exists
                if (containerEl.mixer) {
                    containerEl.mixer.destroy();
                }
                var mixer = mixitup(containerEl);
                // Store reference to mixer
                containerEl.mixer = mixer;
            }
        }

        /*------------------
            Background Set
        --------------------*/
        if (typeof $ !== 'undefined' && $('.set-bg').length > 0) {
            $('.set-bg').each(function () {
                var bg = $(this).data('setbg');
                if (bg) {
                    $(this).css('background-image', 'url(' + bg + ')');
                }
            });
        }

        //Search Switch
        if (typeof $ !== 'undefined' && $('.search-switch').length > 0) {
            $('.search-switch').off('click').on('click', function (e) {
                e.preventDefault();
                $('.search-model').fadeIn(400);
            });
        }

        if (typeof $ !== 'undefined' && $('.search-close-switch').length > 0) {
            $('.search-close-switch').off('click').on('click', function (e) {
                e.preventDefault();
                $('.search-model').fadeOut(400, function () {
                    $('#search-input').val('');
                });
            });
        }

        //Canvas Menu
        if (typeof $ !== 'undefined' && $(".canvas__open").length > 0) {
            $(".canvas__open").off('click').on('click', function (e) {
                e.preventDefault();
                $(".offcanvas-menu-wrapper").addClass("active");
                $(".offcanvas-menu-overlay").addClass("active");
            });
        }

        if (typeof $ !== 'undefined' && $(".offcanvas-menu-overlay, .offcanvas__close").length > 0) {
            $(".offcanvas-menu-overlay, .offcanvas__close").off('click').on('click', function (e) {
                e.preventDefault();
                $(".offcanvas-menu-wrapper").removeClass("active");
                $(".offcanvas-menu-overlay").removeClass("active");
            });
        }

        /*------------------
            Navigation
        --------------------*/
        // Check if mobile menu already exists to prevent duplication
        if (typeof $ !== 'undefined' && $('#mobile-menu-wrap').length > 0 && $('#mobile-menu-wrap').children().length === 0) {
            $(".header__menu").slicknav({
                prependTo: '#mobile-menu-wrap',
                allowParentLinks: true
            });
        }

        /*--------------------------
            Banner Slider
        ----------------------------*/
        if (typeof $ !== 'undefined' && $(".banner__slider").length > 0) {
            // Destroy existing carousel if it exists
            if ($(".banner__slider").hasClass('owl-loaded')) {
                $(".banner__slider").owlCarousel('destroy');
            }
            $(".banner__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: true,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    576: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    992: {
                        items: 1
                    }
                }
            });
        }

        /*------------------
            Magnific
        --------------------*/
        if (typeof $ !== 'undefined' && $('.image-popup').length > 0) {
            $('.image-popup').magnificPopup({
                type: 'image'
            });
        }

        if (typeof $ !== 'undefined' && $(".nice-scroll").length > 0) {
            // Destroy existing niceScroll if it exists
            if ($(".nice-scroll").get(0) && $(".nice-scroll").get(0).niceScroll) {
                $(".nice-scroll").get(0).niceScroll.remove();
            }
            $(".nice-scroll").niceScroll({
                cursorborder: "",
                cursorcolor: "#dddddd",
                boxzoom: false,
                cursorwidth: 5,
                background: 'rgba(0, 0, 0, 0.2)',
                cursorborderradius: 50,
                horizrailenabled: false
            });
        }

        /*------------------
            CountDown
        --------------------*/
        // For demo preview start
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        if (mm == 12) {
            mm = '01';
            yyyy = yyyy + 1;
        } else {
            mm = parseInt(mm) + 1;
            mm = String(mm).padStart(2, '0');
        }
        var timerdate = mm + '/' + dd + '/' + yyyy;
        // For demo preview end

        // Uncomment below and use your date //
        /* var timerdate = "2020/12/30" */

        if (typeof $ !== 'undefined' && $("#countdown-time").length > 0) {
            $("#countdown-time").countdown(timerdate, function (event) {
                $(this).html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Day</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Hour</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Min</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Sec</p> </div>"));
            });
        }
    } catch (error) {
        console.error('Error initializing Ashion components:', error);
    }
}

// Initialize on window load
if (typeof $ !== 'undefined') {
    $(window).on('load', function () {
        initAshionComponents();
    });

    // Also initialize on resize for responsive adjustments
    $(window).on('resize', function () {
        // Debounce the resize event
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(function () {
            initAshionComponents();
        }, 250);
    });
}

// Make the function available globally so React components can call it
window.initAshionComponents = initAshionComponents;