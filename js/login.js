 $(function() {
     flag = {
         "uname": false,
         "pwd": false
     };
     $nameErr_tip = $(".nameErr_tip");
     $pwdErr_tip = $(".pwdErr_tip");

     //显示登录框
     function showLoginFrame() {
         $(".login_box").slideDown(500);
         $(".lb_overlay").fadeIn("fast");
         // autoCenter(getId('login_box'));
         // $('login_box').slideDown(500);
         $("body").css("overflow", "hidden");
     }
     $(".loginBtn").click(showLoginFrame);

     //关闭登录框
     function closeLoginFrame() {
         $(".login_box").slideUp(500);
         $(".lb_overlay").fadeOut("fast");
         $("body").css("overflow", "scroll");
         $("#loginForm")[0].reset();
         $nameErr_tip.empty();
         $pwdErr_tip.empty();
         $(".backErr_tip").empty();
         $('.loginBtn').removeClass("on");
     }
     $(".closeFrame").click(closeLoginFrame);
     $(".lb_overlay").click(closeLoginFrame); //点击遮罩也可以关闭登录框

     //检查账号输入
     function checkname() {
         uname = $("#username").val();
         if (uname === '') {
             flag.uname = false;
             $nameErr_tip.text("请先输入账号");
             return false;
         } else {
             $nameErr_tip.empty();
             flag.uname = true;
         }
     }
     // $("#username").blur(checkname);

     //检查密码输入
     function checkpwd() {
         pwd = $("#password").val();
         if (pwd === '') {
             flag.pwd = false;
             $pwdErr_tip.text("请先输入密码");
         } else {
             $pwdErr_tip.empty();
             flag.pwd = true;
         }
     }
     // $("#password").blur(checkpwd);

     function submitForm() {
         $.ajax({
             type: "POST",
             url: "",
             data: $("#loginForm").serialize(),
             dataType: "json",
             success: function(data) {
                 alert("登陆成功！");
             },
             error: function(err) {
                 $(".backErr_tip").text("账号或者密码有误！请重新输入");
             }
         });
     }

     $(".login_btn").click(function() {
         $(".backErr_tip").empty();
         checkname();
         checkpwd();
         if (flag.uname && flag.pwd) {
             submitForm();
         }
     });
 })
