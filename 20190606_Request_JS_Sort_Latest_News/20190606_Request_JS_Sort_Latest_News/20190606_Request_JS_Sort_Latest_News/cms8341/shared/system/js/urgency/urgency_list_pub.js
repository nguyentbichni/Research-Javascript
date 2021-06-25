(function($) {
	$(function(){
		$.ajax({
			url : '/cgi-bin/urgency/getlist.cgi',
			cache : false,
			async : true,
			dataType: 'json',
			scriptCharset : 'UTF-8',
			success : function(ret) {
				var cnt = ret['count'];
				var list = ret['html'];
				ListStr = '';
				if (cnt == 0) {
					//ListStr += '<li>緊急情報がありません</li>';
					$('#tmp_emergency_m').hide();
				}
				else {
					var ListStr = '<ul>';
					for (var i=0; i<cnt; i++) {
						ListStr += '<li><a href="'+list[i]['file_name']+'">'+list[i]['title']+'</a></li>';
					}
					ListStr += '</ul>';
					$('#urgency_list').html(ListStr);
					$('#urgency_list').show();
					$('#tmp_emergency_m').show();
				}
				return false;
			},
			error : function(XMLHttpRequest, textStatus, errorThrow) {
				//alert("緊急情報の取得に失敗しました。");
				return false;
			}
		});
	});
})(jQuery);