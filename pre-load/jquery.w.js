/**
 * 慢鸟 个人开发专用jQuery插件库
 * * 主要应对开发中遇到的比较普遍、复用性高的功能点进行封装。
 * 规范：
 * 		变量定义在使用域的最顶端
 * 		变量及函数名使用驼峰命名法
 * 		引号。html使用双引号；JavaScript使用单引号。
 */
;(function($, window, document, undefined){
	$.fn.extend({
		/**
		 * 横幅（焦点图）
		 * * 自动补全指示器
		 * * 自动补全上一张、下一张标签
		 */
		'wSlide': function(options){
			var defaults = {
				'duration': 500,// 滑动动画时长
				'interval': 1500,// 间隔时间
				'isIndicator': true, // 是否显示指示器
				'isTab': true, // 是否显示标签
			};
			var options = $.extend(defaults, options);

			this.addClass('w-slide');
			var itemWrap = this.children('ul'); // 外套
			var item = itemWrap.children('li'); //轮播的项目
			var itemWidth = item.eq(0).width(); // 获取一项目的宽。
			var currentIndicatorIndex = 0;	// 控制指示点样式的计数器(当前指示点索引)
			var currentItemIndex = 0;	// 控制项目运动距离的计数器（当前项目索引）
			var timeId = null;
			// 指示点补全
			var indicatorHTML = '';
			for (var i = 0; i < item.length; i++) {
				if (i == 0) {
					indicatorHTML += '<li class="current"></li>';
				}else{
					indicatorHTML += '<li class=""></li>';
				}
			};
			this.append('<ol '+(options.isIndicator == true ? '': 'style="display:none;"')+'>' + indicatorHTML + '</ol>'); // 添加序列图标
			var indicator = this.children('ol').children('li'); // 获取指示点

			// 点击序列跳转到对应图
			indicator.click(function(){
				var index = $(this).index();
				currentIndicatorIndex =index;
				currentItemIndex = index;
				$(this).addClass('current').siblings().removeClass();
				itemWrap.animate({'left':-itemWidth * index}, options.duration);
			});
			// 上一项目、下一项目
			if (options.isTab) {
				this.append('<span class="w-slide-prev"></span><span class="w-slide-next"></span>');
				var prev = $('.w-slide-prev');
				var next = $('.w-slide-next');
				prev.click(function(){
					if (currentIndicatorIndex == 0 || currentItemIndex == 0) {
						currentIndicatorIndex = indicator.size()-1;
						currentItemIndex = item.size()-1;
					}else{
						currentIndicatorIndex--;
						currentItemIndex--;
					};
					indicator.eq(currentIndicatorIndex).addClass('current').siblings().removeClass();
					itemWrap.animate({'left':-itemWidth * currentItemIndex}, options.duration);
				});
				next.click(function(){
					if (currentIndicatorIndex == indicator.size()-1|| currentItemIndex == item.size()-1) {
						currentIndicatorIndex = 0;
						currentItemIndex = 0;
					}else{
						currentIndicatorIndex++;
						currentItemIndex++;
					};
					indicator.eq(currentIndicatorIndex).addClass('current').siblings().removeClass();
					itemWrap.animate({'left':-itemWidth * currentItemIndex}, options.duration);
				});
				this.bind('mouseover',function(){
					prev.css({'opacity': 0.5});
					next.css({'opacity': 0.5});
				});
				this.bind('mouseout', function(){
					prev.css({'opacity': 0.1});
					next.css({'opacity': 0.1});
				});
			};
			
			
			/**
			 * 图片运动函数
			 * @return 无返回值
			 */
			function slider(){
				if (currentIndicatorIndex == indicator.size()-1) {
					item.eq(0).css({
						'position':'relative',
						'left':itemWrap.width(),
					});
					currentIndicatorIndex = 0;
				}else{
					currentIndicatorIndex++;
				}
				indicator.eq(currentIndicatorIndex).addClass('current').siblings().removeClass();
					
				currentItemIndex++;
				itemWrap.animate({'left':-itemWidth*currentItemIndex},options.duration,function(){
					if (currentIndicatorIndex == 0) {
						item.eq(0).css('position','static');
						itemWrap.css('left',0);
						currentItemIndex = 0;
					}
				});
			}

			// 动画
			timeId = setInterval(slider,options.interval);
			// 鼠标移入移出，图片暂停，继续
			this.hover(function(){
				clearInterval(timeId);
			},function(){
				timeId = setInterval(slider,options.interval);
			});

			return this;
		},
	});

	$.extend({
		// 图片预加载
		imgPreLoad: function(images, options){
			new ImgPreLoad(images, options);
		},
	});

	/**
	 * 图片 - 预加载
	 * 	this.orderly() 有序预加载方法
	 *  this.unorderly() 无序预加载方法
	 * @param  obj|str 	imgs 		图片组
	 * @param  obj 		options 	参数
	 * @return {[type]}      [description]
	 */
	function ImgPreLoad(images, options){
		this.defaults = {
			isOrderly: false,	// 是否有序加载
			each: null,			// 每张图片加载完毕后执行
			all: null,			// 所有图片加载完毕后执行
		};
		this.options = $.extend({}, this.defaults, options);
		this.images = (typeof images === 'string') ? [images] : images;

		if (this.options.isOrderly) {
			this.orderly();		// 调用有序预加载
		}else{
			this.unorderly();	// 调用无序预加载
		};
	};
	
	ImgPreLoad.prototype = {
		orderly: function(){
			var opts = this.options,
				imgs = this.images,
				len = imgs.length,
				count = 0;

			load();
			// 这里有没有什么方法，把函数定义在原型链上调用；或不定义成函数？？？
			function load(){
				var imgObj = new Image();

				$(imgObj).on('load error', function(){
					console.log('a');
					opts.each && opts.each();
					if (count >= len) {
						// 所有图片已近加载完毕
						opts.all && opts.all();
					}else{
						load();// 再次调用自身，直到加载到最大数
					};
					count++;
				});

				imgObj.src = imgs[count];
			}
		},
		unorderly: function(){
			var imgs = this.images,
				opts = this.options,
				len = imgs.length,
				count = 0;

			$.each(imgs, function(i, src){
				if (typeof src != 'string') return;
				var imgObj = new Image();
				// 当图片加载成功后触发load事件、失败后触发error事件。
				$(imgObj).on('load error', function(){
					opts.each && opts.each(count);
					if (count >= len-1) {
						opts.all && opts.all();
					};
					count++;
				});
				imgObj.src = src;
			});
		},
	};
})(jQuery, window, document);