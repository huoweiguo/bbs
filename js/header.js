if (!$CONFIG) {
    var $CONFIG = {};
    $CONFIG['sys_domain'] = 'wangdaizhijia.com';
}
var _domain = "http://www." +$CONFIG['sys_domain']+"";
$(document).ready(function () {
    _domain = "http://www." +$CONFIG['sys_domain']+"";
})


function loginAct() {
                $.ajax({
                    url: _domain + "/front/login?callback=?",
                    type: "POST",
                    //async : false,
                    dataType: "jsonp",
                    success: function (data) {
                        var nologin = $('.h-noLogin'),
                            isLogin = $('.h-isLogin');
                        if (!data || data=='-1') {
                            nologin.show();
                            isLogin.hide();
                            $("#username").val("");
                            $("#username2").text("");
                            $("#uid").val("");
                            $("#status_head").val("");
                            $("#is_plat_user_head").val("");
                            $("#groupid_head").val("");
                        } else {
                            var jsonData = data;
                            nologin.hide();
                            isLogin.show();
                            $.each(jsonData, function (i, item) {
                                var username = decodeURIComponent(item.username);
                                $("#username").val(item.username);
                                $("#uid").val(item.uid);
                                $("#status_head").val(item.status);
                                $("#comment_status_head").val(item.commentStatus);
                                $("#is_plat_user_head").val(item.isPlatUser);
                                $("#groupid_head").val(item.groupId);
                                $(".h-username i").eq(0).html(username);
                                $(".h-top-head,.h-username>i").click(function(){
                                    window.location.href="http://member.wdzj.com/space-"+item.uid+".html";
                                });
                                $("#mybaike").attr("href", "http://baike.wdzj.com/user-space-" + item.uid + ".html");
                                $(".h-top-head").attr("src", "http://bbs.wdzj.com/uc_server/avatar.php?uid=" + item.uid + "&size=small");
                            });
                            afterLogin();
                        }
                        if (typeof(afterLoginCheck) != 'undefined') {
                            afterLoginCheck();
                        }
                    }
                });

}





function afterLogin() {
    if ($("p.no_log").length > 0) {
        $("#replyContent").removeAttr("disabled");
        $("#reviewContent").removeAttr("disabled");
        $(".btn_smt").removeAttr("disabled");
        $("p.no_log").hide();
    } else {
        $("p.no_log").show();
    }
    if (typeof(myNavList) != 'undefined') {
        myNavList();
    }
}

function ssoLogin(uid) {

    $.ajax({
        url: _domain + "/front/ssoLogin",
        data: {"uid": uid},
        type: "POST",
        async: false,
        success: function (data) {
            alert(data);
            document.write(data);
            //eval("("+data+")");
            //location.reload();
        }
    });
}
$(document).ready(function () {
    /*var interval1=setInterval(function(){
     loginAct();
     clearInterval(interval1);
     },1000);*/
    loginAct();
    /*
     * 鏂扮櫥褰曢渶瑕佺殑bbs鎺ュ彛鏁版嵁
     * 鎺ュ彛浜�: 鑲栧弸寮�
     */
    $.ajax({
        url: "http://bbs.wdzj.com/forumInterface/getRemindInfo?callback=jsonp123456789",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            var myInfo = $('.h-ts');
            myInfo.hide();
            if (data.error_code === 0) {
                var d = data.data;
                var count = 0;
                if (d.comment) {
                    myInfo.eq(0).html(d.comment).show();
                    count += d.comment;
                }
                if (d.private_message) {
                    myInfo.eq(1).html(d.private_message).show();
                    count += d.private_message;
                }
                if (d.thread) {
                    myInfo.eq(2).html(d.thread).show();
                    count += d.thread;
                }
                if (d.system) {
                    myInfo.eq(3).html(d.system).show();
                    count += d.system;
                }
                if(count > 0){
                    myInfo.eq(4).html(count).show();
                }
            }
        }
    });


    var d = new Date();
    var sDt = d.getFullYear() + "" + d.getMonth() + "" + d.getDate() + "" + d.getHours();
    var url = _domain + "/wdzj/html/json/exponent.json" + "?v=" + sDt;
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data == '' || data == null) {

            } else {
                var jsonData = eval(data);
                $("ul.data_info #turnover").html(jsonData.turnover);
                $("ul.data_info #exponent").html(jsonData.exponent);
                $("ul.data_info #outcount").html(jsonData.outcount);
                //鏂伴椤垫敼鐗堟寚鏁版爮鏁版嵁
                $("#versionSuccess").html(jsonData.turnover);
                $("#versionPromit").html(jsonData.exponent);
                $("#versionHot").html(jsonData.outcount);
                /*
                 * 濮滄宄ゆ敞閲�
                 * $.each(jsonData,function(i,item){
                 alert(item.turnover);
                 alert(item.exponent);
                 alert(item.outcount);
                 $("ul.data_info #turnover").html(item.turnover);
                 $("ul.data_info #exponent").html(item.exponent);
                 $("ul.data_info #outcount").html(item.outcount);
                 });
                 * */
            }
        }
    });
    $("#loginBtn").click(function () {
        var userName = $("#loginName").val();
        var passWord = $("#loginPassword").val();
        var code = $("#loginCode").val();
        if (userName == '') {
            shock();
            $("#error").text("鐢ㄦ埛鍚嶄笉鑳戒负绌猴紒");
            return;
        }
        if (passWord == '') {
            shock();
            $("#error").text("瀵嗙爜涓嶈兘涓虹┖锛�");
            return;
        }
        if (code == '') {
            shock();
            $("#error").text("楠岃瘉鐮佷笉鑳戒负绌猴紒");
            return;
        }
        $.ajax({
            url: _domain + "/front/checkUser",
            data: {"userName": userName, "passWord": passWord, "code": code},
            type: "POST",
            //async : false,
            datatype: "text",
            success: function (data) {
                var jsonData = eval(data);
                $.each(jsonData, function (i, item) {
                    var error = item.error;
                    if (error == undefined) {
                        ssoLogin(item.uid);
                        //location.reload();
                    } else {
                        shock();
                        $("#kaptchaImage").hide().attr("src", _domain + "/kaptcha/code?" + Math.floor(Math.random() * 100)).fadeIn();
                        $("#error").text(error);
                    }
                });
            }
        });


    });
    //$("#kaptchaImage").hide().attr("src",  "/kaptcha/code?" + Math.floor(Math.random()*100)).fadeIn();
    //鏇存崲楠岃瘉鐮�
    $('#change_code').click(function () {
        $("#kaptchaImage").hide().attr("src", _domain + "/kaptcha/code?" + Math.floor(Math.random() * 100)).fadeIn();
    });

    //鏇存崲楠岃瘉鐮�
    $('#change_code2').click(function () {
        $("#kaptchaImage").hide().attr("src", _domain + "/kaptcha/code?" + Math.floor(Math.random() * 100)).fadeIn();
    });
    /*$("#log").toggle(
     function(){
     if($(".log_wind").is(":hidden")){
     $("#log").attr("style","background:#fff;color:#504f4f;");
     }else{
     $("#log").attr("style","");
     }
     $("#kaptchaImage").hide().attr("src",  "/kaptcha/code?" + Math.floor(Math.random()*100)).fadeIn();
     $(".log_wind").toggle(100);
     },
     function(){
     if($(".log_wind").is(":hidden")){
     $("#log").attr("style","background:#fff;color:#504f4f;");
     }else{
     $("#log").attr("style","");
     }
     $("#kaptchaImage").hide().attr("src",  "/kaptcha/code?" + Math.floor(Math.random()*100)).fadeIn();
     $(".log_wind").toggle(100);
     }
     );

     $("#log").mouseover(function(){
     if($(".log_wind").is(":hidden")){
     $("#kaptchaImage").hide().attr("src",  "/kaptcha/code?" + Math.floor(Math.random()*100)).fadeIn();
     }
     $(".log_wind").show(100);
     $("#log").attr("style","background:#fff;color:#504f4f;");

     });*/

    function stopPropagation(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }

    $(document).bind('click', function () {
        //$("#log").attr("style", "");
        $('.log_wind').css('display', 'none');
    });

    $('.log_wind').bind('click', function (e) {
        stopPropagation(e);
    });

    //鐧诲綍鍥炶溅澶勭悊
    $('#loginName').keydown(function (e) {
        if (e.keyCode == 13) {
            $("#loginBtn").click();
        }
    });
    $('#loginPassword').keydown(function (e) {
        if (e.keyCode == 13) {
            $("#loginBtn").click();
        }
    });
    $('#loginCode').keydown(function (e) {
        if (e.keyCode == 13) {
            $("#loginBtn").click();
        }
    });
    //妯℃嫙涓嬫媺妗�
    $(".dropDown_wdzj").each(function (index, el) {
        var o = $(el);
        var i = o.find(".dropBtn");
        var text = o.find(".putIn");
        var ul = o.find("ul");
        o.click(function () {
            ul.toggle();
            $(this).toggleClass("dropDown-open");
        });
        text.click(function () {
            ul.toggle();

        });
        ul.find("li").click(function () {
            text.val($(this).text());
            $(".dropDown_wdzj").removeClass("dropDown-open");
            ul.hide();
            return false;
        });
        $(document).click(function (e) {
            if (!$(e.target).parents().hasClass("dropDown")) {
                ul.hide();
                $(".dropDown_wdzj").removeClass("dropDown-open");
            }
        });
    });


});

function loginOut() {
    $.ajax({
        url: _domain + "/front/clearCookie",
        type: "POST",
        //async : false,
        datatype: "text",
        success: function (data) {
            $.ajax({
                url:_domain + "/front/passportEnable",
                type:"POST",
                success: function(data){
                    if(data=='1'){
                         window.location.href ="http://passport." +$CONFIG['sys_domain']+"/user/logout";
                    }else{
                        location.reload();
                    }
                }   
            });
        }
    });
}

function shock() {
    var $panel = $("div.log_wind");
    var box_left = $('div.tnav_box').width() - ($("div.log_wind").width()) - 70;
    $panel.css({'left': box_left, 'position': 'absolute'});
    for (var i = 1; 3 >= i; i++) {
        $panel.animate({left: box_left - (40 - 10 * i)}, 120);
        $panel.animate({left: box_left + (40 - 10 * i)}, 120);
    }
}

function jumpLogin() {
    $.ajax({
        url:_domain + "/front/passportEnable",
        type:"POST",
        success: function(data){
            if(data=='1'){
                 window.location.href ="http://passport." +$CONFIG['sys_domain']+"/user/login";
            }else{
                 window.location.href = "http://bbs." +$CONFIG['sys_domain']+"/member.php?mod=logging&action=loginbak&referer=" + window.location.href;
            }
        }   
    });

   
}
function jumpRegister() {
    $.ajax({
        url: _domain + "/front/passportEnable",
        type:"POST",
        success: function(data){
            if(data=='1'){
                 window.location.href ="http://passport." +$CONFIG['sys_domain']+"/user/register?referer=" + window.location.href;
            }else{
                 window.location.href = "http://bbs." +$CONFIG['sys_domain']+"/member.php?mod=register&referer=" + window.location.href;
            }
        }   
    });  
}