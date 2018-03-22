$(function(){
	var menu = $('.menu');

	menu.hover(function(){
		$(this).children('ul').show();
	},function(){
		$(this).children('ul').hide();
	});

	/**
	 * 悬浮到当前元素，显示它的子元素。
	 * 放到它子元素身上时，又变成了当前元素，再次显示它的子元素。
	 * 在html结构合理的情况下，可以无限循环下去。
	 */
});