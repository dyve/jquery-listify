/**
  * jQuery listify plugin (version 1.0)
  *
  * http://code.google.com/p/jquery-listify
  *
  * @name  listify
  * @type  jQuery
  * @param Hash    settings             settings 
  * @param String  settings[selector]   selector to use
  * @param String  settings[hoverClass] class to apply to items that the mouse is over an item
  * @param String  settings[cursorType] cursor type to change to when the mouse is over an item
  * @param Bool    settings[hideLink]   whether or not to hide the link
  */
(function($) {
	$.fn.listify = function(options) {
		var settings = $.extend({}, $.fn.listify.defaults, options);
		$(settings.selector, this).each(function() {
			var anchor = $("a", this);
			if (anchor.length == 1) {
				anchor = anchor.get(0);
				var $anchor = $(anchor);
				var link = $anchor.attr("href");
				if (link) {
					if (settings.hideLink) {
						var text = anchor.html();
						$anchor.after(text).hide();	
					}
					$anchor.click(function() {
						$anchor.data(settings.busyToken, true);
						return true;
					});
					$(this)
						.css("cursor", settings.cursorType)
						.hover(
							function() { $(this).addClass(settings.hoverClass) },
							function() { $(this).removeClass(settings.hoverClass) }
						)
						.click(function(e) {
							if (!$anchor.data(settings.busyToken)) {
								$anchor.data(settings.busyToken, true);
								var events = $.data(anchor, 'events');
								var launch = true;
								if (events && events.click) {
									$anchor.click();
									launch = false;
								}
								$anchor.data(settings.busyToken, false);
								if (launch) {
									window.location.href = link;
								}
							}
						});
				}
			}
		});
		return this;
	};
	
	$.fn.listify.defaults = {
		hoverClass: "over",
		cursorType: "pointer",
		selector: "tbody tr",
		hideLink: false,
		busyToken: 'listify-busy'
	};
	
})(jQuery)