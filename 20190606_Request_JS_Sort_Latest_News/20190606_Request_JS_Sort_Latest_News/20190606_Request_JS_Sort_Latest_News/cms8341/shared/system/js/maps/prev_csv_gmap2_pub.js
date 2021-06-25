/**
 * GMap2クラス
 * @param objId GooleMaps表示オブジェクトのID名:String
 * @param objData 情報ウィンドウ内要素格納オブジェクト:Object
 * @param objSetting 設定値格納オブジェクト:Object
 */
var GDMap2 = function(objId,latitude,longitude){
	//定数の宣言
	this.GET					= getGETParms();								//GETの値を取得する
	this.zoom					= 15;											//初期ズームレベル
	this.infoOption				= {maxWidth:400};								//情報ウィンドウオプション
	this.csv_path				= "/shisetsu/chizu/csv/map_data.csv";			//表示用CSVのパス
	this.gmapArea				= $(objId);										//GoogleMaps表示オブジェクト
	this.latitude				= latitude;										//初期表示の中心となる緯度
	this.longitude				= longitude;									//初期表示の中心となる経度
	this.resultArea				= "tmp_result_list";								//検索結果表示エリア
	this.search_toggle_flg		= false;										//トグル操作の有無
	this.change_category_button = false;										//カテゴリボタン切り替えフラグ
	this.iconPath				= "/shared/system/images/maps/";				//アイコンファイルへのパス
	this.icon_width				= 34;											//アイコン幅
	this.icon_height			= 37;											//アイコン高さ
	this.mapSearchJsOff			= $("map_search_js_off");						//JSがOFFの際の表示領域
	this.mapSearchJsOn			= $("map_search_js_on");						//JSがONの際の表示領域
	this.keyword_column = new Array('title');									//キーワード検索対象カラム
	this.result_column			= {												//結果配列に表示する項目名
		//オブジェクト配列名	:	CSVのカラム名
		"id"					:	"page_id",									//ページID
		"purpose"				:	"category",									//カテゴリ（目的)
		"lat"					:	"lat",										//緯度
		"lng"					:	"lng",										//経度
		"title"					:	"title",									//タイトル
		"url"					:	"url",										//詳細ページURL
		"tel"					:	"tel",										//電話番号
		"fax"					:	"fax",										//fax番号
		"address"				:	"address"									//住所
	};
	this.iconFile				= {												//カテゴリごとのアイコンファイル
		 "1":"map_icon_1.png",
		 "2":"map_icon_2.png",
		 "3":"map_icon_3.png",
		 "4":"map_icon_4.png",
		 "5":"map_icon_5.png",
		 "6":"map_icon_6.png",
		 "7":"map_icon_7.png",
		 "8":"map_icon_8.png",
		 "9":"map_icon_9.png",
		 "10":"map_icon_10.png",
		 "11":"map_icon_11.png",
		 "12":"map_icon_12.png"
	};
	this.infoHtml				= {												//情報ウィンドウ内HTMLフォーマット
		title  :'<p style="margin:3px 0px;font-size:12pt;"><strong>#TITLE#</strong><p>',
		address:'<p style="margin:2px;font-size:10pt;">住所：#ADDRESS#</p>',
		tel    :'<p style="margin:2px;font-size:10pt;">電話：#TEL#</p>',
		fax    :'<p style="margin:2px;font-size:10pt;">FAX：#FAX#</p>',
		url    :'<p align="right" style="margin:2px;font-size:10pt;"><a href="#URL#">詳細情報を見る</a></p>'
	};
	this.scrollwheel			= true;	//ホイールで地図をスクロール
	this.panControl				= true;		//パンコントローラー表示
	this.scaleControl			= true;		//スケールコントローラー表示
	this.zoomControl			= true;		//ズームコントローラー表示
	this.streetViewControl		= false;	//ストリートビュー表示
	this.minZoom					= 5;	//ズーム最小値
	this.maxZoom					= 20;	//ズーム最大値

	//変数の宣言
	this.view_category  = new Array();			//表示するカテゴリ
	this.CsvData		= null;					//検索結果リスト格納オブジェクト
	this.resultData		= new Object();			//結果表示
	this.markerAry		= new Array();			//マーカーオブジェクト
	this.map			= null;					//マップオブジェクト
	this.currentInfoWindow = null;				//吹き出し

	//チェック
	if(!this.gmapArea){
		alert("System Error! [Constructor]\nGoogle Maps表示領域が存在しません。");
		return;
	}
	if(!this.latitude || !this.longitude){
		alert("System Error! [Constructor]\n緯度経度の取得に失敗しました。");
		return;
	}

	//初期描画処理
	if (this.mapSearchJsOff) {
		this.mapSearchJsOff.style.display = 'none';
	}
	if (this.mapSearchJsOn) {
		this.mapSearchJsOn.style.display = 'block';
	}

	//ロード処理
	this.loading();
}

/**
 * 処理関数郡の宣言
 * GoogleMaps表示に使用する関数郡
 */
GDMap2.prototype = {
	/**
	 * ロード画面を表示
	 * GoogleMaps表示エリアにロード中であることを示す文字を描画する
	 */
	loading : function(){
		var class_id = this;
		if(this.gmapArea) this.gmapArea.innerHTML = '<p style="font-size:80%;padding:10px;">Now Loading...</p>';
		//CSVデータの取得
		var xmlhttp = createXMLHttpRequest();
		if(xmlhttp){
			xmlhttp.onreadystatechange = function(){
				//取得完了
				if(xmlhttp.readyState == 4){
					//正常に取得出来た場合
					if(xmlhttp.status == 200) class_id.getData(xmlhttp.responseText);
					//正常に取得出来なかった場合
					else if(class_id.gmapArea) class_id.gmapArea.innerHTML = '<p style="font-size:80%;padding:10px;">施設の情報がありません。（' + xmlhttp.status + '）</p>';
					else alert("施設の情報がありません。（" + xmlhttp.status + "）");
				}
			}
		}
		else alert("ajax error");
		//リクエスト処理
		xmlhttp.open('GET',this.csv_path,true);
		xmlhttp.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
		xmlhttp.send(null);
	},

	/**
	 * CSVの取得処理
	 * CSVの内容を取得し、配列に代入する
	 * @param txt CSVの内容
	 */
	getData : function(txt){
		//データが無ければ、処理終了
		if(!txt) return;
		//改行コードの統一
		txt = txt.replace(/\r\n/g,"\n");
		txt = txt.replace(/\r/g,"\n");
		//CSVデータの解析
		this.CsvData = getCsvData(txt);
		this.initGmap();
	},

	/**
	 * GoogleMaps初期化
	 * GoogleMapsを初期化する
	 */
	initGmap : function(){
		var latlng = new google.maps.LatLng(this.latitude, this.longitude);
		var myOptions = {
			zoom: this.zoom,
			minZoom: this.minZoom,
			maxZoom: this.maxZoom,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: this.scrollwheel,
			panControl: this.panControl,
			panControlOptions: {
				position: google.maps.ControlPosition.TOP_LEFT
			},
			scaleControl: this.scaleControl,
			scaleControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_LEFT
			},
			zoomControl: this.zoomControl,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.LEFT_TOP
			},
			streetViewControl: this.streetViewControl,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_TOP
			}
		}
		this.map = new google.maps.Map(document.getElementById(this.gmapArea.id), myOptions);
		
		//GETに値がある場合、初期表示する
		if(this.GET && 'pid' in this.GET){
			var searchObj = {'page_id':this.GET['pid']};
			this.doQuery(searchObj);
		}
	},

	/**
	 * キーワード検索を行う
	 * @param キーワード
	 * @return true:処理終了
	 */
	searchKeyword : function(keyword){
		//変数の宣言
		var retObj = new Object();

		//引数のチェック
		keyword = keyword.replace(/^(\s|　)+|(\s|　)+$/g,'');
		if(!keyword || keyword == ""){
			alert('検索文字を入力してください');
			return false;
		}

		//情報ウィンドウ非表示
		if(this.currentInfoWindow) this.currentInfoWindow.close();
		//検索結果リストの削除
		if(this.resultArea != "" && $(this.resultArea)) $(this.resultArea).innerHTML = "";
		//マーカーの削除
		this.removeMarker();
		
		//検索対象文字列の作成
		var search_ary = keyword.replace(/　/g,' ').split(' ');
		//レスポンスデータを作成する
		retObj.responseText = '{';
			for(var i = 0;i < this.CsvData.length;i++){
				//データが存在しなければ、スキップ
				if(!this.CsvData[i]) continue;
				//検索マッチ件数
				var matches = 0;
				//検索対象文字列数分ループ
				for(var search_cnt = 0;search_cnt < search_ary.length;search_cnt++){
					//検索対象カラム数分ループ
					for(var clm_cnt = 0;clm_cnt < this.keyword_column.length;clm_cnt++){
						//検索対象カラムに検索対象文字列が存在する場合
						if(this.CsvData[i][this.keyword_column[clm_cnt]].match(new RegExp(search_ary[search_cnt].replace(/(\\|\/|\^|\$|\*|\+|\.|\?|\{|\||\}|\[|\]|\(|\))/ig,"\\$1"),"i"))){
							//検索マッチ件数カウントアップ
							matches++;
							break;
						}
					}
				}
				//マッチした数が検索対象文字列の数とイコールの場合、検索結果を格納
				if(search_ary.length == matches){
					//区切り文字の追加
					if(retObj.responseText.substr(retObj.responseText.length - 1) == "}") retObj.responseText += ',';
					//データの追加
					retObj.responseText += '"' + this.CsvData[i]['page_id'] + '":{ ';
						//指定されたカラム分ループ
						for(var result_key in this.result_column){
							//区切り文字の追加
							if(retObj.responseText.substr(retObj.responseText.length - 1) == '"') retObj.responseText += ', ';
							retObj.responseText += '"' + result_key + '":"' + this.CsvData[i][this.result_column[result_key]].replace(/(\\|\")/ig,"\\$1") + '"';
						}
					retObj.responseText += '}';
				}
			}
		retObj.responseText += '}';
		this.getResult(retObj);
		return true;
	},

	/**
	 * 表示範囲内の検索処理
	 * 表示範囲内で検索を行った際の処理
	 * @param purpose_id クリックされたボタンのID
	 * @return true:処理終了
	 */
	reSearch : function(purpose_id){
		//情報ウィンドウ非表示
		if(this.currentInfoWindow) this.currentInfoWindow.close();
		//検索結果リストの初期化
		if(this.resultArea != "" && $(this.resultArea)) $(this.resultArea).innerHTML = "";

		//トグル操作が有効の場合
		if(this.search_toggle_flg == true){
			//トグル操作
			if(!purpose_id in this.view_category || !this.view_category[purpose_id]) this.view_category[purpose_id] = true;
			else this.view_category[purpose_id] = false;
			//カテゴリボタンを変更する
			if(this.change_category_button == true) this.change_button(purpose_id,this.view_category[purpose_id]);
			//画面上から削除する
			this.removeMarker(purpose_id);
		}
		//トグル操作が無効の場合
		else{
			//マーカーの削除
			this.removeMarker();
			//全てのカテゴリの削除
			for(i = 0;i < this.view_category.length;i++){
				this.view_category[i] = false;
			}
			//選択されたカテゴリのみ表示
			this.view_category[purpose_id] = true;
		}
		//表示フラグがTRUEの場合
		if(this.view_category[purpose_id]){
			//検索処理
			var searchObj = {'category':purpose_id};
			this.doQuery(searchObj);
		}
		return true;
	},

	/**
	 * 検索クエリ
	 * 検索処理を実行する
	 * @param query 検索に使用する値を持った文字列
	 */
	doQuery : function(query){
		//変数の初期化
		var retObj = new Object();
		var key = new Array();
		var value = new Array();

		//検索データの作成
		for(var i in query){
			key[key.length] = i;
			value[value.length] = query[i];
		}
		//レスポンスデータを作成する
		retObj.responseText = '{';
			for(var i = 0;i < this.CsvData.length;i++){
				//検索
				var match = 0;
				for(var j = 0;j < key.length;j++){
					if(value[j] == this.CsvData[i][key[j]]) match++;
				}
				//検索条件とマッチした場合
				if(key.length != match) continue;
				if(retObj.responseText.substr(retObj.responseText.length - 1) == "}") retObj.responseText += ',';
				retObj.responseText += '"' + this.CsvData[i]['page_id'] + '":{ ';
					//指定されたカラム分ループ
					for(var result_key in this.result_column){
						//区切り文字の追加
						if(retObj.responseText.substr(retObj.responseText.length - 1) == '"') retObj.responseText += ', ';
						retObj.responseText += '"' + result_key + '":"' + this.CsvData[i][this.result_column[result_key]].replace(/(\\|\")/ig,"\\$1") + '"';
					}
				retObj.responseText += '}';
			}
		retObj.responseText += '}';
		this.getResult(retObj);
	},

	/**
	 * カテゴリボタンの変更を行なう
	 * 表示されているカテゴリボタンをフラグにより変更する
	 * @param category カテゴリID
	 * @param flg ボタン切り替えフラグ
	 */
	change_button : function(category,flg){
		//イメージオブジェクトの作成
		var imgObj = new Image();
		imgObj.src = this.iconPath + "map_btn_" + category + "_" + (flg ? "on" : "off") + ".jpg";
		//カウンタの初期化
		var count = 0;
		/**
		 * 画像読み込み完了チェック
		 * 画像の読み込みが完了したら、画像を差し替える
		 */
		var complete = function(){
			//カウントアップ
			count++;
			//読み込みが完了している場合、画像の差し替え
			if(imgObj.complete) $('searchButton_' + category).src = imgObj.src;
			//読み込みが完了していない場合
			else{
				//カウンタが規定回数より少なければ、タイマーON
				if(count < 100) setTimeout(complete,10);
				//カウンタが規定回数以上なら、画像の差し替え(リンク切れ)
				else $('searchButton_' + category).src = imgObj.src;
			}
		};
		//画像読み込み完了チェック
		complete();
	},

	/**
	 * マーカー削除
	 * 表示されているマーカーを削除する
	 * @param category カテゴリID
	 */
	removeMarker : function(category){
		for(var i in this.markerAry) {
			this.markerAry[i].setMap(null);
		}
		this.markerAry = new Array();
		if(this.currentInfoWindow) this.currentInfoWindow.close();
		this.currentInfoWindow = null;
	},

	/**
	 * 結果取得
	 * 検索結果を取得する
	 * @param obj 検索結果オブジェクト
	 * @param obj 表示カテゴリ
	 * @return 作成したhtml
	 */
	getResult : function(obj){
		//データを取得する
		if(obj.responseText != "") eval('var datas=' + obj.responseText);
		else var datas = new Object();
		//検索結果の保持
		this.resultData = datas;
		//マーカーの作成
		var key,id,marker,result;
		//マーカーを表示
		for(id in datas){
			var data = datas[id];
			var isMaker = false;
			for(key in this.markerAry){
				if(data.id == key) isMaker = true;
			}
			if(isMaker == false){
				var image = new google.maps.MarkerImage(this.iconPath + this.iconFile[data.purpose],
					new google.maps.Size(this.icon_width, this.icon_height),
					new google.maps.Point(0, 0),
					new google.maps.Point(this.icon_width / 2, this.icon_height)
				);
				var obj = {
					position: new google.maps.LatLng(data.lat, data.lng),
					map: this.map,
					icon: image,
					reqid: data.id
				};
				marker = new google.maps.Marker(obj);
				this.markerAry[data.id] = marker;
				
				// 吹き出しを表示イベント追加
				elem = this;
				google.maps.event.addListener(marker, 'click', function(event){
					if (elem.currentInfoWindow) elem.currentInfoWindow.close();
					elem.currentInfoWindow = new google.maps.InfoWindow({content: elem.createInfoWindowHtml(datas[this.reqid])});
					elem.currentInfoWindow.open(elem.map, elem.markerAry[this.reqid]);
				});
			}
			//検索結果リストに表示
			if(this.resultArea != "" && $(this.resultArea)){
				//表示用リストの作成
				var list_data = document.createElement('li');
				list_data.id = id;
				list_data.innerHTML = '<a href="javascript:void(0);">' + data.title + '</a>';
				$(this.resultArea).appendChild(list_data);
				//onClickイベントの処理登録
				class_id = this;
				list_data.onclick = function(){
					class_id.listClickEventListener(this.id);
				};
			}
			//GETに値がある場合、InfoWindowを表示する(初回時のみ)
			if(this.GET && id == this.GET['pid']){
				//InfoWindowを表示
				this.currentInfoWindow = new google.maps.InfoWindow({content: this.createInfoWindowHtml(datas[id])});
				this.currentInfoWindow.open(this.map, this.markerAry[id]);
			}
		}
	},

	/**
	 * GoogleMaps情報ウィンドウ内HTML生成
	 * GoogleMaps情報ウィンドウ内のHTMLを生成する
	 * @param obj 情報ウィンドウに必要な値を持ったオブジェクト
	 * @return 作成したhtml
	 */
	createInfoWindowHtml : function(obj){
		var html = '';
		if(obj.title)   html += this.infoHtml.title.replace("#TITLE#",obj.title);
		if(obj.address) html += this.infoHtml.address.replace("#ADDRESS#",obj.address);
		if(obj.tel)     html += this.infoHtml.tel.replace("#TEL#",obj.tel);
		if(obj.fax)     html += this.infoHtml.fax.replace("#FAX#",obj.fax);
		if(obj.url)     html += this.infoHtml.url.replace("#URL#",obj.url);
		return html;
	},

	/**
	 * 結果リストクリックイベント
	 * 検索結果リストをクリックしたときのイベント
	 * @param category 表示対象カテゴリ
	 * @param key クリックされたリストのID
	 */
	listClickEventListener : function(key){
		//データのチェック
		if(!this.markerAry[key] || !this.resultData[key]){
			alert("System Error! [Func:listClickEventListener]\nマーカー情報の取得に失敗しました。");
			return;
		}
		//InfoWindowを表示
		if (this.currentInfoWindow) this.currentInfoWindow.close();
		this.currentInfoWindow = new google.maps.InfoWindow({content: this.createInfoWindowHtml(this.resultData[key])});
		this.currentInfoWindow.open(this.map, this.markerAry[key]);
	}
}

/**
 * Ajax用オブジェクトの作成
 * Ajax用にHTTP通信を行うためのオブジェクトを作成する
 * @return XMLhttpObjectオブジェクト
 */
function createXMLHttpRequest(){
	var XMLhttpObject = null;
	try{ XMLhttpObject = new XMLHttpRequest(); }
	catch(e){
		try{ XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch(e){
			try{ XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP"); }
			catch(e){ return null; }
		}
	}
	return XMLhttpObject;
}

/**
 * GETの値を取得する
 * GETのパラメータを取得する
 * @return GETパラメータ配列
 */
function getGETParms(){
	var qsParm = new Array();
	var query = window.location.search.substring(1);
	var parms = query.split('&');
	for(var i = 0;i < parms.length;i++){
		var pos = parms[i].indexOf('=');
		if(pos > 0){
			var key = parms[i].substring(0,pos);
			var val = parms[i].substring(pos + 1);
			qsParm[key] = val;
		}
	}
	return qsParm;
}
