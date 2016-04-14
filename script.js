//菜单栏的显示
$("#banner_menu_wrap").children().hover(function(){
    $(this).css("background","#e4e4e4");
    $(this).children("a").css("color","red");
    $(this).children(".banner_menu_content").css("border","1px solid #F0F0F0").show();
},function(){
    $(this).css("background","none");
     $(this).children("a").css("color","white");
    $(this).children(".banner_menu_content").css("border","0px solid #F0F0F0").hide();
});
$(".banner_menu_content_ul li a ").hover(function(){
    $(this).css("color","red");
},function(){
    $(this).css("color","black");
})
//轮播
$(function(){
    var i=0;
    var big_banner_pic = $("#big_banner_pic");
    var allimg=$("#big_banner_pic li").length;
    function img_change(){
        var img_i=i*-1226+"px";
        big_banner_pic.animate({opacity:".2"},100,function(){
            big_banner_pic.css("left",img_i );
            big_banner_pic.animate({
                opacity: "1"
            }, 100);
        })
    }
    function automatic1(){
        i+=1;
        if(i>=allimg){
            i=0;
        }
        img_change();
    }
    change_time = setInterval(automatic1, 3000);
    //轮播上一张下一张图标控制
    $("#big_banner_change_wrap").hover(function(){
        clearInterval(change_time);
        $("#big_banner_change_wrap").children().show();
    },function(){
        change_time = setInterval(automatic1, 3000);
        $("#big_banner_change_wrap").children().hide();
    })
    $("#big_banner_change_prev").click(function(){
        i += 1;
        if (i >= allimg) {
            i = 0;
        }
        img_change();
    })
    $("#big_banner_change_next").click(function(){
        i -= 1;
        if (i <= 0) {
            i = allimg - 1;
        }
        img_change();
    })
})
//跑马灯
$(function(){
    var i=0;
    var preview = $("#preview");
    var allimg=$("#preview li").length-8;
    function img_change(){
        var img_i=i*-240+"px";
        preview.css("left",img_i );
    }
    function automatic2(){
        i+=1;
        if(i>=allimg){
            i=0;
        }
        img_change();
    }
    change_self_time = setInterval(automatic2, 3000);
    //轮播上一张下一张图标控制
    $("#slide_change_wrap").hover(function(){
        clearInterval(change_self_time);
       
    },function(){
        change_self_time = setInterval(automatic2, 3000);
      
    })
    $("#slide_change_next").click(function(){
        i += 1;
        if (i >= allimg) {
            i = 0;
        }
        img_change();
    })
    $("#slide_change_prev").click(function(){
        i -= 1;
        if (i <= 0) {
            i = allimg - 1;
        }
        img_change();
    })
})