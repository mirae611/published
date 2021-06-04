'use strict';

$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});

$(document).ready(function() {
    //nav
    $('a.nav_btn').on('click', function() {
        $('nav, main').toggleClass('off');
    });

    //nav menu
    navMenu();
    function navMenu() {
        $('ul.nav_menu > li').each(function() {
            if($(this).find('li').length > 0) {
                $(this).find('> a').append('<i class="fas fa-angle-down arrow"></i>');
            }
        });
        $('ul.nav_menu > li > a').on('click', function() {
            if($(this).parent().hasClass('open')) {
                $(this).parent().find('> ul').css({'height': 0});
                $(this).parent().removeClass('open');
            } else {
                var height = 0;
                $(this).parent().find('> ul > li').each(function() {
                    height += $(this).outerHeight();
                });
                $(this).parent().find('> ul').css({'height': height});
                $(this).parent().addClass('open');
            }
            setTimeout(function() {myScroll.refresh();}, 200);
        });
        
        $('nav').on('mouseleave', function() {
            $('ul.nav_menu > li:not(.on) > ul').css({'height': 0});
            $('ul.nav_menu > li:not(.on)').removeClass('open');
            setTimeout(function() {
                myScroll.refresh();
            }, 300);
        });
        
    } // end of navMenu
    
}); // end of ready

//IScroll적용
var myScroll;

function loaded () {
    myScroll = new IScroll('#wrapper', {
        scrollbars: true,
        mouseWheel: true,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: false
    });
    return myScroll;
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
