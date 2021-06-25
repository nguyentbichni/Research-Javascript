(function($) {
    //　============================================================================
    //　ブレイクポイントごとの処理
    $.GMAIN = function(model) {

        $.GFUNC.elemMove($.GSET.MOVE_ELEM, model); //要素移動
        $.GFUNC.spExTableFunc(); //スクロールテーブル

        //タブ切り替え
        $.GFUNC.tabSwitch({
            proc: 'pc', //処理するモデル
            area: '#tmp_tab' //処理するエリア　「,」区切りで記述
        });

        //開閉メニュー
        $.GFUNC.accordionMenu({
            proc: 'pc,sp', //処理するモデル
            area: '#tmp_ac,.lnavi_faq_list' //処理するエリア　「,」区切りで記述
        });
        $.GFUNC.searchText({
            area: '#id_search_txt',
            keyword: 'ページID'
        });

        $.GFUNC.googleSearchImage({
            backgroundProperty: '#FFFFFF url(/shared/images/gsearch/google_custom_search_watermark.png) no-repeat 38px center',
        });
    }
    //　ブレイクポイントごとの処理 end
    //　============================================================================
    $.GFUNC.MATCHMEDIA(); //ブレイクポイントの処理
    //スマホメニュー設定
    $.GFUNC.spMenu({
        menuBtn: [{
            slideEffect: true,
            oBtn:'.mobile_control .navigation_link', //メニューボタン
            target:'#tmp_sma_menu', //展開するメニュー
            changeText: true
        },{
            slideEffect: true,
            oBtn:'.mobile_control .search_link', //メニューボタン
            target:'#tmp_sma_search', //展開するメニュー
            changeText: true,
            oTxt: '検索'
        }],
        closeBtn: '.close_btn', //閉じるボタン
        addClass: 'overlay', //bodyに付与するクラス(不要の場合空にする)
        activeClass : 'open'
    });

    $.GFUNC.changeStyle(); //文字サイズ・色合い変更
    $.GFUNC.activeLink(); //アクティブリンク

	//ドロップダウンメニュー
	$.GFUNC.dropDownMenuR( {
		gnaviObj: $('#tmp_header .gnavi'),
		gnaviListPath: '/cms8341/shared/js/gnavi.js',
		dropdownPath: '/cms8341/shared/js/dropdownmenu.js',
		column : 1
	});

	//リンク領域の拡張
	$.GFUNC.wideHref($('.format_top .list_child .list_inner'));
	$.GFUNC.wideHref($('.elderly_families li.elderly_item'));
	$.GFUNC.wideHref($('.live_vividly_cnt .health_calendar_cnt'));
	$.GFUNC.wideHref($('.format_kanko .seeing_item'));

	$.GFUNC.KeywordFrequently(); //よく使われるキーワード検索
	$.GFUNC.pageTopFloating(); //ページトップ追従

    // if($('format_free')){
    //     $.GFUNC.operationGuide(); //手続きナビ表示
    // }

    //　画面ロード時に一度のみ処理 end
    //　============================================================================
    //　画面リサイズごとの処理
    var tx = false;
    $(window).on('resize', function() {
        if (tx !== false) {
            clearTimeout(tx);
        }
        tx = setTimeout(function() {

        }, 150);
    });
    //　画面リサイズごとの処理 end
    //　============================================================================
    function resize_flex(){
        $.GFUNC.flexHeight($('.cat_blocks .cat_block .media_entries'), 2);
    }
    $(window).on('load', function() {
        if ($(window).width() > 640) {
            $.GFUNC.flexHeight($('.cat_blocks .cat_block .media_entries'), 2);
        }
    });
    $(window).resize(function(){
        if ($(window).width() > 640) {
            $.GFUNC.flexHeight($('.cat_blocks .cat_block .media_entries'), 2);
        } else{
            $.GFUNC.flexHeight($('.cat_blocks .cat_block .media_entries'), 1);
        }
    });
    function resize_flex(){
        $.GFUNC.flexHeight($('.cat_blocks .cat_block .media_entries'), 2);
    }
    $(window).on('load', function() {
        if ($(window).width() > 640) {
            $.GFUNC.flexHeight($('.section_news .new_list'), 2);
            $.GFUNC.flexHeight($('#tmp_board .new_list'), 2);
            $.GFUNC.flexHeight($('.section_topics .topic_cnt .list_child .cnt_img'), 3);
            $.GFUNC.flexHeight($('.section_topics .topic_cnt .list_child'), 3);
        } else {
            navSticky.init();
        }
    });
    var ww = $(window).width();
    $(window).resize(function(){
        if (ww != $(window).width()){
            ww = $(window).width();
            if (ww > 640) {
                $.GFUNC.flexHeight($('.section_news .new_list'), 2);
                $.GFUNC.flexHeight($('#tmp_board .new_list'), 2);
                $.GFUNC.flexHeight($('.section_topics .topic_cnt .list_child .cnt_img'), 3);
                $.GFUNC.flexHeight($('.section_topics .topic_cnt .list_child'), 3);
            } else{
                navSticky.init();
                $.GFUNC.flexHeight($('.section_news .new_list'), 1);
                $.GFUNC.flexHeight($('#tmp_board .new_list'), 1);
                $.GFUNC.flexHeight($('.section_topics .topic_cnt .list_child .cnt_img'), 1);
                $.GFUNC.flexHeight($('.section_topics .topic_cnt .list_child'), 1);
            }
        }
    });
	function resize_flex(){
        $.GFUNC.flexHeight($('#tmp_facilities_btn li a'), 2);
    }
    $(window).on('load', function() {
        if ($(window).width() > 640) {
            $.GFUNC.flexHeight($('#tmp_facilities_btn li a'), 2);
        } else {
            $.GFUNC.flexHeight($('#tmp_facilities_btn li a'), 2);
        }
    });
    $(window).resize(function(){
        if ($(window).width() > 640) {
            $.GFUNC.flexHeight($('#tmp_facilities_btn li a'), 2);
        } else{
            $.GFUNC.flexHeight($('#tmp_facilities_btn li a'), 2);
        }
    });
    var $slick_control = '<div class="slick-control"></div>';
    var $btn_control ='<button type="button" class="slick-stop" data-role="none" role="button" tabindex="0">STOP</button>';

    var topSlider = {
        config: {
            $slider : $('.format_top .banner_slider .slick_slides')
        },
        init: function() {
            topSlider.change_background();
            topSlider.slider();
        },
        change_background: function() {
            var $slider = topSlider.config.$slider;
            var $item = $slider.find('.item_slide');
            $item.each( function() {
                var src = $(this).find('img').attr('src');
                $(this).find('img').remove();
                $(this).find('p').css({
                    'background': 'url('+src+') center center no-repeat',
                    'background-size':'cover'
                });
            });
        },
        slider: function() {
            var $slider = topSlider.config.$slider;
            if ($slider.length) {
                $slider.on('init', function(event, slick) {
                    $slider.find('.slick-dots').wrap($slick_control);
                    $slider.find('.slick-control').prepend($btn_control);
                    $slider.find('.slick-stop').on('click', function() {
                        if ($(this).hasClass('slick-play')) {
                            $slider.slick("slickPlay");
                            $(this).removeClass('slick-play');
                            $(this).text('STOP');
                        } else {
                            $slider.slick("slickPause");
                            $(this).addClass('slick-play');
                            $(this).text('PLAY');
                        }
                    });
                });
                $slider.slick({
                    autoplay: true,
                    autoplaySpeed: 5000,
                    arrows: false,
                    dots: true,
                    fade: true,
                    slidesToShow: 1,
                    customPaging: function(slider, i) {
                        return ('<a href="javascript:void(0)"><span>'+(i + 1)+'つ目のスライドを表示</span></a>');
                    }
                });
                $slider.slick("slickPlay");
            }
        }
    }
    topSlider.init();

    //ijuteju_slide
    if ($('.ijuteju_slider').length) {
        $('.ijuteju_slider').on('init', function(event, slick) {
            $('.ijuteju_slider .slick-dots').wrap($slick_control);
            $('.ijuteju_slider .slick-control').prepend($btn_control);
            $('.ijuteju_slider .slick-stop').on('click', function() {
                if ($(this).hasClass('slick-play')) {
                    $('.ijuteju_slider').slick("slickPlay");
                    $(this).removeClass('slick-play');
                    $(this).text('STOP');
                } else {
                    $('.ijuteju_slider').slick("slickPause");
                    $(this).addClass('slick-play');
                    $(this).text('PLAY');
                }
            });
        });

        $('.ijuteju_slider_sp').on('init', function(event, slick) {
            $('.ijuteju_slider_sp .slick-dots').wrap($slick_control);
            $('.ijuteju_slider_sp .slick-control').prepend($btn_control);
            $('.ijuteju_slider_sp .slick-stop').on('click', function() {
                if ($(this).hasClass('slick-play')) {
                    $('.ijuteju_slider_sp').slick("slickPlay");
                    $(this).removeClass('slick-play');
                    $(this).text('STOP');
                } else {
                    $('.ijuteju_slider_sp').slick("slickPause");
                    $(this).addClass('slick-play');
                    $(this).text('PLAY');
                }
            });
        });	
		
        $('.ijuteju_slider').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true,
            fade: true,
            slidesToShow: 1,
            customPaging: function(slider, i) {
                return ('<a href="javascript:void(0)"><span>'+(i + 1)+'つ目のスライドを表示</span></a>');
            }
        });
        $('.ijuteju_slider').slick("slickPlay");
		
        $('.ijuteju_slider_sp').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true,
            fade: true,
            slidesToShow: 1,
            customPaging: function(slider, i) {
                return ('<a href="javascript:void(0)"><span>'+(i + 1)+'つ目のスライドを表示</span></a>');
            }
        });

        $('.ijuteju_slider_sp').slick("slickPlay");

		if($(window).width() < 640){
			$('.ijuteju_slider').slick('unslick');
		} else {
			$('.ijuteju_slider_sp').slick('unslick');
		}
		
    }
    $('.link_secsion').click(function(e){
        $('html,body').animate({
            scrollTop: $('#tmp_ijuteju_info').offset().top
        },'slow');
    })
    //Anshik_slide
    if ($('.banner_slick').length) {
        $('.banner_slick').on('init', function(event, slick) {
            $('.banner_slick .slick-dots').wrap($slick_control);
            $('.banner_slick .slick-control').prepend($btn_control);
            $('.banner_slick .slick-stop').on('click', function() {
                if ($(this).hasClass('slick-play')) {
                    $('.banner_slick').slick("slickPlay");
                    $(this).removeClass('slick-play');
                    $(this).text('STOP');
                } else {
                    $('.banner_slick').slick("slickPause");
                    $(this).addClass('slick-play');
                    $(this).text('PLAY');
                }
            });
        });
        $('.banner_slick').slick({
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true,
            slidesToShow: 1,
            customPaging: function(slider, i) {
                return ('<a href="javascript:void(0)"><span>'+(i + 1)+'つ目のスライドを表示</span></a>');
            }
        });
        $('.banner_slick').slick("slickPlay");
    }
	
    //Tab click
    $(function() {
        // Function tab
        var _handleTabSwitch = function(){
            $('.purpose_age .tab_click').each(function(){
                $(this).find('.purpose_ttl').click(function(){
                    var iscurrent = $(this).parent().hasClass('active');
                    if(!iscurrent){
                        $(this).parent().addClass('active');
                        $(this).parent().prev().removeClass('active');
                        $(this).parent().next().removeClass('active');
                    }
                    return false;
                });
            });
        };
        // Call function tab
        _handleTabSwitch();
    });

    /* back top */
    $('.pnavi').click(function() {
    	var objAttr = $(this).attr('href');
        $("html, body").animate({ scrollTop: $(objAttr).offset().top }, 500);
        return false;
    });

    var navSticky = {
        init: function() {
            $('.ver_links').addClass('sticky');
            navSticky.scroll();
        },
        scroll: function() {
            $(window).scroll(function() {
                if ($(window).width() < 640) {
                    $('.ver_links').removeClass('sticky');
                    clearTimeout( $.data( this, "scrollCheck" ) );
                    $.data(this, "scrollCheck", setTimeout(function() {
                        $('.ver_links').addClass('sticky');
                    }, 1500) );
                }
            });
        }
    }
    /* Menu SP */
    var settingMenuSp = {
        init: function() {
            settingMenuSp.bind();
        },
        bind: function() {
            var $menuBtn = $('.mobile_control li a');
            var $closeBtn = $('.close_btn a');
            $menuBtn.on('click', function(e) {
                var _this = $(this);
                var _id = _this.attr('class');
                if($(this).hasClass('search_link')){
                    _id = '#tmp_sma_search';
                } else if($(this).hasClass('navigation_link')){
                    _id = '#tmp_sma_menu';
                }
                if ($(_id).length > 0) {
                    e.preventDefault();
                    if (!_this.hasClass('open')) {
                        settingMenuSp.show(_this, _id);
                    } else {
                        settingMenuSp.hide();
                    }
                }
            });
            $closeBtn.on('click', function(e) {
                e.preventDefault();
                settingMenuSp.hide();
            });
            settingMenuSp.resize();
        },
        show: function(_this, _id) {
            $('.mobile_control li a').removeClass('open');
            $('#tmp_wrapper').addClass('overlay');
            _this.addClass('open');
            settingMenuSp.resetText();
            _this.find('.nav_text').text('閉じる');
            $('.menu_sp').hide();
            $(_id).slideDown(300);
        },
        hide: function() {
            settingMenuSp.resetText();
            $('.menu_sp').slideUp(200);
            $('#tmp_wrapper').removeClass('overlay');
            $('.mobile_control li a').removeClass('open');
        },
        resetText: function() { 
            $('.search_link').find('.nav_text').text('検索');
            $('.navigation_link').find('.nav_text').text('メニュー');
            $('.access_link').find('.nav_text').text('アクセス');
        },
        resize: function(){
            $(window).on('resize', function(){
                if($(window).width() > 640){
                    $('#tmp_wrapper').removeClass('overlay');
                }
            });
        }
    };
    //settingMenuSp.init();
    /* Menu Sub */
    $('.action_dropdown').click(function(e){
        e.preventDefault();
        var sub_menu = $(this).parent().find('.sub_nav');
        if(sub_menu.is(':hidden')){
            $(this).parent().addClass('active');
            sub_menu.slideDown(350);
        }
        else{
            $(this).parent().removeClass('active');
            sub_menu.slideUp(350);
        }
    });
    //Replace Img
    function replaceImg(_divLeghth, _imgLink) {
        if (_divLeghth.length > 0) {
            if ($(window).width() < 640 ) {
                _imgLink.attr('src', _imgLink.attr('src').replace('_pc', '_sp'));
            }
            else {
                _imgLink.attr('src', _imgLink.attr('src').replace('_sp', '_pc'));
            }
        }
    }
    var $guide_img = $('.health_guide_img');
    var $guide_img_link = $('.health_guide_img p img');
    replaceImg($guide_img, $guide_img_link);
    
    //　画面ロード時に一度のみ処理
    //PC/スマホ切り替え    
    $.GFUNC.modelChange({
        switchPc : '<p class="wrap_mc_pc"><a href="javascript:void(0);" id="tmp_switch_pc_style"><span>PC版を表示する</span></a></p>',
        switchSpInsMethod: 'after',
        switchPcInsert: '#tmp_footer'
    })

    /* kanko page */
    var mc = localStorage.getItem('pc');
    var slide_three = $(".js_slide_three");
    var slide_three_sp = $(".js_slide_three").clone();
    var slickSwitch = {
        pc: function() {
			if(slide_three.length){
				$('.js_three_parent').html(slide_three);
				if ($('.js_slide_three').hasClass('slick-initialized')) {
					slide_three.slick('unslick');
				}
				$('.js_slide_three').on('init', function(event, slick) {
				$('.js_slide_three').append('<div class="slick-control"><button type="button" class="slick-stop" data-role="none" role="button" tabindex="0"><span>STOP</span></button></div>');
				$('.js_slide_three .slick-stop').on('click', function() {
					if ($(this).hasClass('slick-play')) {
						$('.js_slide_three').slick("slickPlay");
						$(this).removeClass('slick-play');
						$(this).text('STOP');
					} else {
						$('.js_slide_three').slick("slickPause");
						$(this).addClass('slick-play');
						$(this).text('PLAY');
					}
				 });
				})
				slide_three.slick({
					dots: false,
					slidesToShow: 3,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 3000,
					arrows: true,
                    prevArrow:'<button type="button" class="slick-prev">前のスライドへ移動</button>',
                    nextArrow:'<button type="button" class="slick-next">次のスライドへ移動</button>'
				});
				$.GFUNC.flexHeight($('.seeing_item .txt'), 3);
				$('.js_slide_three').slick("slickPlay");
			}
        },
        sp: function() {
            if (!mc && slide_three.length) {
                $('.js_three_parent').html(slide_three_sp);
                if ($('.js_slide_three').hasClass('slick-initialized')) {
                    slide_three_sp.slick('unslick');
                }
				$('.js_slide_three').on('init', function(event, slick) {
				$('.js_slide_three').append('<div class="slick-control"><button type="button" class="slick-stop" data-role="none" role="button" tabindex="0"><span>STOP</span></button></div>');
				$('.js_slide_three .slick-stop').on('click', function() {
					if ($(this).hasClass('slick-play')) {
						$('.js_slide_three').slick("slickPlay");
						$(this).removeClass('slick-play');
						$(this).text('STOP');
					} else {
						$('.js_slide_three').slick("slickPause");
						$(this).addClass('slick-play');
						$(this).text('PLAY');
					}
				 });
				})
                setTimeout(function () {
                    slide_three_sp.slick({
                        dots: false,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        autoplaySpeed: 3000,
                        arrows: true,
                        prevArrow:'<button type="button" class="slick-prev">前のスライドへ移動</button>',
                        nextArrow:'<button type="button" class="slick-next">次のスライドへ移動</button>'
                    });
                    $.GFUNC.flexHeight($('.seeing_item .txt'), 1);
					$('.js_slide_three').slick("slickPlay");
                }, 200)
            } else {
				if(slide_three.length){
					slickSwitch.pc();
				}
            }
        }
    }
	
        


    if ($(window).width() > 640) {
        slickSwitch.pc();
    } else {
        slickSwitch.sp();
    }
    var currentWidth = $(window).width();
    $(window).on('resize', function() {
        if (currentWidth != $(window).width()) {
            if ($(window).width() > 640) {
                slickSwitch.pc();
            } else {
                slickSwitch.sp();
            }
            currentWidth = $(window).width();
        }
    });

    $(document).ready(function() {
        $('#tmp_switch_pc_style').on('click', function() {
            slickSwitch.pc();
        });
        $('#tmp_switch_sp_style').on('click', function() {
            slickSwitch.sp();
        });
    });

    /* End kanko page */


    /* jigyo page */
        if(!$('.section_banner .banner_img img').length) {
            $('.section_banner').addClass('banner_head_full');
        }
    /* End jigyo page */

    // Function tab
    var _handleTabSwitch = function(){
        $('.tab_special .tab_pane').each(function(){
            $('.tab_special .tab_ttl').attr("tabindex", "0");
            $(this).find('.tab_ttl').click(function(){
                var iscurrent = $(this).parent().hasClass('active');
                if(!iscurrent){
                    $(this).parent().addClass('active');
                    $(this).parent().prev().removeClass('active');
                    $(this).parent().next().removeClass('active');
                }
                return false;
            });
            $(this).find('.tab_ttl').on("keydown", function(e) {
                if(e.keyCode === 13) {
                    $(this).trigger("click");
                }
            });
        });
    };
    // Call function tab
    _handleTabSwitch();
    var bookSlider = {
        config : {
            $bookBlock : $('.kanko_banner .slick_slides'),
            $stop: $('.kanko_slide_ctr .ctrl_stop'),
            $navControl : $('.kanko_slide_ctr .panel_dot a'),
            current: 0,
        },
        init : function() {
            var config = bookSlider.config;
            config.$bookBlock.on('init', function(event, slick) {
                bookSlider.initEvents();
            });
            config.$bookBlock.slick({
              dots: false,
              infinite: true,
              speed: 500,
              fade: true,
              arrows: false,
              autoplay: true,
              cssEase: 'linear'
            });

        },
        initEvents : function() {
            var config = bookSlider.config;
            var $slides = config.$bookBlock.children();
            config.$stop.on('click', function() {
                if(!config.$stop.hasClass('is_stop')) {
                    config.$bookBlock.slick("slickPause");
                    config.$stop.addClass('is_stop');
                    config.$stop.html('PLAY');
                }else {
                    config.$bookBlock.slick("slickPlay");;
                    config.$stop.removeClass('is_stop');
                    config.$stop.html('STOP');
                }
                return false;
            } );
            config.$navControl.each(function(index) {
                config.$navControl.eq(index).on('click', function() {
                    config.$bookBlock.slick('slickGoTo', index);
                    return false;
                });
            });
            config.$bookBlock.on('afterChange', function(event, slick, currentSlide, nextSlide){
                config.$navControl.removeClass('active');
                config.$navControl.eq(currentSlide).addClass('active');
            });
            // add swipe events
        }
    }
    if($('.kanko_banner .slick_slides').length) {
        bookSlider.init();
    }
    
    //第一階層インデックス メニュー生成順並び替え
	if($('.format_idx1').length) {
		$('.entries_list').each(function() {
            var gChildList = $(this).children('.entries_item').toArray().reverse();
			$(this).empty().append(gChildList);
        });
	}
    
    //イベントカレンダーalt打ち込み
    if($('#tmp_event_cal_list').length) {
        var calListTxt1 = 'イベント';
        var calListTxt2 = '防災・救急';
        var calListTxt3 = 'くらし・手続き';
        var calListTxt4 = '子育て・教育';
        var calListTxt5 = '健康・福祉';
        var calListTxt6 = '観光・産業';
        var calListTxt7 = '市政情報';
        var calListTxt8 = 'その他';
        var targetImg="";

        $(".event_cal_list").find("img").each(function(){
            targetImg = $(this).attr('src');
            targetImgSrc = targetImg.split('/');
            targetImgName = targetImgSrc[targetImgSrc.length - 1];
            switch(targetImgName){
                case 'cat_icon1.gif' :  $(this).attr('alt',calListTxt1);break;
                case 'cat_icon2.gif' :  $(this).attr('alt',calListTxt2);break;
                case 'cat_icon3.gif' :  $(this).attr('alt',calListTxt3);break;
                case 'cat_icon4.gif' :  $(this).attr('alt',calListTxt4);break;
                case 'cat_icon5.gif' :  $(this).attr('alt',calListTxt5);break;
                case 'cat_icon6.gif' :  $(this).attr('alt',calListTxt6);break;
                case 'cat_icon7.gif' :  $(this).attr('alt',calListTxt7);break;
                case 'cat_icon8.gif' :  $(this).attr('alt',calListTxt8);break;
                default : $(this).attr('alt','イベント分類アイコン'); break;
            }
        });

    }

    $.GDITFUNC = {};
    $.GDITFUNC.autoLinkFilter = function(options){ //v1.0
        var defaults = {
                //Default Options
                renderDom : $('#tmp_autolink'),
                monthSelectDom : $('#tmp_autolink_month_select'),
                monthListDom : $('#tmp_autolink_month_list'),
                dataUrl : '/cms8341/shared/xml/shinchaku.xml',
                template: '<div class="news_cnt"><ul class="news_list">%items%</ul></div>',
                itemTemplate : '<li><span class="news_date">%date%</span><ul>%content%</ul></li>',
                contentTemplate : '<li><a href="%link%">%title%</a></li>',
            },
            s = $.extend(defaults,options)
            //Private Variables
            ;

        /*---- INIT ----*/
        if (!s.renderDom.length) return false;
        var data = [],
            month_select;
        $.ajax({
            url: s.dataUrl,
            dataType: 'xml',
            success: function(res){
                $(res).find('item').each(function(){
                    data.push({
                        title: $(this).find('title').text(),
                        link: $(this).find('link').text(),
                        date: new Date($($(this)[0].getElementsByTagName('dc:date')).text().substring(0,10)),
                    });
                });
                init();
            }
        });
        
        function init(){
            render(date_filter(data));
            if (s.monthSelectDom.length) render_month_select(get_month_list(data));
            if (s.monthListDom.length) render_month_list(get_month_list(data));
        }

        /*---- FILTER ----*/
        function get_month_list(data){
            var month_arr = [];
            data.forEach(function(item){
                var date = new Date(item.date);
                if (!month_arr.length || (month_arr[month_arr.length - 1].month != item.date.getMonth() || month_arr[month_arr.length - 1].year != item.date.getFullYear())){
                    month_arr.push({
                        year: item.date.getFullYear(),
                        month: item.date.getMonth(),
                    });
                }
            });
            return month_arr;
        }
        function month_filter(date){
            if (date == '*'){
                render(date_filter(data));
            }else{
                var res = [];
                data.forEach(function(item){
                    if (item.date.getFullYear() == date.year && item.date.getMonth() == date.month){
                        res.push(item);
                    }
                });
                render(date_filter(res));
            }
        }

        /*---- PRIVATE FUNCTION ----*/
        function date_filter(arr){
            var res = [],
                counter = 0;
            arr.forEach(function(item){
                if (res.length){
                    if (res[counter].date.getDay() === item.date.getDay() && res[counter].date.getMonth() === item.date.getMonth() && res[counter].date.getFullYear() === item.date.getFullYear()){
                        res[counter].content.push({
                            title: item.title,
                            link: item.link,
                        });
                    }else{
                        res.push({
                            date: item.date,
                            content: [{
                                title: item.title,
                                link: item.link,
                            }],
                        });
                        counter++;
                    }
                }else{
                    res.push({
                        date: item.date,
                        content: [{
                            title: item.title,
                            link: item.link, 
                        }],
                    });
                }
            });
            return res;
        }
        function render(arr){
            var html = '';
            arr.forEach(function(item){
                var date = item.date.getFullYear() + '年' + (item.date.getMonth() + 1) + '月' + item.date.getDate() + '日',
                    item_html = s.itemTemplate;
                item_html = replace_all(item_html,'%date%',date);
                var cnt_list = '';
                item.content.forEach(function(cnt){
                    var cnt_html = s.contentTemplate;
                    cnt_html = replace_all(cnt_html,'%title%',cnt.title);
                    cnt_html = replace_all(cnt_html,'%link%',cnt.link);
                    cnt_list += cnt_html;
                });
                item_html = replace_all(item_html,'%content%',cnt_list);
                html += item_html;
            });
            html = replace_all(s.template,'%items%',html);
            s.renderDom.empty();
            s.renderDom.html(html);
        }
        function render_month_select(arr){
            var html = '<option value="*">All</option>',
                dom;
            arr.forEach(function(item){
                html += '<option value="' + item.year + ',' + item.month + '">' + item.year + '年' + (item.month + 1) + '月</option>';
            });
            dom = $('<select>' + html + '</select>');
            s.monthSelectDom.html(dom);
            dom.on('change',function(){
                if (s.monthListDom.length) s.monthListDom.find('.active').removeClass('active');
                if (dom.val() !== '*'){
                    var arr = dom.val().split(',');
                    month_filter({
                        year : arr[0],
                        month : arr[1],
                    });
                    if (s.monthListDom.length){
                        s.monthListDom.find('a').filter(function(){
                            return $(this).data('date') == dom.val();
                        }).addClass('active');
                    }
                }else{
                    month_filter(dom.val());
                }
            });
        }
        function render_month_list(arr){
            var dom = $('<div class="autolink_list_month"></div>');
            arr.forEach(function(item){
                var child = $('<span><a href="javascript:void(0)">' + item.year + '年' + (item.month + 1) + '月</a></span>')
                child.children('a').data('date',item.year + ',' + item.month);
                child.children('a').on('click',function(){
                    month_filter({
                        year : item.year,
                        month : item.month,
                    });
                    dom.find('a').removeClass('active');
                    $(this).addClass('active');
                    if (s.monthSelectDom.length){
                        s.monthSelectDom.find('select').val($(this).data('date'));
                    }
                });
                dom.append(child);
            });
            s.monthListDom.html(dom);
        }
        //Misc
        function replace_all(str,s,r){
            return str.split(s).join(r);
        }

        /*---- PUBLIC ----*/
        return {
            //public function and variables
        }
    }

    var auto_link_filter = new $.GDITFUNC.autoLinkFilter();

})(jQuery);