$(function () {


  $("#slider").slick({
    arrows: false,
    dots: true,
    speed: 800,
    slidesToShow: 1
  });

  $("#sliderWorks").slick({
    arrows: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          infinity: true
        }
      },
      {
        breakpoint: 580,
        settings: {
          dots: true
        }
      }
    ]
  });

  $(".slider-works__prev").click(function (event) {
    $("#sliderWorks").slick("slickPrev");
  });
  $(".slider-works__next").click(function (event) {
    $("#sliderWorks").slick("slickNext");
  });

  $(".hamburger__toggle").on("click", function () {
    $(".menu").slideToggle();
  });

  // media query event handler
  if (matchMedia) {
    const mq = window.matchMedia("(min-width: 992px)");
    mq.addListener(WidthChange);
    WidthChange(mq);

    // media query change
    function WidthChange(mq) {
      if (mq.matches) {
        $('#menu').trigger('destroy')
      } else {
        // window width is less than 992px
        // Accordion
        $('#menu').slideAccordion({
          opener: 'a.opener',
          slider: '.menu__drop',
          animSpeed: 300
        });
      }

    }
  }

});
/*
 * jQuery Accordion plugin
 */
; (function ($) {
  $.fn.slideAccordion = function (opt) {
    // default options
    var options = $.extend({
      addClassBeforeAnimation: false,
      activeClass: 'active',
      opener: '.opener',
      slider: '.slide',
      animSpeed: 300,
      collapsible: true,
      event: 'click'
    }, opt);

    return this.each(function () {
      // options
      var accordion = $(this);
      var items = accordion.find(':has(' + options.slider + ')');

      items.each(function () {
        var item = $(this);
        var opener = item.find(options.opener);
        var slider = item.find(options.slider);

        opener.on(options.event, function (e) {
          if (!slider.is(':animated')) {
            if (item.hasClass(options.activeClass)) {
              if (options.collapsible) {
                slider.slideUp(options.animSpeed, function () {
                  hideSlide(slider);
                  item.removeClass(options.activeClass);
                });
              }
            } else {
              // show active
              var levelItems = item.siblings('.' + options.activeClass);
              var sliderElements = levelItems.find(options.slider);
              item.addClass(options.activeClass);
              showSlide(slider).hide().slideDown(options.animSpeed);

              // collapse others
              sliderElements.slideUp(options.animSpeed, function () {
                levelItems.removeClass(options.activeClass);
                hideSlide(sliderElements);
              });
            }
          }
          e.preventDefault();
        });
        if (item.hasClass(options.activeClass)) showSlide(slider); else hideSlide(slider);
      });

      accordion.on('destroy', function () {
        items.each(function () {
          var item = $(this);
          var opener = item.find(options.opener);
          var slider = item.find(options.slider);

          opener.off(options.event);
          item.removeClass(options.activeClass);
          slider.prop('style', '');
        })
        accordion.off('destroy');
      })
    });
  };

  // accordion slide visibility
  var showSlide = function (slide) {
    return slide.css({ position: '', top: '', left: '', width: '' });
  };
  var hideSlide = function (slide) {
    return slide.show().css({ position: 'absolute', top: -9999, left: -9999, width: slide.width() });
  };
}(jQuery));