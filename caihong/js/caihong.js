'use strict';

$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

$(document).ready(function() {

  //quick
  $('#quick > .quick_top').on('click', function() {
      if ($(this).parent().attr('class').indexOf('open') !== -1) {
          $('div.quick_download').css({'transition': 'none'});
      } else {
          $('div.quick_download').css({'transition': 'height 0.3s ease 0.3s'});
      }
      $(this).parent().toggleClass('open');
  });

  //all_menu button
  gnbUI();

  function gnbUI() {
    $('#nav .gnb a.all_menu').on('mouseenter', function() {
        $('.gnb > ul > li > ul').css({'display':'none'});
        $('#nav .all_menu_in').addClass('open');
    });
    $('#nav').on('mouseleave', function() {
        $('#nav .all_menu_in').removeClass('open');
    });
  }

  //gnb menu
  $('.gnb.pc > ul > li > a').on('mouseenter focus', function() {
      $('#nav .all_menu_in').removeClass('open');
      $('.gnb.pc > ul > li > ul').css({'display':'none'});
      $('#nav > .all_menu_in').css({'display':'none'});
      $(this).next().css({'display':'block'});
      $('#nav').addClass('on');
  });
  $('#nav').on('mouseleave', function() {
     $('.gnb.pc > ul > li > ul').css({'display':'none'});
     $('#nav').removeClass('on');
  });

    //banner box
        var $selector = $('.bannerbox_inner');
        var numSlide = $selector.find('ul.slide li').length;
        var slideNow = 0;

        showSlide(1);

        $selector.find('ul.indicator li a').on('click', function() {
            var index = $selector.find('ul.indicator li').index($(this).parent());
            showSlide(index + 1);
        });

        function showSlide(n) {
              $selector.find('ul.slide li').css({'display':'none'});
              $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display':'block'});
              $selector.find('ul.indicator li').removeClass('on');
              $selector.find('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
              slideNow = n;
        }


    //main_visual imageSlide
    imageSlide('div.visual_img');
    function imageSlide(selector) {
        var numSlide = $(selector).find('> div .image').length;
        var slideNow = 0;
        var slideNext = 0;
        var slidePrev = 0;
        var timerId = '';
        var timerSpeed = 2500;
        var isTimerOn = true;

        showSlide(1);

        $(selector).find('> div').on('click', function() {
            var index = $(selector).find('> div').index($(this));
            showSlide(index + 1);
        });

        function showSlide(n) {
            clearTimeout(timerId);
            $(selector).find('> div').removeClass('on');
            $(selector).find('> div:eq(' + (n - 1) + ')').addClass('on');
            $(selector).find('> div > .text').removeClass('on').css({'top': '160px'});
            $(selector).find('> div:eq(' + (n - 1) + ') > .text').addClass('on').on('transitionend', function() {
               $(this).css({'top': '130px'});
            });
            slideNow = n;
            slideNext = (n + 1) > numSlide ? 1 : n + 1;
            slidePrev = (n - 1) < 1 ? numSlide : n - 1;
            if (isTimerOn === true) {
                timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
            }
        }  // end of showSlide
    } // end of imageSlide


    //banner box slide
    bannerSlide();
    function bannerSlide() {
        var numSlide = $('#main .bannerbox_inner ul.slide li').length;
        var slideNow = 0;
        var slideNext = 0;
        var slidePrev = 0;
        var timerId = '';
        var timerSpeed = 2000;
        var isTimerOn = true;

        $('.bannerbox_inner ul.indicator li a').on('click', function() {
            var index = $('.bannerbox_inner ul.indicator li').index($(this).parent());
            showSlide(index + 1);
        });

        showSlide(1);

        function showSlide(n) {
            if (slideNow === 0) {
                $('.bannerbox_inner ul.slide li').each(function(i) {
                    $(this).css({'left': (i * 100) + '%', 'display': 'block'});
                });
                $('ul.slide').css({'left':(-(n - 1) * 100) + '%'});
            } else {
                $('ul.slide').css({'transition':'left 0.5s', 'left':(-(n - 1) * 100) + '%'});
            }

            //$('ul.slide li:eq(' + (n - 1) + ')').css({'display':'block'});
            $('ul.indicator li').removeClass('on');
            $('ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
            slideNow = n;
            slideNext = (n + 1) > numSlide ? 1 : (n + 1);
            slidePrev = (n - 1) < 1 ? numSlide : (n - 1);
        }
    }


    //sotre map
    showMap();
    function showMap() {
        $('#main .store .store_inner .map map area').on('click', function() {
            var areaNum = $(this).attr('class');
            $('#main .store .store_inner .map img').css({'display':'none'});
            $('#main .store .store_inner .map img.' + areaNum).css({'display':'block'});
        });
        $('#main .store .store_inner .map map area.seoul').trigger('click');
    } // end of showMap

    //store slide banner
    moveBanner();
    function moveBanner() {
        var numSlide = $('#main .store .store_box .slide_box > ul > li').length;
        var slideNow = 0;
        var slideNext = 0;
        var slidePrev = 0;
        var timerId = '';
        var timerSpeed = 2000;
        var isTimerOn = true;


        $('#main .store .store_box ul.indicator li a').on('click', function() {
            var index = $('#main .store .store_box ul.indicator li').index($(this).parent());
            showSlide(index + 1);
        });

        showSlide(1);

        function showSlide(n) {
            clearTimeout(timerId);
            if (slideNow === 0) {
                $('#main .store .store_box .slide_box > ul > li').each(function(i) {
                    $(this).css({'left': (i * 100) + '%', 'display': 'block'});
                });
                $('#main .store .store_box .slide_box > ul').css({'left':(-(n - 1) * 100) + '%'});
            } else {
                $('#main .store .store_box .slide_box > ul').css({'transition':'left 0.5s', 'left':(-(n - 1) * 100) + '%'});
            }
            $('#main .store .store_box ul.indicator li').removeClass('on');
            $('#main .store .store_box ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
            slideNow = n;
            slideNext = (n + 1) > numSlide ? 1 : (n + 1);
            slidePrev = (n - 1) < 1 ? numSlide : (n - 1);
            timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
        }
    }

    //footer site
    $('#footer .site > ul > li > a').on('click', function() {
        $(this).next().toggleClass('on');
        $(this).parent().siblings().find('ul').removeClass('on');
    });






    //sub storybook
    $('ul.storybook_menu  > li').on('click', function() {
        var index = $('ul.storybook_menu  > li').index($(this));
        $('.storybook > div').css({'display':'none'});
        $('.storybook > div:eq(' + (index) +')').css({'display':'block'});

    });

}); // end of ready
