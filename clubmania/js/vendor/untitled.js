//list-more
$(function(){
  $(".btn-more").click(function(){
    var EXPAND_LIST_NUM = 10; // 展開量
    var list = $(this).prev("ul").find("a.d-none");
    var list_max = $(this).prev("ul").find("a");
    for (var i = 0; i < EXPAND_LIST_NUM; i++) {
      if (list.index() + i == list_max.length)  {
        $(this).remove();
        break;
      }
      list.eq(i).removeClass("d-none");
    }
    
  });
});
//flex-header
$(function(){
    $(window).load( function(){
        var real_title = document.getElementById("header-title").offsetHeight;
        $("#header-title").addClass("line-clamp1");
        var one_title = document.getElementById("header-title").offsetHeight;
        $("#header-title").removeClass("line-clamp1");
        if( real_title != one_title) {
            $("#header-title h1").addClass("txt-l");
        }
    });
});

