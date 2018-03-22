$(function(){
	$.easing.def = 'easeOutElastic';//全局动画生效
	var m = 'easeOutElastic';//变量参数
	var oBtn = $('h3');

	oBtn.click(function(){
		$(this).next('ul').slideToggle().siblings('ul').slideUp();
	});
});
