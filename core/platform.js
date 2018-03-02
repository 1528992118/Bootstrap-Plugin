/*


 */

var g_config_web_context       = typeof config_web_context       === 'undefined' ? "/open" : config_web_context;

var g_config_path_api_uaa       = typeof config_path_api_uaa       === 'undefined' ? g_config_web_context+"/uaa"       : config_path_api_uaa;

var g_config_path_api_gw       = typeof config_path_api_gw       === 'undefined' ? g_config_web_context+"/gw"       : config_path_api_gw;

/*
var g_config_path_api_template     = typeof config_path_api_template     === 'undefined' ? g_config_web_context+"/template"     : config_path_api_template;

var g_config_path_api_company     = typeof config_path_api_company     === 'undefined' ? g_config_web_context+"/company"     : config_path_api_company;
var g_config_path_api_account     = typeof config_path_api_account     === 'undefined' ? g_config_web_context+"/account"     : config_path_api_account;
var g_config_path_api_user       = typeof config_path_api_user       === 'undefined' ? g_config_web_context+"/user"       : config_path_api_user;
var g_config_path_api_application   = typeof config_path_api_application   === 'undefined' ? g_config_web_context+"/application"   : config_path_api_application;
var g_config_path_api_document     = typeof config_path_api_document     === 'undefined' ? g_config_web_context+"/document"     : config_path_api_document;
var g_config_path_api_faq       = typeof config_path_api_faq       === 'undefined' ? g_config_web_context+"/faq"       : config_path_api_faq;
var g_config_path_api_sdk       = typeof config_path_api_sdk       === 'undefined' ? g_config_web_context+"/sdk"       : config_path_api_sdk;
var g_config_path_api_log       = typeof config_path_api_log       === 'undefined' ? g_config_web_context+"/log"       : config_path_api_log;
var g_config_path_api_monitor     = typeof config_path_api_monitor     === 'undefined' ? g_config_web_context+"/monitor"     : config_path_api_monitor;

var g_config_path_api_openapi     = typeof config_path_api_openapi     === 'undefined' ? g_config_web_context+"/openapi"     : config_path_api_openapi;
var g_config_path_api_service     = typeof config_path_api_service     === 'undefined' ? g_config_web_context+"/service"     : config_path_api_service;
var g_config_path_api_content     = typeof config_path_api_content     === 'undefined' ? g_config_web_context+"/content"     : config_path_api_content;
var g_config_path_api_message     = typeof config_path_api_message     === 'undefined' ? g_config_web_context+"/message"     : config_path_api_message;
*/

var g_config_path_api         = typeof config_path_api     === 'undefined' ? g_config_web_context : config_path_api;
var g_config_path_client       = typeof config_path_client   === 'undefined' ? g_config_web_context : config_path_client;



if (typeof jQuery === 'undefined') {
  //throw new Error('Platform\'s JavaScript requires jQuery')
}

(function(window, document, $) {
  'use strict';

  var P = function(a, b) {
    return $(a, b);
  };
  
  var Config = {
    "api": {
      "uaa"       : g_config_path_api_uaa,
      "gw"       : g_config_path_api_gw/*,
      
      "template"     : g_config_path_api_template,
      
      "company"     : g_config_path_api_company,
      "account"     : g_config_path_api_account,
      "user"       : g_config_path_api_user,
      "application"   : g_config_path_api_application,
      "document"     : g_config_path_api_document,
      "faq"       : g_config_path_api_faq,
      "sdk"       : g_config_path_api_sdk,
      "log"       : g_config_path_api_log,
      "monitor"     : g_config_path_api_monitor,

      "openapi"     : g_config_path_api_openapi,
      "service"     : g_config_path_api_service,
      "content"     : g_config_path_api_content,
      "message"     : g_config_path_api_message*/
    },
    api_server_url : g_config_path_api,
    client_path : g_config_path_client/*,
    resources_server_url : config_path_resources,
    newscenter_channel_id : config_channel_newscenter_id,
    root_channel_id: config_channel_root_id*/
  };
  
  P.config = Config;

  if (window.p) {
    return;
  }

  window.p = window.SWPlatform = P;

})(window, document, jQuery);




/*
 * Utils
 */
(function($, P) {
  'use strict';

  var Utils = {
    debug: function(log) {
      if (window.debug && console && console.debug) {
        console.debug(log);
      }
    },
    DateFormat : function(date, fmt) {
      var o = {
        "M+" : date.getMonth() + 1, // 月份
        "d+" : date.getDate(), // 日
        "h+" : date.getHours(), // 小时
        "m+" : date.getMinutes(), // 分
        "s+" : date.getSeconds(), // 秒
        "q+" : Math.floor((date.getMonth() + 3) / 3), // 季度
        "S" : date.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for ( var k in o) {
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
      return fmt;
    },

    Guid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },
    
    QueryString: function(paramName) {
      var search = window.location.search;// console.log(window.location);
      var queryJson = this._deserializeParam2JSON(search.substring(1));// console.log(queryJson);
      
      return queryJson[paramName];
    },
    
    AppendUrl: function(url, params) {
      
      if (url && url.indexOf("{id}")>0 && params.id) {
        var id = params.id;
        url = url.replace("{id}", id);
        delete params.id;
      }
      
      var curParam = url.split('?')[1];
      if (curParam) {
        curParam = decodeURIComponent(curParam);
        var jParam = this._deserializeParam2JSON(curParam);
        //console.log(jParam);console.log(params);
        params = $.extend(jParam, params);
      }

      var p = this._serializeJSON2Params(params);
      url = url.split('?')[0] + "?" + p;

      return url;
    },
    RandomUrl: function(url) {
      var t = new Date().getTime();
      return this.AppendUrl(url, {"t": t});
    },
    
    _cacheUrlHtml: {},
    LoadHtml: function(options) {
      var utils = this;

      var container = options.container,
        target = options.target || container.data("target"),
        callback = options.callback; 

      var autoRender = typeof(options.autoRender) == "undefined" ? true : options.autoRender;

      var paramData = container.data("paramData");// console.log(paramData);

      var newParamData = paramData;
      var portletNamespace = container.data("portletNamespace") || "";
      for(var k in paramData) {
        var v = paramData[k];if(typeof v =="string") v = v.replace(/\+/g,"%20");
        newParamData[portletNamespace+k] = v;
      }

      var url = container.data("url") || container.data("htmlUrl");
      if (newParamData) {
        url = P.utils.AppendUrl(url, newParamData);
      }

      if (url) {
        
        function onAjaxComplete(k, h) {
          //P.utils._cacheUrlHtml[k] = h;   // XXX: 增加静态页面缓存，减少服务器请求
          
          if (target) {
            if (autoRender) {
              if (typeof target == "object") {

              } else {
                target = $(target);
              }

              target.html(h);
            }
          }

          if (callback) {
            callback(h);
            return;
          }
        }
        
        function startAjax(url) {
          var k = url;
          $.ajax({
            "url": utils.RandomUrl(url),
            "type": 'get',
            "dataType": 'html',
            "success": function (h) {
              onAjaxComplete(k, h);
            },
            error : function(XMLHttpRequest, textStatus, errorThrown){ 
              console.log(XMLHttpRequest);
              console.log(XMLHttpRequest.status);  // rejected
              console.log(XMLHttpRequest.statusCode());  // rejected
              console.log(textStatus);
              console.log(errorThrown);
              
              if (XMLHttpRequest.status == 0) {
                window.location.reload();
              }
            }
          });
        }
        
        var html = P.utils._cacheUrlHtml[url];
        if (typeof html == 'undefined' || html == '') {//console.log("startAjax");
          startAjax(url);
        } else {//console.log("onAjaxComplete");
          onAjaxComplete(url, html);
        }
        
      } else {
        if (callback) {
          callback();
          return;
        }
      }
    },
    
    LoadData: function(options, paramData, postData) {
      var self = this;
      
      paramData = paramData || {};
      postData = postData || {};
      var container = options.container,
        callback = options.callback;
      var autoFill = typeof(options.autoFill) == "undefined" ? true : autoFill;

      if (!container) {
        return;
      }

      var target   = options.target   || container.children("[data-container]"); //console.log(target);
      var template = options.template || container.children("[data-template]"); //console.log(template);
      
      var targetIsOwner = container.data("target") == "owner";
      
      if (targetIsOwner) {
        target = container;
        target.hide();
      }
      if (template == null || template.length == 0) {
        template = container;
      }

      var defaultData = container.data("defaultData") || {};
      if(options.defaultData) {
        $.extend(defaultData, options.defaultData);
      }

      if (!target.length || !template.length) {
        if (callback) {
          callback(defaultData);
        }
        return;
      }

      var containerParamData = container.data("paramData") || {};
      //paramData = $.extend(containerParamData, paramData);
      paramData = $.extend({},containerParamData, paramData);

      var newParamData = paramData, newPostData=postData;
      var portletNamespace = container.data("portletNamespace") || "";
      if (portletNamespace) {
        for(var k in paramData) {
          var v = paramData[k];
          newParamData[portletNamespace+k] = v;
        }
        for(var k in postData) {
          var v = postData[k];
          newPostData[portletNamespace+k] = v;
        }
      }

      var errorUrl = container.data("errorUrl") || "";
      var errorAlert = typeof container.data("errorAlert") == "undefined" ? true:container.data("errorAlert");
      
      var url = container.data("url") || container.data("dataUrl");
      if (url) {
        // 增加，多url的数据请求
        if (typeof url == "string") {
          url = {"z":url};
        }
        
        var resultSize = 0;
        var resultData = {};

        var urlSize = 0, replaced = false;
        for (var k in url) {
          urlSize ++;
          //resultData[k] = {};
          
          var url_k = k;
          var url_v = url[url_k];
          if (url_v && url_v.indexOf("{id}")>0 && newParamData.id) {
            var id = newParamData.id;
            url_v = url_v.replace("{id}", id);
            replaced = true;
            
            url[url_k] = url_v;
          }
        }
        
        // XXX: 
        if (replaced) {
          delete newParamData.id;
        }
        
        
        // 增加ajax调用完成后的处理，
        function onAjaxComplete(k, d) {
          resultSize++;  //console.log(resultSize);
          //resultData[k] = d;  console.log(resultData);
          
          var kd = {};
          kd[k] = d;  //console.log(kd);
          
          $.extend(resultData, kd);  //console.log(resultData);
          
          if (urlSize == resultSize) {
            var z = $.extend({}, resultData["z"]);  //console.log(z);
            var data = $.extend({}, z, resultData);  //console.log(data);
            
            if (autoFill)
              P.utils.FillData(target, template, data);

            if (targetIsOwner) {
              target.show();
            }
            
            if (callback) {
              callback(data);
              return;
            }
          }
        }
        
        
        // 增加，一个组件可进行多个后台数据请求，并将返回数据合并处理
        for (var k in url) {
          var url_k = k;
          var url_v = url[url_k];
        
          if (newParamData) {
            url_v = P.utils.AppendUrl(url_v, newParamData);
          }
          url_v = P.utils.RandomUrl(url_v);
          var data = newPostData;
          var type = container.data("type") || "get";
        
          if(url_v.indexOf("{id}") < 0) {
            
            this._ajaxJson(url_k, url_v, data, type, function(key, result){ // key 为 _ajaxJson 调用回调时返回的key，即 url_k
              if (result.error) {
                if (result.error.status == 401) {
                  if (errorUrl) {
                    window.location.href = P.utils.RandomUrl(errorUrl);
                  } else {
                    if (errorAlert) {
                      P.confirm("登录过期，请点击确定后重新登录！",function(){
                        window.location.reload();//刷新当前页面.
                      });
                    } else {
                      onAjaxComplete(key, {});
                    }
                  }
                  return;
                }
                if (defaultData && !($.isEmptyObject(defaultData))) {
                  onAjaxComplete(url_k, defaultData);
                } else {
                  target.html(result.error.errors[0].message);
                }
                return;
              }
              
              if (result.data) {
                onAjaxComplete(key, result.data);
              }
            });
          } else {
            // FIXME: 
            
            onAjaxComplete(url_k, defaultData);
          }
        }
        
      } else {
        if (autoFill)
          P.utils.FillData(target, template, defaultData);

        if (callback) {
          callback(defaultData);
          return;
        }
      }
    },
    PostData: function(options, paramData, postData) {
      paramData = paramData || {};
      postData = postData || {};
      var container = options.container,
          callback = options.callback;
      var message = options.message || "success!";

      if (!container) {
        return;
      }

      var newParamData = paramData, newPostData=postData;
      var portletNamespace = container.data("portletNamespace") || "";
      if (portletNamespace) {
        for(var k in paramData) {
          var v = paramData[k];if(typeof v =="string") v = v.replace(/\+/g,"%20");
          newParamData[portletNamespace+k] = v;
        }
        for(var k in postData) {
          var v = postData[k]; if(typeof v =="string") v = v.replace(/\+/g," ");
          newPostData[portletNamespace+k] = v;
        }
      } else {
        for(var k in paramData) {
          var v = paramData[k]; if(typeof v =="string") v = v.replace(/\+/g,"%20");
          newParamData[k] = v;
        }
        for(var k in postData) {
          var v = postData[k]; if(typeof v =="string") v = v.replace(/\+/g," ");
          newPostData[k] = v;
        }
      }

      var key = "z";
      var url = container.data("url") || container.data("postUrl");
      if (url) {
        if (newParamData) {
          url = P.utils.AppendUrl(url, newParamData);
        }

        url = P.utils.RandomUrl(url);
        var data = newPostData;
        var type = options.type || container.data("type") || "post";
        this._ajaxJson(key, url, data, type, function(key, result){
          //console.log(result);
          if (type == "delete" || type == "DELETE") {
            result = result || {
              "status": "OK",
              "data": {
                "success": "删除成功"
              },
              "message": "删除成功",
              "response": {}
            }
          }
          
          if(result) {
            
            if (result.error) {
              //target.html(result.error.errors[0].message);
              p.alert(result.error.errors[0].message);
              return;
            }
            
            if (result.data) {
              if (callback) {
                callback(result.data);
                return;
              }
            }
            
          } else {
            if(callback)
              callback();
          }
        });
        
        /*
        $.ajax({
          "type": 'post',
          "dataType": 'json',
          "data": newPostData,
          "url": P.utils.RandomUrl(url),
          "success": function (result) {
            //console.log(result);
            if (result.error) {
              //target.html(result.error.errors[0].message);
              p.alert(result.error.errors[0].message);
              return;
            }

            if (result.data) {
              if (callback) {
                callback(result.data);
                return;
              }
            }
          },
          "error": function(e) {
            console.log(e);
          }
        });
        */

      } else {
        if (callback) {
          callback({});
          return;
        }
      }
    },

    FillData: function(target, template, data) {
      /*handlebars*/
      var source = template.html();
      var tpl = Handlebars.compile(source);
      var html = tpl(data);
      target.html(html);
    },
    
    FillForm: function(form, data) {
      var $form = form;
      if(typeof form == "string") {
        $form = $(form);
      }
      
      $form.find("input,select,textarea").each(function() {
        var name = $(this).attr("name");
        if(name) {
          var paramPaths = name.split('.');
          var value = data;
          for(var i = 0; i < paramPaths.length; i++) {
            value = value[paramPaths[i]];
          }
          $(this).val(value);
        }
      });
    },
    
    initFormValidate : function(formObj, options){ //初始化表单验证
      //继承覆盖的属性
      options = $.extend(true, {
        //失去焦点验证
        rules: {},
        errorPlacement: function (error, element) { //重写错误的提示方式
                var icon = $(element).parent('.input-icon').children('i');
                icon.removeClass('fa-check').addClass("fa-exclamation");  
                icon.attr("data-original-title", error.text()).tooltip({'container': 'body'});
            },
            success: function (label, element) {//验证成功的提示方式
                var icon = $(element).parent('.input-icon').children('i');
                icon.removeClass("fa-exclamation").addClass("fa-check");
            },
            invalidHandler: function(form,validator) {  //不通过回调 
         return false; 
      } ,
      ignore: ".ignore"
      }, options);
      
      return formObj.validate(options).resetForm();
    },
    
    SetFormData: function(form, data) {
      var $form = form;
      if (typeof form == "string") {
        $form = $(form);
      }
      
      $form.find("input,select,textarea").each(function() {
        var $item = $(this);
        
        var name = $item.prop("name");
        if(name) {
          var paramPaths = name.split('.');
          var val = data;
          for(var i = 0; i < paramPaths.length; i++) {
            val = val[paramPaths[i]];
          }
          
          if (typeof val == "undefined") {
            return;
          }
          
          var tagName = $item.prop("tagName");
          tagName = (tagName || "").toLowerCase();
          if (tagName == "input") {
            var type = $item.prop("type");
            if (type == "text" || type == "hidden") {
              $item.val(val);
            } else if (type == "checkbox") {
              if (typeof val == "string") {
                if ($.inArray($item.val(), val.split(","))) {
                  $item.prop("checked", true);
                }
              } else if (typeof val == "boolean") {
                $item.prop("checked", val);
              }
            } else if (type == "radio") {
              if ($item.val() == val) {
                $item.prop("checked", true);
              }
            }
          } else if (tagName == "select") {
            $item.val(val);
          } else if (tagName == "textarea") {
            $item.html(val);
          }
          
        }
      });
      
    },
    
    ValidFormData: function(form) {
      var $form = form;
      if (typeof form == "string") {
        $form = $(form);
      }
      
      var validResult = {};
      
      $form.find("input,select,textarea").each(function() {
        var $item = $(this);
        
        var name = $item.prop("name");
        if(name) {
          var requiredResult = {"result": true};
          
          var required = $item.data("required");
          
          if (required) {
            var val = "";
            var tagName = $item.prop("tagName");
            tagName = (tagName || "").toLowerCase();
            if (tagName == "input") {
              var type = $item.prop("type");
              if (type == "text" || type == "hidden") {
                val = $item.val();
              } else if (type == "checkbox" || type == "radio") {
                if ($item.prop("checked")) {
                  val = $item.val();
                }
              }
            } else if (tagName == "select") {
              val = $item.val();
            } else if (tagName == "textarea") {
              val = $item.val();
            }
            
            var result = (val != "");
            
            existRequiredResult = validResult[name];
            if (existRequiredResult && existRequiredResult.result === false) {
              if (result === true) {
                validResult[name] = requiredResult;   // 将原来的错误结果覆盖
                return;
              }
            }
            
            if (!result) {
              var field = $item.data("field");
              requiredResult = {"result": false, "error": "["+field+"]必填，不能为空！"};
              
              validResult[name] = requiredResult;
              return;
            }
          }
          
          //validResult[name] = requiredResult;
        }
      });
      
      return validResult;   // 格式：{"name1":{"result": true|false, "error": "xxx"}}
    },
    
    BlurFormData:function(form,options){
        var $form = form;        
        if (typeof form == "string") 
          $form = $(form);
        var defaultOptions = {
                tooltip:{
                    placement:"top",
                    trigger: "click hover focus",
                    title: "",
                    html: true
                },
                message:{
                    emptyMsg:"{message}不能为空",
                    matchMsg:"请输入合法的{message}",
                    existMsg:"{message}已存在，请重新输入",
                    lengthMsg:"{message}的长度必须为{min}~{max}之间",
                    equalMsg:"{source}与{target}不相等"
                },         
                html:"&nbsp;&nbsp;<span style='visibility:hidden;' class='glyphicon glyphicon-exclamation-sign sw-text-danger'>",   
                sign:{
                    error:"glyphicon glyphicon-exclamation-sign sw-text-danger",
                    success:"glyphicon glyphicon-ok-sign sw-text-success"
                },
                regular:{
                    email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                    mobile:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/,                   
                    idcard:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx])|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx])$/,
                    account:/^[a-zA-Z_][A-Za-z_0-9]*$/,
                    url:"^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$",                                           
                    num:/^\+?[1-9][0-9]*$/,
                    letter:/^.[A-Za-z]+$/,                         
                    linuxdir:/^[a-zA-Z]:(\/\/([0-9a-zA-Z]+))+$/,
                    windowsdir:/^[a-zA-Z]:(\\([0-9a-zA-Z]+))+$/
                },
                exists:{
                    verifyParmName:"",
                    parmValue:""
                }
           };
               
        options = $.extend({}, options, defaultOptions);
        
        if (typeof $form.data("validResult") == 'undefined' || $form.data("validResult") == "") {
            $form.data("validResult",true);
        }

        var emptyMsg = options.message.emptyMsg,
            matchMsg = options.message.matchMsg,
            existMsg = options.message.existMsg,
            lengthMsg = options.message.lengthMsg,
            equalMsg = options.message.equalMsg,
            html = options.html;
        $form.find("input,select,textarea").each(function(){
            var $item = $(this),
                listen = $item.data("listen")||false;
            if (listen==true) {
                
              if ($item.next("span").length==0) 
                $item.after(html);

              var val = "",span = $item.next();
              
              $item.unbind('blur').bind('blur',function(){ 
                  
                  var   valid=true,
                        tagName = $item.prop("tagName"),
                        message =  $item.data("message"),                 
                        sizeRange = $item.data("sizeRange"),
                        dataType = $item.data("type")||null,
                        required =  $item.data("required"),
                        pattern = $item.data("pattern"),
                        customMsg = $item.data("customMsg"),
                        remoteUrl = $item.data("remoteUrl"),
                        remoteParam = $item.data("remoteParam")||null,
                        remoteType = $item.data("remoteType")||"GET",
                        remoteOriginal = $item.data("remoteOriginal")||"",
                        dataEqual = $item.data("dataEqual")||"",
                        tagName = (tagName || "").toLowerCase();
                  
                  switch (tagName){
                      case "input" :
                         var type = $item.prop("type");                          
                         if (type == "text" || type == "hidden" || type == "password"){
                             val = $.trim($item.val());
                             if (required!=false) {
                                 if (val==""||val==undefined) 
                                     valid=false,options.tooltip.title=emptyMsg.replace("{message}",message);  
                             }                                                                               
                             if (sizeRange&&valid) {
                                 if (val==""||val==undefined) return ;
                                 var min = sizeRange.split("||")[0];
                                 var max = sizeRange.split("||")[1];
                                 if (val.length < min || val.length > max) 
                                     valid=false,options.tooltip.title=lengthMsg.replace("{message}",message).replace("{min}",min).replace("{max}",max);                                            
                             }
                             if (dataType&&valid) {
                                if (val==""||val==undefined) return ;
                                $.each(options.regular,function(name,value){
                                    if (dataType==name) 
                                      if (!val.match(value)) 
                                          valid=false,options.tooltip.title=matchMsg.replace("{message}",message);                       
                                });
                             }
                             if (pattern&&valid) {   
                                 if (val==""||val==undefined) return ;
                                 if(!val.match(pattern))
                                 {
                                     if (customMsg) 
                                         options.tooltip.title=customMsg;
                                     else
                                         options.tooltip.title=matchMsg.replace("{message}",message);
                                     valid=false;             
                                 }                                                     
                             }
                             if (remoteUrl&&remoteParam&&valid) {     
                                 if (val==""||val==undefined) return ;
                                 if (!!remoteOriginal && remoteOriginal == val) break;
                                 options.exists.parmValue=val;
                                 options.exists.verifyParmName=remoteParam;
                                 p.utils._ajaxJson("z", remoteUrl, options.exists, remoteType, function(key, result){  
                                    if (!result.data) 
                                       valid=false,options.tooltip.title=existMsg.replace("{message}",message);        
                                 },false);                                                                   
                             }
                             if (dataEqual&&valid) {
                                 if (val==""||val==undefined) return ;
                                 var target = form.find(dataEqual);
                                 if ($.trim(target.val())!=undefined && $.trim(target.val()) !="" ) {
                                    if (target.val() == val) 
                                      target.next().prop("class",options.sign.success)
                                            .prop("style","visibility:visible;")
                                            .tooltip("hide"); 
                                    else
                                      valid=false,options.tooltip.title=equalMsg.replace("{target}",target.data("message")).replace("{source}",message); 
                                 }
                             }
                         }else if (type == "checkbox" || type == "radio"){
                             if ($item.prop("checked")) {
                                 val = $item.val();
                                 if (required!=false) {
                                     if (val==""||val==undefined) 
                                         valid=false,options.tooltip.title=emptyMsg.replace("{message}",message);  
                                 }                             
                             }
                         }
                         break;              
                      case "select" :                         
                      case "textarea" :
                          val = $.trim($item.val());
                          if (required!=false) {
                              if (val==""||val==undefined) 
                                  valid=false,options.tooltip.title=emptyMsg.replace("{message}",message);  
                          }
                          if (sizeRange&&valid) {
                              if (val==""||val==undefined) return ;
                              var min = sizeRange.split("||")[0];
                              var max = sizeRange.split("||")[1];
                              if (val.length < min || val.length > max) 
                                  valid=false,options.tooltip.title=lengthMsg.replace("{message}",message).replace("{min}",min).replace("{max}",max);                                            
                          }                            
                         break;
                      default : 
                        break;
                  }  
                  
                  if (valid) 
                      span.prop("class",options.sign.success)
                          .prop("style","visibility:visible;")
                          .tooltip(options.tooltip)
                          .tooltip("hide");                                            
                  else{                     
                      span.prop("class",options.sign.error)
                          .prop("style","visibility:visible;")
                          .tooltip(options.tooltip)
                          .tooltip("show");
                      $form.data("validResult",false);
                  }                   
                  
              }).focus(function () {                
                  span.prop("style","visibility:hidden;")
                      .tooltip('destroy');
              });             

            }
        });       
        
    },
    
    CheckFormData:function(form){
        var $form = form;        
        if (typeof form == "string") 
          $form = $(form);
        
        $form.data("validResult",true);
        
        $form.find("input,select,textarea").each(function(){
            var $item = $(this),
            listen = $item.data("listen");
            if (listen==true) 
               $item.trigger('blur');                          
        });
        
        var result={valid:false};
        
        if ($form.data("validResult")==true) 
            result.valid=true;
        
        return result;
    },
    
    GetPostData: function(form) {
      var $form = form;
      if (typeof form == "string") {
        $form = $(form);
      }

      var serializedData = $form.serialize();
      serializedData = serializedData.replace(/\+/g, " ");
      //var formData = decodeURIComponent(serializedData, true);
      var postData = this._deserializeParam2JSON(serializedData);
      return postData;
    },
    
    GetLocationHashParams: function() {
      var hash = window.location.hash;
      var params = {};
      
      if(hash) {
        hash = hash.substring(1);
        var kvs = hash.split("&");
        
        if(kvs && kvs.length > 0) {
          $(kvs).each(function(i) {
            var kv = kvs[i].split("=");
            if(kv.length > 1)
            params[kv[0]] = kv[1];
          });
        }
      }
      return params;
    },
    
    SetCookie : function(cookieName, cookieValue) {
      if (cookieName && cookieValue) {
        this._cookie(cookieName, cookieValue);
      }
    },
    
    GetCookie : function(cookieName) {
      if (cookieName) {
        return this._cookie(cookieName);
      }
      return null;
    },
    
    RemoveCookie : function(cookieName) {
      if (cookieName) {
        this._cookie(cookieName, null);
      }
    },

    _cookie: function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        if (cookieValue ==='""') cookieValue="";
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },

    access_token : function(api_prefix) {
      var name = "access_token";
      if (api_prefix) {
        name = api_prefix+"."+name;
      }
      
      var access_token = this._cookie(name);
      if (typeof access_token == "undefined" || access_token == null || access_token === "") {
        access_token = this._cookie("access_token");
      }
      
      var modulus = this._cookie("modulus");
      var exponent = this._cookie("exponent");
      
      if (access_token) {
        //access_token="393179c2-a46d-4a7b-89d9-e6bafbe3eee6";
        if( access_token && modulus && exponent && localStorage["private"]) {
            var decoder = new RSAKey();
            decoder.setPrivate(modulus,exponent,localStorage["private"]);
            return decoder.decrypt(access_token);
        } else {
          return access_token;
        }
      } else {
        //P.confirm("登录过期，请点击确定后重新登录！",function(){
        //  window.location.href = client_path;//刷新当前页面.
         //});
      }
    },
      
    _ajaxJsonReq: null,
    _ajaxJsonPost: false,
    _ajaxJson: function(key, url, data, type, callback, async) {
      var self = this;
      
      if (type == "get" || type == "GET") {
        if (self._ajaxJsonReq != null) {//console.log(this._ajaxJsonReq);
          //console.log("abort");
          //self._ajaxJsonReq.abort();
          self._ajaxJsonReq = null;
        }
      } else {
        if (self._ajaxJsonPost) {
          //console.log("return");
          return;
        }
        self._ajaxJsonPost = true;
      }
      async = typeof async == "undefined"? true : async;
      
      //Metronic.blockUI({"animate":true,"zIndex":100000});
      
      var api_prefix = null;
      
      if (url.indexOf("http") != 0) {
        if (url.indexOf("/") == 0) {
          url = P.config.api_server_url + url;
        } else {
          api_prefix = url.substring(0, url.indexOf("/"));  //console.log(api_prefix);
          var server_url = eval("(P.config."+api_prefix+")");  //console.log(server_url);
          
          if (typeof server_url == "undefined" || server_url == null || server_url === "") {
            server_url = P.config.api_server_url;
          }
          
          url = server_url + url.substring(url.indexOf("/"));  //console.log(url);
        }
      }

      url = this.AppendUrl(url, {"access_token": this.access_token(api_prefix)});
      
      //console.log(data);
      var settings = {
        url:url,
        data:data,
        type:type,
        dataType: "json",
        async: async,
        success : function(result) {
          self._ajaxJsonReq = null;
          self._ajaxJsonPost = false;
          //Metronic.unblockUI();

          callback(key, result);
          /*if("OK" == result.status){
            P.alert(result.response,function(){
                 window.location.reload();//刷新当前页面.
              });
          }else{
            P.alert("error",result.response);
          }*/
          
        }, 
        error : function(XMLHttpRequest, textStatus, errorThrown){ 
          self._ajaxJsonReq = null;
          self._ajaxJsonPost = false;
          //Metronic.unblockUI();
          
          if (XMLHttpRequest.statusText == "abort") {
            return;
          }

          if(XMLHttpRequest.status == 401){// console.log(XMLHttpRequest); console.log(XMLHttpRequest.responseJSON);
            callback(key, {"error": {"status": 401, "statusText": "Unauthorized"}});
//            P.confirm("登录过期，请点击确定后重新登录！",function(){
//               window.location.reload();//刷新当前页面.
//            });
          }else{
            //console.log(XMLHttpRequest.responseJSON);
            if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.error) {
              if (XMLHttpRequest.responseJSON.error.errors && XMLHttpRequest.responseJSON.error.errors[0].message) {
                P.alert(XMLHttpRequest.responseJSON.error.errors[0].message);
              } else {
                P.alert(XMLHttpRequest.responseJSON.message);
                
                callback(key, {"error": {"status": XMLHttpRequest.responseJSON.status, "statusText": XMLHttpRequest.responseJSON.error}});
              }
            } else {
              P.alert("未知原因，访问服务器错误！");
            }
            
            if(console) {
              console.log(errorThrown);
            }
          }
        }
      };
      
      if (type == 'GET' || type == 'get') {
      
      } else {
        $.extend(settings, {"contentType": "application/json; charset=utf-8"});
        if (data != undefined) {
          $.extend(settings, {"data": JSON.stringify(data)});
        }
      }
      
      this._ajaxJsonReq = $.ajax(settings);
    },

    _serializeJSON2Params: function(params) {
      return $.param(params);
    },
    _deserializeParam2JSON: function(param) {
      var params = {};
      if (param == "") {
        return {};
      }
      var arrParam = param.split('&');
      for (var idx in arrParam) {
        var kvParam = arrParam[idx].split('=');
        if(kvParam[0].indexOf('.') > 0) {
          var keys = kvParam[0].split('.');
          var value = decodeURIComponent(kvParam[1],true);
          var p = value;
          for(var i = keys.length - 1; i >= 0; i--) {
            var tmp = p;
            p = {};
            p[decodeURIComponent(keys[i],true)] = tmp;
            
          }
          $.extend(true, params, p);
        } else {
          if (params[decodeURIComponent(kvParam[0],true)] && typeof(params[kvParam[0]]) != 'object') {
            params[decodeURIComponent(kvParam[0],true)] += "," + decodeURIComponent(kvParam[1],true);
          } else {
            params[decodeURIComponent(kvParam[0],true)] = decodeURIComponent(kvParam[1],true);
          }
        }
      }
      return params;
    }

  };

  P.utils = Utils;
})(jQuery, SWPlatform);

/*
 * Permission
 */
(function($, P) {
  'use strict';

  var _userRoles = null;
  var Permission = {

    HasPermission: function($element) {
      var self = this;
      
      $element = $element || self.$element;
      
      var hasPermission = false;
      var permissions = $element.data("permissions");
      if (permissions) {
        
      } else {
        hasPermission = true;
        
        return hasPermission;
      }
      
      if (!$.isArray(permissions)) {
        permissions = permissions.split(",");
      }

      var checkPermission = function() {
        if (_userRoles) {//console.log(self._userRoles);
          for(var i=0; i<permissions.length; i++){
            var permission = permissions[i];//console.log(permission);
            
            if ((","+_userRoles.join(",")+",").indexOf(","+permission+",") >=0) {
              hasPermission = true;
              break;
            }
          };
        }
      }
      
      if (!_userRoles) {
        var key = "z";
        var url = "api.uaa/api/user";
        var data = {};
        var type = "get";
        
        P.utils._ajaxJson(key, url, data, type, function(key, result){
          if (result.error) {
            hasPermission = false;
            return;
          }

          if (result.data) {
            //console.log(result.data);
            
            _userRoles = data.currentAuthorities;
            
            checkPermission();
          }
        }, false);
      } else {
        checkPermission();
      }
      //console.log(hasPermission);
      
      if (hasPermission) {
        // 利用回调，由业务自行判断其他权限控制（如：数据权限）
        var component = self.$element.data("component");
        var callback = P.callback.get(component+".permit", $element, self.$element);
        if (callback)
          hasPermission = callback.call(self, _userRoles);
      }

      if (!hasPermission) {
        var $permissionTarget = $($element.data("permissionTarget"));
        if ($permissionTarget.length > 0) {
          $permissionTarget.remove();
        } else {
          $element.remove();
        }
      }
      
      var component = self.$element.data("component");
      var callback = P.callback.get(component+".permitted", $element, self.$element);
      if (callback)
        callback.call(self, hasPermission);

      return hasPermission;
    }      
  };

  P.permission = Permission;
})(jQuery, SWPlatform);


/*
 * Callback
 */
(function($, P) {
  'use strict';

  var Callback = function() {
    //Callback[name] = callback;
    //return Callback;
    this.callbacks = {};
    return this;
  };

  Callback.prototype.set = function(key, callback) {
    this.callbacks[key] = callback;
  };

  Callback.prototype.get = function(componentEvent, $element) {
    var callbackName = $element.data("callback");
    if (callbackName)
      return this.callbacks[callbackName +'.'+ componentEvent];

    if (arguments.length > 2) {
      //console.log(arguments[2]);
      var callbackName = arguments[2][2].data("callback");
      if (callbackName)
        return this.callbacks[callbackName +'.'+ componentEvent];
    }

    return null;
  };

  P.callback = function(key, callback) {
    var _cb = P.callback._cb;
    if (!_cb) {
      _cb = new Callback();
      P.callback._cb = _cb;
    }

    _cb.set(key, callback);
  };
  P.callback.get = function(componentEvent, $element) {
    var _cb = P.callback._cb;
    if (!_cb) return null;

    if (arguments.length == 2)
      return _cb.get(componentEvent, $element);
    else
      return _cb.get(componentEvent, $element, arguments);
  };
  P.callback._cb = null;
  P.callback.Constructor = Callback;
})(jQuery, SWPlatform);



/*
 * Alert
 * 使用方式：p.alter(message, okCallback);
 * message，警告提示框的信息
 * okCallback，警告提示框"确认"后，执行的回调
 */
(function($, P) {
  'use strict';

  var Alert = function(message, okCallback) {
    var self = this;

    var $alertModal = $("#alertModal");

    if ($alertModal.length > 0) {
      var $alertMessage = $alertModal.find('[data-message="message"]');
      var $alertOk = $alertModal.find('[data-ok="ok"]');

      $alertMessage.html(message);

      $alertModal.modal({
        backdrop:'static'
      });
      $alertModal.modal("show");

      $alertModal.off('hidden.bs.modal').on('hidden.bs.modal', function(e) {
        $alertMessage.html('message');
        $alertOk.off('click');
      });

      $alertOk
        .off('click')
        .on('click', function(e) {
          e.preventDefault();

          if (okCallback) {
            P.utils.debug("alert ok callback!");
            okCallback.call(self);
          }
        });
    } else {
      alert(message);

      if (okCallback) {
        P.utils.debug("alert ok callback!");
        okCallback.call(self);
      }
    }
  };

  P.alert = Alert;
})(jQuery, SWPlatform);


/*
 * Confirm
 * 使用方式：p.alter(message, okCallback, cancelCallback);
 * message，确认提示框的信息
 * okCallback，确认提示框"确定"后，执行的回调
 * cancelCallback，确认提示框"取消"后，执行的回调
 */
(function($, P) {
  'use strict';

  var Confirm = function(message, okCallback, cancelCallback) {
    var self = this;

    var $confirmModal = $("#confirmModal");

    if ($confirmModal.length > 0) {
      var $confirmMessage = $confirmModal.find('[data-message="message"]');
      var $confirmOk = $confirmModal.find('[data-ok="ok"]');
      var $confirmCancel = $confirmModal.find('[data-cancel="cancel"]');

      $confirmMessage.html(message);

      $confirmModal.modal({
        backdrop:'static'
      });
      $confirmModal.modal("show");

      $confirmModal.off('hidden.bs.modal').on('hidden.bs.modal', function(e) {
        $confirmMessage.html('message');
        $confirmOk.off('click');
        $confirmCancel.off('click');
      });

      $confirmOk
        .off('click')
        .on('click', function(e) {
          e.preventDefault();

          if (okCallback) {
            P.utils.debug("confirm ok callback!");
            okCallback.call(self);
          }
        });

      $confirmCancel
        .off('click')
        .on('click', function(e) {
          e.preventDefault();

          if (cancelCallback) {
            P.utils.debug("confirm cancel callback!");
            cancelCallback.call(self);
          }
        });
    } else {
      if(confirm(message)) {
        if (okCallback) {
          P.utils.debug("confirm ok callback!");
          okCallback.call(self);
        }
      } else {
        if (cancelCallback) {
          P.utils.debug("confirm cancel callback!");
          cancelCallback.call(self);
        }
      }
    }
  };

  P.confirm = Confirm;
})(jQuery, SWPlatform);


///*
//* Confirm
//*/
//(function($, P) {
//  'use strict';
//
//  var Confirm = function(msg, yesCallback, noCallback) {
//    $("body").prepend("<div class=\"modal fade addition-notice-modal submit-modal\" id=\"operConfirm\" style=\"z-index:10000;\">"
//        +"<div class=\"modal-dialog modal-sm\">"
//        +"<div class=\"modal-content\">"
//        +"<div class=\"modal-body\"  >"
//        +"<p align=\"center\" style=\"padding:70px 0px\">"+ msg +"</p>"
//              +"<div class=\"btn-bar\">"
//              +"<button id=\"confirm\" type=\"button\" class=\"btn btn-danger btn-sm\" data-dismiss=\"modal\">确定</button>&nbsp;&nbsp;&nbsp;&nbsp;"
//              +"<button id=\"cancle\" type=\"button\" class=\"btn btn-default btn-sm \" data-dismiss=\"modal\">关闭</button>"
//              +"</div></div></div></div></div>");
//    $("#operConfirm").modal({
//      backdrop:'static'
//    });
//    $("#operConfirm").modal("show");
//    $("#confirm").click(function(){return yesCallback.call();});
//    $("#cancle").click(function(){return noCallback.call();});
//  };
//  P.confirm = Confirm;
//})(jQuery, SWPlatform);

/*
 * Modal
 */
(function($, P) {
  'use strict';

  var Modal = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.modal.defaults, options);
    this.owner = owner;

    return this;
  };

  Modal.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    var url = self.$element.data("url");
    var $modalTarget = $(self.$element.data("modalTarget"));

    self.$modal = $modalTarget;

    // 控制权限
    if (!P.permission.HasPermission.call(self)) {
      return;
    }

    var callback = P.callback.get("modal.init", self.$element);
    if (callback)
      callback.call(self);

    self.$element.on("click", function(e){
      e.preventDefault();

      $modalTarget.off('show.bs.modal').on('show.bs.modal', function (e) {
        this.owner = self;

        var callback = P.callback.get("modal.show", self.$element);
        callback && callback.call(this);
      });

      $modalTarget.off('shown.bs.modal').on('shown.bs.modal', function (e) {
        this.owner = self;

        var callback = P.callback.get("modal.shown", self.$element);
        callback && callback.call(this);
      });

      $modalTarget.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
        this.owner = self;

        $modalTarget.find(".modal-title").html("title");
        $modalTarget.find(".modal-body").html("body");

        var callback = P.callback.get("modal.hidden", self.$element);
        callback && callback.call(this);
      });

      $modalTarget.off('hide.bs.modal').on('hide.bs.modal', function (e) {
        this.owner = self;

        var callback = P.callback.get("modal.hide", self.$element);
        callback && callback.call(this);
      });

      $modalTarget.off('loaded.bs.modal').on('loaded.bs.modal', function (e) {
        this.owner = self;

      });  
      
      P.utils.LoadHtml({
        'container': self.$element,
        'callback': function(html) {
          var title = self.$element.data("title") || self.$element.prop("title");

          $modalTarget.find(".modal-title").html(title);
          $modalTarget.find(".modal-body").html(html);

          //var paramData = self.$element.data("paramData");
          var paramDataModal = $.extend({}, paramData, self.$element.data("paramData"));

          var components = $modalTarget.find("[data-component]");
          $.each(components, function(i) {
            var component = $(this).data("component");
            P[component] && P[component]($(this), null, null, paramDataModal, null, self);
          });

          var callback = P.callback.get("modal.click", self.$element);
          if (callback)
            callback.call(self);

          $modalTarget.modal('show');
        }
      });
    });

  };

  var old = P.modal;
  P.modal = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('modal')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('modal', (component = new Modal(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.modal.defaults = {};
  P.modal.Constructor = Modal;
})(jQuery, SWPlatform);



/*
 * Template
 */
(function($, P) {
  'use strict';

  var Template = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.template.defaults, options);
    this.owner = owner;

    return this;
  };

  Template.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;
    
    self.defaultData = defaultData;
    self.paramData = paramData;
    self.postData = postData;
        var callback = P.callback.get("template.preload", self.$element);
    if (callback) {
      var r = callback.call(self);
      if (!r.valid) return;
      defaultData = $.extend({}, defaultData, r.defaultData);
      paramData = $.extend({}, paramData, r.paramData);
      postData = $.extend({}, postData, r.postData);
    }
    P.utils.LoadData({
      "container": self.$element,
      "callback":function(data) {
        var paramData = self.$element.data("paramData");

        var components = self.$element.find("[data-component]");
        $.each(components, function(i) {
          var component = $(this).data("component");
          P[component] && P[component]($(this), null, null, paramData, null, self);
        });

        var callback = P.callback.get("template.load", self.$element);
        if (callback)
          callback.call(self, data);
      },
      "defaultData": defaultData
    }, paramData, postData);

  };

  var old = P.template;
  P.template = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('template')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('template', (component = new Template(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.template.defaults = {};
  P.template.Constructor = Template;
})(jQuery, SWPlatform);


/*
 * Toolbar
 */
(function($, P) {
  'use strict';

  var Toolbar = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.toolbar.defaults, options);
    this.owner = owner;

    return this;
  };

  Toolbar.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    // 控制权限
    if (!P.permission.HasPermission.call(self)) {
      return;
    }

    var callback = P.callback.get("toolbar.init", self.$element);
    if (callback)
      callback.call(self);

    P.utils.LoadData({
      "container": self.$element,
      "callback":function() {

        var components = self.$element.find("[data-component]");
        $.each(components, function(i) {
          var component = $(this).data("component");
          P[component] && P[component]($(this), null, null, null, null, self);
        });

        var callback = P.callback.get("toolbar.load", self.$element);
        if (callback)
          callback.call(self);
      }
    });

  };

  var old = P.toolbar;
  P.toolbar = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('toolbar')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('toolbar', (component = new Toolbar(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.toolbar.defaults = {};
  P.toolbar.Constructor = Toolbar;
})(jQuery, SWPlatform);


/*
 * Button
 */
(function($, P) {
  'use strict';

  var Button = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.button.defaults, options);
    this.owner = owner;

    return this;
  };

  Button.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    // 控制权限
    if (!P.permission.HasPermission.call(self)) {
      return;
    }

    var callback = P.callback.get("button.init", self.$element);
    if (callback)
      callback.call(self);

    P.utils.LoadData({
      "container": self.$element,
      "callback": function(data) {

        self.$element.on("click", function(e){
          e.preventDefault();

          var paramData = self.$element.data("paramData");
          var postData = self.$element.data("postData")||{};

          function post(r) {
            if (!r.valid) return;
            paramData = $.extend({}, paramData, r.paramData);
            postData = $.extend({}, postData, r.postData);
            
            P.utils.PostData({
              "container": self.$element,
              "callback": function(data) {

                var callback = P.callback.get("button.post", self.$element);
                if (callback)
                  callback.call(self, data);
              }
            }, paramData, postData);
          }

          var callback = P.callback.get("button.prepost", self.$element);
          if (callback) {
            callback.call(self, post);
          } else {
            post.call(self, {"valid": true});
          }


        });

        var callback = P.callback.get("button.load", self.$element);
        if (callback)
          callback.call(self);
      }
    });

  };

  var old = P.button;
  P.button = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('button')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('button', (component = new Button(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.button.defaults = {};
  P.button.Constructor = Button;
})(jQuery, SWPlatform);


/*
 * Link
 */
(function($, P) {
  'use strict';

  var Link = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.link.defaults, options);
    this.owner = owner;

    return this;
  };

  Link.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;
    
    defaultData = defaultData || {};
    
    self.defaultData = defaultData;
    self.paramData = paramData;
    self.postData = postData;

    // 控制权限
    if (!P.permission.HasPermission.call(self)) {
      return;
    }

    var callback = P.callback.get("link.init", self.$element);
    if (callback)
      callback.call(self);

    var $linkTarget = $(self.$element.data("linkTarget"));

    P.utils.LoadData({
      "container": self.$element,
      "callback": function(data) {

        self.$element.on("click", function (e) {
          this.owner = self;
          var that = this;

          e.preventDefault();

          var $link = $(this);
          
          var callback = P.callback.get("link.preclick", $link, self.$element);
          if(callback) {
            var newDefaultData = callback.call(that);
            if(newDefaultData) {
              $.extend(defaultData, newDefaultData);
            }
          }
            
          P.utils.LoadHtml({
            'container': $link,
            'target': $linkTarget,
            'callback': function(html) {
              //
//              var paramData = $link.data("paramData");ff
              if(paramData !=undefined)
              $.extend(paramData, $link.data("paramData"));
              else if(paramData == undefined){
                paramData = {};
                $.extend(paramData, $link.data("paramData"));
              }
              var components = $linkTarget.find("[data-component]");
              $.each(components, function(i) {
                var component = $(this).data("component");
                P[component] && P[component]($(this), null, defaultData, paramData, null, self);
              });

              var callback = P.callback.get("link.click", $link, self.$element);
              if (callback)
                callback.call(that);
            }
          });
        });

        var callback = P.callback.get("link.load", self.$element);
        if (callback)
          callback.call(self);
      }
    });

  };

  var old = P.link;
  P.link = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('link')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('link', (component = new Link(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.link.defaults = {};
  P.link.Constructor = Link;
})(jQuery, SWPlatform);

/*
 * Redirect
 */
(function($, P) {
  'use strict';

  var Redirect = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.redirect.defaults, options);
    this.owner = owner;

    return this;
  };

  Redirect.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;
    
    defaultData = defaultData || {};
    
    self.defaultData = defaultData;
    self.paramData = paramData;
    self.postData = postData;
    
    // 控制权限
    if (!P.permission.HasPermission.call(self)) {
      return;
    }

    var callback = P.callback.get("redirect.init", self.$element);
    if (callback)
      callback.call(self);
    
    var t = new Date().getTime();
    
    var href = self.$element.prop("href");
    href += href.indexOf('?')<0 ? "?" : "&";
    href += "t="+t;
    self.$element.prop("href", href);
  };

  var old = P.redirect;
  P.redirect = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('redirect')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('redirect', (component = new Redirect(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.redirect.defaults = {};
  P.redirect.Constructor = Redirect;
})(jQuery, SWPlatform);


/*
 * Slider
 */
(function($, P) {
  'use strict';

  var Slider = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.slider.defaults, options, this.$element.data());
    this.owner = owner;

    return this;
  };

  Slider.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    P.utils.LoadData({
      "container": self.$element,
      "callback":function() {
        var callback = P.callback.get("slider.load", self.$element);
        if (callback)
          callback.call(self);
      }
    });

  };

  P.slider = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('slider')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('slider', (component = new Slider(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.slider.defaults = {};
  P.slider.Constructor = Slider;

})(jQuery, SWPlatform);

/*
 * Tab
 */
(function($, P) {
  'use strict';

  var Tab = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.tab.defaults, options);
    this.owner = owner;

    return this;
  };

  Tab.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;
    
    var tabEventName = self.$element.data("eventName") || "click";
    var tabAutoTrigger = (typeof self.$element.data("tabAutoTrigger") == "undefined") ? true : self.$element.data("tabAutoTrigger");
    
    var callback = P.callback.get("tab.preload", self.$element);
    if (callback)
      callback.call(self);
    
    P.utils.LoadData({
      "container": self.$element,
      "callback": function(data) {
        var tabs = self.$element.find("[data-tab='tab'] a");
        tabs.on(tabEventName, function (e) {
          this.owner = self;
          var that = this;

          e.preventDefault();

          $(this).tab('show');

          var callback = P.callback.get("tab.tabs."+tabEventName, self.$element);
          if (callback)
            callback.call(that);
          else {
            var callback = P.callback.get("tab.tabs.event", self.$element);
            if (callback)
              callback.call(that);
          }
        });
        
        var panels = self.$element.find("[data-tab='panel']");
        panels.each(function (i) {
          this.owner = self;
          var that = this;

          //e.preventDefault();

          var $panel = $(that);
          
          var paramData = $panel.data("paramData");

          var callback = P.callback.get("tab.panels.preload", $panel, self.$element);
          if (callback) {
            var r = callback.call(that);
            //if (!r.valid) return;
            paramData = $.extend({}, paramData, r.paramData);
          }

          P.utils.LoadHtml({
            'container': $panel,
            'target': $panel,
            'callback': function(html) {

              var components = $panel.find("[data-component]");
              $.each(components, function(i) {
                var component = $(this).data("component");
                P[component] && P[component]($(this), null, null, paramData, null, self);
              });

              var callback = P.callback.get("tab.panels.load", $panel, self.$element);
              if (callback)
                callback.call(that);
            }
          });
        });

        var components = self.$element.find("[data-component]");
        $.each(components, function(i) {
          var component = $(this).data("component");
          P[component] && P[component]($(this), null, null, paramData, null, self);
        });
        
        var callback = P.callback.get("tab.load", self.$element);
        if (callback)
          callback.call(self, data);

        if (tabAutoTrigger)
          $(tabs[0]).trigger(tabEventName);
        
      }
    });
  };

  var old = P.tab;
  P.tab = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('tab')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('tab', (component = new Tab(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.tab.defaults = {};
  P.tab.Constructor = Tab;
})(jQuery, SWPlatform);

/*
 * Nav
 */
(function($, P) {
  'use strict';

  var Nav = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.nav.defaults, options);
    this.owner = owner;

    return this;
  };

  Nav.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    self.defaultData = defaultData;
    self.paramData = paramData;
    self.postData = postData;

    var $navTarget = $(self.$element.data("navTarget"));

    var navAutoTrigger = (typeof self.$element.data("navAutoTrigger") == "undefined") ? true : self.$element.data("navAutoTrigger");
        var callback = P.callback.get("navs.preload", self.$element);
    if (callback) {
      var r = callback.call(self);
      if (!r.valid) return;
      defaultData = $.extend({}, defaultData, r.defaultData);
      paramData = $.extend({}, paramData, r.paramData);
      postData = $.extend({}, postData, r.postData);
    }
    P.utils.LoadData({
      "container": self.$element,
      "callback": function(data) {

        var callback = P.callback.get("navs.render", self.$element);
        if (callback)
          callback.call(self, data);
        
        // 控制权限
        self.$element.find("[data-nav='nav']").each(function(i){
          P.permission.HasPermission.call(self, $(this));
        });
        
        var navs = self.$element.find("[data-nav='nav']");

        navs.on("click", function (e) {
          this.owner = self;
          var that = this;

          e.preventDefault();

          var $nav = $(this);
          that.$element = $nav;

          P.utils.LoadHtml({
            'container': $nav,
            'target': $navTarget,
            'callback': function(html) {
              navs.removeClass("selected");
              $nav.addClass("selected");
              navs.removeClass("active");
              $nav.addClass("active");

              //
              var paramDataNav = $.extend({}, paramData, $nav.data("paramData"));
              
              var components = $navTarget.find("[data-component]");
              $.each(components, function(i) {
                var component = $(this).data("component");
                P[component] && P[component]($(this), null, null, paramDataNav, null, self);
              });

              var callback = P.callback.get("nav.click", $nav, self.$element);
              if (callback)
                callback.call(that,data);
            }
          });
        });

        if (navAutoTrigger)
            $(navs[0]).trigger("click");
        
        var callback = P.callback.get("navs.load", self.$element);
        if (callback)
          callback.call(self, data);
      }
    }, paramData, postData);
  };

  var old = P.nav;
  P.nav = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('nav')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('nav', (component = new Nav(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.nav.defaults = {};
  P.nav.Constructor = Nav;
})(jQuery, SWPlatform);


/*
 * Portlet
 */
(function($, P) {
  'use strict';

  var Portlet = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.portlet.defaults, options);
    this.owner = owner;

    return this;
  };

  Portlet.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    P.utils.LoadData({
      "container": self.$element,
      "callback": function(data) {
        var portlets = self.$element.find("[data-portlet='portlet']");

        portlets.each(function (i) {
          this.owner = self;
          var that = this;

          //e.preventDefault();

          var $portlet = $(that);

          P.utils.LoadHtml({
            'container': $portlet,
            'target': $portlet,
            'callback': function(html) {

              var paramData = $portlet.data("paramData");

              var components = $portlet.find("[data-component]");
              $.each(components, function(i) {
                var component = $(this).data("component");
                P[component] && P[component]($(this), null, null, paramData, null, self);
              });

              var callback = P.callback.get("portlet.load", $portlet, self.$element);
              if (callback)
                callback.call(that);
            }
          });
        });

        var callback = P.callback.get("portlets.load", self.$element);
        if (callback)
          callback.call(self);
      }
    }, paramData, postData);
  };

  var old = P.portlet;
  P.portlet = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('portlet')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('portlet', (component = new Portlet(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.portlet.defaults = {};
  P.portlet.Constructor = Portlet;
})(jQuery, SWPlatform);


/*
 * Panel
 */
(function($, P) {
  'use strict';

  var Panel = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.panel.defaults, options);
    this.owner = owner;

    return this;
  };

  Panel.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    P.utils.LoadData({
      "container": self.$element,
      "callback": function(data) {
        var portlets = self.$element.find("[data-panel='panel']");

        portlets.each(function (i) {
          this.owner = self;
          var that = this;

          var $portlet = $(that);

          P.utils.LoadHtml({
            'container': $portlet,
            'target': $portlet,
            'callback': function(html) {

              var paramData = $portlet.data("paramData");

              var components = $portlet.find("[data-component]");
              $.each(components, function(i) {
                var component = $(this).data("component");
                P[component] && P[component]($(this), null, null, paramData, null, self);
              });

              var callback = P.callback.get("panel.load", $portlet, self.$element);
              if (callback)
                callback.call(that);
            }
          });
        });

        var callback = P.callback.get("panels.load", self.$element);
        if (callback)
          callback.call(self);
      }
    }, paramData, postData);
  };

  var old = P.panel;
  P.panel = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('panel')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('panel', (component = new Panel(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.panel.defaults = {};
  P.panel.Constructor = Panel;
})(jQuery, SWPlatform);


/*
 * Form
 */
(function($, P) {
  'use strict';

  var Form = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.form.defaults, options);
    this.owner = owner;

    return this;
  };

  Form.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    defaultData = defaultData || {};
    paramData = paramData || {};
    postData = postData || {};
    
    self.defaultData = defaultData;
    self.paramData = paramData;
    self.postData = postData;

    var paramDataForm = $.extend({}, paramData, self.$element.data("paramData"));

    var $targetContainer = $(self.$element.data("target") || self.$element.data("targetContainer"));  // form 提交数据到指定组件

    var $htmlContainer = $(self.$element.data("htmlContainer"));  // form 提交数据到局部页面

    P.utils.LoadData({
      "container": self.$element,
      "callback": function(data) {
        var $form = self.$element.find("form");
        
        var $autoValid = self.$element.data("autoValid");
        
        if (!!$autoValid) 
            p.utils.BlurFormData($form);
        
        var $save = self.$element.find("[data-save='save']");
        $save.on("click", function(e) {
          this.owner = self;
          var that = this;
          e.preventDefault();

          var postUrl = $save.data("postUrl");
          if (postUrl) {
            self.$element.data("postUrl", postUrl);
          }

          var formSave = function(r) {      
              
            if (!!$autoValid && typeof(r)=='undefined') 
               r=p.utils.CheckFormData($form);  
              
            if(typeof(r)!='undefined' && !r.valid) 
                return;
            
            var valid = true;         
            var callback = P.callback.get("form.valid", $save, self.$element);

            if (callback)
              valid = callback.call(self);

            if (!valid) {
              p.alert("请检查你填写的信息是否有误");
              return;
            }
            
            var paramData = {};
            var postData = P.utils.GetPostData($form);
            
            if (r && r.valid) {
                paramData = $.extend(true, {}, paramData, r.paramData);
                postData = $.extend(true, {}, postData, r.postData);
            }
            
            var callback = P.callback.get("form.prepost", $save, self.$element);
            if (callback) {
              var r = callback.call(self);
              if (!r.valid) return;
              paramData = $.extend(true, {}, paramData, r.paramData);
              postData = $.extend(true, {}, postData, r.postData);
            }
            
            var type = $save.data("type") || self.$element.data("type");

            P.utils.PostData({
                    "container": self.$element,
                    "type": type,
                    "callback": function(data) {
                var callback = P.callback.get("form.post", $save, self.$element);
                if (callback)
                  callback.call(self, data);
              }
            }, paramData, postData);
          };

          // FIXME: 
          var callback = P.callback.get("form.saveconfirm", $save, self.$element);
          if (callback) {
            callback.call(self, formSave);
          } else {
            formSave.call(self);
          }
        });

        // 提交按钮
        var $submit = self.$element.find("[data-submit='submit']");
        $submit.on("click", function(e) {
          this.owner = self;
          var that = this;

          e.preventDefault();

          var postUrl = $submit.data("postUrl");
          if (postUrl) {
            self.$element.data("postUrl", postUrl);
          }

          var formSubmit = function(r) {
            
            if (!!$autoValid && typeof(r)=='undefined') 
                r=p.utils.CheckFormData($form);
            
            if(typeof(r)!='undefined' && !r.valid) 
               return;
            
            var valid = true;
            var callback = P.callback.get("form.valid", $submit, self.$element);
            if (callback)
              valid = callback.call(self);
            else
              valid = true;

            if (!valid) {
              return;
            }

            var type = $submit.data("type") || self.$element.data("type");                     

            if (type == "GET") {
              paramData = P.utils.GetPostData($form);
            } else {
              postData = P.utils.GetPostData($form);
            }
            
            if (r && r.valid) {
                paramData = $.extend(true, {}, paramData, r.paramData);
                postData = $.extend(true, {}, postData, r.postData);
            }
            
            var callback = P.callback.get("form.prepost", $submit, self.$element);
            if (callback) {
              var r = callback.call(self);
              if (!r.valid) return;
              paramData = $.extend({}, paramData, r.paramData);
              postData = $.extend({}, postData, r.postData);
            }

            if ($targetContainer.length) {
              var postUrl = self.$element.data("postUrl");
              postUrl = $targetContainer.data("url") || postUrl;  // 优先使用组件的url
              if (!postUrl) return;

              paramData = $.extend({}, paramData, self.$element.data("paramData"));

              $targetContainer.data("url", postUrl); //console.log(postUrl);

              var component = $targetContainer.data("component");
              P[component] && P[component]($targetContainer, null, null, paramData, postData, self);

              var callback = P.callback.get("form.post", $submit, self.$element);
              if (callback)
                callback.call(self);
            } else if ($htmlContainer.length) {
              P.utils.LoadHtml({
                "container": self.$element,
                'target': $htmlContainer,
                "callback": function(html) {
                  paramData = $.extend({}, paramData, self.$element.data("paramData"));
                  var components = $htmlContainer.find("[data-component]");
                  $.each(components, function(i) {
                    var component = $(this).data("component");
                    P[component] && P[component]($(this), null, null, paramDataForm, postData, self);
                  });

                  var callback = P.callback.get("form.post", $submit, self.$element);
                  if (callback)
                    callback.call(self, data);
                }
              }, paramData, postData);
            } else {
              var paramDataForm = $.extend({}, paramData, self.$element.data("paramData"));
              P.utils.PostData({
                "container": self.$element,
                "type": type,
                "callback": function(data) {

                  // FIXME:
                  var autoHideModal = self.$element.data("autoHideModal") || true;
                  if (!!self.owner) {
                      if (autoHideModal && self.owner.$modal) {
                          var $modalTarget = self.owner.$modal;

                          $modalTarget.modal('hide');

                          $modalTarget.find(".modal-title").html("title");
                          $modalTarget.find(".modal-body").html("body");
                        }
                  }
                  
                  var callback = P.callback.get("form.post", $submit, self.$element);
                  if (callback)
                    callback.call(self, data);
                }
              }, paramDataForm, postData);
            }
          };

          // FIXME: 
          var callback = P.callback.get("form.submitconfirm", $submit, self.$element);
          if (callback) {
            callback.call(self, formSubmit);
          } else {
            formSubmit.call(self);
          }
        });

        // 取消按钮
        var $cancel = self.$element.find("[data-cancel='cancel']");
        $cancel.on("click", function(e) {
          this.owner = self;
          var that = this;

          e.preventDefault();

          if (self.owner.$modal) {
            var $modalTarget = self.owner.$modal;

            $modalTarget.modal('hide');

            $modalTarget.find(".modal-title").html("title");
            $modalTarget.find(".modal-body").html("body");
          }

          var callback = P.callback.get("form.cancel", $cancel, self.$element);
          if (callback)
            callback.call(self, data);
        });
        
        //重置按钮
        var $reset = self.$element.find("[data-reset='reset']");
        $reset.on("click", function(e) {
          this.owner = self;
          var that = this;

          e.preventDefault();

          if (self.owner.$modal) {
            var $modalTarget = self.owner.$modal;

            $modalTarget.modal('hide');

            $modalTarget.find(".modal-title").html("title");
            $modalTarget.find(".modal-body").html("body");
          }

          var callback = P.callback.get("form.reset", $reset, self.$element);
          if (callback)
            callback.call(self, data);
          var target   = self.$element.find("[data-container]");
          var template = self.$element.find("[data-template]");
          P.utils.FillData(target, template, data);
          p.form(self.$element);
        });

        // 完成按钮
        var $finish = self.$element.find("[data-finish='finish']");
        $finish.on("click", function(e) {
          this.owner = self;
          var that = this;

          e.preventDefault();

          if (self.owner.$modal) {
            var $modalTarget = self.owner.$modal;

            $modalTarget.modal('hide');

            $modalTarget.find(".modal-title").html("title");
            $modalTarget.find(".modal-body").html("body");
          }

          var callback = P.callback.get("form.finish", $finish, self.$element);
          if (callback)
            callback.call(self, data);
        });
        
        
        var formAutoSetFormData = (typeof self.$element.data("formAutoSetFormData") == "undefined") ? false : self.$element.data("formAutoSetFormData");
        if (formAutoSetFormData) {
          P.utils.SetFormData($form, data);
          var callback = P.callback.get("form.set", self.$element);
          if (callback) {
            callback.call(self, data);
          }
        }
        
        var components = self.$element.find("[data-component]");
        $.each(components, function(i) {
          var component = $(this).data("component");
          P[component] && P[component]($(this), null, null, paramDataForm, null, self);
        });

        var callback = P.callback.get("form.load", self.$element);
        if (callback)
          callback.call(self, data);
               
        var timeoutInteval = 0;
        var validateOptions = {
          onsubmit: false,
          success: function(label, element) {
                     if($(element).parents("td").eq(0).find(".sw-text-danger")!=undefined)
                       $(element).parents("td").eq(0).find(".sw-text-danger").remove();
          },
          errorPlacement: function(error, element) {
 
                    if(element.parents("td").eq(0).find(".sw-text-danger")!=undefined)
                      element.parents("td").eq(0).find(".sw-text-danger").remove();
                    
                     var placement = element.data("placement") || "right";
                     var tem = "<span class=\"glyphicon glyphicon-exclamation-sign sw-text-danger\" data-toggle=\"tooltip\" data-placement=\""+top+"\" title=\""+error.text()+"\"></span>"
                     element.parents("td").eq(0).append(tem);

            }
        };
        var callback = P.callback.get("form.validateOptions", self.$element);
        if (callback)
          $.extend(validateOptions, callback.call(self));

        //$form.validate(validateOptions);
      }
    }, paramData, postData);

  };

  var old = P.form;
  P.form = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('form')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('form', (component = new Form(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.form.defaults = {};
  P.form.Constructor = Form;
})(jQuery, SWPlatform);


/*
 * List
 */
(function($, P) {
  'use strict';

  var List = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.list.defaults, options);
    this.owner = owner;

    this.options.pageIndex = this.$element.data("pageIndex") || 0;
    this.options.itemsPerPage = this.$element.data("itemsPerPage") || 10;

    return this;
  };

  List.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;
    self.defaultData = defaultData;
    self.paramData = paramData ;
    self.postData = postData;

    var sessionData = self.$element.data("sessionData") || {};

    defaultData = defaultData || sessionData.defaultData;
    paramData = paramData || sessionData.paramData;
    postData = postData || sessionData.postData;

    // 缓存数据
    self.$element.data("sessionData", {
      "defaultData" : defaultData,
      "paramData" : paramData,
      "postData" : postData
    })

    var pi = options.pageIndex;
    var ipp = options.itemsPerPage;

    var loadAll = self.$element.data("loadAll") || false;
    var cacheCleanup = self.$element.data("cacheCleanup") || false;
    if (loadAll) {
      if (cacheCleanup) {
        self.$element.data("cacheAllData", null);
      } else {
        var cacheAllData = self.$element.data("cacheAllData");
        if (cacheAllData) {
          self.render.call(self, options, null);
          return;
        }
      }
    }

    var url = self.$element.data("url");

    paramData = $.extend({}, paramData, options, {"loadAll": loadAll, "pageIndex": pi, "itemsPerPage": ipp} );

    if (loadAll) {
      var maxPages = self.$element.data("maxPages") || -1;
      var totalItems = maxPages==-1?-1: parseInt(maxPages)*parseInt(ipp);

      paramData = $.extend({}, paramData, {"totalItems": totalItems});
    }

    var callback = P.callback.get("list.init", self.$element);
    if (callback)
      callback.call(self);

    var callback = P.callback.get("list.preload", self.$element);
    if (callback) {
      var r = callback.call(self);
      if (!r.valid) return;
      defaultData = $.extend({}, defaultData, r.defaultData);
      paramData = $.extend({}, paramData, r.paramData);
      postData = $.extend({}, postData, r.postData);
    }

    P.utils.LoadData({
      "container": self.$element,
      "autoFill": false,
      "callback": function(data) {
        data = $.extend({}, self.data, data);
        self.render.call(self, options, data);

        var callback = P.callback.get("list.load", self.$element);
        if (callback)
          callback.call(self,data);

        var callback = P.callback.get("spreadandcontraction.render", self.$element);
            if (callback)
          callback.call(self);
      }
    }, paramData, postData);

  };

  List.prototype.render = function(options, data) {
    var self = this;
    options = options || self.options;

    var pi = options.pageIndex;
    var ipp = options.itemsPerPage;

    var loadAll = self.$element.data("loadAll");

    var target   = self.$element.children("[data-container]");
    var template = self.$element.children("[data-template]");

    if (loadAll) {
      var cacheAllData = self.$element.data("cacheAllData");
      if (!cacheAllData) {
        cacheAllData = data;
        self.$element.data("cacheAllData", cacheAllData);
      }

      if (cacheAllData) {
        var showData = $.extend(true, {}, cacheAllData);

        var startIndex = pi * ipp;
        var endIndex = (pi+1) * ipp - 1;

        if (ipp == -1) {
          startIndex = 0;
          endIndex = showData.items.length -1;
        }

        var items = [];
        for (var i=0; i<showData.items.length; i++) {
          if (startIndex+i<showData.items.length && startIndex+i<=endIndex) {
            items[i] = showData.items[startIndex + i];
          }

          if (startIndex+i>endIndex) {
            break;
          }
        }
        showData.pageIndex = pi || showData.pageIndex;
        showData.itemsPerPage = ipp || showData.itemsPerPage;

        showData.items = items;

        data = data || showData;

        P.utils.FillData(target, template, showData);
      }
    } else {
      data.pageIndex = pi || data.pageIndex;
      data.itemsPerPage = ipp || data.itemsPerPage;

      P.utils.FillData(target, template, data);
    }

    var callback = P.callback.get("list.render", self.$element);
    if (callback)
      callback.call(self);

    var callbackName = (self.$element.data("callback") || "list")+'_'+P.utils.Guid();

    var curItemsPerPage = data.itemsPerPage;
    var curPageIndex=data.pageIndex;
    P.callback(callbackName+".dropdown.event", function(data) {
      if(data.flag=="itemsPerPage")
       {
          if (curItemsPerPage == data.selectedValue) return;
          var options = {"pageIndex": 0, "itemsPerPage": data.selectedValue};
          
       }else if(data.flag == "pageIndex")
       {
        if (curPageIndex == data.selectedValue) return;
        var options = {"pageIndex":data.selectedValue,"itemsPerPage":curItemsPerPage};
        }
      
      self.init.call(self, null,null,null, options);
    });

    P.callback(callbackName+".selectParam.change", function(data) {
      var options = data;
      self.init.call(self, null,null,null, options);
    });

    

    P.callback(callbackName+".input.event", function(data) {
      
       if (curPageIndex == data.pageIndex) return;
       var options = {"pageIndex":data.pageIndex,"itemsPerPage": data.itemsPerPage};
           self.init.call(self, null,null,null, options);
    });
    var curPageIndex = data.pageIndex;
    P.callback(callbackName+".pager.event", function(data) {
      if (curPageIndex == data.pageIndex) return;
      var options = {"pageIndex": data.pageIndex, "itemsPerPage": data.itemsPerPage};
      self.init.call(self, null,self.paramData,null, options);
    });

    var components = self.$element.find("[data-component]");
    $.each(components, function(i) {
      var originCallbackName = $(this).data("callback");

      if (!originCallbackName)
        $(this).data("callback", callbackName);

      var component = $(this).data("component");
      if (component == "checker") {
        P[component] && P[component]($(this), options, null, null, null, self);
      } else
      if (component == "dropdown") {
        var defaultData = {"currentItemValue": data.itemsPerPage,"currentPageValue": data.pageIndex};
        P[component] && P[component]($(this), options, defaultData, null, null, self);
      } else
      if(component == "input"){
        var defaultData = data;
        P[component] && P[component]($(this), options, defaultData, null, null, self);
      } else
      if (component == "pager") {
        var defaultData = data;
        P[component] && P[component]($(this), options, defaultData, null, null, self);
      } else 
      if(component == "selectParam"){
        var defaultData = data;
        P[component] && P[component]($(this), options, defaultData, null, null, self);
      }else
      {
        P[component] && P[component]($(this), options, null, self.paramData, null, self);
      }
    });

  }
  //P.list = new List();
  var old = P.list;
  P.list = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('list')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('list', (component = new List(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.list.defaults = {"pageIndex": 0, "itemsPerPage": 10};
  P.list.Constructor = List;
})(jQuery, SWPlatform);


/*
 * Checker
 */
(function($, P) {
  'use strict';

  var Checker = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.checker.defaults, options);
    this.owner = owner;

    return this;
  };
  /* PUBLIC CLASS DEFINITION
  */
  Checker.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    var data = defaultData || {};

    var callback = P.callback.get("checker.init", self.$element);
    if (callback)
      callback.call(self);

    P.utils.LoadData({
      "container": self.$element,
      "callback":function() {
        var eventName = self.$element.data("checkEvent") || "click";

        self.$element.on(eventName, function(e){
          var checkType = self.$element.data("checkType");
          var checkContainer = $(self.$element.data("checkContainer"));
          if (checkContainer.length <= 0) {
            checkContainer = self.$element.parents("[data-component]");
          }

          if (checkType == "check-all") {
            $('[data-component="checker"]', checkContainer).each(function(e){
              $(this).prop({"checked": self.$element.prop("checked")});
            });

          } else if (checkType == "check-one") {
            var isCheckAll = true;
            var checkAll = null;

            $('[data-component="checker"]', checkContainer).each(function(e){
              var ct = $(this).data("checkType");
              if (ct == "check-all") {
                checkAll = $(this);
                return;
              }

              if ($(this).prop("checked") == false) {
                isCheckAll = false;
              }
            });

            checkAll.prop({"checked":isCheckAll});
          }

          var callback = P.callback.get("checker."+eventName, self.$element);
          if (callback) {
            callback.call(self);
          } else {
            var callback = P.callback.get("checker.event", self.$element);
            if (callback)
              callback.call(self);
          }
        });

        var callback = P.callback.get("checker.load", self.$element);
        if (callback) {
          callback.call(self);
        }
      }
    });

  };

  /* PLUGIN DEFINITION
  */
  var old = P.checker;
  P.checker = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('checker')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('checker', (component = new Checker(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.checker.defaults = {};
  P.checker.Constructor = Checker;

  /* NO CONFLICT
  */
  P.checker.noConflict = function () {
    P.checker = old;
    return this;
  };

})(jQuery, SWPlatform);

/*
 * Input
 */
(function($, P) {
  'use strict';

  var Input = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.input.defaults, options);
    this.owner = owner;

    return this;
  };
  /* PUBLIC CLASS DEFINITION
  */
  Input.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;
    
    
    var data = defaultData || {};

    var pi = options.pageIndex || data.pageIndex;
    var ipp = options.itemsPerPage || data.itemsPerPage;
    var showPage = options.showPage;
    var totalPages = data.totalPages;

    var callback = P.callback.get("input.init", self.$element);
    if (callback)
      callback.call(self);

    var eventName = self.$element.data("inputEvent") || "keypress";
    self.$element.find("[data-input-keypress]").unbind().on(eventName, function(e){
      if(e.which == 13) {
        this.owner = self;
        var that = this;
  
        e.preventDefault();
              if(Number($(this).val())>totalPages){
                var pageIndex=Number(totalPages)-1;//input组件
                $(this).val(totalPages);
              }else
          var pageIndex = Number($(this).val()) - 1;
        var callback = P.callback.get("input.event", self.$element);
        if (callback)
          callback.call(that, {"pageIndex": pageIndex, "itemsPerPage": ipp});
      }
    });
    
  };

  /* PLUGIN DEFINITION
  */
  var old = P.input;
  P.input = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('input')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('input', (component = new Input(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.input.defaults = {};
  P.input.Constructor = Input;

  /* NO CONFLICT
  */
  P.input.noConflict = function () {
    P.input = old;
    return this;
  };

})(jQuery, SWPlatform);

/*
 * Dropdown
 */
(function($, P) {
  'use strict';

  var Dropdown = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.dropdown.defaults, options);
    this.owner = owner;

    return this;
  };
  /* PUBLIC CLASS DEFINITION
  */
  Dropdown.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    var data = defaultData || {};

    var callback = P.callback.get("dropdown.init", self.$element);
    if (callback)
      callback.call(self);

    P.utils.LoadData({
      "container": self.$element,
      "callback":function() {
        var currentItemValue = options.currentItemValue || data.currentItemValue;// console.log(currentValue);
        
        var currentPageValue=options.currentPageValue|| data.currentPageValue;//默认起始页
        
        var eventName = self.$element.data("pageEvent") || "change";

        self.$element.find("[data-dropdown-select]").on(eventName, function(e){
          this.owner = self;
          var that = this;
          e.preventDefault();

          var selectedValue = $(this).val();

          var currentItemValue = currentItemValue || self.$element.data("currentItemValue");
          self.$element.data("currentItemValue", selectedValue);

          var callback = P.callback.get("dropdown."+eventName, self.$element);
          if (callback) {
            callback.call(that, {"currentItemValue": currentItemValue, "selectedValue": selectedValue,"flag":"itemsPerPage"});
          } else {
            var callback = P.callback.get("dropdown.event", self.$element);
            if (callback)
              callback.call(that, {"currentItemValue": currentItemValue, "selectedValue": selectedValue,"flag":"itemsPerPage"});
          }
        });

        
        self.$element.find("[data-dropdown-pageSelect]").on(eventName, function(e){
          this.owner = self;
          var that = this;
          e.preventDefault();

          var selectedValue = $(this).val();

          var currentPageValue = currentPageValue || self.$element.data("currentPageValue");
          self.$element.data("currentPageValue", currentPageValue);

          var callback = P.callback.get("dropdown."+eventName, self.$element);
          if (callback) {
            callback.call(that, {"currentPageValue": currentPageValue, "selectedValue": selectedValue,"flag":"pageIndex"});
          } else {
            var callback = P.callback.get("dropdown.event", self.$element);
            if (callback)
              callback.call(that, {"currentPageValue": currentPageValue, "selectedValue": selectedValue,"flag":"pageIndex"});
          }
        });
        var callback = P.callback.get("dropdown.load", self.$element);
        if (callback) {
          callback.call(self);
          self.$element.find("[data-dropdown-select]").trigger(eventName);
        }
      }
    });

  };

  /* PLUGIN DEFINITION
  */
  var old = P.dropdown;
  P.dropdown = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('dropdown')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('dropdown', (component = new Dropdown(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.dropdown.defaults = {};
  P.dropdown.Constructor = Dropdown;

  /* NO CONFLICT
  */
  P.dropdown.noConflict = function () {
    P.dropdown = old;
    return this;
  };

})(jQuery, SWPlatform);


/*
 * SelectParam
 */
(function($, P) {
  'use strict';

  var SelectParam = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.selectParam.defaults, options);
    this.owner = owner;

    return this;
  };
  /* PUBLIC CLASS DEFINITION
  */
  SelectParam.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    
    var data = defaultData || {};
    if (!P.permission.HasPermission.call(self)) {
      return;
    }
    var pi = options.pageIndex || data.pageIndex;
    var ipp = options.itemsPerPage || data.itemsPerPage;
    var callback = P.callback.get("selectParam.init", self.$element);
    if (callback)
      callback.call(self);
    var eventName = self.$element.data("selectEvent") || "change";
    self.$element.on(eventName, function(e){
      this.owner = self;
      var that = this;
      e.preventDefault();

      var selectedValue = $(this).val();
      var selectedName  = $(this).attr("name");
      
      var pdata = {};
      pdata[selectedName] = selectedValue;
      pdata["pageIndex"] = pi;
      pdata["itemsPerPage"] = ipp;
      
      var callback = P.callback.get("selectParam."+eventName, self.$element);
      if (callback) {
        callback.call(that, pdata);
      } else {
        var callback = P.callback.get("selectParam.event", self.$element);
        if (callback)
          callback.call(that, pdata);
      }
    });
  };

  /* PLUGIN DEFINITION
  */
  var old = P.selectParam;
  P.selectParam = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('selectParam')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('selectParam', (component = new SelectParam(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.selectParam.defaults = {};
  P.selectParam.Constructor = SelectParam;

  /* NO CONFLICT
  */
  P.selectParam.noConflict = function () {
    P.selectParam = old;
    return this;
  };

})(jQuery, SWPlatform);


/*
 * Pager
 */
(function($, P) {
  'use strict';

  var Pager = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.pager.defaults, options);
    this.owner = owner;

    return this;
  };
  /* PUBLIC CLASS DEFINITION
  */
  Pager.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;

    var data = defaultData || {};

    var pi = options.pageIndex || data.pageIndex;
    var ipp = options.itemsPerPage || data.itemsPerPage;
    var showPage = options.showPage;
    var totalPages = data.totalPages;

    var callback = P.callback.get("pager.init", self.$element);
    if (callback)
      callback.call(self);

    var eventName = self.$element.data("pageEvent") || "click";
    self.$element.find("[data-page-index]").on(eventName, function(e){
      this.owner = self;
      var that = this;

      e.preventDefault();

      var pageIndex = $(this).data("pageIndex");
      
      //if (pi == pageIndex) return;
      //self.options.callback({"pageIndex": pageIndex});
      var callback = P.callback.get("pager.event", self.$element);
      if (callback)
        callback.call(that, {"pageIndex": pageIndex, "itemsPerPage": ipp});
    });
    
    self.$element.find("[data-page-arrow]").on(eventName, function(e){
      this.owner = self;
      var that = this;

      e.preventDefault();
      var pageIndex = pi;
      if ($(this).data("pageArrow") == "prev") {
        pageIndex --;
        if (pageIndex < 0) return;
      } else if ($(this).data("pageArrow") == "next") {
        pageIndex ++;
        if (pageIndex >= totalPages) return;
      } else if($(this).data("pageArrow") == "frist"){
        pageIndex=0;
      }else if($(this).data("pageArrow") == "last")
      {
        pageIndex= totalPages-1;
      }
    
      //self.options.callback({"pageIndex": pageIndex});
      var callback = P.callback.get("pager.event", self.$element);
      if (callback)
        callback.call(that, {"pageIndex": pageIndex, "itemsPerPage": ipp});
    });

  };

  /* PLUGIN DEFINITION
  */
  var old = P.pager;
  P.pager = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('pager')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('pager', (component = new Pager(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.pager.defaults = {"showPage":5};
  P.pager.Constructor = Pager;

  /* NO CONFLICT
  */
  P.pager.noConflict = function () {
    P.pager = old;
    return this;
  };

  /* DATA-API
  */
  //$(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {/*some code*/})

  //P.pager = Pager;

})(jQuery, SWPlatform);


/*
 * AccessController
 */
(function($, P) {
  'use strict';

  var AccessController = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.accessController.defaults, options);
    this.owner = owner;

    return this;
  };
  
  AccessController.prototype.init = function(defaultData, paramData, postData, options) {
    var self = this;
    options = options || self.options;
    
    paramData = paramData || {};

    var callback = P.callback.get("accessController.init", self.$element);
    if (callback)
      callback.call(self);

    var $target = self.$element;
    
    P.utils.LoadHtml({
      'container': self.$element,
      'target': $target,
      'callback': function(html) {
        
        var paramDataAc = $.extend({}, paramData, self.$element.data("paramData"));
        
        var components = self.$element.find("[data-component]");
        $.each(components, function(i) {
          var component = $(this).data("component");
          P[component] && P[component]($(this), null, null, paramDataAc, null, self);
        });
        
        var callback = P.callback.get("accessController.load", self.$element);
        if (callback)
          callback.call(self);
      }
    });
  };
  
  var old = P.accessController;
  P.accessController = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('accessController')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('accessController', (component = new AccessController(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.accessController.defaults = {};
  P.accessController.Constructor = AccessController;
  
})(jQuery, SWPlatform);
/*
 * echarts
 */
(function($, P) {
  
  'use strict';
  
  var ECharts = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.echarts.defaults, options);
    this.owner = owner;
    return this;
  };
  
  ECharts.prototype.init = function(defaultData, paramData, postData, options) {
    
    var self = this;
    options = options || self.options;
    paramData = paramData || {};
       
        //权限控制
    if (!P.permission.HasPermission.call(self)) {
      return;
    }
    var callback = P.callback.get("echarts.init", self.$element);
    if (callback)
      callback.call(self);

        var callback = P.callback.get("echarts.preload", self.$element);
    if (callback) {
      var r = callback.call(self);
      if (!r.valid) return;
      defaultData = $.extend({}, defaultData, r.defaultData);
      paramData = $.extend({}, paramData, r.paramData);
      postData = $.extend({}, postData, r.postData);
    }
        P.utils.LoadData({
      "container": self.$element,
      "callback":function(data) {
        var paramData = self.$element.data("paramData");
        var components = self.$element.find("[data-component]");
        $.each(components, function(i) {
          var component = $(this).data("component");
          P[component] && P[component]($(this), null, null, paramData, null, self);
        });
        var callback = P.callback.get("echarts.load", self.$element);
        if (callback)
          callback.call(self, data);
      },
      "defaultData": defaultData
    }, paramData, postData);
  };
  
  var old = P.echarts;
  P.echarts = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('echarts')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('echarts', (component = new ECharts(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.echarts.defaults = {};
  P.echarts.Constructor = ECharts;
  
})(jQuery, SWPlatform);

/*
 * swiper
 */
(function($, P) {
  
  'use strict';
  
  var Swiper = function(element, options, owner) {
    this.$element = $(element);
    this.options = $.extend({}, P.swiper.defaults, options);
    this.owner = owner;
    return this;
  };
  
  Swiper.prototype.init = function(defaultData, paramData, postData, options) {
    
    var self = this;
    options = options || self.options;
    paramData = paramData || {};
       
        //权限控制
    if (!P.permission.HasPermission.call(self)) {
      return;
    }
    
    var callback = P.callback.get("swiper.init", self.$element);
    if (callback)
      callback.call(self);

        var callback = P.callback.get("swiper.preload", self.$element);
    if (callback) {
      var r = callback.call(self);
      if (!r.valid) return;
      defaultData = $.extend({}, defaultData, r.defaultData);
      paramData = $.extend({}, paramData, r.paramData);
      postData = $.extend({}, postData, r.postData);
    }
        P.utils.LoadData({
      "container": self.$element,
      "callback":function(data) {
        var paramData = self.$element.data("paramData");
        var components = self.$element.find("[data-component]");
        $.each(components, function(i) {
          var component = $(this).data("component");
          P[component] && P[component]($(this), null, null, paramData, null, self);
        });
        var callback = P.callback.get("swiper.load", self.$element);
        if (callback)
          callback.call(self, data);
      },
      "defaultData": defaultData
    }, paramData, postData);
  };
  
  var old = P.swiper;
  P.swiper = function (element, option, defaultData, paramData, postData, owner) {
    return element.each(function () {
      var $this = $(this)
        , component = $this.data('swiper')
        , options = typeof option == 'object' && option;
      if (!component)
        $this.data('swiper', (component = new Swiper(this, options, owner)));
      component.init(defaultData, paramData, postData);
    });
  };
  P.swiper.defaults = {};
  P.swiper.Constructor = Swiper;
  
})(jQuery, SWPlatform);
