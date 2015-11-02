jQuery(document).ready(function($){
	var owl = $(".owl-carousel").owlCarousel({
		items: 1,
		responsiveRefreshRate: 10,
		nav: true,
		dots: true,
		smartSpeed: 318
	});

	$(document).keydown(function(event) {
		if (event.which === 37) {
			owl.trigger('prev.owl.carousel');
			event.preventDefault();
		} else if (event.which === 39) {
			owl.trigger('next.owl.carousel');
			event.preventDefault();
		}
	});

	$('h1, h2, figcaption').widowFix();

	$('.content').fitVids();

	function toggleMenu() {
		var $menu = $('.primary-nav');
		var $body = $('body');
		var height = $menu.height();
		if ($body.hasClass('js-active')) {
			return $body
				.css('transform', 'translateY(0)')
				.removeClass('js-active');
		} else {
			return $body
				.css('transform', "translateY(" + height + "px)")
				.addClass('js-active');
		}
	};

	$("[href='#nav']").click(function(event){
		event.preventDefault();
		return toggleMenu();
	});
});
