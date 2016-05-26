$(function(){
    var $goodIntro=$(".goodIntro");
        $intro=$(".intro");//信息div
        $choice=$(".introNav li");//信息选项卡
        $choice.each(function(i){
            $(this).click(function(){
                $choice.removeClass("on");
                $(this).addClass("on");
                $intro.css("display","none");
                $intro.eq(i).fadeIn();
            });
        });
});
