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