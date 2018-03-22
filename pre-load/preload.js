/**
 * 图片预加载
 * * 面向对象的写法
 */
;(function($){

	function Preload(imgs, options){
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({}, Preload.DEFAULTS, options);

		if (this.opts.order === 'ordered') {
			// 有序加载
			this._ordered();
		}else{
			// 无序加载
			this._unoredered();
		};
	};
	//默认参数
	Preload.DEFAULTS = {
		order: 'unordered',
		each: null, //每张图片加载完毕后执行
		all: null, //所有图片加载完毕后执行
	};
	Preload.prototype._ordered = function(){
		var opts = this.opts,
			imgs = this.imgs,
			len = imgs.length,
			count = 0;

		load();

		function load(){
			var imgObj = new Image();

			$(imgObj).on('load error', function(){
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
	};

	Preload.prototype._unoredered = function(){ //无序加载
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs, function(i, src){
			if (typeof src != 'string') return;

			var imgObj = new Image();
			// 当图片加载成功会触发load事件；加载失败会触发error事件。
			$(imgObj).on('load error', function(){
				// $progress.html(Math.round((count + 1) / len * 100) + '%');
				opts.each && opts.each(count);
				if (count >= len-1) {
					// $('.loading').hide();
					// document.title = '1/' + len;
					opts.all && opts.all();
				};
				count++;
			});
			imgObj.src = src;
		});
	};

	$.extend({
		preload: function(imgs, opts){
			new Preload(imgs, opts);
		}
	});

})(jQuery);


/*
图片的预加载
1. 实例化图片对象；
2. 监听监听加载成功、失败事件；
3. 把正确的值赋给对象。

	var imgObj = new Image();

	$(imgObj).on('load error', function(){
	
	});

	imgObj.src = src;
 */