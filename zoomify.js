/**

zoomify v 0.1

MIT License, see LICENSE.txt

Author: Trond Sørås, 2012

*/

/**
***********TODO************
Remove background when image has loaded


*/

(function($) {
	var methods = {
		init : function(options) {
			var settings = $.extend({
				'width': 500, //width of zoom window
				'height': 500, //height of zoom window
				'opacity': 0.3 //opacity of overlay square
			}, options);

			

			return this.each(function(i) {
				$(this).css('position','relative');
				var $this = $(this).children('img');
				if ($this.length != 1) {return};
				var thisId = 'z'+i;
				$this.load(function() {
					var image = $('<img/>', { //fullsize image
						'src': $this.parent().attr('href'),
						'class':'fullsize',
						css: {
							'position':'absolute',
							'top':0,
							'left':0,
							'width':'auto'
						}
					}).appendTo($('<div />', { //container for fullsize image
						'id':thisId,
						'class':'zoomed',
						css: {
							'background-image':'url("loading.gif")',
							'background-repeat':'no-repeat',
							'background-position':'center center',
							'position':'absolute', 
							'overflow':'hidden',
							'display':'none',
							'width':settings.width + 'px',
							'height':settings.height + 'px',
							'top': $this.offset().top,
							'left': $this.offset().left+$this.width()+20,
							'border': '1px solid #ccc'
						}
					}).insertAfter($this.parent()));
					$('<div/>', { //magnifier square on thumbnail
						css: { 
							'position':'absolute',
							'background-color':'#fff',
							'border': '1px solid #000',
							'opacity': settings.opacity,
							'width': 30,
							'height': 30,
							'display':'none',
							'top':0,
							'left':0,
							'z-index':1000
						}
					}).insertBefore($this);
					
					var div = $('#'+thisId);
					var thumb = $this.parent();
					var mag = $this.siblings('div');
					var zoomed_image = div.children('img');
					var thumbOffset;
					var thumbWidth = $this.width();
					var thumbHeight = $this.height();

					var fullWidth;
					var fullHeight;

					

					thumb.mouseenter(function(event) {
						div.css({
							'top': $this.offset().top,
							'left': $this.offset().left+$this.width()+20
						});
						thumbOffset = $this.offset();
						div.fadeIn();
						mag.fadeIn();
						fullWidth = zoomed_image.width(); 
						fullHeight = zoomed_image.height();
						mag.css({
							'width': function() {
								magWidth = thumbWidth / (fullWidth/settings.width);
								return magWidth-2; //subtract borders
							},
							'height': function() {
								magHeight = thumbHeight / (fullHeight/settings.height);
								return magHeight-2; //subtract borders
							}
						});
					}).mouseleave(function(event) {
						div.fadeOut();
						mag.fadeOut();
					}).mousemove(function(event) {
						
						var magLeft = event.pageX-thumbOffset.left-(magWidth/2);
						var magTop = event.pageY-thumbOffset.top-(magHeight/2);
						
						if (magLeft <= 0) magLeft = 0;
						if (magTop <= 0) magTop = 0;
						if (magLeft > thumbWidth-magWidth) magLeft = thumbWidth-magWidth;
						if (magTop > thumbHeight-magHeight) magTop = thumbHeight-magHeight;
						
						var zoomLeft = -(fullWidth/thumbWidth)*magLeft;
						var zoomTop = -(fullHeight/thumbHeight)*magTop;

						mag.css({
							'left':magLeft,
							'top':magTop
						});
						zoomed_image.css({
							'left':zoomLeft,
							'top':zoomTop
						});
					});

				});
			});
		}
	}

	$.fn.zoomify = function(method) {
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method "' + method + '" does not exist in jQuery.zoomify');
		}
	};
})(jQuery);