//関数定義　※実行する処理をこのファイルに記述しない
(function($){

	$.GFUNC = {};
	//========================================
	//▼boxの高さ合わせ
	//$.GFUNC.flexHeight(【高さを合わせる要素名】, 【一列の要素数】);
	//========================================
	$.GFUNC.flexHeight = function(obj, col) {
		if(obj.length > 0){
			obj.css("min-height","0");
			setTimeout(function(){
				if(col != 1){
					var lgh = obj.length;
					var lineLen = Math.ceil(lgh / col);
					var liHiArr = [];
					var lineHiArr = [];
					var mode = 'content-box';
					
					mode = window.getComputedStyle(obj[0],null).getPropertyValue('box-sizing');
					
					for (i = 0; i <= lgh; i++) {
						if (mode == 'content-box'){
							liHiArr[i] = obj.eq(i).height();
						}else{
							liHiArr[i] = obj.eq(i).outerHeight();
						}
						if (lineHiArr.length <= Math.floor(i / col) || lineHiArr[Math.floor(i / col)] < liHiArr[i]) {
							lineHiArr[Math.floor(i / col)] = liHiArr[i];
						}
					}
					obj.each(function(i){
						$(this).css('min-height',lineHiArr[Math.floor(i / col)] + 'px');
					});
				}
			},100)
		}
	}
	
	//========================================
	//▼入力欄の初期値
	//========================================
	$.GFUNC.searchText = function(options){
		var c = $.extend({
			area: '#keyword_query',
			keyword: 'ページID'
		},options);
		
		$(c.area).each(function(){
				
			var self = $(this);
			
			self.on('focus.searchText', function(){
					if(self.val() == c.keyword){
						self.val('');
					}
				})
				.on('blur.searchText', function(){
					if(self.val() == ''){
						self.val(c.keyword);
					}
				});
				
			if(self.val() == '') self.val(c.keyword);
			
			self.closest('form').each(function(){
				var form = $(this);
				form.on('submit.searchText', function(){
					//初期値のままでsubmitした場合、valueを空にする
					if(self.val() == c.keyword){
						self.val('');
					}
				});
			});
		});
			
	}

	//========================================
	//▼googleカスタム検索のロゴ表示
	//========================================
	$.GFUNC.googleSearchImage = function(options){

		var c = $.extend({
			area: '#tmp_query',
			backgroundProperty: '#FFFFFF url(/shared/images/gsearch/google_custom_search_watermark.gif) no-repeat left center',
			focusBackgroundProperty: '#FFFFFF'
		},options);

		$(c.area).each(function(){
			var self = $(this);
			self
				.css({ background: c.backgroundProperty })
				.on('focus.googleSearchImage', function(){
					$(this)	.css({ background: c.focusBackgroundProperty });
				})
				.on('blur.googleSearchImage', function(){
					if($(this).val() == ''){
						$(this)	.css({ background: c.backgroundProperty });
					}
				});

			if(self.val() != ''){
				self.css({ background: c.focusBackgroundProperty });
			}

		});
	}

	//========================================
	//▼文字サイズ変更（段階別）
	//========================================
	$.GFUNC.textSize = function(options){
		
		var c = $.extend({
			sessionName: 'text_size',
			sizeUpClass: '.text_size_up',
			sizeDownClass: '.text_size_down',
			sizeNormalClass: '.text_size_normal',
			size: '75%,default,130%,175%',
			disableClass: 'disable',
		},options);
		
		var
			sessionData = localStorage.getItem(c.sessionName),
			body = $(document.body);
					
		var sizeArray = c.size.split(',');
		var smallSize = 0;
		var bigSize = sizeArray.length - 1;
		var defaultSize = thisSize = sizeArray.indexOf('default');

		//default設定
		if(sessionData) {
			body.css('fontSize', sizeArray[sessionData]);
			thisSize = sessionData;
		}

		//サイズアップ
		$(c.sizeUpClass).on('click.textSize', function(){

			if(!$(this).hasClass(c.disableClass)){
				if((thisSize + 1) != defaultSize) {
					body.css('fontSize', sizeArray[thisSize + 1]);
				} else {
					body.css('fontSize', '');
				}
				thisSize++;
				localStorage.setItem(c.sessionName, thisSize); //localStorageにサイズを保存

				if(thisSize == bigSize) $(c.sizeUpClass).addClass(c.disableClass);

				//縮小がDisableの場合
				if($(c.sizeDownClass).hasClass(c.disableClass)) $(c.sizeDownClass).removeClass(c.disableClass);
			}

			//aタグのリンクを無効に
			return false;
		});

		//サイズダウン
		$(c.sizeDownClass).on('click.textSize', function(){

			if(!$(this).hasClass(c.disableClass)){
				if((thisSize - 1) != defaultSize) {
					body.css('fontSize', sizeArray[thisSize - 1]);
				} else {
					body.css('fontSize', '');
				}
				thisSize--;
				localStorage.setItem(c.sessionName, thisSize); //localStorageにサイズを保存
				if(thisSize == smallSize) $(c.sizeDownClass).addClass(c.disableClass);

				//拡大がDisableの場合
				if($(c.sizeUpClass).hasClass(c.disableClass)) $(c.sizeUpClass).removeClass(c.disableClass);
			}

			return false; //aタグのリンクを無効に
		});

		//標準サイズ
		$(c.sizeNormalClass).on('click.textSize', function(){

			body.css('fontSize', '');
			thisSize = defaultSize;

			//localStorage削除
			localStorage.removeItem(c.sessionName);

			//縮小がDisableの場合
			if($(c.sizeDownClass).hasClass(c.disableClass)) $(c.sizeDownClass).removeClass(c.disableClass);

			//拡大がDisableの場合
			if($(c.sizeUpClass).hasClass(c.disableClass)) $(c.sizeUpClass).removeClass(c.disableClass);

			return false; //aタグのリンクを無効に
		});

	}

	//========================================
	//▼スタイルシート切り替え
	//========================================
	$.GFUNC.changeStyle = function(options) {
		var c = $.extend({
			switchArea: 'changestyle_area',
			switchClass: 'changestyle',
			switchChooseBtn: 'changestyle_c_btn',
			switchChoosedefBtn: 'changestyle_d_btn',
			defaultLinkName: 'default',
		},options);

		$('.'+c.switchClass).on('click.changeStyle', function(){
			var sName =$(this).closest('.'+c.switchArea).attr('id').replace('tmp_','cs_');
			var value = $(this).attr('name');
			if(sName){
				if(value == c.defaultLinkName){
					setStyle(sName);
				}else{
					setStyle(sName, value);
				}
			}
			return false;
		});

		function setStyle(sName, value) {
			var classList = $('body').attr('class').split(' ');
			var cListLength = classList.length;
			var regexp = new RegExp(sName.replace('cs_','') + '(.*?)', 'g');
			if(cListLength > 0){
				for(i=0;i<cListLength;i++){
					var m = classList[i].match(regexp);
					if(m) $('body').removeClass(classList[i]);
				}
			}
			if(value){
				localStorage.setItem(sName, value);
				$('body').addClass(sName.replace('cs_','')+'_'+value);
			} else {
				localStorage.removeItem(sName);
			}

		}
	}

	//========================================
	//▼アクティブリンク
	//========================================
	$.GFUNC.activeLink = function(options){
		
		var c = $.extend({
			area: 'body',
			level: 1,
			activeClass: 'active',
			activeThisClass: 'active_this',
			referId: '#tmp_pankuzu',
			query: true
		},options);
		var thisPath = c.query ? location.pathname+location.search: location.pathname;
		var area = $(c.area);
		var href = area.find('a');
		var referHrefUriObj = $(c.referId).find('a:visible').eq(c.level);
		var referHrefVal = referHrefUriObj.length ? referHrefUriObj.get(0).getAttribute('href'): '';
		if(referHrefVal.match('#')) referHrefVal =  referHrefVal.split('#')[0];
		var referHrefPath =  referHrefVal.match(/\?/) ? referHrefVal.split('?')[0] : referHrefVal;
		var referHref = c.query ? referHrefVal: referHrefPath;

		href.each(function(i){
			var ap = this.getAttribute('href');
            if(ap !== null) {
				if(ap.match('#')) ap =  ap.split('#')[0];
				var app =  ap.match(/\?/) ? ap.split('?')[0] : ap;
				
				var absolutePath = c.query ? ap : app;
				
				//ロールオーバー用
				var rParent = $(this).parent();
				//switchがspanで囲まれていたら
				if(rParent.get(0) && rParent.get(0).tagName == 'SPAN'){
					rParent = $(this).parent().parent();
				}
	
				//開閉式メニュー用
				var sParent = $(this).parents().filter(area.find('li'));
	
				//現在のURLとマッチした場合
				if(thisPath == absolutePath){
					$(this).addClass(c.activeThisClass);
					
					rParent.addClass(c.activeClass);
					
					sParent.each(function(index){
						if(sParent.length - 1 != index) {
							$(this).addClass(c.activeClass);
						}
					});
				}
				//パンくずの指定の階層のリンクとマッチした場合
				if(referHref == absolutePath){
					
					rParent.addClass(c.activeClass);
					
					sParent.each(function(index){
						if(sParent.length - 1 != index) {
							$(this).addClass(c.activeClass);
						}
					});
				}
			}
			
		});
		
	}

	//========================================
	//▼タブメニュー
	//========================================
	 $.GFUNC.tabSwitch = function(options) {
		var c = $.extend({
			mm: model, //現在のモデル
			proc: 'pc,tb,sp', //処理するモデル
			tabMenu: 'tab_menu', //一つのタブの内容を覆うクラス
			tabSwitch: 'tab_switch', //タブのボタンのクラス
			tabCnt: 'tab_cnt', //タブの中身のクラス
			activeClass: 'tb_active', //active時のクラス
			area: '#tmp_info' //処理するエリア　「,」区切りで記述
		},options);

		if($(c.area).length){
			var area = c.area.split(',');
			var areaLength = area.length;
			for(i=0;i<areaLength;i++){
				if($(area[i]).length){
					var proc = c.proc.split(','); //処理するモデルを「,」で分割
					var initTab = $(area[i]).find('.'+c.tabMenu).filter(':first');
					//初期処理
					if(!$(area[i]).hasClass('tab_area')){
						$(area[i]).addClass('tab_area');
						initTab.addClass(c.activeClass);
					}
					if(proc.indexOf(c.mm) != -1){ //処理するモデルなら
						$(area[i]).find('.'+c.tabCnt).hide();
						initTab.addClass(c.activeClass);
						initTab.find('.'+c.tabCnt).show();
						$(area[i]).find('.'+c.tabSwitch).on('click.tabSwitch focus.tabSwitch', function() {
							var self = $(this);
							var area = self.closest('.tab_area');
							var parent = self.closest('.'+c.tabMenu);
							if(!parent.hasClass(c.activeClass)){
								area.find('.'+c.tabMenu).removeClass(c.activeClass);
								parent.addClass(c.activeClass);
								area.find('.'+c.tabCnt).hide();
								parent.find('.'+c.tabCnt).show();
							}
							//aタグのリンクを無効に
							return false;
						});
					} else { //処理対象外のモデルなら
						$(area[i]).find('.'+c.tabSwitch).off('click.tabSwitch focus.tabSwitch');
						$(area[i]).find('.'+c.tabMenu).removeClass(c.activeClass);
						if(!$(area[i]).hasClass('accordion_area') && !$(area[i]).find('.'+c.tabMenu).hasClass('accordion_area')){
							$(area[i]).find('.'+c.tabCnt).show();
						}
					}
				}
			}
		}
	}

	//========================================
	//▼開閉メニュー
	//========================================
	$.GFUNC.accordionMenu = function(options) {
		var c = $.extend({
			mm: model, //現在のモデル
			proc: 'pc,tb,sp', //処理するモデル
			acSwitch: 'accordion_switch', //開閉メニューのボタンのクラス
			acCnt: 'accordion_cnt', //開閉メニューの中身のクラス
			activeClass: 'ac_active', //active時のクラス
			area: '#tmp_info' //処理するエリア　「,」区切りで記述
		},options);

		if($(c.area).length){
			var area = c.area.split(',');
			var areaLength = area.length;
			for(i=0;i<areaLength;i++){
				if($(area[i]).length){
					var proc = c.proc.split(','); //処理するモデルを「,」で分割
					//初期処理
					if(!$(area[i]).hasClass('accordion_area')){
						$(area[i]).addClass('accordion_area');
						if(proc.indexOf(c.mm) != -1){ //処理するモデルなら
							$(area[i]).find('.'+c.acCnt).hide();
						}
					}
					if(proc.indexOf(c.mm) != -1){ //処理するモデルなら
						$(area[i]).find('.'+c.acCnt).hide();
						$(area[i]).find('.'+c.acSwitch).off('click.accordionMenu');
						$(area[i]).find('.'+c.acSwitch).css({'cursor':'pointer'}).on('click.accordionMenu', function() {
							var self = $(this);
							var area = self.closest('.accordion_area');
							if(!area.hasClass(c.activeClass)){
								area.find('.'+c.acCnt).stop(true,true).show();
								area.addClass(c.activeClass);
							} else {
								area.find('.'+c.acCnt).stop(true,true).hide();
								area.removeClass(c.activeClass);
							}
						});
					} else {
						$(area[i]).removeClass(c.activeClass);
						$(area[i]).find('.'+c.acSwitch).css({'cursor':'pointer'}).off('click.accordionMenu');
						if(!$(area[i]).hasClass('tab_area')){
							$(area[i]).find('.'+c.acCnt).show();
						}
					}
				}
			}
		}
	}

	//========================================
	//▼ラベルの中に画像があってもinputにチェックを入れる（IE）
	//========================================
	$.GFUNC.labelClickable = function(options){

		var ua = window.navigator.userAgent.toLowerCase();			

		if(ua.indexOf('msie') != -1) return;
		
		var c = $.extend({
			area: 'body'
		},options);
		
		$(c.area).find('label:has(img)').each(function(){
			var id = $(this).attr('for');
			var input = $('#' + id);
			$(this).toggle(
				function(){
					input.attr('checked', true).select();
				},
				function(){
					//radioボタンの場合チェックをはずすことをしない
					if(input.attr('type') == 'radio') return;
					input.attr('checked', false).select();
				}
			);
		});	
	}


	//========================================
	//▼スクロールテーブル
	//========================================
	$.GFUNC.spExTableFunc = function(options){

		var c = $.extend({
			mm: model, //現在のモデル
			proc: 'sp', //処理するモデル
		},options);
			var spExTable = $('#tmp_contents .datatable').not('.datatable .datatable');
			if(spExTable.length){
				var contentWidth = 640;
				var scrollLabelDf = '画面サイズで表示';
				var scrollLabelEx = 'スライド操作で表示';
				smartFlg = ($('#tmp_resize_width').width() <= 640);
				spExTable.each( function() {
					if(c.mm == c.proc){
						if($(this).parent('.scroll_table').length == 0) {
							var switchBtn = $('<div class="scroll_table_switch"><a href="javascript:void(0);" class="scroll">'+scrollLabelDf+'</a></div>');
							$(this).before(switchBtn);
	
							$(this).wrap('<div class="scroll_table"></div>');
							$(this).css({
								'width':contentWidth
							});
							switchBtn.find('a').click( function(){
								if($(this).hasClass('scroll')){
									$(this).removeClass('scroll').parent().next().children().css({ 'width':'auto'}).unwrap();
									$(this).text(scrollLabelEx);
								} else {
									$(this).addClass('scroll').parent().next().wrap('<div class="scroll_table"></div>').css({ 'width':contentWidth });
									$(this).text(scrollLabelDf);
								}
							});
						}
					} else {
						var tb = $(this).closest('.scroll_table');
						if(tb) tb.children().css({ 'width':'auto'}).unwrap();
						$('.scroll_table_switch').remove();
					}
				});
			}
		}
 	//========================================
	//▼ページトップ追従
	//========================================
	$.GFUNC.pageTopFloating = function(){
		$(window).scroll(function() {
			if ($(this).scrollTop() > 150) {
				$("#tmp_footer a.pnavi").fadeIn();
				$("#tmp_footer a.pnavi").addClass("ptop_show");
			} else {
				$("#tmp_footer a.pnavi").fadeOut();
			}
			scrollHeight = $(document).height();
			scrollPosition = $(window).height() + $(window).scrollTop();
			footHeight = $("#tmp_footer").height() - 50;

			if (scrollHeight - scrollPosition <= footHeight) {
				$("#tmp_footer .pnavi").addClass("page_bottom");
			} else {
			$("#tmp_footer .pnavi").removeClass("page_bottom");
			}
		});
	}
//==============================================================================
// スマホメニュー
$.GFUNC.spMenu = function(options) {

	var o = $.extend({
		menuBtn: [{
				oBtn:'#tmp_hnavi_lmenu a', //メニューボタン
				target:'#tmp_sma_lmenu' //展開するメニュー
			}],
		closeBtn: '.close_btn', //閉じるボタン
		addClass: 'spmenu_open', //bodyに付与するクラス(不要の場合空にする)
		callback: function(){},
		activeClass : 'active'
	},options);
	
	var l = o.menuBtn.length;
	if(l >= 0){
		for(i=0;i<l;i++) {
			$(o.menuBtn[i].oBtn).on('click', {
				elem:o.menuBtn[i].target,
				changeText : (o.menuBtn[i].hasOwnProperty('changeText')) ? o.menuBtn[i].changeText : false,
				slideEffect : (o.menuBtn[i].hasOwnProperty('slideEffect')) ? o.menuBtn[i].slideEffect : false,
				oTxt : (o.menuBtn[i].hasOwnProperty('oTxt')) ? o.menuBtn[i].oTxt : 'メニュー',
				cTxt : (o.menuBtn[i].hasOwnProperty('cTxt')) ? o.menuBtn[i].cTxt : '閉じる',
			}, function(e) {
				e.preventDefault ? e.preventDefault() : (e.returnValue = false);
				var self = $(this);
				if(self.hasClass(o.activeClass)){
					self.removeClass(o.activeClass);
					$(e.data.elem).removeClass(o.activeClass);
					if (e.data.changeText) replaceText(self[0],e.data.cTxt,e.data.oTxt);
					if (e.data.slideEffect) $(e.data.elem).stop().slideUp(300); else $(e.data.elem).hide();
					$('body').removeClass(o.addClass);
				} else {
					for(var i=0;i<o.menuBtn.length;i++){
						if($(o.menuBtn[i].oBtn).hasClass(o.activeClass)){
							$(o.menuBtn[i].oBtn).removeClass(o.activeClass);
							$(o.menuBtn[i].target).hide();
							var text = {
								oTxt : (o.menuBtn[i].hasOwnProperty('oTxt')) ? o.menuBtn[i].oTxt : 'メニュー',
								cTxt : (o.menuBtn[i].hasOwnProperty('cTxt')) ? o.menuBtn[i].cTxt : '閉じる',
								changeText : (o.menuBtn[i].hasOwnProperty('changeText')) ? o.menuBtn[i].changeText : false,
							}
							if (text.changeText){
								replaceText($(o.menuBtn[i].oBtn)[0],text.cTxt,text.oTxt)
							}
						}
						if (e.data.slideEffect) $(o.menuBtn[i].target).stop().slideUp(300); else $(e.data.elem).show();
					}
					self.addClass(o.activeClass);
					$(e.data.elem).addClass(o.activeClass);
					if (e.data.changeText) replaceText(self[0],e.data.oTxt,e.data.cTxt);
					if (e.data.slideEffect) $(e.data.elem).slideDown(300); else $(e.data.elem).hide();
					if(o.addClass) $('body').addClass(o.addClass);
				}
				o.callback();
				return false;
			});
			$(o.menuBtn[i].target).on('click', o.closeBtn, {
				elem:o.menuBtn[i],
				changeText : (o.menuBtn[i].hasOwnProperty('changeText')) ? o.menuBtn[i].changeText : false,
				slideEffect : (o.menuBtn[i].hasOwnProperty('slideEffect')) ? o.menuBtn[i].slideEffect : false,
				oTxt : (o.menuBtn[i].hasOwnProperty('oTxt')) ? o.menuBtn[i].oTxt : 'メニュー',
				cTxt : (o.menuBtn[i].hasOwnProperty('cTxt')) ? o.menuBtn[i].cTxt : '閉じる',
			}, function(e) {
				e.preventDefault ? e.preventDefault() : (e.returnValue = false);
				$(e.data.elem.oBtn).removeClass(o.activeClass);
				$(e.data.elem.target).removeClass(o.activeClass);
				if (e.data.changeText) replaceText($(e.data.elem.oBtn)[0],e.data.cTxt,e.data.oTxt);
				if (e.data.slideEffect) $(e.data.elem.target).stop().slideUp(300); else $(e.data.elem).hide();
				$('body').removeClass(o.addClass);
				o.callback();
				return false;
			});
		}
	}
	function replaceText(selector,oldtext,newtext){
		selector.childNodes.forEach(function(item){
			if (item.nodeType == 3){
				if (item.textContent.trim() == oldtext) item.textContent = newtext;
			}else{
				if (item.childNodes.length) replaceText(item,oldtext,newtext);
			}
		})
	}
}
// スマホメニュー end
//==============================================================================
// スマホメニュー内注目のキーワード検索
$.GFUNC.KeywordFrequently = function(options){
	var c = $.extend({
		path: '/search.html',
		cx: '005470480957213630672:m1vtlrljhaw',
		target: 'ul.search_keyword_list'
	},options);

	var settingKeyword = {
		init: function() {
			settingKeyword.render();
		},
		render: function() {
			$.ajax({
				url: '/cms8341/shared/js/keyword.js',
				cache: false,
				dataType: 'text',
				success: function(result){
					var resArr = result.replace(/\r?\n/g, '\n').split("\n");
					var resArrLength = resArr.length;
					if(resArrLength >= 1){
						$(c.target).empty();
						for(var i=0;i<resArrLength;i++){
							if(resArr[i] != ''){
								var encodeURL = encodeURI(resArr[i]);//IE表示問題修正のためのエンコード処理
								var sc = '<li class="keyword_item"><a href="'+c.path+'?q='+encodeURL+'&sa.x=28&sa.y=13&cx='+c.cx+'&ie=UTF-8&cof=FORID%3A9">'+resArr[i]+'</a></li>';
								$(c.target).append(sc);
							}
						}
					}
				}
			});
		}
	}
	settingKeyword.init();
}
// スマホメニュー内キーワード検索 end
//==============================================================================
// PC/スマホ切り替え
$.GFUNC.modelChange = function(options){
	//デフォルト値の設定
	var c = $.extend({
		mm : model,
		delCss : '.mc_css',
		switchPc : '<p class="wrap_mc_pc"><a href="javascript:void(0);" id="tmp_switch_pc_style"><span>PC版</span></a></p>',
		switchSp : '<p class="wrap_mc_sp"><a href="javascript:void(0);" id="tmp_switch_sp_style"><span>スマートフォン版</span></a></p>',
		switchPcInsert: '#tmp_footer .fnavi', //PC版ボタンの挿入場所
		switchPcInsMethod: 'after', //after,before,append,prependを選択
		switchSpInsert: '#tmp_footer', //スマートフォン版ボタンの挿入場所
		switchSpInsMethod: 'before' //after,before,append,prependを選択
	},options);
	
	//PC版ボタン挿入
	switch(c.switchPcInsMethod){
		case('after'):
			$(c.switchPcInsert).after($(c.switchPc));
			break;
		case('append'):
			$(c.switchPcInsert).append($(c.switchPc));
			break;
		case('prepend'):
			$(c.switchPcInsert).prepend($(c.switchPc));
			break;
		case('before'):
			$(c.switchPcInsert).before($(c.switchPc));
			break;
		default:
			$(c.switchPcInsert).after($(c.switchPc));
			break;
	}

	//SP版ボタン挿入
	switch(c.switchSpInsMethod){
		case('after'):
			$(c.switchSpInsert).after($(c.switchSp));
			break;
		case('append'):
			$(c.switchSpInsert).append($(c.switchSp));
			break;
		case('prepend'):
			$(c.switchSpInsert).prepend($(c.switchSp));
			break;
		case('before'):
			$(c.switchSpInsert).before($(c.switchSp));
			break;
		default:
			$(c.switchSpInsert).after($(c.switchSp));
			break;
	}

	//初回
	function displayMobileToPc() {
		var mc = localStorage.getItem('pc');
		if (mc) {
			if(!$('body').hasClass('disp_pc')) {
				$($.GSET.MODEL_CHANGE_CSS).each( function() {
					$(this).attr({
						href: '',
						title: $(this).attr('href'),
						media: 'all',
						name: $(this).attr('media')
					});
				});
			}
			$('html').css({
				'transformOrigin':'left top', 
				'transform':'scale('+$(window).width()/$.GSET.MODEL_CHANGE_CWIDTH+')'
			});

			$(c.switchSp).show();
			$('body').addClass('disp_pc');

			$.GMAIN($.GSET.MODEL_CHANGE_BASE_MODEL);
		}
	}

	displayMobileToPc();

	$(window).resize(function(){
        displayMobileToPc();
    });

	$('#tmp_switch_pc_style').on('click', function(){//PC版表示の処理
		localStorage.setItem('pc', 'true');
		$($.GSET.MODEL_CHANGE_CSS).each( function() {
			$(this).attr({
				href: '',
				title: $(this).attr('href'),
				media: 'all',
				name: $(this).attr('media')
			});
		});
		$('html').css({
			'transformOrigin':'left top', 
			'transform':'scale('+$(window).width()/$.GSET.MODEL_CHANGE_CWIDTH+')'
		});
		$.GMAIN($.GSET.MODEL_CHANGE_BASE_MODEL);
		$('body').addClass('disp_pc');
		return false;
	});
	
	$('#tmp_switch_sp_style').on('click', function(){//SP版表示の処理
		localStorage.removeItem('pc');
		$($.GSET.MODEL_CHANGE_CSS).each( function() {
			$(this).attr({
				href: $(this).attr('title'),
				title: '',
				media: $(this).attr('name'),
				name: ''
			});
		});
		$('html').css({
			'transformOrigin':'', 
			'transform':''
		});
		$('html').css({'width':'auto'});
		var windowWidth = window.screen.width;
		if(windowWidth <= 640) {
			$.GMAIN($.GSET.MODEL_CHANGE_SP_MODEL);
		}else {
			$.GMAIN($.GSET.MODEL_CHANGE_BASE_MODEL);
		}
		$('body').removeClass('disp_pc');
		return false;
		});

	return c.mm;
}
// PCスマホ切り替え end
//==============================================================================
// 要素移動 **Do not edit **
$.GFUNC.elemMove = function(option, model) {
	if(!option || option.length <= 0) return false; //要素移動の設定が無い、もしくは移動の要素が無い場合に中断
	var eLength = option.length;
	for(i=0;i<eLength;i++){
		if(typeof option[i].flg === "undefined" || option[i].flg || option[i][model] || $(option[i].elem).length){
			switch(option[i][model][1]){
				case("append"): $(option[i][model][0]).append($(option[i].elem)); break;
				case("prepend"): $(option[i][model][0]).prepend($(option[i].elem)); break;
				case("after"): $(option[i][model][0]).after($(option[i].elem)); break;
				case("before"): $(option[i][model][0]).before($(option[i].elem)); break;
			}
		}
	}
}
// 要素移動 end
//==============================================================================
// ドロップダウンメニュー
$.GFUNC.dropDownMenuR = function(options){
	//デフォルト値の設定
	var c = $.extend({
		gnaviObj: $('#tmp_gnavi'),
		gnaviListPath: '/shared/js/gnavi.js',
		dropdownPath: '/shared/js/dropdownmenu.js',
		column: 2				
	},options);

	$.ajax({
	url: c.dropdownPath,
	cache: false,
	dataType: 'script',
	success: function(data, status, xhr) {
		
		if($.dropDownMenu) {
			var gnaviObj = c.gnaviObj;
			var gnaviListPath = c.gnaviListPath;
			var gnaviLi = gnaviObj.find('li');

			//load時にgnaviの項目の高さをそろえる
			function gnaviFlatHeight(gnaviObj) {
				var gnaviLiMaxHeight = 0;
				var gnaviAMaxHeight = 0;
				var gnaviLi = gnaviObj.find('> ul > li');
				var gnaviA = gnaviLi.find('> a');

				gnaviA.each(function(i) {
					var self = $(this);
					var height = self.height();
					var liHeight = gnaviLi.eq(i).height();

					if (i == 0) {
						height = height - 1;
						liHeight = liHeight - 1;
					}

					if (height > gnaviAMaxHeight) {
						gnaviAMaxHeight = height;
						gnaviLiMaxHeight = liHeight;
					}
				});
			}
			$.ajax({
				url: gnaviListPath,
				cache: false,
				dataType: 'script',
				success: function(data, status, xhr) {

					//load時にgnaviの項目の高さをそろえる
					gnaviFlatHeight(gnaviObj);
					if(gnaviListArray) {
						var gnaviData = $(gnaviListArray);
						var gnaviLi = gnaviObj.find('> ul > li');

						gnaviLi.each(function(i) {
							var self = $(this);
							var thisGnaviArray = gnaviListArray[i];

							if (thisGnaviArray.length) {
								var ul = $('<ul>');

								for (var j = 0; j < thisGnaviArray.length; j++) {
									var li = $('<li>');
									var a = $('<a>');
									var thisGnaviLiArray = thisGnaviArray[j];
									var thisGnaviLiPath = (function() {
										var path = thisGnaviLiArray[0];
										return path;
									})();
									var thisGnaviLiTitle = thisGnaviLiArray[1];
									a.attr({
										href: thisGnaviLiPath
									}).html(thisGnaviLiTitle).appendTo(li);
									li.appendTo(ul);
								}
								ul.appendTo(self);
							}
						});
						gnaviObj.dropDownMenu({
							column: c.column,
							setTime1: 300,
							setTime2: 300
						});
					}
				},
				error: function(XMLHttpRequest, status, errorThrown) {
					//load時にgnaviの項目の高さをそろえる
					gnaviFlatHeight(gnaviObj);
				}
			});
		
		}
		
		},
		error: function(XMLHttpRequest, status, errorThrown) {
		}
	});
}
// ドロップダウンメニュー end
//==============================================================================

// リンク領域の拡張
$.GFUNC.wideHref = function wideHrefBtn(parentsDiv) {
	if ((parentsDiv).length) {
		$(parentsDiv).css('cursor', 'pointer');
		$(parentsDiv).click(function() {
			var ob = $(this).find('a');
			var ot = ob.attr('target');
			if(ob.length) {
				if (ot == '_blank') {
					window.open().location.href = ob.attr('href');
				} else {
					window.location.href = ob.attr('href');
				}
			}
			return false;
		});
	}
}

// リンク領域の拡張 end
//==============================================================================
//▼手続きナビ 第一階層ごとの振り分け

$.GFUNC.operationGuide = function() {
	var operationGuideArray = [
		['icon_truck','/tetsuduki/hikkoshi/index.html', '引越し'],
		['icon_kekkon','/tetsuduki/kekkon/index.html', '結婚'],
		['icon_rikon','/tetsuduki/rikon/index.html', '離婚'],
		['icon_woman_with_baby','/tetsuduki/ninshinshussan/index.html', '妊娠・出産'],
		['icon_bag','/tetsuduki/nyuen/index.html', '入園'],
		['icon_school','/tetsuduki/nyugakutenko/index.html', '入学・転校'],
		['icon_education','/tetsuduki/kosodate/index.html', '子育て'],
		['icon_household','/tetsuduki/hitorioya/index.html', 'ひとり親世帯'],
		['icon_kodomo','/tetsuduki/kodomonobyoki/index.html', '子どもの病気'],
		['icon_bag2','/tetsuduki/shushokutaishoku/index.html', '就職・退職'],
		['icon_note','/tetsuduki/ininjo/index.html', '委任状'],
		['icon_die','/tetsuduki/okuyami/index.html', 'おくやみ'],
		['icon_paper','/tetsuduki/kakuteshinkoku/index.html', '確定申告'],
		['icon_tax','/tetsuduki/etax/index.html', 'e-TAX'],
		['icon_inkan','/tetsuduki/inkan/index.html', '印鑑登録']
	];

	var setGuideArray = [];
	if($('.glist1.active').length){
		//防災・救急
		setGuideArray.push(operationGuideArray[1]);
		setGuideArray.push(operationGuideArray[2]);
		setGuideArray.push(operationGuideArray[3]);
		setGuideArray.push(operationGuideArray[4]);
		setGuideArray.push(operationGuideArray[5]);
		setGuideArray.push(operationGuideArray[6]);
		setGuideArray.push(operationGuideArray[7]);
		setGuideArray.push(operationGuideArray[8]);
	} else if($('.glist2.active').length){
		//くらし・手続き
		setGuideArray.push(operationGuideArray[2]);
		setGuideArray.push(operationGuideArray[3]);
		setGuideArray.push(operationGuideArray[4]);
		setGuideArray.push(operationGuideArray[5]);
		setGuideArray.push(operationGuideArray[6]);
		setGuideArray.push(operationGuideArray[7]);
		setGuideArray.push(operationGuideArray[8]);
		setGuideArray.push(operationGuideArray[9]);
	} else if($('.glist3.active').length){
		//子育て・教育
		setGuideArray.push(operationGuideArray[3]);
		setGuideArray.push(operationGuideArray[4]);
		setGuideArray.push(operationGuideArray[5]);
		setGuideArray.push(operationGuideArray[6]);
		setGuideArray.push(operationGuideArray[7]);
		setGuideArray.push(operationGuideArray[8]);
		setGuideArray.push(operationGuideArray[9]);
		setGuideArray.push(operationGuideArray[10]);
	} else if($('.glist4.active').length){
		//健康・福祉
		setGuideArray.push(operationGuideArray[4]);
		setGuideArray.push(operationGuideArray[5]);
		setGuideArray.push(operationGuideArray[6]);
		setGuideArray.push(operationGuideArray[7]);
		setGuideArray.push(operationGuideArray[8]);
		setGuideArray.push(operationGuideArray[9]);
		setGuideArray.push(operationGuideArray[10]);
		setGuideArray.push(operationGuideArray[11]);
	} else if($('.glist5.active').length){
		//観光・産業
		setGuideArray.push(operationGuideArray[5]);
		setGuideArray.push(operationGuideArray[6]);
		setGuideArray.push(operationGuideArray[7]);
		setGuideArray.push(operationGuideArray[8]);
		setGuideArray.push(operationGuideArray[9]);
		setGuideArray.push(operationGuideArray[10]);
		setGuideArray.push(operationGuideArray[11]);
		setGuideArray.push(operationGuideArray[12]);
	} else if($('.glist6.active').length){
		//市政情報
		setGuideArray.push(operationGuideArray[6]);
		setGuideArray.push(operationGuideArray[7]);
		setGuideArray.push(operationGuideArray[8]);
		setGuideArray.push(operationGuideArray[9]);
		setGuideArray.push(operationGuideArray[10]);
		setGuideArray.push(operationGuideArray[11]);
		setGuideArray.push(operationGuideArray[12]);
		setGuideArray.push(operationGuideArray[13]);
	} else { //その他グロナビに所属しないページ
		setGuideArray.push(operationGuideArray[7]);
		setGuideArray.push(operationGuideArray[8]);
		setGuideArray.push(operationGuideArray[9]);
		setGuideArray.push(operationGuideArray[10]);
		setGuideArray.push(operationGuideArray[11]);
		setGuideArray.push(operationGuideArray[12]);
		setGuideArray.push(operationGuideArray[13]);
		setGuideArray.push(operationGuideArray[14]);
	}

	$('.format_free ul.guide_links').empty();
	$('.format_free ul.rnavi_guide_list').empty();
	var html = '';
	if($('.format_free .guide_links').length){
 		for (var i=0; i<8; i++) {
			html += '<li><a class="' + setGuideArray[i][0] + '" href="'+  setGuideArray[i][1] +'">' +  setGuideArray[i][2] +'</a></li>';
		}
		$('.format_free ul.guide_links').append(html);
	} else if ($('.format_free .rnavi_guide_list').length) {
 		for (var i=0; i<8; i++) {
			html += '<li><a class="' + setGuideArray[i][0] + ' guide_link" href="'+  setGuideArray[i][1] +'">' +  setGuideArray[i][2] +'</a></li>';
		}
		$('.format_free ul.rnavi_guide_list').append(html);
	}

}


// 手続きナビ振り分け end
//==============================================================================
//　スライダー切り替え 

// MatchMedia  **Do not edit**
var ua = window.navigator.userAgent.toLowerCase();
var ua_version = window.navigator.appVersion.toLowerCase();
if(ua_version.indexOf('msie 9') != -1){
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */
window.matchMedia||(window.matchMedia=function(){var b=(window.styleMedia||window.media);if(!b){var c=document.createElement("style"),a=document.getElementsByTagName("script")[0],d=null;c.type="text/css";c.id="matchmediajs-test";a.parentNode.insertBefore(c,a);d=("getComputedStyle" in window)&&window.getComputedStyle(c,null)||c.currentStyle;b={matchMedium:function(e){var f="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(c.styleSheet){c.styleSheet.cssText=f}else{c.textContent=f}return d.width==="1px"}}}return function(e){return{matches:b.matchMedium(e||"all"),media:e||"all"}}}());
/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){if(window.matchMedia&&window.matchMedia("all").addListener){return false}var e=window.matchMedia,a=e("only all").matches,d=false,f=0,c=[],b=function(g){clearTimeout(f);f=setTimeout(function(){for(var n=0,k=c.length;n<k;n++){var h=c[n].mql,o=c[n].listeners||[],p=e(h.media).matches;if(p!==h.matches){h.matches=p;for(var l=0,m=o.length;l<m;l++){o[l].call(window,h)}}}},30)};window.matchMedia=function(j){var g=e(j),i=[],h=0;g.addListener=function(k){if(!a){return}if(!d){d=true;window.addEventListener("resize",b,true)}if(h===0){h=c.push({mql:g,listeners:i})}i.push(k)};g.removeListener=function(m){for(var l=0,k=i.length;l<k;l++){if(i[l]===m){i.splice(l,1)}}};return g}}());
}

if(ua_version.indexOf('msie 8') == -1 && ua_version.indexOf('msie 7') == -1 && ua_version.indexOf('msie 6') == -1){

	var mql = Array();

	$.GFUNC.MATCHMEDIA = function() {
		var mc = localStorage.getItem('pc');
		if($('.mc_css').length) {
			if(!mc){
				for(model in $.GSET.MODEL){
					if(mql[model].matches && !$('body').hasClass('model_'+model)) {
						$('body').addClass('model_'+model);
						$.GMAIN(model);
					}
					if(!mql[model].matches && $('body').hasClass('model_'+model)) {
						$('body').removeClass('model_'+model);
					}
				}
			} else {
				for(model in $.GSET.MODEL){
					$('body').removeClass('model_'+model);
				}
				$('body').addClass('model_'+$.GSET.MODEL_CHANGE_BASE_MODEL);
				$.GMAIN($.GSET.MODEL_CHANGE_BASE_MODEL);
			}
		} else {
			$('body').removeClass('model_'+model);
			$('body').addClass('model_'+'pc');
			$.GMAIN('pc');
		}
	}


	for(model in $.GSET.MODEL){
		mql[model] = window.matchMedia($.GSET.MODEL[model]);
		mql[model].addListener($.GFUNC.MATCHMEDIA);
	}
} else {
	for(model in $.GSET.MODEL){
		if($.GSET.MODEL[model].BASE){
			$.GFUNC.MATCHMEDIA = function(){ $.GMAIN(model) };
		}
	}
}

// MatchMedia end
//==============================================================================
})(jQuery);