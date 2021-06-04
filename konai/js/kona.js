'use strict';

$(document).ready(function() {
    $(document).on('click', 'a[href="#"]', function(e) {
       e.preventDefault(); 
    });
    
    
    function header() {
        $(window).on('scroll resize', function() {
            var headerOffset = $('#header').offset().top;

            $(document).on('scroll', function() {
                if(headerOffset >= 10) {
                    $('#header').addClass('on');
                } else {
                    $('#header').removeClass('on');
                }
            });
        });
    }
    
    function main_visual_slide() {
        var $selector = $('#main .visual');
        var numSlide = $selector.find('ul.slide li').length;
        var slideNow = 0;
        var slidePrev = 0;
        var slideNext = 0;
        var slideFirst = 1;
        var timerId = '';
        var timerSpeed = 5000;
        var isTimerOn = false;
        
        $selector.find('ul.indicator li a').on('click', function() {
            var index = $selector.find('ul.indicator li').index($(this).parent()) ;
            showSlide(index + 1);
        });
        $selector.find('p.control a.prev').on('click', function() {
            showSlide(slidePrev);
        });
        $selector.find('p.control a.next').on('click', function() {
            showSlide(slideNext);
        });
        
        showSlide(slideFirst);

        function showSlide(n) {
            $selector.find('ul.slide li').css({'display': 'none'});
            $selector.find('ul.slide li:eq('+ (n - 1) +')').css({'display': 'block', 'opacity': '0'}).stop(true).animate({'opacity': '1'}, 2000).addClass('on');
            $selector.find('ul.indicator li').removeClass('on');
            $selector.find('ul.indicator li:eq('+ (n - 1) +')').addClass('on');
            slideNow = n;
            slidePrev = (n - 1) < 1 ? numSlide : (n - 1);
            slideNext = (n + 1) > numSlide ? 1 : (n + 1);
            timerId = setTimeout (function() {showSlide(slideNext);}, timerSpeed);
        };
    }; // end of main_visual_slide 
    
    
    $.fn.setSlideCover = function(options) {
        var settings = $.extend({
            classPrefix: 'scroll'
        }, options);

        this.each(function() {
            var $selector = $(this);
            var scrollTop = 0;
            var offsetTop = 0;
            var windowHeight = 0;
            var elementHeight = 0;
            var startShow = 0;
            var endShow = 0;
            var classPrefix = settings.classPrefix;

            slideCover();
            $(window).on('scroll resize', function() {
                slideCover();
            });

            function slideCover() {
                scrollTop = $(document).scrollTop();
                offsetTop = $selector.offset().top;
                windowHeight = $(window).height();
                elementHeight = $selector.outerHeight();
                startShow = elementHeight - windowHeight;
                endShow = offsetTop - windowHeight;

                if (scrollTop < startShow) {
                    $selector.removeClass(classPrefix + '-up ' + classPrefix + '-show');
                    $selector.addClass(classPrefix + '-down');
                } else if (scrollTop > endShow) {
                    $selector.removeClass(classPrefix + '-down ' + classPrefix + '-show');
                    $selector.addClass(classPrefix + '-up');
                } else {
                    $selector.removeClass(classPrefix + '-down ' + classPrefix + '-up ');
                    $selector.addClass(classPrefix + '-show');
                }
            }

        }); // end of each
    }  // end of definition of setSlideCover
    
    
    function gnbHover() {
        $('#header ul.gnb li a').on('mouseenter', function() {
            var index = $('#header ul.gnb li').index($(this).parent());
            $('#header ul.gnb li').removeClass('on');
            $('#header ul.gnb li:eq(' + index + ')').addClass('on');
            $('#header ul.gnb li a').on('mouseout', function() {
                $('#header ul.gnb li').removeClass('on');
            });
        });
    } // end of gnbHover
    
    
header()
main_visual_slide();
gnbHover();
$('#main .visual').setSlideCover();
    
}); // end of ready