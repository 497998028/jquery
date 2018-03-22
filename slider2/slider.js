$(function(){
	
	var oul = $('.warp ul');
	var ali = $('.warp ul li');
	var numLi = $('.warp ol li'); // 获取序列层组
	var aliWidth = $('.warp ul li').eq(0).width(); // 获取一张图片的宽。
	var _now = 0;	// 控制序列样式的计数器
	var _now2 = 0;	// 控制图片运动距离的计数器
	var timeId = null;
	var aimg = $('.warp ul img'); // 获取图片元素组
	var op = $('.warp p');
	 
	// 点击序列跳转到对应图
	numLi.click(function(){
		var index = $(this).index();
		_now =index;
		_now2 = index;

		var imgAlt = aimg.eq(_now).attr('alt');
		op.html(imgAlt);

		$(this).addClass('current').siblings().removeClass();
		oul.animate({'left':-aliWidth*index},500);
	});
	
	/**
	 * 图片运动函数
	 * @return 无返回值
	 */
	
	function slider(){
		if (_now == numLi.size()-1) {
			ali.eq(0).css({
				'position':'relative',
				'left':oul.width(),
			});
			_now = 0;
		}else{
			_now++;
		}

		_now2++;

		numLi.eq(_now).addClass('current').siblings().removeClass();
		// 获取图片 alt的值，添加到p标签
		var imgAlt = aimg.eq(_now).attr('alt');
		op.html(imgAlt);

		oul.animate({'left':-aliWidth*_now2},500,function(){
			if (_now == 0) {
				ali.eq(0).css('position','static');
				oul.css('left',0);
				_now2 = 0;
			}
		});
	}


	// 动画
	timeId = setInterval(slider,1500);
	// 鼠标移入移出，图片暂停，继续
	$('.warp').hover(function(){
		clearInterval(timeId);
	},function(){
		timeId = setInterval(slider,1500);
	});
	
});


