(function($){

	/**
	 * Covert char fullsize to haftsize
	 * @return Char
	 */
	function convertToHalfWidth(fullWidthNum) {
		return fullWidthNum.replace(/[\uFF10-\uFF19]/g, function(m) {
			return String.fromCharCode(m.charCodeAt(0) - 0xfee0);
		});
	}

	$(function() {
		$("#id_search_btn").click(function(e) {
			var pageId = convertToHalfWidth($("#id_search_txt").val());
			if (pageId.length === 0) {
				alert("ページIDが指定されていません。");
			} else if (isNaN(pageId)) {
				alert("ページIDが不正です。");
			} else {
				$.ajax({
					url : '/cgi-bin/search_page/search_page.cgi',
					type : "POST",
					cache : false,
					async : true,
					dataType: 'json',
					data : { page_id : pageId },
					scriptCharset : 'UTF-8',
					success : function(ret) {
						if (ret.result_code == 1) {
							window.location.href = ret.path;
						} else {
							alert("対象のページが見つかりませんでした。");
						}
					},
					error : function(XMLHttpRequest, textStatus, errorThrow) {
						alert("ページIDが不正です");
						return false;
					}
				});
			}
			e.preventDefault();
		});
	});

})(jQuery);