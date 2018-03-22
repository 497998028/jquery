// window.onload = function(){
$(function(){
	// 瀑布流，一定要在img load 里面写，不然高度会不正常
	$('img').load(function(){
		var box = $('.box');
		// 存放每一列的高度值，以数组的形式
		var boxHeight = {
			leftBox:[],
			centerBox:[],
			rightBox:[],
		};

		for(var i=0; i<box.length; i++){
			var now = i%3;		//now的值为0、1、2

			switch(now){
				case 0:
					box.eq(i).css('left','10px');
					// 对象名称，以点的形式访问内部
					boxHeight.leftBox.push(box.eq(i).height());
					var now2 = Math.floor(i/3); //向下取整

					if(now2 == 0){
						box.eq(i).css('top','0');
					}else{
						var total = 0;
						for(var j=0; j<now2; j++){
							total += boxHeight.leftBox[j]+10;
						}
						box.eq(i).css('top', total+'px');
					}
				break;

				case 1:
					box.eq(i).css('left','270px');
					boxHeight.centerBox.push(box.eq(i).height());
					var now2 = Math.floor(i/3); //向下取整

					if(now2 == 0){
						box.eq(i).css('top','0');
					}else{
						var total = 0;
						for(var j=0; j<now2; j++){
							total += boxHeight.centerBox[j]+10;
						}
						box.eq(i).css('top', total+'px');
					}
				break;

				case 2:
					box.eq(i).css('left','530px');
					boxHeight.rightBox.push(box.eq(i).height());
					var now2 = Math.floor(i/3); //向下取整

					if(now2 == 0){
						box.eq(i).css('top','0');
					}else{
						var total = 0;
						for(var j=0; j<now2; j++){
							total += boxHeight.rightBox[j]+10;
						}
						box.eq(i).css('top', total+'px');
					}
				break;
			}

			// 同switch效果，但效率没上面快。
			// if(now == 0){
			// 	box.eq(i).css('left','10px');
			// }else if(now == 1){
			// 	box.eq(i).css('left','270px');
			// }else if(now == 2){
			// 	box.eq(i).css('left','530px');
			// }
		}
	});
});
// }
