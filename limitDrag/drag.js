$(function(){
	/**
	 * 移动窗口的步骤
	 * 1. 按下鼠标左键
	 * 2. 移动鼠标
	 */
	// 鼠标按下，窗口跟着移动
	$('.inner').mousedown(function(e){				// 鼠标按下
		var positionDiv = $(this).offset();			// 获取div与浏览器left 和top 的距离
		var positionOuterDiv = $('.outer').offset();
		var distenceX = e.pageX - positionDiv.left + positionOuterDiv.left;	// 获取鼠标与元素left的距离
		var distenceY = e.pageY - positionDiv.top + positionOuterDiv.top;	// 获取鼠标与元素top的距离

		$(document).mousemove(function(e){			// 鼠标移动
			var x = e.pageX - distenceX;			// 获取元素距窗口left的距离：鼠标与文档的距离 - 鼠标与元素的距离
			var y = e.pageY - distenceY;			// 获取元素距窗口top的距离：同上
			// 禁止元素被移除窗口外
			if(x < 0){														// 元素距离文档小于0 就等于 0
				x = 0;
			}else if(x > $('.outer').width() - $('.inner').outerWidth(true)){	// 元素距离文档最大值 就等于最大值
				x = $('.outer').width() - $('.inner').outerWidth(true);
			}
			if (y < 0) {
				y = 0;
			}else if(y > $('.outer').height() - $('.inner').outerHeight(true)){
				y = $('.outer').height() - $('.inner').outerHeight(true);
			}
			// 执行写入
			$('.inner').css({
				'left':x,
				'top':y,
			});
		});

		// 鼠标松开解除事件
		$(document).mouseup(function(){			// 鼠标抬起
			$(document).off('mousemove');		//解除事件
		});
	});
		



		$('.weixin').click(function(){
	alert('222');
});
});