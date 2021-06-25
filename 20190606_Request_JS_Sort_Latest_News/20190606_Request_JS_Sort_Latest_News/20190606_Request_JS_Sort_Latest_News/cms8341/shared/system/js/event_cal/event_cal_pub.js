/**
 * イベントカレンダー用js
 */
// onload
jQuery(function() {
	// 大型カレンダーの帯部分にmouseover
	jQuery('.events').live('mouseover',function(e){
		var target_id = jQuery(this).attr('id');
		if (target_id != null) {
			var target_class = target_id.slice(0, target_id.indexOf('-'));
			jQuery('.'+target_class+' a:first-child').addClass('active');
		}
	});
	// 大型カレンダーの帯部分mouseout
	jQuery('.events').live('mouseout',function(e){
		var target_id = jQuery(this).attr('id');
		if (target_id != null) {
			var target_class = target_id.slice(0, target_id.indexOf('-'));
			jQuery('.'+target_class+' a:first-child').removeClass('active');
		}
	});
	
	// ミニマップがある場合のみ
	if(jQuery("#tmp_event_cal")[0] != undefined){
		var elemCalendar = jQuery("#tmp_event_cal");
		var elemFooter = jQuery("#event_cal_list_end_position");
		var targetHeight = elemCalendar.outerHeight(true);
		var targetTop = elemCalendar.offset().top;
		jQuery(window).scroll(function(){
			var scrollTop = jQuery(this).scrollTop();
			if(elemCalendar.size() == 0) return;
			if(scrollTop > targetTop){
				var footerTop = elemFooter.offset().top;
				if(scrollTop + targetHeight > footerTop){
					customTopPosition = footerTop - (scrollTop + targetHeight)
					elemCalendar.css({position: "fixed", top:  customTopPosition + "px"});
				} else {
					elemCalendar.css({position: "fixed", top: "10px"});
				}
				// ie7の場合は、leftを設定
				if(jQuery.browser.msie && jQuery.browser.version == 7){
					var offset_left = jQuery("#tmp_event_calendar_list").offset().left;
					elemCalendar.css({left: offset_left});
				}

			} else {
				elemCalendar.css({position: "static", top: "auto"});
				// ie7の場合は、leftを戻す
				if(jQuery.browser.msie && jQuery.browser.version == 7){
					elemCalendar.css({left: "auto"});
				}
			}
		});

		// ie7の場合は、resize時にleftを設定
		if(jQuery.browser.msie && jQuery.browser.version == 7){
			jQuery(window).resize(function(){
				var offset_left = jQuery("#tmp_event_calendar_list").offset().left;
				elemCalendar.css({left: offset_left});
			});
		}

	}
});
