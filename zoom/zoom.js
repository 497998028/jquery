/**
 * 放大镜
 * 
 * 1、有3个框架div，一个显示小图、第二个显示中图、第三个显示大图。
 * 2、
 */

$(function(){
	var smallIngLi = $('.wrapSallImg ul li');			//获取小图项
	var smallIngLiLenght = smallIngLi.length;			//获取图片项个数
	var smallIngLiWidth = smallIngLi.outerWidth(true);	//获取小图项的宽，包括外边距
	var smallIngUl = $('.wrapSallImg ul');				//获取小图项的外套
	var leftBtn = $('span.left');						//左边按钮
	var rightBtn = $('span.right');						//右边按钮
	var now = 0;										//定时器
	var zoomMiddleDiv = $('.zoomMiddle');				//中图外套

	/** 
	 * [鼠标移入小图，执行下面]
	 * 		添加当前项 class，并移除其他兄弟的当前项 class；
	 * 		获取当前小图的URL 并给中图和大图，添加上。
	 */
	smallIngLi.mouseover(function(){
		$(this).addClass('current').siblings().removeClass('current');
		var thisSrc = $(this).children().attr('src');
		$('.zoomMiddle img').attr('src',thisSrc);
		$('.zoomLarge img').attr('src',thisSrc);
	});

	/**
	 * [右边按钮，点击执行]
	 * 		点击右边按钮时，移除左边按钮的禁止点击class，
	 * 		当定时器大于或等于可以动最大值 （图片最大数减去显示数，剩下可以动的图片数量），
	 * 		让定时器等于最大值，并且添加禁止点击 class；
	 * 		否则，定时器自增，小图的外套向左移动（小图项的宽乘以定时器的个数）。
	 * 	* 定时器的数量，小图向左移动的数量。
	 * 		
	 */
	rightBtn.click(function(){
		//当now=2 ,停止滚动
		leftBtn.removeClass('disable');
		if(now >= smallIngLiLenght-4){
			now=smallIngLiLenght-4;
			$(this).addClass('disable');
		}else{
			now++;
			smallIngUl.animate({'left':-now*smallIngLiWidth},300);
		}
	});
	/**
	 * [左边按钮，点击执行]
	 * 		定时器等于0的时候，添加禁止点击样式；（表示左边没有图片可以移动）
	 * 		否则，定时器自减，移除禁止点击 class，(表示可以点击)
	 * 		小图项外套向右边移动。（不懂这里是累加，为什么不会超上限移过头呢？）
	 */
	leftBtn.click(function(){

		if(now == 0){
			now =0;
			$(this).addClass('disable');
		}else{
			now--;
			rightBtn.removeClass('disable');
			smallIngUl.animate({'left':'+='+smallIngLiWidth},300);
		}
	});

	/**
	 * [鼠标移入中图执行]
	 * 		表示放大镜的遮罩显示；实际的大图外套显示。
	 * 		获取鼠标在中图的位置。
	 * 		限制鼠标在中图的坐标值超出中图，鼠标是可以移出，但坐标值就被限制了。
	 * 			小于或等于0就等于0，大于最大宽就等于最大宽(中图的宽减去遮罩层的宽)，y轴同理
	 * 		获取鼠标在中图的坐标比例尺，0~1
	 * 			当前值除以最大值。
	 * 		给大图添加位置数值
	 * 			鼠标比例尺乘以大图的宽，（最大值时，就是大图移动了一倍）（大图的宽，还需要减去外套的宽，属于优化）
	 * * 鼠标在x轴距窗口左的距离，减去中图距窗口左的距离，剩下的就是，鼠标在中图距中图左的距离，再减去遮罩层的一半，就会在遮罩层中间。
	 * * y轴同理，主要是获取鼠标在中图的位置。
	 * * 因为大图框架比大图小，溢出右被隐藏。所以大图只有在外套内的部分会被显示，随着鼠标在中图的移动，大图的坐标值也会被移动（最大移动一倍）。
	 * * 最后就是，鼠标移出中图，大图也隐藏了。
	 */
	zoomMiddleDiv.mousemove(function(e){
		$('.mask').show();
		$('.zoomLarge').show();
		zoomMiddleDivOffset = zoomMiddleDiv.offset(); //中图在当前窗口的位置
		var x = e.pageX - zoomMiddleDivOffset.left - $('.mask').width()/2;
		var y = e.pageY - zoomMiddleDivOffset.top - $('.mask').height()/2;
		if(x <= 0){
			x=0;
		}else if(x >= zoomMiddleDiv.width()-$('.mask').width()){
			x = zoomMiddleDiv.width()-$('.mask').width();
		}
		if(y<=0){
			y = 0;
		}else if(y >= zoomMiddleDiv.height()-$('.mask').height()){
			y=zoomMiddleDiv.height()-$('.mask').height();
		}

		// 比例尺
		var percentageX = x/(zoomMiddleDiv.width()-$('.mask').width());
		var percentageY = y/(zoomMiddleDiv.height()-$('.mask').height());
		// 放大镜的移动
		$('.zoomLarge img').css({
			'left':-percentageX*(600-$('.zoomLarge').width()),
			'top':-percentageY*(600-$('.zoomLarge').width()),
		});

		$('input').val(percentageX+' , '+percentageY);
		$('.mask').css({
			'left':x,
			'top':y,
		});
	});

	// 鼠标移出，遮罩层、大图隐藏
	zoomMiddleDiv.mouseout(function(e){
		$('.mask').hide();
		$('.zoomLarge').hide();
	});
});