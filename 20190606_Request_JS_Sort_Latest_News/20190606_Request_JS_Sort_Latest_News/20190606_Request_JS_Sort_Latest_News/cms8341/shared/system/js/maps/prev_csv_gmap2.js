/**
 * GMap2クラス
 * @param objId GooleMaps表示オブジェクトのID名:String
 * @param objData 情報ウィンドウ内要素格納オブジェクト:Object
 * @param objSetting 設定値格納オブジェクト:Object
 */
var GDMap2 = function(objId,latitude,longitude){
	return false;
}

/**
 * 処理関数郡の宣言
 * GoogleMaps表示に使用する関数郡
 */
GDMap2.prototype = {
	/**
	 * キーワード検索を行う
	 * @param キーワード
	 * @return true:処理終了
	 */
	searchKeyword : function(keyword){
		return false;
	},

	/**
	 * 表示範囲内の検索処理
	 * 表示範囲内で検索を行った際の処理
	 * @param purpose_id クリックされたボタンのID
	 * @return true:処理終了
	 */
	reSearch : function(purpose_id){
		return false;
	}
}
