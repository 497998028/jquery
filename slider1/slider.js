// 如果想要一个元素运动起来，一般情况下，这个元素需要具有 position属性  absolute/relative
$(function(){
	var oul = $('.wrap ul'); //获取元素
	var oulHtml = oul.html();
	oul.html(oulHtml+oulHtml); //字符串相加，速度块
	var timeId = null;

	var ali = $('.wrap ul li');
	var aliWidth = ali.eq(0).width();	//在次刷新页面这里返回0？？？？？？？？？？？？？？
	var aliSize = ali.size();
	var ulWidth = aliWidth*aliSize;
	oul.width(ulWidth);
	alert(ulWidth);

	var speed = 2;

	function slider(){
		if(speed < 0){
			if (oul.css('left') == -ulWidth/2+'px') {		 //800 改为 ulWidth/2
				oul.css('left','0');
			}
			oul.css('left','+=-2px');
		}
		if(speed > 0){
			if (oul.css('left') == '0px') {
				oul.css('left', -ulWidth/2+'px');			//800 改为 ulWidth/2
			}
			oul.css('left', '+='+speed+'px');
		}
	}
	// alert(oul.html());
	// 每隔一段时间执行改函数里的代码
	timeId = setInterval(slider,30);

	// 鼠标移至，清除运动
	$('.wrap').mouseover(function(){
		// 函数作用，清除定时器。
		clearInterval(timeId);
		// alert('提示');
	});
	$('.wrap').mouseout(function(){
		// 每隔一段时间执行改函数里的代码
		timeId = setInterval(slider,30);
	});

	$('.goLeft').click(function(){
		speed = -2;
	});
	$('.goRight').click(function(){
		speed = 2;
	});
















/*
+=		累加
a+=1
a=a+a

setInterval(fn,int)		每隔一段时间执行改函数里的代码







*/
});