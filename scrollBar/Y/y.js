$(function(){
	/**
	 * 
	 */
	// 鼠标按下，窗口跟着移动
	 $('.inner').mousedown(function(e){				// 鼠标按下
	 	var positionDiv = $(this).offset();			// 获取div与浏览器left 和top 的距离
	 	var positionOuterDiv = $('.outer').offset();
	 	var distenceY = e.pageY - positionDiv.top + positionOuterDiv.top;	// 获取鼠标与元素top的距离

	 	$(document).mousemove(function(e){			// 鼠标移动
			var y = e.pageY - distenceY;			// 获取元素距窗口top的距离：同上
			// 禁止元素被移除窗口外
			if (y < 0) {
				y = 0;
			}else if(y > $('.outer').height() - $('.inner').outerHeight(true)){
				y = $('.outer').height() - $('.inner').outerHeight(true);
			}
			// 执行写入
			$('.inner').css({
				'top':y,
			});

			var percentage = y/($('.outer').height() - $('.inner').outerHeight(true));
			var dragHeight = $('.innerContent').height() - $('.outerContent').height(); // 获取目标域可移动的高度。
			$('.innerContent').css('top',-percentage*dragHeight);
		});

	 	// 鼠标松开解除事件
		$(document).mouseup(function(){			// 鼠标抬起
			$(document).off('mousemove');		//解除事件
		});
	 });

	 // 鼠标滚动事件
	var speed = 0;
	$('.outerContent').mousewheel(function(e, d){
		var innerTop = parseInt($('.inner').css('top')); //获取滚动条高度整数值
		var percentage = innerTop/($('.outer').height() - $('.inner').outerHeight(true)); //获取滚动条高度百分比 0到1.
		var dragHeight = $('.innerContent').height() - $('.outerContent').height(); // 获取目标域可移动的高度。
		// alert(percentage);
		if (d == -1) {
			speed++;
			$('input').val(speed);
			if(speed >=47){
				speed =47;
			}
			$('.inner').css('top',speed*10+'px');
			$('.innerContent').css('top', -percentage*dragHeight);
		}else{
			speed--;
			$('input').val(speed);
			if(speed <= 0){
				speed = 0;
			}
			$('.inner').css('top',speed*10+'px');
			$('.innerContent').css('top', -percentage*dragHeight);
		}
	});
});