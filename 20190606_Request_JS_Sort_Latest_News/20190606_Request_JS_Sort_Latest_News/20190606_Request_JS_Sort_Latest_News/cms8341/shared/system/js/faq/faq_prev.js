/**
 * コンストラクタ
 * @param category_id カテゴリーID
 * @param prev_cnt 表示件数
*/
var faqPublish = function(category_id,prev_cnt){
	this.path   = "/faq";
	this.CsvData = new Array();
	this.category_id = category_id;
	this.prev_cnt = prev_cnt;
}

/**
 * プロトタイプ
*/
faqPublish.prototype = {
	/**
	 * CMS内で参照されるダミーデータ
	 * 
	 * @return false;
	 */
	LoadData : function(){
		return false;
	}
}
