jQuery.noConflict();
(function($){	

	$.GSET = {};
	
	//ブレイクポイント(MediaQuery)の設定
	$.GSET.MODEL = {
		//ブレイクポイントの名前(要素移動などで使用) : MediaQueryの値
		pc: '(min-width: 641px)', 
		//tb: 'only screen and (min-width : 481px) and (max-width : 768px)',
		sp: 'only screen and (max-width : 640px)'
	}

	//要素移動の設定
	$.GSET.MOVE_ELEM = [
	{
		elem: '#tmp_setting',
		pc: ['#tmp_means','prepend'],
		sp: ['#tmp_sma_menu','prepend']
	},
	{
		elem: '.gnavi',
		pc: ['#tmp_means','append'],
		sp: ['#tmp_sma_menu','prepend']
	},
	{
		elem: '.format_top .search_type',
		pc: ['#tmp_search_top .search_top','prepend'],
		sp: ['#tmp_sma_search .search_top','prepend']
	},{
		elem: '.format_free .panel_search',
		pc: ['.format_free #tmp_header','after'],
		sp: ['#tmp_sma_search','prepend']
	},
	{
		elem: '.copyright',
		pc: ['.footer_cnt .footer_address address','after'],
		sp: ['.footer_cnt','append']
	},{
		elem: '.format_free .panel_search .ver_links',
		pc: ['.format_free .panel_search .container','append'],
		sp: ['#tmp_footer','after']
	},{
		elem: '.caption_col',
		pc: ['#tmp_banner .banner_caption','prepend'],
		sp: ['#tmp_banner','prepend']
	},{
		elem: '#tmp_cat h2',
		pc: ['#tmp_cat .container','prepend'],
		sp: ['#tmp_cat','prepend']
	},{
		elem: '.recomend',
		pc: ['.kanko_banner .first ','prepend'],
		sp: ['.kanko_banner','before']
	},{
		elem: '.bnr_img',
		pc: ['#tmp_search_top .top_site','after'],
		sp: ['#tmp_banner','append']
	},{
		elem: '#tmp_emergency_wrap',
		pc: ['#tmp_proceduce','before'],
		sp: ['#tmp_proceduce','prepend']
	}];

	//PC/スマートフォン切り替えの設定
	$.GSET.MODEL_CHANGE_CSS = '.mc_css'; //PC表示時に削除するCSS
	$.GSET.MODEL_CHANGE_CWIDTH = 1280; //PC表示時のコンテンツ幅
	$.GSET.MODEL_CHANGE_BASE_MODEL = 'pc' //PC表示のブレイクポイント名
	$.GSET.MODEL_CHANGE_SP_MODEL = 'sp' //スマートフォン表示のブレイクポイント名
	
})(jQuery);
