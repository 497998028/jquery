/**
 * 全局插件：$.extend({插件内容});
 * 	调用：$.nav()
 *
 * 局部插件：$.fn.extend({插件内容});
 * 	调用：$('DOM').nav()
 */

;(function($){
	$.fn.extend({
		/**
		 * 导航 悬浮显示二级导航
		 */
		'nav': function(options){
			$(this).find('.nav').css({
				'list-style': 'none',
				'margin': 0,
				'padding': 0,
				'display': 'none',
			});

			$(this).find('.nav').parent().hover(function(){
				$(this).find('.nav').slideDown('normal');
			},function(){
				$(this).find('.nav').stop().slideUp('normal');
			});

			return this;
		},
		/**
		 * 表格隔行变色
		 */
		'table': function(options){
			var defaults = {
				evenRowClass: 'evenRow', //偶数行样式
				oddRowClass: 'oddRow', // 奇数行样式
				currentRowClass: 'currentRow', // 当前行样式
				eventType: 'mouseover', //事件1
				eventType2: 'mouseout', // 事件2
			}

			var options = $.extend(defaults, options);

			this.each(function(){
				var _this = $(this); // 私有的
				// 偶数行
				_this.find('tr:even').addClass(options.evenRowClass);

				// 奇数行
				_this.find('tr:odd').addClass(options.oddRowClass);

				// 鼠标悬浮
				_this.find('tr').bind(options.eventType, function(){
					$(this).addClass(options.currentRowClass);
				});
				_this.find('tr').bind(options.eventType2, function(){
					$(this).removeClass(options.currentRowClass);
				});
			});
		},
		/**
		 * tab 分页实现
		 */
		'tab': function(options){
			var defaults = {
				currentClass: 'current',
				tabNav: '.tabNav>li',
				tabContent: '.tabContent>div',
				eventType: 'click',
			}

			var options = $.extend(defaults, options);

			this.each(function(){
				var _this = $(this);
				_this.find(options.tabNav).bind(options.eventType, function(){
					$(this).addClass(options.currentClass).siblings().removeClass(options.currentClass);
					var index = $(this).index();

					_this.find(options.tabContent).eq(index).show().siblings().hide();
				});
			});

			return this;
		}
	});
})(jQuery);


// ------------------------------------ 网络版本 ---------------------------

/*

(function($) {
 var PluginName = function(element, options) {
        var defaults = {
            // 各种参数、各种属性
        };
        this.setting = $.extend({}, defaults, options);
        this.initialize();
    };
        PluginName.prototype = {
        initialize: function() {
        }
    }

    $.fn.pluginName = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // Return early if this element already has a plugin instance
            if (element.data('pluginName')) return element.data('pluginName');
            // Pass options to plugin constructor
            var pluginName = new PluginName(this, options);
            // Store plugin object in this element's data
            element.data('pluginName', pluginName);
        });
    };
})(jQuery);

*/


// ------------------------------------ 分隔符 ---------------------------

/**
 * 据说官方模板
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
/*
;(function($){
	$.fn.plugin = function(options){
		var defaults = {
			// 各种参数、各种属性
		}

		var options = $.extend(defaults, options);

		this.each(function(){
			// 实现功能的代码
		});
	};
})(jQuery);
*/

// ------------------------------------ 表格隔行变色应用
/*
;(function($){
	$.fn.table = function(options){
		var defaults = {
			evenRowClass: 'evenRow', //偶数行样式
			oddRowClass: 'oddRow', // 奇数行样式
			currentRowClass: 'currentRow', // 当前行样式
			eventType: 'mouseover', //事件1
			eventType2: 'mouseout', // 事件2
		}

		var options = $.extend(defaults, options);

		this.each(function(){
			var _this = $(this); // 私有的
			// 偶数行
			_this.find('tr:even').addClass(options.evenRowClass);

			// 奇数行
			_this.find('tr:odd').addClass(options.oddRowClass);

			// 鼠标悬浮
			_this.find('tr').bind(options.eventType, function(){
				$(this).addClass(options.currentRowClass);
			});
			_this.find('tr').bind(options.eventType2, function(){
				$(this).removeClass(options.currentRowClass);
			});
		});
	};
})(jQuery);
*/
// ------------------------------------ tab 实现应用
/*
;(function($){
	$.fn.tab = function(options){
		var defaults = {
			currentClass: 'current',
			tabNav: '.tabNav>li',
			tabContent: '.tabContent>div',
			eventType: 'click',
		}

		var options = $.extend(defaults, options);

		this.each(function(){
			var _this = $(this);
			_this.find(options.tabNav).bind(options.eventType, function(){
				$(this).addClass(options.currentClass).siblings().removeClass(options.currentClass);
				var index = $(this).index();

				_this.find(options.tabContent).eq(index).show().siblings().hide();
			});
		});

		return this;
	};
})(jQuery);
*/