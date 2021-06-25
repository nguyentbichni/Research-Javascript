var YSRUBY = function() {
	// +++++ DEFINE's ++++++++++ //
	this.ysURI     = "/cgi-bin/furigana/ysruby.cgi";
	this.uiElement = "furigana";
	// +++++ YS Parameters +++++ //
	this.grade  = "1";				//1～8
	this.target = "tmp_contents";	//対象範囲を示す要素のID属性値を指定
	this.t_data = "contents";		//対象範囲のIDをdataで指定する場合のdata名
	this.i_data = "ignore";			//対象範囲内でルビ振りしないIDをdataで指定する場合のdata名
	this.c_data = "target";			//対象IDをdata名で指定(ignore使用時必須)
	this.ruby   = true;				//RUBYタグを使用する場合はTRUE
	this.rtxt_s = "（";				//ふりがな表記の開始カッコ
	this.rtxt_e = "）";				//ふりがな表記の終了カッコ
	this.ui_on   = "ふりがな表示";	//uiElement置換文字：ルビ振実行
	this.ui_off  = "ふりがな解除";	//uiElement置換文字：元に戻す
	this.ui_load = "ふりがな表示";	//uiElement置換文字：取得中
	// +++++ YSRUBY Datas ++++++++ //
	this.params = new Object();
	this.isIE;
	// +++++ YSRUBY Functions ++++++++ //
	/**
	 * 初期化
	 */
	this.init = function(){
		var ua=navigator.userAgent;
		var isOpera=Object.prototype.toString.call(window.opera)=='[object Opera]';
		var Gecko = ua.indexOf('Gecko')>-1&&ua.indexOf('KHTML')===-1;
		var IE = !!window.attachEvent&&!isOpera&&!Gecko;
		if(IE)
			this.ruby = false;
		this.isIE = IE;
	};
	/**
	 * RUBY付HTML作成
	 */
	this.createRuby = function(html,data,idx){
  		var pos = 0;
  		idx = (idx === void 0)?0:idx;
  		var lastIdx = false;
  		//解析処理
  		for(var i=idx;i<data.length;i++) {
			var ruby='';
			if(data[i].subword) {
				ruby = data[i].surface;
				for(var j=0;j<data[i].subword.length;j++) {
					if(data[i].subword[j].surface == data[i].subword[j].furigana) continue;
					ruby = this.replaceAll(ruby, data[i].subword[j].surface, this.markupRuby(data[i].subword[j].surface, data[i].subword[j].furigana, this.rtxt_s, this.rtxt_e, this.ruby));
				}
			} else {
				ruby = this.markupRuby(data[i].surface, data[i].furigana, this.rtxt_s, this.rtxt_e, this.ruby);
			}
			pos = html.indexOf(data[i].surface, pos);
			if(pos==-1) continue;
			
			prev = (pos>1)? html.substr(0,pos) : "";
			real = ruby;
			next = html.substr(pos+data[i].surface.length);
			pos += ruby.length;
			
			html = prev + real + next;
			lastIdx = i;
			//終了判定
			var ep = pos;
			var ef = true;
			for(var j=i;j<data.length;j++){
				ep = next.indexOf(data[j].surface, ep);
				if(ep==-1) continue;
				else{
					ef = false;
					break;
				}
			}
			if(ef){
				break;
			}
		}
		//属性値対応＊RUBYタグを除去
		if(this.ruby) {
			html = html.replace(/="[^"]*"/gi, function($0) {
						return $0.replace(/<\/?[^>]*>/gi,'');
			       });
		}
		return {html:html,idx:lastIdx};
	};
	/**
	 * RUBYタグ作成
	 */
	this.markupRuby = function(t, r, ps, pe, f){
		if(f===true) {
			return '<ruby><rb>'+t+'</rb><rp>'+ps+'</rp><rt>'+r+'</rt><rp>'+pe+'</rp></ruby>';
		} else {
			return t+ps+r+pe;
		}
	};
	/**
	 * 置換
	 */
	this.replaceAll = function(e,s,r){
		return e.split(s).join(r);
	};
};
/**
 * jQuery
 */
jQuery(function(){
	var flag = {exec:false,lock:false};
	var oldDOM = null;
	var ysr = new YSRUBY();
	ysr.init();
	var conDOM = null;
	var igIds = {use:false};
	var rdIdx = 0;
	/**
	 * functions
	 */
	//無視要素かどうか調べる
	var isIgnore = function(dom){
		var id = dom.prop('id');
		if(id !== void 0 && igIds[id] !== void 0){
			return true;
		}
		return false;
	};
	//子を持たない要素に対して置換え
	var replaceDom = function(dom,mode,data){
		//IEの場合OPTIONの中身が消える？とりあえずルビ振り無効化
		if(ysr.isIE && dom.get(0).tagName.toLowerCase() == 'option'){
			return;
		}
		if(mode == 'ruby' || mode == 'dic'){
			if(mode == 'dic') rdIdx = 0;
			var ysrRuby = ysr.createRuby(dom.get(0).outerHTML,data,rdIdx);
			if(ysrRuby.idx !== false){
				dom.get(0).outerHTML = ysrRuby.html;
				rdIdx = ysrRuby.idx+1;
			}
		}else{
			var ridx = dom.data('rubyidx');
			if(ridx !== void 0){
				conDOM.find('[data-rubyidx="'+ridx+'"]').replaceWith(dom.clone(true));
			}
		}
	};
	
	//選択した要素の全ての子要素に置換えを行う
	var allChild = function(t,mode,data){
	    var c = t.children();
	    if(c.length!=0){
	        c.each(function(){
	        	var $this = jQuery(this);
	            var cc = $this.children();
	            if(!isIgnore($this)){
	            	if(cc.length!=0){
		                allChild($this,mode,data);
		            }else{
		            	if(ysr.ruby && $this.get(0).tagName.toLowerCase() == 'rb'){
		            		var parent = $this.parent().parent();
		            		if(!parent.data('useruby')){
		            			replaceDom(parent,mode,data);
		            			parent.data('useruby',true);
		            		}
		            	}else{
		            		replaceDom($this,mode,data);
		            	}
		            }
	            }
	        });
	    }else{
	    	replaceDom(c,mode,data);
	    } 
	};
	//置換え前と後の要素の関連付けを行う
	var allChildAsso = function(t){
		var c = t.children();
	    if(c.length!=0){
	        c.each(function(){
	        	var $this = jQuery(this);
	            var cc = $this.children();
	            if(cc.length!=0){
	            	allChildAsso($this);
	            }else{
	            	$this.attr('data-rubyidx',rdIdx++);
	            }
	        });
	    }else{
	    	c.attr('data-rubyidx',rdIdx++);
	    } 
	};
	
	/**
	 * main
	 */
	//var ignoreDOM = null;
	jQuery('#' + ysr.uiElement).text(ysr.ui_on);
	//uiElement Click
	jQuery(document).on('click', '#' + ysr.uiElement, function(){
		if(flag.lock)return;
		flag.lock = true;
		var conData = jQuery(this).data(ysr.t_data);
		if(typeof conData !== 'undefined' && conData != ''){
			conDOM = jQuery('#' + conData);
		}else{
			conDOM = jQuery('#' + ysr.target);
		}
		//JSを削除
			conDOM.find('script').remove();
		//作業領域にコンテキストをクローン
		var cloneDOM = conDOM.clone(true);
		
		//無視する項目
		var igData = jQuery(this).data(ysr.i_data);
		if(typeof igData !== 'undefined' && igData != ''){
			var ids = igData.split(',');
			igIds.use = true;
			for(var igi in ids){
				cloneDOM.find('#' + ids[igi]).html("");
				igIds[ids[igi]] = true;
			}
		}
		if(flag.exec){
			//ルビ振り実行後にクリック
			jQuery(this).text(ysr.ui_on);
			
			if(igIds.use){
				//無視リストがある場合
				rdIdx = 0;
				allChild(oldDOM,'prev');
			}else{
				//無視リストがない場合
				conDOM.replaceWith(oldDOM);
			}
			flag.lock = flag.exec = false;
			return;
		}else{
			//ルビ振り実行前にクリック
			rdIdx = 0;
			allChildAsso(conDOM);
			oldDOM = conDOM.clone(true);
			rdIdx = 0;
			allChildAsso(oldDOM);
			jQuery(this).text(ysr.ui_load);
		}
		var params = {
				//制限されている為、半角英数記号を置換
				context	: cloneDOM.html().replace(/[a-zA-Z -\/:-@\[-\`\{-\~]/g,' ').replace(/\s+/g,' '),
				grade	: ysr.grade
		};
		var post = jQuery.post(ysr.ysURI,params,null,'json');
		//Ajax(POST)
		post.done(function(ret){
			if(ret.error){
				if(ret.error === true)
					alert("APIエラーが発生しました。");
				else
					alert(ret.error);
			}else{
				//成功時HTML書換(ルビ振り)
				if(igIds.use){
					//無視リストがある場合
					rdIdx = 0;
					if(ret.dictionary.length)
						allChild(conDOM,'ruby',ret.dictionary);
					rdIdx = 0;
					allChild(conDOM,'ruby',ret.ysruby);
				}else{
					//無視リストがない場合
					if(ret.dictionary.length)
						cloneDOM.html(ysr.createRuby(cloneDOM.html(),ret.dictionary).html);
					cloneDOM.html(ysr.createRuby(cloneDOM.html(),ret.ysruby).html);
					conDOM.replaceWith(cloneDOM);
				}
				
				jQuery('#' + ysr.uiElement).text(ysr.ui_off);
				flag.exec = true;
				flag.lock = false;
			}
		}).fail(function(jqXHR, textStatus, errorThrown){
			alert("通信エラーが発生しました。");
		});
	});
});