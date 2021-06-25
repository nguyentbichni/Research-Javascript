/**
 * GMap2クラス
 * @param objId GooleMaps表示オブジェクトのID名:String
 * @param objData 情報ウィンドウ内要素格納オブジェクト:Object
 * @param objSetting 設定値格納オブジェクト:Object
 */
var GDMap2 = function(objId,objData,objSetting){
	//定数の宣言
	//引数により設定変更可能なもの
	this.zoom					= (objSetting.zoom ? parseInt(objSetting.zoom,10) : 15);								//初期ズームレベル
	this.searchOff_zoomLevel	= (objSetting.searchOffZoom ? parseInt(objSetting.searchOffZoom,10) : 11);				//検索ボタンをOFFにするズームレベル
	this.searchBtnOnId			= (objSetting.searchBtnOnId ? objSetting.searchBtnOnId : '');							//検索ボタンONのオブジェクト
	this.searchBtnOffId			= (objSetting.searchBtnOffId ? objSetting.searchBtnOffId : '');							//検索ボタンOFFのオブジェクト
	this.infoOption				= {maxWidth:(objSetting.infoMaxWidth ? parseInt(objSetting.infoMaxWidth,10) : 400)};	//情報ウィンドウオプション

	this.searchFlg				= (objSetting.searchFlg && objSetting.searchFlg == "true" ? true : false);				//検索フラグ
	this.infoFlg				= (objSetting.infoFlg && objSetting.infoFlg == "true" ? true : false);					//情報ウィンドウ表示フラグ
	this.listArea				= (objSetting.listName ? objSetting.listName : '');										//検索結果リスト表示オブジェクトID名
	
	this.scrollwheel			= true;	//ホイールで地図をスクロール
	this.panControl				= true;		//パンコントローラー表示
	this.scaleControl			= true;		//スケールコントローラー表示
	this.zoomControl			= true;		//ズームコントローラー表示
	this.streetViewControl		= false;	//ストリートビュー表示
	this.minZoom					= 5;	//ズーム最小値
	this.maxZoom					= 20;	//ズーム最大値
	
	//GoogleMaps関係
	this.gmapArea				= $(objId);								//GoogleMaps表示オブジェクト
	this.infoDataObj			= objData;								//情報ウィンドウデータオブジェクト
	this.iconPath				= "/shared/system/images/maps/";		//アイコンファイルへのパス
	this.icon_width				= 34;									//アイコン幅
	this.icon_height			= 37;									//アイコン高さ
	this.iconSelf				= "icon_map_arrow_self.gif";			//自身のアイコン
	this.iconFile				= {										//カテゴリごとのアイコンファイル
	};
	this.infoHtml				= {								//情報ウィンドウ内HTMLフォーマット
		title  :'<p style="margin:3px 0px;font-size:12pt;"><strong>#TITLE#</strong><p>',
		address:'<p style="margin:2px;font-size:10pt;">住所：#ADDRESS#</p>',
		tel    :'<p style="margin:2px;font-size:10pt;">電話：#TEL#</p>',
		url    :'<p align="right" style="margin:2px;font-size:10pt;"><a href="#URL#">詳細情報を見る</a></p>'
	};
	//Ajax関係
	this.s_method				= "POST";						//フォームデータのMETHOD属性値（GET/POST）
	this.s_async				= true;							//非同期通信（TRUE=有効 , FALSE=無効）
	this.s_path					= "";							//検索プログラムパス
	this.listHeader				= "";							//検索結果リスト検索種類ヘッダ
	this.listNormal				= "";							//リストの通常クラス名称
	this.listMsover				= "";							//リストのマウスオーバー時クラス名称
	this.listIconPath			= "";							//アイコンファイルへのパス
	this.listHeaderIconFile		= {								//検索結果リスト検索種類ヘッダのアイコンファイル
	};
	this.listHeaderAlt = {										//検索結果リスト検索種類ヘッダの画像ALT
	};

	//変数の宣言
	this.currentInfoWindow = null;		//吹き出し

	//チェック
	if(!this.gmapArea){
		alert("System Error! [Constructor]\nGoogle Maps表示領域が存在しません。");
		return;
	}
	if(!this.infoDataObj.lat || !this.infoDataObj.lng){
		alert("System Error! [Constructor]\n緯度経度の取得に失敗しました。");
		return;
	}
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
		if(this.gmapArea) this.gmapArea.innerHTML = '<div style="font-size:80%;padding:10px;">Now Loading...</div>';
		this.initGmap();
	},

	/**
	 * GoogleMaps初期化
	 * GoogleMapsを初期化する
	 */
	initGmap : function(){
		var latlng = new google.maps.LatLng(this.infoDataObj.lat, this.infoDataObj.lng);
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
		var map = new google.maps.Map(document.getElementById(this.gmapArea.id), myOptions);
		
		if(this.iconSelf != '') {
			var image = new google.maps.MarkerImage(this.iconPath + this.iconSelf,
				new google.maps.Size(this.icon_width, this.icon_height),
				new google.maps.Point(0, 0),
				new google.maps.Point(this.icon_width / 2, this.icon_height)
			);
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				icon: image,
				title: this.infoDataObj.title
			});
		} else {
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: this.infoDataObj.title
			});
		}
		if(this.infoFlg == true){
			var html = '';
			if(this.infoDataObj.title)   html += this.infoHtml.title.replace("#TITLE#",htmlspecialchars(this.infoDataObj.title));
			if(this.infoDataObj.address) html += this.infoHtml.address.replace("#ADDRESS#",htmlspecialchars(this.infoDataObj.address));
			if(this.infoDataObj.tel)     html += this.infoHtml.tel.replace("#TEL#",htmlspecialchars(this.infoDataObj.tel));
			if(this.infoDataObj.url)     html += this.infoHtml.url.replace("#URL#",htmlspecialchars(this.infoDataObj.url));
			
			elem = this;
			google.maps.event.addListenerOnce(map, 'tilesloaded', function(event){
				if (elem.currentInfoWindow) elem.currentInfoWindow.close();
				elem.currentInfoWindow = new google.maps.InfoWindow({content: html});
				elem.currentInfoWindow.open(map, marker);
			});
			google.maps.event.addListener(marker, 'click', function(event){
				if (elem.currentInfoWindow) elem.currentInfoWindow.close();
				elem.currentInfoWindow = new google.maps.InfoWindow({content: html});
				elem.currentInfoWindow.open(map, marker);
			});
		}
	}
}
