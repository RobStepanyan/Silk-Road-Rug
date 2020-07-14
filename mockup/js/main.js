var navbarCollapse = function () {
    if ($(".navbar").offset().top > 10) {
        $(".navbar").addClass("navbar-shrink");
    } else {
        $(".navbar").removeClass("navbar-shrink");
    }
};
navbarCollapse();
$(window).scroll(navbarCollapse);

function scrollToTarget() {
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate({
                    scrollTop: target.offset().top - $('a.navbar-brand').outerHeight(true),
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    })
}
scrollToTarget()
$(document).resize(scrollToTarget())
$(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
});

$(document).ready(() => {
    $('.carousel').slick({
        cssEase: 'ease',
        // autoplay: true,
        // autoplaySpeed: 5000,
        adaptiveHeight: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
    });
});

// SB Sidebar
// Add active state to sidbar nav links
var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
$("#layoutSidenav_nav .sidenav a.nav-link").each(function () {
    if (this.href === path) {
        $(this).addClass("active");
    }
});

// Toggle the side navigation
$("#sidebarToggle").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
});

$('[data-toggle-enabled="true"] .dropdown-item').click(function () {
    $(this).parent().parent().find('.active').removeClass('active');
    $(this).addClass('active');

    if ($(this).parent().find('.dropdown-header')) {
        let header, item;
        header = $(this).parent().find('.dropdown-header').text()
        item = $(this).text()
        $(this).parent().parent().parent().find('[data-toggle="dropdown"]').text(header + ' ' + item);
    } else {
        $(this).parent().parent().find('[data-toggle="dropdown"]').text($(this).text());
    }

});
