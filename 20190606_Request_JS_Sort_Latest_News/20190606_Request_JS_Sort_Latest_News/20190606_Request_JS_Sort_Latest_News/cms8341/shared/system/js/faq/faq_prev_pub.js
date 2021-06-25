/**
 * コンストラクタ
 * @param category_id カテゴリーID
 * @param prev_cnt 表示件数
*/
var faqPublish = function(category_id,prev_cnt){
	this.path   = '<!--%FAQ_CSV_DIR%-->';
	this.CsvData = new Array();
	this.category_id = category_id;
	this.prev_cnt = prev_cnt;
}

/**
 * プロトタイプ
*/
faqPublish.prototype = {
	/**
	 * CSVデータをロードする
	 * CSVデータをAjaxを使いロードする
	 */
	LoadData : function(){
		var class_id = this;
		var xmlhttp = createXMLHttpRequest();
		if(xmlhttp){
			xmlhttp.onreadystatechange = function(){
				//アクセス完了
				if(xmlhttp.readyState == 4){
					//取得成功
					if(xmlhttp.status == 200) class_id.getData(xmlhttp.responseText);
				}
			}
		}
		else alert("ajax error");
		//リクエスト処理
		xmlhttp.open('GET',this.path + '/' + this.category_id + '.csv',true);
		xmlhttp.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
		xmlhttp.send(null);
	},
	/**
	 * FAQ表示処理
	 * FAQを表示する
	 * @param txt CSVの内容
	 */
	getData : function(txt){
		//引数のチェック
		if(!txt) return;
		//CSVの読み込み
		this.CsvData = getCsvData(txt);
		//表示テキストの作成
		var html_str = '<ul>';
		for(i = 0;i < this.prev_cnt;i++){
			if(this.CsvData[i]) html_str += '<li><a href="' + this.CsvData[i]['a_href'] + '">' + this.CsvData[i]['a_innerHTML'] + '</a></li>';
			else break;
		}
		html_str += '</ul>';
		//リンク有り
		if(html_str != '<ul></ul>') document.getElementById("tmp_faq_8341").innerHTML = html_str;
	}
}
