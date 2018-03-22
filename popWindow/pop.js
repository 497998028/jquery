$(function(){
	var oBtn = $('#show');
	var popWindow = $('.popWindow');
	var oClose = $('.popWindow h3 span');

	
	var browserWidth = $(window).width();					// 浏览器可视区域的宽度
	var browserHeight = $(window).height();					// 浏览器可视区域的高度
	var browserScrollTop = $(window).scrollTop();			// 浏览器纵向滚动条距上边界的值
	var browserScrollLeft = $(window).scrollLeft();			// 浏览器横向滚动条距左边界的值
	
	var popWindowWidth = popWindow.outerWidth(true);		// 弹出窗口的宽度
	var popWindowHeight = popWindow.outerHeight(true);		// 弹出窗口的高度
	// 计算
	var positionTop = browserHeight/2 - popWindowHeight/2 + browserScrollTop;	// top的值等于浏览器可视区域的高度度/2-弹出窗口的高度/2+滚动条上距离
	var positionLeft = browserWidth/2 - popWindowWidth/2 + browserScrollLeft;	// left的值等于浏览器可视区域的宽度/2-弹出窗口的宽度/2+滚动条左距离
	// 遮罩层
	var oMask = '<div class="mask"></div>';
	var maskWidth = $(document).width();
	var maskHeight = $(document).height();
	

	// 点击显示弹窗到屏幕中间
	oBtn.click(function(){
	var browserScrollTop = $(window).scrollTop();			// 浏览器纵向滚动条距上边界的值
	var browserScrollLeft = $(window).scrollLeft();			// 浏览器横向滚动条距左边界的值

		popWindow.show().animate({
			'left':positionLeft+'px',
			'top':positionTop+'px',
		},500);
		$('body').append(oMask);
		$('.mask').width(maskWidth).height(maskHeight);
	});

	
	// 动态的计算屏幕的宽高度，并调整目标弹窗
	$(window).resize(function(){
		if(popWindow.is(':visible')){
			// 动态获取宽高值
			browserWidth = $(window).width();
			browserHeight = $(window).height();
			positionLeft = browserWidth/2 - popWindowWidth/2 + browserScrollLeft;
			positionTop = browserHeight/2 - popWindowHeight/2 + browserScrollTop;
			// 动态填充位置
			popWindow.animate({
				'left':positionLeft+'px',
				'top':positionTop+'px'
			},500);
		}
	});

	// 动态计算滚动条的距离
	$(window).scroll(function(){
		if(popWindow.is(':visible')){
			browserScrollTop = $(window).scrollTop();
			browserScrollLeft = $(window).scrollLeft();
			positionTop = browserHeight/2 - popWindowHeight/2 + browserScrollTop;
			positionLeft = browserWidth/2 - popWindowWidth/2 + browserScrollLeft;
			popWindow.animate({
				'left':positionLeft+'px',
				'top':positionTop+'px'
			},500).dequeue();
		}
	});
	
	$('.popWindow h3').mousedown(function(e){
	 	var positionDiv = $('.popWindow').offset();	// 获取div元素与 浏览器left和top的距离
	 	var distenceX = e.pageX - positionDiv.left;	// 获取鼠标与 元素left的距离
	 	var distenceY = e.pageY - positionDiv.top;	// 获取鼠标与 元素top的距离
	 	// alert(distenceY)
	 	$(document).mousemove(function(e){
	 		var x = e.pageX - distenceX;			// 获取元素距窗口left的距离：鼠标与文档的距离 - 鼠标与元素的距离
			var y = e.pageY - distenceY;			// 获取元素距窗口top的距离：同上
			// 执行写入
			$('.popWindow').css({
				'left':x,
				'top':y,
			});
	 	});

	 	// 鼠标松开解除事件
		$(document).mouseup(function(){			// 鼠标抬起
			$(document).off('mousemove');		//解除事件
			$(document).off('mouseup');
		});
	});

	oClose.click(function(){
		popWindow.hide();
		$('.mask').remove();
	});

});