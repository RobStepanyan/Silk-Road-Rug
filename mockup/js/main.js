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

// Toggle the shop filter sidebar
$("#filterToggle").on("click", function (e) {
    e.preventDefault();
    $("body").toggleClass("filter-toggled");
});

// Dropdown button title change on click
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
