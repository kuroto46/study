
$(function () {
	//Areaページでの各アイテムの出しわけ
	$.getJSON("../data/moge.json", function(data){
		$(function(){
			//URLを取得して「?]で分割「&」でも分割
			var url   = location.href,
				params    = url.split("?"),
				paramms   = params[1].split("&");
			// パラメータ用の配列を用意
			var paramArray = [];
			// 配列にパラメータを格納
			for ( i = 0; i < paramms.length; i++ ) {
				neet = paramms[i].split("=");
				paramArray.push(neet[0]);
				paramArray[neet[0]] = neet[1];
			}
			// パラメータによって処理を分岐
			if(paramArray["area"] == "shibuya"){
				//渋谷クラブの画像生成
				$(data.Nov01.shibuya).each(function(){
					$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideArea');
				})
				$('.area-container').append('<article><div class="todays-contents akihabara"><a class="btn-area" href="/clubmania/tmpl/area.html?area=roppongi"><h2>ROPPONGI</h2></a><ul class="todays-items list-items roppongi"></ul></div></article><article><div class="todays-contents roppongi"><a class="btn-area" href="/clubmania/tmpl/area.html?area=akihabara"><h2>AKIHABARA</h2></a><ul class="todays-items list-items akihabara"></ul></div></article>');
			}else if(paramArray["area"] == "roppongi"){
				//六本木クラブの画像生成
				$(data.Nov01.roppongi).each(function(){
					$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideArea');
				})
				$('.area-container').append('<article><div class="todays-contents"><a class="btn-area" href="/clubmania/tmpl/area.html?area=shibuya"><h2>SHIBUYA</h2></a><ul class="todays-items list-items shibuya"></ul></div></article><article><div class="todays-contents roppongi"><a class="btn-area" href="/clubmania/tmpl/area.html?area=akihabara"><h2>AKIHABARA</h2></a><ul class="todays-items list-items akihabara"></ul></div></article>');
			}else if(paramArray["area"] == "akihabara"){
				//秋葉原クラブの画像生成
				$(data.Nov01.akihabara).each(function(){
					$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideArea');
				})
				$('.area-container').append('<article><div class="todays-contents"><a class="btn-area" href="/clubmania/tmpl/area.html?area=shibuya"><h2>SHIBUYA</h2></a><ul class="todays-items list-items shibuya"></ul></div></article><article><div class="todays-contents akihabara"><a class="btn-area" href="/clubmania/tmpl/area.html?area=roppongi"><h2>ROPPONGI</h2></a><ul class="todays-items list-items roppongi"></ul></div></article>');
			}
			$('.slideArea').slidePlugin();
		});
	});

	//各エリアのリストフライヤーのリストを作成
	$.getJSON("../data/moge.json", function(data){
		//渋谷リスト生成
		$(data.Nov01.shibuya).each(function(){
			$('<li class="todays-item"><a class="event-box" href="' + this.box_url + '"><h3>' + this.box_name + '</h3></a><a class="event-img" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt=""></a></li>').appendTo('.todays-items.shibuya');
		})
		//六本木リスト生成
		$(data.Nov01.roppongi).each(function(){
			$('<li class="todays-item"><a class="event-box" href="' + this.box_url + '"><h3>' + this.box_name + '</h3></a><a class="event-img" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt=""></a></li>').appendTo('.todays-items.roppongi');
		})
		//秋葉原リスト生成
		$(data.Nov01.akihabara).each(function(){
			$('<li class="todays-item"><a class="event-box" href="' + this.box_url + '"><h3>' + this.box_name + '</h3></a><a class="event-img" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt=""></a></li>').appendTo('.todays-items.akihabara');
		})
		//生成したリストをulタグで3つずつ囲う
		wrapItem();
		arrangeListItems();
	})
	//上記で取得したli要素を3つずつul,liで囲む
	function wrapItem(){
		do {
			$('.todays-items').children('li:lt(3)').wrapAll('<ul>')
		}while($('.todays-items').children('li').length);
		$('.todays-items ul').wrap('<li>')
	};
	//list内のアイテムが3つ以下の場合空のliを生成していれる
	function arrangeListItems(){
		if($(".list-items.shibuya ul").children('li').length == 2){
			$(".list-items.shibuya ul:last").append('<li class="todays-item">');
		}else if($(".list-items.shibuya ul").children('li').length == 1){
			$(".list-items.shibuya ul:last").append('<li class="todays-item"><li class="todays-item">');
		}
		if($(".list-items.roppongi ul").children('li').length == 2){
			$(".list-items.roppongi ul:last").append('<li class="todays-item">');
		}else if($(".list-items.roppongi ul").children('li').length == 1){
			$(".list-items.roppongi ul:last").append('<li class="todays-item"><li class="todays-item">');
		}
		if($(".list-items.akihabara ul").children('li').length == 2){
			$(".list-items.akihabara ul:last").append('<li class="todays-item">');
		}else if($(".list-items.akihabara ul").children('li').length == 1){
			$(".list-items.akihabara ul:last").append('<li class="todays-item"><li class="todays-item">');
		}
	};

	//スライドショー用の画像生成
	$.getJSON("../data/moge.json", function(data){
		//渋谷クラブの画像生成
		$(data.Nov01.shibuya).each(function(){
			$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideTop');
		})
		//六本木クラブの画像生成
		$(data.Nov01.roppongi).each(function(){
			$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideTop');
		})
		//秋葉原クラブの画像生成
		$(data.Nov01.akihabara).each(function(){
			$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideTop');
		})
		$('.slideTop').slidePlugin();
	});

	//ハンバーガーメニュー
	$('.btn-menu').on("click", function(){
		$('.acordion-menu').show(500);
	})
	$('.btn-close').on("click", function(){
		$('.acordion-menu').hide(500);
	})
	$(function(){
		var index = $(".side-menu dt")
		var isMoving = false;
			$(".side-menu dd").hide();
				index.on("click", function(){
				if (!isMoving) {
				if($(this).hasClass("open")){
					isMoving = true;
					$(this).toggleClass("open");
					$(this).next().slideToggle("fast", function(){
					isMoving = false;
					});
				}else{
					isMoving = true;
					$(".side-menu .open").next().slideToggle("fast");
					$(".side-menu .open").toggleClass("open");
					$(this).toggleClass("open");
					$(this).next().slideToggle("fast", function(){
					isMoving = false;
				});
			}
		}
		});
	});

});

