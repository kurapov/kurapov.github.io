$(function () {
	$('.tooltip_target').hover(function (e) {
		$(this).children('.tooltip').show();
		e.preventDefault();
	}, function (e) {
		$(this).children('.tooltip').hide();
	})


	$('.tabs__caption li').on('click', function (e) {
		$(this).addClass('active')
		.siblings().removeClass('active');

		$(this).closest('div.tabs')
		.find('div.tabs__content').removeClass('active')
		.eq($(this).index()).addClass('active');
	})
});