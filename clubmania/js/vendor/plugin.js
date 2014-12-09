(function($) {
	$.fn.slidePlugin = function(options) {
    	return this.each(function() {
			/*+++++++++++++++++土台となる要素を生成し、スタイルを当てる+++++++++++++++++*/
			var $this = $(this);
			//土台となる要素の生成
			$this.children('.slide').wrapAll('<div class="wrapper-slideshow-slides">' + '<div class="slideshow-slides slide-trans">');
			$this.append('<div class="slideshow-nav">' + '<a href="" class="prev"></a>' + '<div class="flyer"></div>' + '<a href="" class="next"></a>' + '</div>' + '<div class="slideshow-indicators">' + '<div class="wrapper-indicators">' + '<div class="indicators">' + '</div>' + '</div>' + '</div>' + '</div>');
			//デフォルトの引数の値
			var defaults = {
				intervalTime       : 2000,        //画像を切替えるまでのインターバルの時間
				duration           : 1000,        //スライドの遷移する速度の調整
				animationChange    : true,        //この値をtrueにするとcssアニメーションに変更
				indicatorChange    : false,        //この値をtrueにするとインジケーターが画像のサムネイルになる
			};
			//main.jsで引数を変更されてたらそちらの引数を優先する
			var setting = $.extend(defaults,options);
			var
				//引数の値を変数に格納
				imgNum             = $this.find('.slideshow-slides img').length,   //スライドの画像の枚数
				slideWidth         = $this.find('img').width(),                    //スライドの横幅
				slideHeight        = "auto",                   //スライドの縦幅
				indicatorChange    = setting['indicatorChange'],                   //この値をtrueにするとインジケーターが画像のサムネイルになる
				indicatorImgWidth  = $this.find('img').width() / 16,               //数字が大きくなるほど画像が小さくなる
				indicatorImgHeight = $this.find('img').height() / 16,              //数字が大きくなるほど画像が小さくなる
				indicatorsImgWidth = setting['indicatorsImgWidth'],                //インジケーターの見える部分の横幅
				indicatorsWidth    = "180px",                //インジケーターの見える部分の横幅
				intervalTime       = setting['duration'] + setting['intervalTime'],//インターバルタイム
				duration           = setting['duration'],                          //スライドの遷移する速度の調整
				easing             = 'jswing',                                     //イージングの種類
				animationChange    = setting['animationChange'],                   //この値をtrueにするとcssアニメーションに変更
				slideMoving        = -1 * $this.find('img').width();               //スライド切り替え用の変数

			//土台を元にjQueryオブジェクトを生成
			var
				$slideshowIndicators = $this.find('.slideshow-indicators'),        //インジケーター関連
				$wrapperIndicators   = $this.find('.wrapper-indicators'),           //ラッパーインジケーター
				$indicators          = $this.find('.indicators'),                  //インジケーター
				$slideshowSlides     = $this.find('.slideshow-slides'),            //すべてのスライド
				$slideNav            = $this.find('.slideshow-nav'),               //ナビゲーション
				$btnPrev             = $this.find('.slideshow-nav .prev'),         //戻るボタン
				$btnNext             = $this.find('.slideshow-nav .next'),         //進むボタン
				$slide             = $this.find('.slideshow-slides .slide'),         //スライド
				slideTimer ;									                                     //タイマーの入れ物
			//生成したテンプレートにCSSを適用する
			//画像のサイズに合わせてスライドの表示される部分を指定
			$this.css({
			    width    : slideWidth,
			    height   : slideHeight,
			    margin   : "0 auto"
			});
			//複数枚のスライドを横一枚に並べるための横幅を加え、画像のアンカータグの中にimgタグを生成
			$slideshowSlides.css({ width : imgNum * slideWidth });
			//ナビゲーションの位置の設定
			//console.log((slideHeight / 2) + navHeight);　★
			$slideNav.css({
			    width   : "100%",
			    bottom  : slideHeight * 2 / 3
			});
			//スライドショーのtransitionの設定
			$slideshowSlides.css({
				'-webkit-transition':'-webkit-transform ' + duration + 'ms cubic-bezier(0.25, 0.1, 0.25, 1.0)'
			});

			/*+++++++++++++++++インジケーターの生成とCSSの適用+++++++++++++++++*/
			//indicatorChangeがtrueなら画像インジケーターを生成
			if(indicatorChange){
				//画像インジーケータの生成
				for (var i = 0; ++i <= imgNum;){
					var $makingAnchor = $('<a href="#"><img src="" alt=""></a>'),
				    	$imgLink = $('.indicator:nth-child(n)').css('background-image');
						//アンカータグを生成
						$indicators.append($makingAnchor);
				}
				//インジケーターにスライドの画像のsrcを１番下から順にとってきて格納する
				$indicators.find('img').each(function(index){
					$(this).attr('src', $slideshowSlides.find('img').eq(index).attr('src'));
				});
				//サムネイルの生成とCSSの設定
				$indicators.find('img').each(function(index){
					$wrapperIndicators.css({
						//インジケーター全体の横幅を指定
						width  : indicatorsImgWidth,
						//インジケーター全体の縦幅を指定
						height : indicatorImgHeight * 2,
					});
					$indicators.css({
						//インジケーター全体の横幅を指定
						width  : indicatorsWidth
					});
					$(this).attr({
						width: indicatorImgWidth,
						height: indicatorImgHeight
					});
				});
				//インジケーターの上にマウスが来た時に画像の下線の色を変更する
				$indicators.find('img').css({ borderBottom : '3px solid #000' }).hover(
					function(){
						$(this).css({ borderBottom : '3px solid #fff'});
					},
					function(){
						$(this).css({ borderBottom : '3px solid #000' });
					}
				);
			//普通のインジケーターの場合
			}else{
				for (var i = 0; ++i <= imgNum ;){
					$indicators.append($('<a href="#"></a>').addClass('indicator'));
				}
				//インジケーター全部のCSSの設定
				$indicators.css({
					width    : indicatorsWidth
				});
			}
			//インジケーターの画像の要素を宣言
			var indicatorImg       =  $('.indicator:last-child').css('background-image'),
					indicatorImgActive =  $('.indicator:first-child').css('background-image'),
					$indicatorAnchor   =  $this.find('.slideshow-indicators a');

				/*+++++++++++++++++処理内容+++++++++++++++++*/
				//タイマーのスタート
				startTimer();
				// マウスが乗ったらタイマーを停止、はずれたら開始
				$this.on({
					mouseenter : stopTimer,
					mouseleave : startTimer
				});
				//console.log($('.slideshow-nav a')); ★
				//ナビゲーションボタンをおした時の処理
				$slideNav.find('a').on('click',function(event){
					event.preventDefault();
					btnNav($(this));
				});

				//インジケーターをおした時の処理
				$slideshowIndicators.find('a').on('click',function(event){
					event.preventDefault();
					clickIndicator($(this));
				});
			/*+++++++++++++++++時間経過とスライドの変更の処理+++++++++++++++++*/
			//画像を時間経過に伴いスライドさせる関数
			function movingTime(){
				//現在のスライドが何番目のスライドなのか取得
				var slideNumber     = Math.floor(( $this.find('.slideshow-slides').offset().left / slideWidth) * -1 +1);
				//最後のスライドの場合
				if(slideNumber === imgNum -1){
					//最初のスライドに移動する際のインジケーターとナビゲーションボタンの処理
					transFirst();
					//最初のスライドへ移動する
					timeGoFirst();
				//最後から２番目のスライド（最後のスライドへ移る場合）
				}else if(slideNumber === (imgNum - 1)){
					//最後のスライドに移動する際のインジケーターとナビゲーションボタンの処理
					transLast();
					//次のスライドへ移動する
					btnNext(slideNumber);
				//それ以外の場合
				}else{
					//次のスライドに移動する際のインジケーターとナビゲーションボタンの処理
					transNext(slideNumber);
					//次のスライドへ移動する
					btnNext(slideNumber);
				}
			}


			/*+++++++++++++++++ボタン操作の処理+++++++++++++++++*/
			//ナビゲーションボタンを押した時の処理
			function btnNav(btnNav){
				//表示位置からlefの値のみを取得
				var slideNumber     = Math.floor(( $this.find('.slideshow-slides').offset().left / slideWidth) * -1 +1),
				//前のスライドが何番目のスライドか計算する
				slidePrev       = Math.ceil(( $this.find('.slideshow-slides').offset().left / slideWidth) * -1 -1);
				//次へボタンだった場合
				if(btnNav.hasClass('next')){
					//最後から２番目のスライド（最後のスライドへ移る場合）
					if(slideNumber === (imgNum - 2)){
						//最後のスライドに移動する際のインジケーターとナビゲーションボタンの処理
						transLast();
					//それ以外なら
					}else{
						//次のスライドに移動する際のインジケーターとナビゲーションボタンの処理
						transBtnNext(slideNumber);
					}
					//次のスライドへ移動する
					btnNext(slideNumber);
				//戻るボタンだった場合
				}else{
					//インジケーターのリセット
					indicatorReset();
					//前のスライドと対応するインジケーターのaタグにactiveクラスを付与しインジケーターの色を変更する
					$indicatorAnchor.eq(slidePrev).addClass('active').css({ backgroundImage : indicatorImgActive });
					//もし最後のスライドだったら
					if(slideNumber === imgNum){
						//ナビゲーション次へ、戻るどちらも表示
						btnVisible();
					//もし２番目のスライドだった場合
					}else if(slideNumber === 1){
						//戻るボタンを表示する
						preveInvisible();
					//それ以外の時
					}else{
						//ナビゲーション次へ、戻るどちらも表示
						btnVisible();
					}
					//前のスライドへ移動する
					btnPrev(slidePrev);
				}
			}


		　　/*+++++++++++++++++インジケーターを押した時の処理+++++++++++++++++*/
			//インジケーターがクリックされた時の挙動の処理
			function clickIndicator(onIndicator){
				var index              = $this.find('.indicators a').index(onIndicator),//クリックされたアンカータグが何番目か取得
				    indicatorsPosition = -1 * index * slideWidth,//クリックされたインジケーターの位置を格納する変数
				    indicatorNum       = index + 1;//何番目のインジケーターか

				//スライドクリックされたインジケーターの指定する位置へ移動する
				if(animationChange){
					$slideshowSlides.css({
						'-webkit-transform':'translate(' + (indicatorsPosition) + 'px,0)',
						'-webkit-transition':'-webkit-transform ' + duration + 'ms cubic-bezier(0,0,0.25,1)'
					});
				}else{
					$slideshowSlides.animate({left: indicatorsPosition},duration);
				}
				//インジケーターのアンカーにactiveクラスをすべて取り除く
				$slideshowIndicators.find('a').removeClass('active');
				//インジケーターすべてを一度非active状態のボタンにする
				$slideshowIndicators.find('.indicator').css({ backgroundImage : indicatorImg });
				//インジケーターをアクティブ状態にする
				onIndicator.addClass('active').css({ backgroundImage : indicatorImgActive });
				//もし一つ目のインジケーターなら
				if(indicatorNum === 1){
					preveInvisible();
				//もし最後のインジケーターなら
				}else if(indicatorNum === imgNum){
					nextInvisible();
				//それ以外なら
				}else{
					btnVisible();
				}
			}


		　　/*+++++++++++++++++その他の関数+++++++++++++++++*/
			//進むボタンを押した時のインジケーター、ボタンの有無の関数
			function transBtnNext(slideNumber){
				indicatorReset();
				//次のスライドと対応するインジケーターのaタグにactiveクラスを付与し、インジケーターの色を変更する
				console.log(slideNumber +1);
				$indicatorAnchor.eq(slideNumber +1).addClass('active').css({ backgroundImage : indicatorImgActive });
				//進むも戻るも表示する
				btnVisible();
			}
			//進むナビゲーションボタンのcss3切り替えの処理
			function btnNext(slideNumber){
				if(animationChange){
					$slideshowSlides.css({
						'-webkit-transform':'translate(' + ( slideNumber + 1 ) * ( -1 * slideWidth ) + 'px,0)',
					});
				}else{
					$slideshowSlides.animate({left: slideNumber * ( -1 * slideWidth ) },duration);
				}
			}
			//戻るナビゲーションボタンのcss3切り替えの処理
			function btnPrev(slidePrev){
				if(animationChange){
					$slideshowSlides.css({
						'-webkit-transform':'translate(' + slidePrev * (slideWidth) * -1 + 'px,0)',
					});
				}else{
					$slideshowSlides.animate({ left: slidePrev * (slideWidth) * -1 },duration);
				}
			}
			//時間経過に伴う最初のスライドへ切り替え処理
			function timeGoFirst(){
				if(animationChange){
					$slideshowSlides.css({
						'-webkit-transform':'translate(' + 0 + 'px,0)',
					});
				}else{
					$slideshowSlides.animate({left: '0'},duration);
				}
			}
			//ナビゲーション次へ、戻るどちらも表示
			function btnVisible(){
				$btnPrev.show();
				$btnNext.show();
			}
			//戻るボタンを非表示
			function preveInvisible(){
				$btnPrev.hide();
				$btnNext.show();
			}
			//進むボタンを非表示
			function nextInvisible(){
				$btnPrev.show();
				$btnNext.hide();
			}
			//インジケーターのリセット
			function indicatorReset(){
				//インジケーターのアンカーにactiveクラスをすべて取り除く
				$indicatorAnchor.removeClass('active');
				//インジケーターすべてを一度非active状態のボタンにする
				$this.find('.indicator').css({ backgroundImage : indicatorImg });
			}
			//スライドショーをスタートさせる関数
			function startTimer(){
				slideTimer = setInterval(movingTime, intervalTime);
			}
			// タイマーを止める関数
			function stopTimer(){
				clearInterval(slideTimer);
			}
		    //最初のスライドに移動する時の関数
			function transFirst(){
			　　//インジケーターのリセット
				indicatorReset();
				//1個目のインジケーターをアクティブにし、インジケーターの色を変更する
				$indicatorAnchor.eq(0).addClass('active').css('background-image', indicatorImgActive);
				//戻るボタンを非表示にする
				preveInvisible();
			}
		    //最後のスライドに移動する時の関数
			function transLast(){
				//インジケーターのリセット
				indicatorReset();
				//最後のインジケーターをアクティブにし、インジケーターの色を変更する
				$indicatorAnchor.eq(imgNum - 1).addClass('active').css({ backgroundImage : indicatorImgActive });
				//次に進むボタンを非表示
				nextInvisible();
			}
			//次に進むときのインジケーター、ボタンの有無の関数
			function transNext(slideNo){
				//インジケーターのリセット
				indicatorReset();
				//次のスライドと対応するインジケーターのaタグにactiveクラスを付与し、インジケーターの色を変更する
				$indicatorAnchor.eq(slideNo +1).addClass('active').css({ backgroundImage : indicatorImgActive });
				//進む、戻るボタンを表示する
				btnVisible();
			}
		});
	};
}(jQuery));
