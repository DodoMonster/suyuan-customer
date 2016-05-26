 $(function() {
     var $formDiv = $(".formDiv"); //角色注册与介绍div
     $headerLi = $("#enroll_header li"); //角色选择li
     $btnList = $(".confirmBox_footer button"); //确认框按钮
     $headerLi.each(function(i) {
         $(this).click(function() {
             if (!$formDiv.eq(0).is(':visible')) {
                 showConfirmFrame1(i);
             } else {
                 showEnroll(i);
                 $headerLi.removeClass('on');
                 $headerLi.eq(i).addClass('on');
             }
         });

     });

     function inputFile() {
         var $upfile1 = $("#upfile1");
         var path = $("#file1").val();
         var a = path.lastIndexOf("\\");
         $upfile1.value = path.substring(a + 1);
     }
     //显示注册窗口
     function showEnroll(i) {
         resetForms();
         $formDiv.each(function(form_i) {
             if ($(this).is(":visible")) {
                 $(this).stop();
                 $(this).slideUp();

             }

         });
         $formDiv.eq(i + 1).slideDown(1000);
     }

     //显示跳转注册确认窗口
     function showConfirmFrame1(i) {
         $(".confirmBox_content span").html("确定离开当前页面？");
         $("#confirmBox").removeClass('resultBox');
         $(".confirmBox_footer").show();
         $("body").css("overflow", "hidden");
         boxShow();
         clickComfirm1(i);
     }

     //显示提交表单确认窗口
     function showConfirmFrame2(i) {
         $(".confirmBox_content span").html("确认提交吗？");
         $("#confirmBox").removeClass('resultBox');
         $(".confirmBox_footer").show();
         boxShow();
         clickComfirm2(i);
     }

     //点击厂商Tab提示框按钮事件
     function clickComfirm1(i) {

         $btnList.eq(0).unbind('click').click(function() {
             $headerLi.removeClass('on');
             $headerLi.eq(i).addClass('on');
             resetForms();
             closeConfirmFrame();
             showEnroll(i);

         });
         $btnList.eq(1).unbind('click').click(closeConfirmFrame);
     }

     //点击提交按钮提示框按钮事件
     function clickComfirm2(i) {
         $btnList.eq(0).unbind('click').click(function() {
             closeConfirmFrame();
             submitForm(i);
         });
         $btnList.eq(1).unbind('click').click(closeConfirmFrame);
     }

     //关闭提示框
     function closeConfirmFrame() {
         $("#confirmBox").slideUp(500);
         $(".lb_overlay").fadeOut("fast");
         $("body").css("overflow", "visible");
     }

     //注册跳转与提交确认框与结果提示框出现样式
     function boxShow() {
         $("#confirmBox").slideDown(500);
         $(".lb_overlay").fadeIn("fast");
     }
     $("#closeFrame").click(closeConfirmFrame);
     $(".lb_overlay").click(closeConfirmFrame); //点击遮罩也可以关闭登录框



     //注册验证
     var $enrollForm1 = $("#enrollForm0"); //生产商表单
     var $enrollForm2 = $("#enrollForm1"); //分销商表单
     var $enrollForm3 = $("#enrollForm2"); //监管部门表单

     //电子邮箱验证
     jQuery.validator.addMethod("email", function(value, element) {
         var email =
             /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
         return this.optional(element) || (email.test(value));
     }, "请输入合法邮箱");

     //联系电话验证
     jQuery.validator.addMethod("phone", function(value, element) {
         var phone = /^1\d{10}$/;
         var phone1 = /^0\d{2,3}-?\d{7,8}$/;
         return this.optional(element) || (phone1.test(value)) ||
             (phone.test(value));
     }, "请输入合法手机号或固定电话");

     //生产商
     var $validator1 = $enrollForm1.validate({
         rules: { //验证规则
             name: {
                 rangelength: [4, 20]
             },
             legalPerson: {
                 maxlength: 10
             },
             buildDate: {

             },
             registeredFund: {
                 digits: true
             },
             phone: {
                 phone
             },
             email: {
                 email: true,
             },
             address: {

             },
             website: {
                 url: true
             },
             comments: {
                 maxlength: 200
             }
         },
         messages: { //错误提示
             name: {
                 required: "请输入厂商名称",
                 rangelength: "名称长度必须为4-20字"
             },
             legalPerson: {
                 required: "请输入法人姓名",
                 maxlength: "姓名长度必须小于10字"
             },
             buildDate: {
                 required: "请选择成立日期"

             },
             registeredFund: {
                 required: "请输入注册资金",
                 digits: "请输入数字"
             },
             type: {
                 required: "请选择厂商类型"
             },
             nature: {
                 required: "请选择厂商性质"
             },
             phone: {
                 required: "请输入联系电话"
             },
             email: {
                 required: "请输入邮箱帐号",
                 email: "请输入合法邮箱",
             },
             province: {
                 required: "请选择所在区域"
             },
             city: {
                 required: "请选择所在区域"
             },
             prefecture: {
                 required: "请选择所在区域"
             },
             address: {
                 required: "请输入详细地址",

             },
             website: {
                 url: "请输入合法网址"
             },
             licensePic: {
                 required: "请上传营业执照"
             },
             comments: {
                 maxlength: "介绍长度必须小于200字"
             }

         },
         errorElement: "span",
         wrapper: "div",
         groups: {
             location: "povince city profecture"
         },
         errorPlacement: function(error, element) { //错误提示摆放
             if (element.attr("name") == "province" ||
                 element.attr("name") == "city" || element.attr(
                     "name") == "profecture") {} else {
                 if (element.attr("name") == "licensePic") {
                     error.appendTo(element.parent().parent());
                 } else {
                     error.appendTo(element.parent());
                 }
             }
         },
         errorClass: "error", //错误提示样式
         focusCleanup: true, //未通过验证的元素获得焦点时，移除错误提示
         focusInvalid: false, //未通过验证的表单（第一个或提交之前获得焦点的未通过验证的表单）会获得焦点
         submitHandler: function(form) {
             $("#isProducer1").val(1);
             showConfirmFrame2(1);
         }
     });

     //分销商
     var $validator2 = $enrollForm2.validate({
         rules: {
             name: {
                 rangelength: [4, 20]
             },
             legalPerson: {
                 maxlength: 10
             },
             buildDate: {

             },
             registeredFund: {
                 digits: true
             },
             phone: {
                 phone
             },
             email: {
                 email: true,

             },
             address: {

             },
             website: {
                 url: true
             },
             comments: {
                 maxlength: 200
             }
         },
         messages: {
             name: {
                 required: "请输入厂商名称",
                 rangelength: "名称长度必须为4-20字"
             },
             legalPerson: {
                 required: "请输入法人姓名",
                 maxlength: "姓名长度必须小于10字"
             },
             buildDate: {
                 required: "请选择成立日期"

             },
             registeredFund: {
                 required: "请输入注册资金",
                 digits: "请输入数字"
             },
             type: {
                 required: "请选择厂商类型"
             },
             nature: {
                 required: "请选择厂商性质"
             },

             phone: {
                 required: "请输入联系电话"
             },
             email: {
                 required: "请输入邮箱帐号",
                 email: "请输入合法邮箱",
             },
             province: {
                 required: "请选择所在区域"
             },
             city: {
                 required: "请选择所在区域"
             },
             prefecture: {
                 required: "请选择所在区域"
             },
             address: {
                 required: "请输入详细地址",

             },
             website: {
                 url: "请输入合法网址"
             },
             licensePic: {
                 required: "请上传营业执照"
             },
             comments: {
                 maxlength: "介绍长度必须小于200字"
             }

         },
         errorElement: "span",
         wrapper: "div",
         groups: {
             location: "povince city profecture"
         },
         errorPlacement: function(error, element) {
             if (element.attr("name") == "province" ||
                 element.attr("name") == "city" || element.attr(
                     "name") == "profecture") {} else {
                 if (element.attr("name") == "licensePic") {
                     error.appendTo(element.parent().parent());
                 } else {
                     error.appendTo(element.parent());
                 }
             }
         },
         errorClass: "error",
         focusCleanup: true,
         focusInvalid: false,
         submitHandler: function(form) {
             $("#isProducer2").val(0);
             showConfirmFrame2(2);
         }

     });

     //监管部门
     var $validator3 = $enrollForm3.validate({
         rules: {
             name: {
                 rangelength: [4, 20]
             },
             buildDate: {

             },
             phone: {
                 phone
             },
             email: {
                 email: true,
             },
             address: {

             },
             website: {
                 url: true
             },
             conmments: {
                 maxlength: 200
             }
         },
         messages: {
             name: {
                 required: "请输入部门名称",
                 rangelength: "名称长度必须为4-20字"
             },
             buildDate: {
                 required: "请选择成立日期"
             },
             phone: {
                 required: "请输入联系电话"
             },
             email: {
                 required: "请输入邮箱帐号",
                 email: "请输入合法邮箱",
             },
             province: {
                 required: "请选择所在区域"
             },
             city: {
                 required: "请选择所在区域"
             },
             prefecture: {
                 required: "请选择所在区域"
             },
             address: {
                 required: "请输入详细地址"
             },
             website: {
                 url: "请输入合法网址"
             },
             file: {
                 required: "请上传执照"
             },
             conmments: {
                 maxlength: "介绍长度必须小于200字"
             }

         },
         errorElement: "span",
         wrapper: "div",
         groups: {
             location: "povince city profecture"
         },
         errorPlacement: function(error, element) {
             if (element.attr("name") == "province" ||
                 element.attr("name") == "city" || element.attr(
                     "name") == "profecture") {} else {
                 error.appendTo(element.parent());
             }

         },
         errorClass: "error",
         focusCleanup: true,
         focusInvalid: false,
         submitHandler: function(form) {
             showConfirmFrame2(3);
         }

     });
     //注册验证结束

     //提交表单
     function submitForm(i) {
         //监管部门提交
         alert($("#enrollForm" + (i - 1)).serialize());

         if (i == 3) {
             $.ajax({
                 type: "post",
                 url: "http://rest.scau.ren/mockjs/5/data.json",
                 data: $("#enrollForm" + (i - 1)).serialize(),
                 dataType: "json",
                 success: function(data) {
                     $(".confirmBox_content span").html(
                         "提交成功！");
                     $("#confirmBox").addClass('resultBox');
                     $(".confirmBox_footer").hide();
                     resetForms();
                     boxShow();
                 },
                 error: function(jqXHR) {
                     $(".confirmBox_content span").html(
                         "提交失败！" + jqXHR.status + '   ' +
                         jqXHR.readyState);
                     $("#confirmBox").addClass('resultBox');
                     $(".confirmBox_footer").hide();
                     boxShow();
                 }
             });
         }

         //生产商与分销商提交
         else {
             $.ajaxFileUpload({
                 url: 'http://rest.scau.ren/mockjs/5/data.json', //用于文件上传的服务器端请求地址
                 type: "post",
                 secureuri: false, //一般设置为false
                 data: $("#enrollForm" + (i - 1)).serializeArray(),
                 fileElementId: "file" + i, //文件上传空间的id属性  <input type="file" id="file" name="file" />
                 dataType: 'json', //返回值类型 一般设置为json
                 success: function(data, status) //服务器成功响应处理函数
                     {
                         if (status == 'success')
                             $(".confirmBox_content span").html(
                                 "提交成功！" + status);
                         else
                             $(".confirmBox_content span").html(
                                 "提交失败！");

                         $("#confirmBox").addClass('resultBox');
                         $(".confirmBox_footer").hide();
                         resetForms();
                         boxShow();

                     },
                 error: function(data, status, e) //服务器响应失败处理函数
                     {
                         $(".confirmBox_content span").html(
                             "提交失败！" + status);
                         $("#confirmBox").addClass('resultBox');
                         $(".confirmBox_footer").hide();
                         boxShow();
                     }
             })
             return false;

         }

     }

     // function checkFile(){
     //   var $file = $(".file"),
     //     $fileBtn = $(".fileBtn");
     //       $file.eq(0).blur(function(event) {
     //            if(!$validator1.element(this)){
     //            changeFileBtn(0);
     //       }
     //       });
     //  }

     //重置表单
     function resetForms() {
         $validator1.resetForm();
         $validator2.resetForm();
         $validator3.resetForm();
         $(".form").each(function(index, el) {
             el.reset();
         });
     }

 });

 function inputFile1() {
     var $upfile1 = $("#upfile1");
     var path = $("#file1").val();
     var a = path.lastIndexOf("\\");
     var fileName = path.substring(a + 1);
     $upfile1.val(fileName);
 }

 function inputFile2() {
     var $upfile2 = $("#upfile2");
     var path = $("#file2").val();
     var a = path.lastIndexOf("\\");
     var fileName = path.substring(a + 1);
     $upfile2.val(fileName);
 }
