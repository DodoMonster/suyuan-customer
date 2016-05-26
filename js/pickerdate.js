/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-11-17 11:14:01
 * @version $Id$
 */

 $(function(){
    $.datetimepicker.setLocale('de');
    $('#buildDate1').datetimepicker({
     i18n:{
      de:{
       months:[
        '1月','2月','3月','4月',
        '5月','6月','7月','8月',
        '9月','10月','11月','12月',
       ],
       // dayOfWeek:[
       //  "星期日.", "星期一", "星期二", "星期三", 
       //  "星期四", "星期五", "星期六.",
       // ]   //无效
      }
     },
     timepicker:false,
     format:'Y-m-d'  //返回数据格式
    });

    $('#buildDate2').datetimepicker({
     i18n:{
      de:{
       months:[
        '1月','2月','3月','4月',
        '5月','6月','7月','8月',
        '9月','10月','11月','12月',
       ],
       // dayOfWeek:[
       //  "星期日.", "星期一", "星期二", "星期三", 
       //  "星期四", "星期五", "星期六.",
       // ]   //无效
      }
     },
     timepicker:false,
     format:'Y-m-d'  //返回数据格式
    });

    $('#buildDate3').datetimepicker({
     i18n:{
      de:{
       months:[
        '1月','2月','3月','4月',
        '5月','6月','7月','8月',
        '9月','10月','11月','12月',
       ],
       // dayOfWeek:[
       //  "星期日.", "星期一", "星期二", "星期三", 
       //  "星期四", "星期五", "星期六.",
       // ]   //无效
      }
     },
     timepicker:false,
     format:'Y-m-d'  //返回数据格式
    });

 });

