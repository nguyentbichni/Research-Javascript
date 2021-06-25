/*
 * アクセスランキングCSVを読み込み、ランキングを表示する
 * $Rev:  $
 * $Date:  $
 * $Author:  $
 */
var fnc_acc_rank = function(objId,rank_id) {
	this.path = '/rank/csv/rank_' + rank_id + '.csv';	// 緊急ニュースCSVファイルパス
	this.extArea	= document.getElementById(objId);		// 表示オブジェクト
	this.CsvData = new Array();		// 読み込んだCSVファイルを配列にして格納する変数
}

fnc_acc_rank.prototype = {
	/**
	 * HTMLをロードする
	 * HTMLをAjaxを使いロードする
	 */
	LoadData : function() {
		var this_class = this;
		var xmlhttp = createXMLHttpRequest();
		if (xmlhttp) {
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						this_class.getData(xmlhttp.responseText);
					}
				}
			}
		}
		else {
			alert("ajax error");
		}
		//リクエスト処理
		xmlhttp.open('GET', this.path, true);
		xmlhttp.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
		xmlhttp.send(null);
	},
	/**
	 * CSVの解析、表示処理
	 * 取得したCSVを解析し、表示する
	 * @param txt CSVの内容
	 */
	getData : function(txt) {
		//引数のチェック
		if (!txt) {
			return;
		}

		// CSV文字列を配列に変更
		var aryCsvData = getCsvData(txt);

		var htmlStr = "";
		if(aryCsvData.length > 0){
			htmlStr = "<ol>" + "\n";
			var counter = 0;
			// アクセスランキングCSVファイルの2行目以降をループ処理する
			for(counter = 0; counter <aryCsvData.length; counter++){
				var rank_num = Number(counter)+1;
				htmlStr += "<li class=\"rank" + rank_num +"\"><a href=\"" + aryCsvData[counter]["path"] + "\">" + aryCsvData[counter]["title"] + "</a></li>";
			}
			htmlStr += "</ol>";
		}else{
			htmlStr = "<p>現在アクセスランキング集計中です。しばらくお待ちください。</p>";
		}
		this.extArea.innerHTML = htmlStr;
		this.extArea.style.display = 'block';
	}
}
