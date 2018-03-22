$(function(){
	var oBtn = $('span');
	var oContent = $('ul');

	oBtn.click(function(){

		// if(oContent.is(':visible')){
		// 	oContent.slideUp();
		// }else{
		// 	oContent.slideDown();
		// }
		// 下面一句话搞定
		oContent.slideToggle();
	});


	/**
	 * 1. 点击更多显示ul列表，再次点击影藏。
	 * 		判断元素是否是可见的执行影藏，否则显示。
	 * 	
	 */
});