$(function () {

	//dayIdの初期値を宣言
	var dayId = 'Nov01',
		snsUrl   = location.href,
		$slideIndex = $(".side-menu dt"),
		isMoving = false;

	//スライドショー用の画像生成
	slideTop();
	//エリアページのソートボタンによる差し替え
	changeAreaPage();

	//ソートボタン
	$.getJSON("../data/date.json", function(data){
		$(data['date']).each(function(){
			$('<li><a href="" class="sort-days" id="' + this.dayId + '">' + this.month + ' /<br><span class="sort-date">' + this.day + '</span></a></li>').appendTo('.sort-btn');
		});
		//ソートボタンの一番最初のボタンをアクティブにする
		$('.sort-days').eq(0).addClass('active');
		$('.sort-days').on('click',function(event){
			event.preventDefault();
			$('.sort-days').removeClass('active');
			$(this).addClass('active');
			//dayIDを更新
			dayId = $('.sort-days.active').attr('id');
			//スライドショーの中身を削除
			$('.wrapper-slideshow-slides').remove();
			$('.slideshow-nav').remove();
			$('.slideshow-indicators').remove();
			//スライドのフライヤーを差し替え
			slideTop();
			//現在のフライヤーを削除
			$('.todays-items li').remove();
			//ソートボタンで表示されるフライヤーを差し替え（見ているページによってだしわけも含む）
			changeAreaPage();
		});
	});

	//イベントページのだしわけ
	$.getJSON("../data/event.json", function(data){
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
		var paramType = paramArray["type"],
			paramArea = paramArray["area"],
			paramBox = paramArray["box"];
		//eventpageのだしわけ
		if (paramType == 'event'){
			var paramDay = paramArray["day"];
			$('.event-img img').attr('src',data[paramBox][paramDay]['img_' + 1]);
			$('.detail-box p').append(data[paramBox][paramDay]['event_description']);
			$('todays-contents').warp('<div class="event-main">');
		}
		//clubpageの出しわけ
		if (paramType == 'box'){
			for (var i = 1; i < 5; i++) {
				$('.box-img-inner').append('<a class="item" href=""><img src="' + data[paramBox]['box_img_' + i] + '" alt=""></a>');
			}
			//一枚目の画像をデフォルトとして表示する
			$('.box-img-big img').attr('src',$('.box-img-inner').find('img').eq(0).attr('src'));
			//画像の入れ替え
			$(".box-img-inner").find('a').on('click',function(event){
				event.preventDefault();
				var srcImg = $(this).find('img').attr('src');
				$('.box-img-big').find('img').attr('src',srcImg);
			});
			//クラブの説明文の追加
			$('.detail-box p').append(data[paramBox]['box_description']);
			//イベント画像の追加
			$('.event-img img').attr('src', data[paramBox][dayId]['img_1']);
			$('.sort-days').on('click',function(event){
				event.preventDefault();
				$('.sort-days').removeClass('active');
				$(this).addClass('active');
				//dayIDを更新
				dayId = $('.sort-days.active').attr('id');
				console.log(dayId);
				$('.event-img img').attr('src', data[paramBox][dayId]['img_1']);
			});
		}
	});

	//アコーディオンの処理
	//アコーディオンメニューの表示
	$('.side-menu').show();
	$('.index-side-menu').remove('');
	$(".side-menu dd").hide();
		$slideIndex.on("click", function(){
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

	//Areaページでの各アイテムの出しわけ
	function changeAreaPage(){
		$('.area-container article').remove();
		$.getJSON("../data/area.json", function(data){
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
					$(data[dayId]['shibuya']).each(function(){
						$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideArea');
					})
					$('.area-container').append('<article><div class="todays-contents akihabara"><a class="btn-area" href="/clubmania/tmpl/area.html?area=roppongi"><h2 class="roppongi">ROPPONGI</h2></a><ul class="todays-items cle list-items roppongi"></ul></div></article><article><div class="todays-contents roppongi"><a class="btn-area" href="/clubmania/tmpl/area.html?area=akihabara"><h2 class="akihabara">AKIHABARA</h2></a><ul class="todays-items cle list-items akihabara"></ul></div></article>');
				}else if(paramArray["area"] == "roppongi"){
					//六本木クラブの画像生成
					$(data[dayId]['roppongi']).each(function(){
						$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideArea');
					})
					$('.area-container').append('<article><div class="todays-contents"><a class="btn-area" href="/clubmania/tmpl/area.html?area=shibuya"><h2 class="shibuya">SHIBUYA</h2></a><ul class="todays-items cle list-items shibuya"></ul></div></article><article><div class="todays-contents roppongi"><a class="btn-area" href="/clubmania/tmpl/area.html?area=akihabara"><h2 class="akihabara">AKIHABARA</h2></a><ul class="todays-items cle list-items akihabara"></ul></div></article>');
				}else if(paramArray["area"] == "akihabara"){
					//秋葉原クラブの画像生成
					$(data[dayId]['akihabara']).each(function(){
						$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideArea');
					})
					$('.area-container').append('<article><div class="todays-contents"><a class="btn-area" href="/clubmania/tmpl/area.html?area=shibuya"><h2 class="shibuya">SHIBUYA</h2></a><ul class="todays-items cle list-items shibuya"></ul></div></article><article><div class="todays-contents akihabara"><a class="btn-area" href="/clubmania/tmpl/area.html?area=roppongi"><h2 class="roppongi">ROPPONGI</h2></a><ul class="todays-items cle list-items roppongi"></ul></div></article>');
				}
				$('.slideArea').slidePlugin();
			});
		});
	}


	//トップページのスライド画像の差し替え
	function slideTop(){
		$.getJSON("../data/area.json", function(data){
			//渋谷クラブの画像生成
			$(data[dayId]['shibuya']).each(function(){
				$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideTop');
			})
			//六本木クラブの画像生成
			$(data[dayId]['roppongi']).each(function(){
				$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideTop');
			})
			//秋葉原クラブの画像生成
			$(data[dayId]['akihabara']).each(function(){
				$('<a class="slide" href="' + this.event_url + '"><img src="' + this.img_1 + '" alt="スライドショー" class="slide" width="240px" height="auto"><div class="txt-box">'+ this.box_name +'</div><div class="txt-area">('+ this.area +')</div></a>').appendTo('.slideTop');
			})
			$('.slideTop').slidePlugin();
		});
	}

	//snsシェアボタンに現在いるページのURLを挿入
	$('.btn-share .btn-fb').attr('href','http://www.facebook.com/share.php?u=' + snsUrl);
	$('.btn-share .btn-tw').attr('href','http://twitter.com/share?url=' + snsUrl);

});

