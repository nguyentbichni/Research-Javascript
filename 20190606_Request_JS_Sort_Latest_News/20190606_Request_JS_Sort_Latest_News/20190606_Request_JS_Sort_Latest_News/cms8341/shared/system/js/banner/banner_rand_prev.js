var KoukokuPublish = function(){
	//ルートからのパス
	this.path   = "/banner";
	//CSVデータ
	this.CsvData = new Array();
}

KoukokuPublish.prototype = {
	/**
	 * CMS内で参照されるダミーデータ
	 * 
	 * @param banner_area_id バナー表示エリアのID
	 * @param area_id 広告エリアのID
	 */
	LoadData : function(banner_area_id,area_id){
		return false;
	}
}
