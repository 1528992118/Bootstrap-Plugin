;(function(undefined){
     "use strict" 
      var _global;
      var environ = {
              "check" : {                 
                  "bind":{
                      "mail":/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
                      "phone":/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
                  },
                  "password":{
                      "charComb_regex_2":/^(?=.*[0-9])(?=.*[a-zA-Z])/,
                      "charComb_regex_3":/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
                      "charComb_regex_4":/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[`\-=~!@#\$%\^&\*\(\)_\+\[\]\\\{\}\|;':\"\,\./<>\?])/                  
                  }
              },
              "msgCount":{
                  "msgCountUrl":"api.gw/message/api/messages/selectMsgCountWithCurrentUser"
              },
              "unReadCount": 0,
              "message":{
                  "confirm":{
                      "delete":"确定删除吗？",
                      "publish":"确定上架吗？",
                      "unpublish":"确定下架吗？",
                      "pass":"确定通过吗？",
                      "audite":"确定提交审核吗？",
                      "edit":"修改应用信息后，会对应用重新进行审核，是否继续修改？",
                      "mark":"确定标记为已读吗？",
                      "btach_mark":"确定全部标记为已读吗？",
                      "btach_delete":"确定清空吗？"                     
                  },
                  "success":{
                      "delete":"删除成功！",
                      "publish":"上架成功！",
                      "unpublish":"下架成功！",
                      "edit":"修改成功！",
                      "update":"保存成功！",
                      "return":"退回成功！",
                      "pass":"审核成功！",
                      "audite":"提交成功！",
                      "mark":"标记成功！",
                      "password":"密码修改成功！",
                      "code":"验证码发送成功,请查收！",
                      "email":"安全邮箱绑定成功！",
                      "mobile":"安全手机绑定成功！"
                  },
                  "failed":{
                      "update":"保存失败！",
                      "code":"验证码发送失败,请重试！"
                          
                  },
                  "alert":{
                      "code":{
                          "empty":"代码不能为空！",
                          "invalid":"代码不可用！"
                      },
                      "custom":{
                          "empty":"不能为空！",
                          "pwd":"自定义密码",
                          "attributes":"用户属性不能为空！"
                      },
                      "checkbox":{
                          "roles":"角色不能为空！",
                          "usergroups":"用户组不能为空！",
                          "operation":"请勾选操作对象！"
                      },
                      "copy":{
                          "success":"复制成功！",
                          "error":"复制失败，请手动复制！"
                      },
                      "mail":"请输入正确的邮箱！",
                      "phone":"请输入正确的手机！",
                      "fileUpload":"请选择{file}上传！",
                      "error":{
                          "admins":"管理员列表获取失败！"
                      }
                  },
                  "radio":{
                      "yes":"是",
                      "no":"否"
                  },
                  "abnormal":{
                      "user":" —— 账号异常",
                      "orgs":" —— 部门异常"
                  },
                  "password":{                      
                      "difference":" 两次密码输入不一致 ",
                      "length":"密码长度必须为{minl}~{maxl}个字符",
                      "rightImgPath":"../../assets/themes/open/images/qx_right_ico.png",
                      "charComb_hint":[
                               "必须包含数字、字母",
                               "必须包含数字、字母(大小写)",
                               "必须包含数字、字母(大小写)、特殊字符"
                             ],
                       "charComb_msg":{
                           "charComb_regex_2":"必须包含数字、字母",
                           "charComb_regex_3":"必须包含数字、字母(大小写)",
                           "charComb_regex_4": "必须包含数字、字母(大小写)、特殊字符"
                       }
                  },
                  "code":{
                      "btn_orig_text":"发送验证码",
                      "btn_send_text":"重新发送({time}s)"
                  }
              },
              "rest":{
                  "success":"success"
              },
              "temp":{
                  "publish":{
                      "accessRoles" : 
                       [ {
                          "companyId" : "",
                          "roleId" : ""
                       } ],
                      "isPass" : true,
                      "returnReason" : "",
                      "id":""
                  },
                 "imgpath":"../../assets/themes/admin/images/temp/temp-14.png"
              },
              "default":{
                  "config":{
                      "categoryCode": "default_system_options",
                      "categoryName": "默认系统配置",
                      "checkboxShowNum": 1
                  },
                  "codetime":60,
                  "email_flt":"mail_server_bind_ftl",
                  "mobile_flt":"sms_server_bind_ftl",
                  "file_upload":{
                      "previewSettings" : {
                          image : {
                              width : "200px",
                              height : "150px"
                          },
                      },
                      "dropZoneEnabled" : false,
                      "showPreview" : true,
                      "allowedFileExtensions" : [ 'jpg', 'png', 'gif', 'bmp', 'jpeg' ],
                      "fileActionSettings" : {
                          "showUpload" : false,
                          "showRemove" : false
                      },
                      "preferIconicZoomPreview" : false
                  }
              },
              "password":{
                  "O_color" : "#eeeeee",
                  "L_color" : "#FF0000",
                  "M_color" : "#FF9900",
                  "H_color" : "#33CC00",
                  "passMinLength" : 0,
                  "passMaxLength" : 0,
                  "passCombPolicy" : ""
              }            
      };
      var method={       
        CheckAppStep:function(step,element,check){
            
            var form=element.find("form");
            
            form.data("validResult",true);

            var $iconUrl=form.find("[name='iconUrl']"),       
                $isUserMap=form.find('input[name="isUserMap"]:checked').val(),
                $ignoreAttributesCheck=form.find('input[name="ignoreAttributes"]:checked').val();
            var checkIconUrl=function(){
                  if (!method.NotEmpty($iconUrl.val())) {
                     form.data("validResult",false);
                     p.alert(environ.message.alert.fileUpload.replace("{file}",$iconUrl.data("message"))); 
                  }
                };
            var checkAttributes=function(){
                    if ($isUserMap == 'true' && $ignoreAttributesCheck == 'false') {
                        var checkNum=(function(){
                            form.find('input[name="attributes"]').each(function(){
                            if (this.checked===true)
                                checkNum++;                                                                                                
                            });
                            return checkNum;
                        }());
                        if (typeof(checkNum)=='undefined') {
                          form.data("validResult",false);
                          p.alert(environ.message.alert.custom.attributes);
                        }  
                    }
                };                             
             var checkForm=function(){
                 form.find("input,select,textarea").each(function(){
                     var $item = $(this),
                         listen = $item.data("listen"),
                         required = $item.data("required");
                     if (listen == true && required == true) 
                        $item.trigger('blur');    
                 });   
             };
            
            if (step==="one") {       

                form.find("#first_step input,select,textarea").each(function(){
                    var $item = $(this),
                        listen = $item.data("listen"),
                        required = $item.data("required");
                    if (listen == true && required == true) 
                       $item.trigger('blur');    
                });
                
                checkIconUrl();  
                
                return form.data("validResult");  
                                       
            }else if(step==="two"){  
                               
                checkAttributes();

            }else if(step==="all"){ 
                
                 checkIconUrl();
                 
                 checkAttributes();                  

            }
            
            if (check===true)
              checkForm();
            
            return form.data("validResult");  
        },    
        SetRadioFalse:function(form){
            form.find(":radio").each(function(i){
                if(i%2 !=0)
                    this.checked=true;              
            });
        }, 
        ControlRadio:function(element){       
            
            var form=element.find("form");
            
            form.find(":radio").click(function(){
                var $enableCas=form.find('input[name="enableCas"]:checked').val(),
                    $isUserMapCheck=form.find('input[name="isUserMap"]:checked').val(),
                    $ignoreAttributesCheck=form.find('input[name="ignoreAttributes"]:checked').val(),
                    
                    $casStep1=form.find("#cas_step_1"),
                    $casStep2=form.find("#cas_step_2"),
                    $casStep2_1=form.find("#cas_step_2_1"),
                    $casStep3=form.find("#cas_step_3");
                
                var $serviceId = form.find("#serviceId"),
                    $logoutUrl = form.find("#logoutUrl");
                    
                if (!!$enableCas && $enableCas=='1') {    
                    
                      $casStep2_1.hide().nextAll().hide();    
                      $casStep1.show(),$casStep2.show(),$casStep3.hide();
                      
                      $serviceId.data("required",true),$logoutUrl.data("required",true);  
                      
                    var $validateAddress=form.find("#validateAddress"),
                        $isUserMap=form.find('input[name="isUserMap"]:checked').val();
                    
                    if(!!$isUserMap && $isUserMap == 'true'){     
                        
                        $validateAddress.data("required",true); 
                        
                        $casStep2.show(),$casStep3.show();
                        $casStep2_1.show().nextAll().show();    
                        
                        var $ignoreAttributes=form.find('input[name="ignoreAttributes"]:checked').val();
                        if (!!$ignoreAttributes && $ignoreAttributes=='true') {
                            form.find(":checkbox").each(function(i){
                                this.checked=true;
                            });
                        }else{
                            form.find(":checkbox").each(function(i){
                                this.checked=false;
                            });
                        }
                    }else if(!!$isUserMap && $isUserMap == 'false'){
                          $validateAddress.data("required",false);
                          $casStep2.show(),$casStep3.hide();
                          $casStep2_1.hide().nextAll().hide();                                                      
                    }                    
                }else if(!!$enableCas && $enableCas=='0'){
                    $casStep1.hide(),$casStep2.hide(),$casStep3.hide();
                    $casStep1.find("input[data-required='true']").each(function(){
                        $(this).data("required",false);
                    });  
                    $casStep2.find("input[data-required='true']").each(function(){
                        $(this).data("required",false);
                    }); 
                }          
                //p.utils.BlurFormData(form);
            });  
        },        
        NotEmpty : function(s) { 
            if(s==null||s==undefined||$.trim(s)=="")
                return false;
            else
                return true;
        },
        AlertPreElement : function(element,id){  
            var text=$.trim(element.find("#"+id).parent().prev().text());
            ((!!text)&&(text.charAt(text.length - 1)==':')&&(text=text.substring(0,text.length-1)));       
            p.alert(text+environ.message.alert.custom.empty);
            return false;
        },
        ButtonConfirm :function(type,post,self){ 
            var msg=null,postData = {};
            if (type=="delete") {
                msg=environ.message.confirm.delete;
            }else if(type=="audite"){
                msg=environ.message.confirm.audite;
            }else if(type=="unpublish"){
                msg=environ.message.confirm.unpublish;
            }else if(type=="publish"){
                msg=environ.message.confirm.publish;
                postData=environ.temp.publish;
                postData.id=$(self.$element[0]).data("extra").id;
            }else if(type=="pass"){
                msg=environ.message.confirm.pass;
                postData["id"]=$(self.$element[0]).data("extra").id;
                postData["isPass"]=true;
            }else if(type=="edit"){
                if ($(self).data("extra").appState!='3') {
                    if ($(self).data("btn-belong").app =='details'){
                        $("#develop-center-form-third-container").show();
                        $("#develop-center-form-second-container").hide();
                    }else
                        method.ShowFormContainer("develop-app-second-container-show");
                    return false;
                }
                msg=environ.message.confirm.edit;
            }else if(type=="mark"){
                msg=environ.message.confirm.mark;
            }else if(type=="batch-mark"){
                msg=environ.message.confirm.btach_mark;           
            }else if(type=="batch-delete"){
                msg=environ.message.confirm.btach_delete;             
            }
            
            p.confirm(msg, function () {    
                if (typeof(post)=='undefined'||post==null) {                  
                    if ($(self).data("btn-belong").app =='details'){                       
                        $("#develop-center-form-third-container").show();
                        $("#develop-center-form-second-container").hide();
                    }else
                        method.ShowFormContainer("develop-app-second-container-show");
                }else{
                    post.call(self, {
                        "valid" : true,
                        "postData" : postData
                    }); 
                }               
            }, function () {
                if (typeof(post)=='undefined'||post==null) {
                    if ($(self).data("btn-belong").app !='details')
                       method.ShowFormContainer("develop-app-first-container-show");
                }else{
                    return {
                        "valid" : false
                    }; 
                }    
            });           
        },
        RefreshAppList :function(msgType,useType,data){ 
            
             var self=this,msg=null;           
             
             (((msgType==="unpublish")&&(msg=environ.message.success.unpublish))||
             ((msgType==="delete")&&(msg=environ.message.success.delete))||
             ((msgType==="audite")&&(msg=environ.message.success.audite))||
             ((msgType==="publish")&&(msg=environ.message.success.publish))||
             ((msgType==="edit")&&(msg=environ.message.success.edit)));
             
             if(data === environ.rest.success){
                 if(useType=="btn"){
                     p.alert(msg);
                     var btn_type = self.$element.data("btn-belong").app;
                     if (!!btn_type && btn_type == "details") {
                         $("#developmanager-app-list").show();
                         $("#developmanager-app-form-container").hide();
                         $("#developmanager-app-form-container").empty();
                     }                    
                 }else if(useType=="form"){
                     if(!!msg){
                         p.alert(msg);
                         $("#developmanager-app-list").show();
                         $("#developmanager-app-form-container").hide();
                         $("#developmanager-app-form-container").empty();
                     }else{
                         $("#second_step").hide();
                         $("#third_step").show();  
                     }
                 } 
                 var $target = $("#nav_list_content").find("[data-component='list']");
                 if ($target.length > 0) {
                   p.list($target);
                 }
             }             
        },
        RefreshPPList:function(data,msgType){
            var msg=null;             
            (((msgType==="delete")&&(msg=environ.message.success.delete))||            
            ((msgType==="edit")&&(msg=environ.message.success.edit)));
            if (msg==null) {
                if(data === environ.rest.success){
                    p.alert(environ.message.success.update,function(){
                        $("#systemmanager-passwordpolicy-list").show();
                        $("#systemmanager-passwordpolicy-form-container").hide();
                        $("#systemmanager-passwordpolicy-form-container").empty();
                        (($("#pplist").length>0)&&(p.list($("#pplist"))));                   
                    });
                }
            }else{
                if(data === environ.rest.success){
                    p.alert(msg,function(){
                        (($("#pplist").length>0)&&(p.list($("#pplist"))));     
                    });                   
                }             
            }    
        },
        RefreshDictList:function(data,msgType){
            var msg=null;             
            ((msgType==="delete")&&(msg=environ.message.success.delete));     
            if(data === environ.rest.success){
                if (msg==null) {                   
                     p.alert(environ.message.success.update,function(){
                         $("#systemmanager-dictionary-list").show();
                         $("#systemmanager-dictionary-form-container").hide();
                         $("#systemmanager-dictionary-form-container").empty();                           
                     });
                }else{                   
                     p.alert(msg);                    
                }  
                (($("#diclist").length>0)&&(p.list($("#diclist"))));     
                (($("#dictsearch").length>0)&&(p.form($("#dictsearch"))));
            }  
        },
        RefreshAppAuditeList:function(data,msgType){
            var msg=environ.message.success.return;      
            if (msgType==="pass") 
                msg=environ.message.success.pass;
            if (data === environ.rest.success) {
                 if (msg==null) {                        
                     p.alert(environ.message.success.pass,function(){
                          $("#developmanager-app-audite-list").show();
                          $("#developmanager-app-audite-form-container").hide();
                          $("#developmanager-app-audite-form-container").empty();
                     });                 
                }else{
                    p.alert(msg);   
                }  
                (($("#appAuditeList").length>0)&&(p.list($("#appAuditeList"))));     
            }           
        },
        RefreshDevelopCenterAppList:function(msgType,data){
            var msg=null;             
            (((msgType==="unpublish")&&(msg=environ.message.success.unpublish))||
            ((msgType==="delete")&&(msg=environ.message.success.delete))||
            ((msgType==="audite")&&(msg=environ.message.success.audite))||
            ((msgType==="publish")&&(msg=environ.message.success.publish))||
            ((msgType==="edit")&&(msg=environ.message.success.edit)));
            
            if(data === environ.rest.success){
                p.alert(msg,function(){
                    method.ShowList("develop-app-show-index");
                    (($("#develop-center-app-list-panel").length>0)&&(p.panel($("#develop-center-app-list-panel"))));   
                });
            }          
        },
        RefreshMessageNav:function(msgType,data){
            var msg=environ.message.success.delete;        
            if (msgType==="mark") 
                msg=environ.message.success.mark;            
            if(data === environ.rest.success){
                p.alert(msg,function(){                  
                    (($("#message-center-nav").length>0)&&(p.nav($("#message-center-nav")))); 
                    (($("#login-info").length>0)&&(p.template($("#login-info")))); 
                });
            }   
        },
        RefreshUserCenter:function(msgType,data){
            var msg=environ.message.success.password;
            if(data === environ.rest.success){
                p.alert(msg,function(){             
                       p.form($("#usercenter-passwordsetting-form"));
                });
            }   
        },
        RefreshSecurityInfo:function(data,type){
            var msg=environ.message.success.email;
            if (type==="mobile") 
                msg=environ.message.success.mobile;
            if(data === environ.rest.success){
                p.alert(msg,function(){                              
                       p.template($("#usercenter-security-info"));
                });
            }   
        },
        ConfigOperateHint:function(data){
            if(data&&data===environ.rest.success){
                p.alert(environ.message.success.update);
            }else{
                p.alert(environ.message.failed.update);
            }                  
        },
        SetPageUnEdit:function(form,editable,isPublish){             
            if (editable===true) {
                // 上架应用,后台管理员只能修改(管理员、所属部门和备注说明)
                if (isPublish===true) {
                    form.find('#orgId,#introduction,#introduction,button[data-submit="submit"],button[data-cancel="cancel"]').attr('disabled',false);
                    method.RefreshSelect(form);
                }else{
                    form.find('a').attr("href","# ");
                    form.find('input,textarea,select,button,a').attr('disabled',false);  
                    form.find('.selectpicker').attr('disabled',false);  
                    method.RefreshSelect(form);
                }                           
            }else{
                form.find('a').removeAttr("href");
                form.find('input,textarea,select,button,a').attr('disabled',true);
            }              
        },
        ShowList:function(type){
            if (type=="app") {
                $("#developmanager-app-list").show();
                $("#developmanager-app-form-container").hide();
                $("#developmanager-app-form-container").empty();
            }else if(type=="passwordpolicy"){
                $("#systemmanager-passwordpolicy-list").show();
                $("#systemmanager-passwordpolicy-form-container").hide();
                $("#systemmanager-passwordpolicy-form-container").empty();
            }else if(type=="dictionary"){
                $("#systemmanager-dictionary-list").show();
                $("#systemmanager-dictionary-form-container").hide();
                $("#systemmanager-dictionary-form-container").empty();
            }else if(type=="audite"){
                $("#developmanager-app-audite-list").show();
                $("#developmanager-app-audite-form-container").hide();
                $("#developmanager-app-audite-form-container").empty();
            }else if(type=="develop-app-show-index"){
                $("#develop-center-index").show();
                $("#develop-center-form-first-container,#develop-center-form-second-container,#develop-center-form-third-container").hide();
                $("#develop-center-form-first-container,#develop-center-form-second-container,#develop-center-form-third-container").empty();
            }        
        },
        ShowFormContainer:function(type){
            if (type=="app") {
                $("#developmanager-app-list").hide();
                $("#developmanager-app-form-container").show();
            }else if(type=="passwordpolicy"){
                $("#systemmanager-passwordpolicy-list").hide();
                $("#systemmanager-passwordpolicy-form-container").show();
            }else if(type=="dictionary"){
                $("#systemmanager-dictionary-list").hide();
                $("#systemmanager-dictionary-form-container").show();
            }else if(type=="audite"){
                $("#developmanager-app-audite-list").hide();
                $("#developmanager-app-audite-form-container").show();
            }else if(type=="develop-app-first-container-show"){
                // 显示first-container内容（nav页,添加页）
                $("#develop-center-index,#develop-center-form-second-container,#develop-center-form-third-container").hide();
                $("#develop-center-form-first-container").show();
                $("#develop-center-form-second-container,#develop-center-form-third-container").empty();
            }else if(type=="develop-app-second-container-show"){
                // 显示second-container内容（详情页,修改页）
                $("#develop-center-index,#develop-center-form-first-container,#develop-center-form-third-container").hide();
                $("#develop-center-form-second-container").show();
            } 
        },    
        SetSelected:function(objs,targets,sources,types,datas){           
                $.each(objs, function(key,val) {
                    var target = targets[key],
                        select = objs[key],
                          type = types[key],
                          source = sources[key];
                    // 数据绑定
                    $.each(source, function(k,v) {
                        switch(type){
                            case "orgs" :
                            case "developers" :
                                if (!!target&&target==v.id) 
                                    select.find("option").eq(k).attr("selected","selected")                              
                                break;
                            case "appcats" :
                            case "bg_color":
                            case "items_per_page":
                                if (!!target&&target==v) 
                                    select.find("option").eq(k).attr("selected","selected")
                                break;
                            case "admins" :
                                $.each(target,function(m,n){
                                    if (!!n.accountId&&n.accountId==v.account.id) 
                                        select.find("option").eq(k).attr("selected","selected")
                                });                                
                                break;
                            default : 
                                break;
                        }                                                 
                    });   
                    
                    if (typeof(datas)!='undefined') {
                        // 判断数据是否存在
                        var setAbnormalOption = (function(){
                            switch(type){
                                case "orgs" :
                                    var list = source.map(function(item, i) {
                                        return item.id;
                                    });
                                    if ($.inArray(target,list) <= -1) 
                                        method.AddSelectOption(select,target,datas["orgs"],"orgs");
                                    break;
                                case "developers" :
                                    var list = source.map(function(item, i) {
                                        return item.id;
                                    });
                                    if ($.inArray(target,list) <= -1) 
                                        method.AddSelectOption(select,target,datas["developers"],"user");
                                    break;
                                case "admins" :
                                    var list = source.map(function(item, i) {
                                        if (item.account) {
                                            return item.account.id;  
                                        }                                      
                                    });                                   
                                    $.each(target,function(k,v){
                                        if ($.inArray(v.accountId,list) <= -1) 
                                            method.AddSelectOption(select,v.accountId,datas["admins"][k],"user");
                                    });                                                                  
                                    break;
                                default :                               
                                    break; 
                            }
                        }()); 
                    }
                   
                });           
        },
        SetCheckbox:function(element,targets){  
            (typeof(targets) == "undefined"&&(targets=[]));
            $.each(targets, function(key,val) {
                element.find(":checkbox").each(function(i){
                   var checkbox=$(this)
                     , ck=$.trim(checkbox.val());
                   if (!!ck&&ck==val){
                       this.checked=true;     
                       return false;
                   }                                     
                });
            });            
        },
        SetRadioBtn:function(element,targets){
            if (typeof(targets) == "undefined") {                
                element.find('input[name="enableCas"]').each(function(){
                    if($.trim($(this).val())=='0'){
                        this.checked=true; 
                        $(this).trigger("click");
                    }
                });
                return false;
            }
            $.each(targets.radios, function(key,val) {
                element.find('input[name="'+val.k+'"]').each(function(){                                          
                    if($.trim($(this).val())==val.v){                                              
                        this.checked=true; 
                        $(this).trigger("click");
                    }
                });               
            });   
        },
        FormToJosn:function(form){
            var jsonData = {}
              , inputs = form.find("input")
              , textares = form.find("textarea")
              , selects = form.find("select")
              , spans = form.find("span");
            inputs.each(function(i){
                var input=$(this);
                if (input.attr("type")=="text"||input.attr("type")=="file"||input.attr("type")=="password") {                    
                    method.JsonHandler(input,jsonData);                  
                }else if (input.attr("type")=="radio") { 
                    var checked = input.context.checked,
                        name = input.attr("name");
                    if (checked) {
                        method.JsonHandler(input,jsonData);            
                    }             
                }else if(input.attr("type")=="checkbox"){
                    var checked = input.context.checked,
                        name = input.attr("name");
                    if (checked) {
                        method.JsonHandler(input,jsonData);            
                    } 
                }
            });
            textares.each(function(i){
                method.JsonHandler($(this),jsonData);
            });
            selects.each(function(i){
                var select=$(this),
                    val=select.val();
                method.JsonHandler(select,jsonData);   
            });
            spans.each(function(i){
                method.JsonHandler($(this),jsonData);
            });
            return jsonData; 
        },
        JsonHandler:function(dom,source){
            var belongMsg = dom.data("belong");
            if (typeof(belongMsg) == "undefined") 
                return false;
            var belongs = [].concat(belongMsg.split("."))
              , belongType ="object"
              , val = method.StringToBoolean(dom.val()||dom.text());                    
            ((belongs[0].indexOf("field") > -1)&&(belongType="field"));          
            ((belongs[0].indexOf("list") > -1)&&(belongType="list"));          
            if (belongType=="field") {
                var Name = belongs[1];
                if (source[Name]) {
                    var exists = source[Name],
                        newValue = exists +"," + val;
                    source[Name] = newValue;   
                }else{
                    source[Name] = val;   
                }                                   
            }else if(belongType=="object"){
               var objName=belongs[0],
                   objFiled=belongs[1];
               if (source[objName]) {
                   var domian=source[objName];
                   if (domian[objFiled]) {
                       var existFiled = domian[objFiled],
                           newFiled = existFiled +"," + val;
                           domian[objFiled] = newFiled;
                   }else{
                       domian[objFiled] = val;  
                   }        
               }else{
                  var domian ={};                           
                  domian[objFiled] = val;
                  source[objName]=domian;      
              }  
           }else if(belongType=="list"){
               var Name = belongs[1],  
                   exists = source[Name];
               if (source[Name]) {
                   if($.isArray(val)){
                       $.each(val,function(k,v){
                           exists.push(v);
                       });
                   }else{
                       exists.push(val); 
                   }
               }else{
                   if($.isArray(val)){
                       source[Name]=val;
                   }else{
                       source[Name] = [val];   
                   }         
               }
                                    
           }
           return source;
        },
        StringToBoolean:function(str){
            if (typeof(str) == "undefined") {
                return false;
            }else if(typeof(str) == "string")
            {
                ((str=="false")&&((str=false)));
                ((str=="true")&&((str=true)));
            }
            return str;            
        },
        CheckMore:function(form){
           form.find("a[name='CheckMoreBtn']").each(function(){
               $(this).click(function(){                    
                   $(this).parent().find(":gt("+($(this).index()-1)+")").each(function(i){
                         if (i<=1) 
                             $(this).hide();
                         else
                             $(this).show()
                     });
               });
           });
        },
        HideMore:function(form){
            form.find("a[name='HideMoreBtn']").each(function(){
                $(this).click(function(){ 
                    var td=$(this).parent(),
                        a_more=td.find("a[name='CheckMoreBtn']"),
                        more_index=a_more.index();
                    td.find(":gt("+(more_index-1)+")").each(function(i){
                        if (i<=1) 
                            $(this).show();
                        else
                            $(this).hide()
                    });   
                });
            });
        },
        HideOverflowCheckBox:function(num,objs){
            $.each(objs,function(k,v){
                var allitems=$(v).find(":checkbox").length-1;
                if (allitems<=num) 
                    return false;
                $(v).find(":checkbox").each(function(i){
                    var checkbox=$(this),
                        td=$(this).parent();
                        if (i>=num) {                           
                            td.children().eq((i+1)*3-1).after("<a href='javascript:void(0);' name='CheckMoreBtn'>展开</a></br>");  
                            td.children().eq((i+1)*3+1).nextAll().hide();
                            return false;
                        }                                        
                 });
            });
        },
        BindingSystemConfigData:function(form,data){
            var objs = [$("#system_bg_color"),$("#default_items_per_page")]
            , targets = [method.ConfigJsonContent(data.items,'configKey','system_bg_color','configValue'),method.ConfigJsonContent(data.items,'configKey','default_items_per_page','configValue')]
            , sources = [method.SelectOptions($("#system_bg_color")),method.SelectOptions($("#default_items_per_page"))]
            , attrs = ["bg_color","items_per_page"]
            , radios={
                    "radios":[
                              {"k": "copyright_display","v": method.ConfigJsonContent(data.items,'configKey','copyright_display','configValue')}
                             ]                        
                     };           
            method.SetSelected(objs,targets,sources,attrs);
            method.SetRadioBtn(form,radios);
        },
        BindingDefaultConfigData:function(form,data){
            var original=data.original.items,
                roles=data.roles.items,
                usergroups=data.usergroups.items,
                identities=data.identities.items;
            form.find("td[name='identity']").each(function(i){
                var td=$(this),
                    input=$(this).find("input[type='text']").eq(0),
                    identity=input.data("identity-id"),
                    tr=$(this).parent(),
                    usergroup_td=tr.find("td[name='usergroup_checks']"),
                    role_td=tr.find("td[name='role_checks']"),
                    edit_btn=tr.find("button[data-component='button']"),
                    originalKey=undefined;
                $.each(original,function(k,v){
                    var jsonData=$.parseJSON(v.configValue),                       
                        selected_identity=jsonData.identity,
                        selected_roles=jsonData.roles,
                        selected_usergroups=jsonData.usergroups;                       
                    if (selected_identity===identity) {   
                        method.SetCheckbox(role_td,selected_roles);
                        method.SetCheckbox(usergroup_td,selected_usergroups);                      
                    }                     
                });
                // 超过两个checkbox时隐藏剩下的
                method.HideOverflowCheckBox(environ.default.config.checkboxShowNum,[role_td,usergroup_td]);
                method.CheckMore(form);
                method.HideMore(form);
            });
        },
        ConfigJsonContent:function(items,key,val,target){
            var content=(function(){
                if ($.isArray(items)&&(!!key)&&(!!val)&&(!!target)) {
                    $.each(items,function(k,v){
                        if(v[key]==val){
                            content = v[target];
                            return false;
                        }
                    });            
                    return content;
                 }
            }());     
            return content;
        },
        SelectOptions:function(select){
            var vkorg = select.find("option").map(function(){
                return $(this).val();
            }).get().join(",");
            return vkorg.split(',');
        },
        SetCongfigImage:function(element,isDefault){
            var a=$(element.$element[0]),
                modalcontent=$(element.$modal[0]).find('.modal-content'),
                path=a.data("pic-path").path;
            ((!!isDefault)&&isDefault&&(path=environ.temp.imgpath));                          
            modalcontent.html("<div class='modal-body'>" +
                                   "<img src='"+path+"' width='400px' height='300px' />"+
                              "</div>");
        },
        AlertConfig:function(text,obj){
            if (typeof(obj)=='undefined'||$.trim(obj.val())=='') {   
                p.alert(text+environ.message.alert.custom.empty);
                return false;
            }else
                return true;  
        },
        ConfigTooltip:function(form){
            form.find("[data-toggle='tooltip']").each(function(){
                var span=$(this),
                    input=(function(){
                        if (span.prev().attr('type')=='text'||span.prev().attr('type')=='password') 
                            return span.prev();                        
                    }());
                input.blur(function(){
                    var val=$.trim(input.val());
                    if (typeof(val)=='undefined'||val=='') {
                        span.show();
                    }else
                        span.hide();
                });              
            });
        },
        CheckConfigForm:function(form){
            var pass=true;
            form.find(".sw-text-danger").each(function(){
                if ($(this).text()!="*") 
                    return true;
                var td=$(this).parent().parent().next(),
                    text=$.trim($(this).parent().text());
                ((!!text)&&(text.charAt(text.length-1)==':')&&(text=text.substring(0,text.length-1)));             
                td.find("input[type='text']").each(function(){
                    if(!method.AlertConfig(text,$(this))){
                        pass=false;
                        return false;
                    }                       
                }); 
                if (!pass) 
                    return pass;
            });
            return pass;
        },
        ValidCheckBox:function(objs,msgs){
            var pass=true,
                checks=Array.apply(null, Array(objs.length)).map(function(item, i) {
                     return 0;
                });
            $.each(objs, function(k,v) {
                v.find(":checkbox").each(function(i){     
                    if (this.checked===true){
                        checks[k]++;
                        return false;
                    }                       
                });
            });       
            $.each(checks,function(k,v){
                if (v<=0) {
                    p.alert(msgs[k]);
                    pass=false;
                    return false;
                }
            });
            return pass;
        },
        CheckDefaultConfig:function(tr,text){
            var pass=true,
                code=$.trim(tr.find("td[name='code'] input[type='text']").eq(0).val()),
                usergroup_td=tr.find("td[name='usergroup_checks']"),
                role_td=tr.find("td[name='role_checks']"),
                usergroups_msg=text+environ.message.alert.checkbox.usergroups,
                roles_msg=text+environ.message.alert.checkbox.roles;
                if (!method.NotEmpty(code)) {
                    p.alert(text+environ.message.alert.code.empty);
                    return false;
                }
            pass=method.ValidCheckBox([usergroup_td,role_td],[usergroups_msg,roles_msg]);               
            return pass;
        },
        ControlPPSelect:function(form,select,custom){
            var addPwdAttr=function(){
                   form.find("input[name='customPassword']").eq(0).data("required",true);                   
                },
                removePwdAttr=function(){
                   form.find("input[name='customPassword']").eq(0).data("required",false); 
               },
               setInitPass=(function(){                   
                   select.click(function(){
                       if($(this).val()=='false')
                       {
                           removePwdAttr();
                           $(this).parent().nextAll().hide();                          
                       }        
                       else if($(this).val()=='true')
                       {
                           addPwdAttr();
                           $(this).parent().nextAll().show();                           
                       }        
                    });
               }());
               if (!custom){
                   removePwdAttr();
                   select.parent().nextAll().hide();                                                                                                
               }else if(custom){
                   select.val((String)(custom));
                   addPwdAttr();
                   select.parent().nextAll().show();
               } 
        },
        BindingPPData:function(form,data){
           var  custom=data.custom,
                charCombination=data.charCombination,
                select=$("#custom"),   
                radios={"radios":[{"k": "charCombination","v": data.charCombination}]};                          
                method.SetRadioBtn(form,radios);
                method.ControlPPSelect(form,select,custom);              
        },
        CheckRequireInputForm:function(form){
            var pass=true;
            form.find('input[data-require="true"]').each(function(){
                var input=$(this),
                    val=input.val(),
                    alertMsg=input.data("alert")||input.data("alert");
                if (!method.NotEmpty($.trim(val))) {
                    p.alert(alertMsg+environ.message.alert.custom.empty);
                    pass=false;
                    return pass;
                }
            }); 
            return pass;            
        },
        ControlDictForm:function(form){
            var select=form.find("#category"),
                catCode_input=form.find("#categoryCode"),
                catName_input=form.find("#categoryName");
            select.change(function(){ 
                if (method.NotEmpty(select.val())) {                    
                    catCode_input.prop("readonly","readonly");
                    catName_input.prop("readonly","readonly");    
                    catCode_input.val($(this).children('option:selected').val());
                    catName_input.val($(this).children('option:selected').text());     
                }else{
                    catCode_input.removeProp("readonly");
                    catName_input.removeProp("readonly");  
                    catCode_input.val("");
                    catName_input.val("");     
                }                                    
            }); 
        },
        ShowDevelopfinishContainer:function(data){
            $("#first-container").hide();
            $("#second-container").show();
            if (data == "success"){
                $("#second-container-success").show();
                p.panel($("#develop-center-app-list-panel"));
            }    
            else
                $("#second-container-fail").show();
        },
        RemoveButtonClick:function(isForm,form,btn){
            if (isForm) {
                form.find("button[data-save='save'],button[data-submit='submit']").each(function(){
                    method.DelayButton($(this));
                });
            }else{
               method.DelayButton(btn);
            }                
        },
        DelayButton:function(btn){
            btn.attr("disabled","true");
            setTimeout(function () { 
                btn.removeAttr('disabled');
            }, 5000);
        },
        CopyToClipboard:function(btn){
            var clipboard = new Clipboard(btn);
            clipboard.on('success', function () {
                p.alert(environ.message.alert.copy.success)
            });
            clipboard.on('error', function () {
                p.alert(environ.message.alert.copy.error)
            });
        },
        ControlEditAbleAppForm:function(form,data){
            if (data.original.application.enableCas=='0') {
                method.SetRadioFalse(form);
            }
            if (data.original.application.publishStatus==='1') 
                method.SetPageUnEdit(form,true,true);
            else
                method.SetPageUnEdit(form,true,false); 
        },
        InitSelect:function(form,options){
            if (!!options && $.isArray(options)) {
                $.each(options,function(k,v){
                    form.find(".selectpicker").eq(k).selectpicker(v);
                });
            }
            else
                form.find(".selectpicker").selectpicker(options);
        },
        RefreshSelect:function(form){             
            form.find(".selectpicker").selectpicker('refresh');   
        },
        AddSelectOption:function(select,k,v,type){
            var abnormalStr=environ.message.abnormal.user
            if (type=="orgs")
                abnormalStr=environ.message.abnormal.orgs
            var options = "<option value='" + k + "'  class='disable-option' >" + v + abnormalStr + "</option>";  
            select.append(options);
            select.find(".disable-option").attr("selected","selected")
            select.selectpicker('refresh');  
        },
        SetMsgCount:function(obj,data,async){
           if ($.isEmptyObject(data.z)) 
               return;
           var messages=function(){
               var template=obj.$element,
               url=environ.msgCount.msgCountUrl,
               i=template.find(".news-a i").eq(0);           
               p.utils._ajaxJson("z",url, null, "GET", function (key, result) {
                  if (result.status == "OK") {
                     i.text(result.data.unReadCount);
                     environ.unReadCount=result.data.unReadCount;
                  }
               },async);  
           };
           messages();
           var polling=window.setInterval(messages,60000);  
           return environ.unReadCount;
        },
        CheckPwdStrength:function(pwd,minLength){
            if (pwd.length < minLength) return 0;
            var modes=0,strength=0;
            for (var i = 0; i < pwd.length; i++) {
                var charMode,charCode=pwd.charCodeAt(i);              
                if (charCode >= 48 && charCode <= 57)
                    charMode = 1;
                else if (charCode >= 65 && charCode <= 90)
                    charMode = 2;
                else if (charCode >= 97 && charCode <= 122)
                    charMode = 4;
                else
                    charMode = 8;               
                modes |= charMode;
            }  
            for (var j = 0; j < 4; j++) {
                if (modes & 1) strength++;
                modes >>>= 1;
            }
            return strength;
        },
        SetPwdStrength:function(form,passMinLength){
            form.find("input[name='newPwd']").keyup(function () {
                var O_color = environ.password.O_color,
                    L_color = environ.password.L_color,
                    M_color = environ.password.M_color,
                    H_color = environ.password.H_color,
                    pwd=$(this).val();
                var Lcolor , Mcolor , Hcolor;
                if (pwd == null || pwd == '') {
                    Lcolor = Mcolor = Hcolor = O_color;
                } else {
                    var level = method.CheckPwdStrength(pwd, passMinLength);
                    switch (level) {
                        case 0:
                            Lcolor = Mcolor = Hcolor = O_color;
                            break;
                        case 1:
                            Lcolor = L_color;
                            Mcolor = Hcolor = O_color;
                            break;
                        case 2:
                            Lcolor = Mcolor = M_color;
                            Hcolor = O_color;
                            break;
                        default:
                            Lcolor = Mcolor = Hcolor = H_color;
                            break;
                    }
                }
                form.find("#strength_L").css("background", Lcolor);
                form.find("#strength_M").css("background", Mcolor);
                form.find("#strength_H").css("background", Hcolor);
                form.find("#pwdStrength").val(level);
            }); 
        },
        BlurCheckPwd:function(form,passMinLength,passMaxLength,passCombPolicy){
            form.find("input[type='password']").each(function(){
                var input=$(this),
                    span = input.next(),                   
                    minl = passMinLength,
                    maxl = passMaxLength,
                    strength = passCombPolicy,
                    removeImg=function(spans){
                       if (!$.isArray(spans)) {
                           if (spans.children("img").length>0) 
                               spans.children("img").remove();
                       }else{
                           $.each(spans,function(k,v){
                               removeImg($(this));
                           });
                       }                      
                    };
                input.blur(function () {
                    var value=$.trim(input.val());
                    if (!method.NotEmpty(value)) 
                        span.html(span.data("emptyMsg")).show();  
                    else if(method.NotEmpty(value) && input.attr("name") != 'originalPwd'){
                        if (value.length < minl || value.length > maxl) 
                            return span.html(environ.message.password.length.replace('{minl}',minl).replace('{maxl}',maxl)).show();                          
                        if (!method.RegexPwdUtil(value,strength)) 
                            span.html(environ.message.password.charComb_hint[parseInt(strength-2)]).show();                         
                        else{
                            var newPwdInput = form.find("input[name='newPwd']"),
                                confirmPwdInput = form.find("input[name='confirmPwd']"),
                                newPwdValue=newPwdInput.val(),
                                confirmPwdValue=confirmPwdInput.val();
                            if (newPwdInput.val() == confirmPwdInput.val()) {
                                newPwdInput.next().hide();
                                confirmPwdInput.next().hide();
                                newPwdInput.next().next().html("<img src='"+environ.message.password.rightImgPath+"'/>").show();
                                confirmPwdInput.next().next().html("<img src='"+environ.message.password.rightImgPath+"'/>").show();
                            }                               
                            else{
                                if (method.NotEmpty(newPwdValue)&&method.NotEmpty(confirmPwdValue)) {                                    
                                    newPwdInput.next().html(environ.message.password.difference).show();    
                                    confirmPwdInput.next().html(environ.message.password.difference).show();    
                                    removeImg([newPwdInput.next().next(),confirmPwdInput.next().next()]);
                                }
                            }                                                    
                        }    
                    }
                }).focus(function () {                                       
                    span.html("").hide();
                    removeImg(span.next());
                });
            });
        },
        RegexPwdUtil:function(password,passCombPolicy){
            var regex;
            switch (passCombPolicy) {
                case '1':
                    return true;
                case '2':
                    regex = environ.check.password.charComb_regex_2;
                    break;
                case '3':
                    regex = environ.check.password.charComb_regex_3;
                    break;
                case '4':
                    regex = environ.check.password.charComb_regex_4;
                    break;
                default:
                    return true;
            }
            return regex.test(password);
        },
        PwdPolicyCheck:function(inputs,msgs){
            var newPwdInput = inputs[0],
                confirmPwdInput = inputs[1],
                minl = environ.password.passMinLength,
                maxl = environ.password.passMaxLength;
            if (newPwdInput.val().length < minl || newPwdInput.val().length > maxl) { 
                p.alert("["+msgs[0]+"]"+environ.message.password.length.replace('{minl}',minl).replace('{maxl}',maxl));
                return false;
            }
            if (confirmPwdInput.val().length < minl || confirmPwdInput.val().length > maxl) {   
                p.alert("["+msgs[1]+"]"+environ.message.password.length.replace('{minl}',minl).replace('{maxl}',maxl));
                return false;
            }
            if (newPwdInput.val() != confirmPwdInput.val()) {  
                p.alert(environ.message.password.difference);
                return false;
            }
            return true; 
        },     
        ButtonReSend:function(button,time){         
            if(time == 0)   
                return button.attr("disabled", false).html(environ.message.code.btn_orig_text);     
            else {  
                button.attr("disabled", true).html(environ.message.code.btn_send_text.replace('{time}',time));  
                time--;  
            }  
            setTimeout(function(){method.ButtonReSend(button,time)}, 1000);                   
        },
        UrlAppendParams: function (url, name, value) {
            var r = url;
            if (r != null && r != 'undefined' && r != "") {
               value = encodeURIComponent(value);
               var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)"),
                   tmp = name + "=" + value;
               if (url.match(reg) != null) 
                   r = url.replace(eval(reg), tmp);
               else {
                 if (url.match("[\?]")) 
                   r = url + "&" + tmp;
                 else 
                   r = url + "?" + tmp;
               }
            }
            return r;
        },
        GetUrlParam:function(name){
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
            var r = window.location.search.substr(1).match(reg); 
            if (r != null) return unescape(r[2]); return null;
        },
        BindCodeSended:function(button,data){
            if (data === environ.rest.success) 
                p.alert(environ.message.success.code);
            else
                p.alert(environ.message.failed.code);
            button.data("url",button.data("url").split("?")[0]);
        },
        ShowEditBind:function(obj,data){
            var form = obj.$element.parent().parent();
            if (data===true) 
                form.find(".first_step").hide(),form.find(".second_step").show();                          
        },
        DefaultFileOptions:function(){
            return environ.default.file_upload;
        },
        
        
        /* 以下为表单和部分按钮业务 */
        LoadAppAddForm:function(form,isOpenPF){
            
            var adminsOptions = form.find("#adminAccountIdList option");
            
            if (adminsOptions.length == 0) 
                p.alert(environ.message.alert.error.admins);
            else
              adminsOptions.eq(0).prop("selected",true);
                        
            if (isOpenPF===true) {

                var $addRetry = $("#develop-appmanager-add-retry"),  
                    $addCancel =  $("#develop-appmanager-add-cancel"),
                    $addSuccess = $("#develop-appmanager-add-success"),                    
                    showFirstSetp = function(){                   
                       $("#first-container").show();
                       $("#second-container,#second-container-success,#second-container-fail").hide();                    
                    },
                    showAppIndex = function(){
                        $("#develop-center-index").show();
                        $("#develop-center-form-first-container,#develop-center-form-second-container,#develop-center-form-third-container").hide();
                        $("#develop-center-form-first-container,#develop-center-form-second-container,#develop-center-form-third-container").empty();
                    };
                
                $addRetry.on("click",showFirstSetp);
                $addCancel.on("click",showAppIndex);
                $addSuccess.on("click",showAppIndex);

            }else{
                
                var $nextBtn = form.find("#next_step_btn"),
                    $backBtn = form.find("#back_step_btn"),
                    showFirstSetp = function(){
                            form.find("#second_step").hide();
                            form.find("#first_step").show();   
                            return false
                    },
                    showSecondStep = function(){
                        if (method.CheckAppStep("one", form)) {
                            form.find("#first_step").hide();
                            form.find("#second_step").show();
                        }
                        return false;
                    };
                    
                  $nextBtn.on("click",showSecondStep);                  
                  $backBtn.on("click",showFirstSetp); 
                
            }           
            method.InitSelect(form);
            method.SetRadioFalse(form);
            method.ControlRadio(form);
        },
        ValidMcAppForm:function(form){
            var data = { 
                    "valid": false,
                    "postData": method.FormToJosn(form)
                  };   
            if(method.CheckAppStep("all", form ,false)){             
                var app=data.postData.application,
                    value=$.trim($("#oauthRedirectUri").val());
                if (!method.NotEmpty(value)) 
                    app["enableApi"] = "0";
                else
                    app["enableApi"] = "1";
                data.valid=true;
            }
            if (data.valid) 
                method.RemoveButtonClick(true,form);
            return data;            
        },
        ValidOPAppForm:function(form,saved){
            var data = { 
                    "valid": false,
                    "postData": method.FormToJosn(form)
                  };
            
            data.postData["saved"]=saved;
                        
            if(method.CheckAppStep("all", form ,true)){             
                var app=data.postData.application,
                    value=$.trim($("#oauthRedirectUri").val());
                if (!method.NotEmpty(value)) 
                    app["enableApi"] = "0";
                else
                    app["enableApi"] = "1";
                data.valid=true;
            }

           if (data.valid) 
               method.RemoveButtonClick(true,form);
           return data;
            
        },               
        LoadAppDetails:function(form,data,isOpenPF){
            
            method.SetPageUnEdit(form);
            method.ControlRadio(form);            
            
            var objs = [$("#orgId"),$("#type"),$("#developAccountId"),$("#adminAccountIdList")]
              , targets = [data.original.application.orgId,data.original.application.type,data.original.application.developAccount.accountId,data.original.application.adminAccountIdList]
              , adminsAccount = (function(){
                  adminsAccount=[];
                  $.each(data.admins.accountRole,function(k,v){
                      if (typeof(v.account)!='undefined' && v.account!=null) {
                          adminsAccount.push(v);
                      }         
                  });
                  return adminsAccount;
              }())
              , sources = [ [].concat(data.orgs.items)
                           ,[].concat(data.original.appCats.items)
                           ,[].concat(data.developers.items)
                           ,adminsAccount
                          ]
              , attrs = ["orgs","appcats","developers","admins"]
              , datas = {
                          "orgs":data.original.application.extras,
                          "developers":data.original.application.developAccount.extras,                          
                          "admins":(data.original.application.adminAccountIdList).map(function(item, i) {
                                      return item.extras;
                                    })
                        };
            
            method.SetSelected(objs,targets,sources,attrs,datas);
            
            var radios = (function(){
                var cas=data.original.application.casRegisteredService||undefined;
                if (typeof(cas) == "undefined") 
                    return undefined;
                return {
                         "radios":[
                                     {"k": "enableCas","v": "1"},
                                     {"k": "isUserMap","v": (String)(cas.userMap)},
                                     {"k": "isUserMapPass","v": (String)(cas.userMapPass)},
                                     {"k": "ignoreAttributes","v": (String)(cas.ignoreAttributes)}
                                  ]                        
                       }
            }());   
            
            method.SetRadioBtn(form,radios);
            
            var casAttrs = (function(){
                var cas=data.original.application.casRegisteredService||undefined;
                if (typeof(cas) == "undefined") 
                    return undefined;
                var casStr=cas.allowedAttributes;
                if(casStr==null){
                    return undefined;
                }
                return casStr.split(",");              
            }());       
            
            method.SetCheckbox(form,casAttrs);
            
            if (typeof(isOpenPF)=="undefined"||isOpenPF==null) {
                // 防止btn点击失效
                $(document).on("click","#app-details-edit-btn",function(){                          
                    method.ControlEditAbleAppForm(form,data);         
                });  
            }else if(isOpenPF===true){              
                method.ControlEditAbleAppForm(form,data);  
                $("#develop-appmanager-edit-success,#develop-appmanager-edit-cancel").click(function(){
                    method.ShowList("develop-app-show-index");
                });
                $("#develop-appmanager-add-retry").click(function(){
                    $("#first-container").show();
                    $("#second-container,#second-container-success,#second-container-fail").hide();
                });
            }              
            method.InitSelect(form);
        },        
        ValidGeneralConfigPage:function(form){
           var data = { 
                       "valid": true,
                       "postData": {"lists":[]}
                      },          
                      
           postData = data.postData.lists,
           primData = method.FormToJosn(form);
           
           var postData=(function(){
              for(var key in primData){
                 if (!!primData[key]) {
                     var domain={};
                     domain["key"]=key;
                     domain["value"]=primData[key];
                     postData.push(domain);
                 }
              }
            return postData;
           }());
           
           method.RemoveButtonClick(true,form);
           
           return data;
        },       
        ValidGeneralDefaultConfig:function(btns){
            var data ={ 
                        "valid": true,
                        "postData": {
                                      "categoryCode": environ.default.config.categoryCode,
                                      "categoryName": environ.default.config.categoryName
                                    }
                      };
            $.each(btns,function(k,v){
                var btn=$(v),
                    tr =btn.parent().parent(), 
                    identity_name=tr.find("span[data-belong='list.names']").eq(0).text()+": ";
                    data.valid=method.CheckDefaultConfig(tr,identity_name);
                    if (!data.valid) 
                        return false;
                var primData=method.FormToJosn(tr),  
                    tolists=(function(){
                        var domain={};
                        if (data.postData["names"]) {
                            data.postData["names"].push(primData.names[0]);
                        }else{
                            data.postData["names"]=primData.names;
                        }
                        domain["key"]=primData.key;
                        delete primData["names"];
                        delete primData["key"];
                        domain["value"]=JSON.stringify(primData);
                        if (data.postData["lists"]) {
                            data.postData["lists"].push(domain);
                        }else{
                            data.postData["lists"]=[].concat(domain);
                        }
                    }());              
            });           
            return data;
        },
        BatchVaildDefaultConfig:function(form){
            var data ={"valid": false},
                post =null,btns=[],
                checkboxs=form.find("input:checkbox[data-check-type='check-one']:checked")||undefined;
            if (checkboxs.length>0) {
                btns=(function(){
                    $.each(checkboxs,function(k,v){
                        btns.push($(v).parent().parent().find("button[data-component='button']"));
                    });
                    return btns;
                }());
                delete data.valid;
                data=method.ValidGeneralDefaultConfig(btns);
            }else{
                p.alert(environ.message.alert.checkbox.operation);
            }
            return data;
        },
        LoadAddPasswordPolicy:function(form){
            var select=form.find("#custom"),
                radio=form.find(":radio[name='charCombination']").eq(1),
                setDefaultRadio=(function(){
                    radio.attr("checked",true);
                }());
            method.ControlPPSelect(form,select); 
        },                      
        ValidGeneralAppAudite:function(form,pass){
            var data ={ 
                       "valid": true,
                       "postData": method.FormToJosn(form)
                      };
            if (typeof(pass)!='undefined') {
                data.postData["isPass"]=pass;
            }            
            if (data.valid) 
                method.RemoveButtonClick(true,form);
            return data;
        },
        LoadGeneralAppForCheckOrAudite:function(form,data,isAudite){
            var app=data.application,
                allowedAttributes="",               
                setCasMsg=(function(){
                    var cas=app.casRegisteredService||undefined;
                    if (typeof(cas) == "undefined") 
                        return undefined;
                    var casStr=cas.allowedAttributes;
                    if(casStr!=null){
                        $.each(data.casAttrs.items,function(k,v){                       
                            $.each(casStr.split(","),function(m,n){
                                if (v.key==n) {
                                    allowedAttributes=allowedAttributes+v.value+" ,"
                                }
                            });
                        });
                        form.find("[name='allowedAttributes']").text(allowedAttributes.substring(0,allowedAttributes.length-1));    
                    }              
                    if (app.casRegisteredService.userMap==false) {
                        form.find("#cas_step_2").nextAll().hide();
                        form.find("#cas_step_2").parent().nextAll().hide();
                        form.find("[name='userMap']").text(environ.message.radio.no);
                    }else
                        form.find("[name='userMap']").text(environ.message.radio.yes);
                    if (app.casRegisteredService.userMapPass==true) {
                        form.find("[name='userMapPass']").text(environ.message.radio.yes);
                    }else
                        form.find("[name='userMapPass']").text(environ.message.radio.no);
                    if (app.casRegisteredService.ignoreAttributes==true) {
                        form.find("[name='ignoreAttributes']").text(environ.message.radio.yes);
                    }else
                        form.find("[name='ignoreAttributes']").text(environ.message.radio.no);
                }());
                if (app.enableCas!="1") {
                    form.find("#cas_step_1").nextAll().hide();
                    form.find("[name='enableCas']").text(environ.message.radio.no);
                }else
                    form.find("[name='enableCas']").text(environ.message.radio.yes); 
                if(isAudite===true){
                    form.find(":radio[name='pass']").eq(0).attr("checked",true);
                    form.find(":radio[name='pass']").click(function(){
                        var pass=form.find('input[name="pass"]:checked').val();
                        if (pass=="false") 
                            form.find("[name='returnReason']").show();
                        else
                            form.find("[name='returnReason']").hide();
                    });
                } 
        },
        LoadMessageCenter:function(nav){
            nav.find(".messages-titile-bag").each(function(){
                var titile=$(this);
                titile.bind("click",function(){
                    titile.addClass("active");
                    titile.siblings().eq(0).removeClass("active");
                });
            });      
        },
        LoadPwdSetting:function(element,data){
            var form = element.find("form"),
                passMinLength = data.minLength,
                passMaxLength = data.maxLength,
                passCombPolicy = data.charCombination;
            environ.password.passMinLength=passMinLength,
            environ.password.passMaxLength=passMaxLength,
            environ.password.passCombPolicy=passCombPolicy;
            var newPwdInput=form.find("input[name='newPwd']"),
                confirmPwdInput=form.find("input[name='confirmPwd']");
            method.SetPwdStrength(form,passMinLength);
            $.each(environ.check.password,function(name,value){
                if (name.indexOf(passCombPolicy) > -1) {
                    newPwdInput.data("pattern",value).data("customMsg",environ.message.password.charComb_msg[name]);
                    confirmPwdInput.data("pattern",value).data("customMsg",environ.message.password.charComb_msg[name]);
                }
            });
            
            p.utils.BlurFormData(form);

        },
        LoadSecurityInfo:function(data){
            $(".editPwd").click(function(){$("#passwordsetting-li").trigger("click");});          
        },
        VaildGeneralBindCode:function(button,type){
            var time = environ.default.codetime,
                input = button.siblings("input[name='receiver']"),
                receiver = input.val(),
                url = button.data("url"),
                data = {"valid" : false}, 
                regex = environ.check.bind.mail,
                ftlFile = environ.default.email_flt;
            if (type==='mobile') 
                regex=environ.check.bind.phone,ftlFile=environ.default.mobile_flt;                           
            input.trigger('blur');    
            if (!receiver.match(regex))                     
                return data;
            data.valid=true;               
            url = method.UrlAppendParams(method.UrlAppendParams(url, "receiver", receiver),"ftlFile",ftlFile);
            button.data("url",url);
            method.ButtonReSend(button,time);                         
            return data;
        },
        ValidGeneralBindForm:function(element,step){                     
            var data = { 
                      "valid": false,
                      "postData": method.FormToJosn(element)
                };
            if (step=="one") {
                p.utils.BlurFormData(element);
                element.find("input").each(function(){ 
                    $(this).trigger('blur'); 
                });
                if (element.data("validResult")==false) 
                    return data;  
            }                                         
            data.valid=true;
            return data;               
        },
        LoadDevelopCenter:function(nav){
           var role = method.GetUrlParam("role"),
               audite = method.GetUrlParam("audite");               
           if (role == 'biz' && audite == 'app') {
               nav.find('a').each(function(){
                   if ($(this).data('paramData')['mapBean[appstatus]']=='1') 
                       $(this).trigger("click");
               });
               history.pushState({},"develop",window.location.href.replace('role=biz&audite=app&',''));
           }              
        },
        LoadManagerCenter:function(nav){
            var role = method.GetUrlParam("role"),
                audite = method.GetUrlParam("audite");
            if (role == 'sys' && audite == 'app') {
                nav.find('li[data-hash="developmanager-appaudite"]').trigger("click");
                history.pushState({},"develop",window.location.href.replace('role=sys&audite=app&',''));
            }                
        }
      }
                
      _global=(function(){return this||(0,eval)('this');}());
      if (typeof module !== "undefined" && module.exports) {
        module.exports = method;
      } else if (typeof define === "function" && define.amd) {
        define(function(){return method;});
      } else {
        !('method' in _global) && (_global.method = method);
      }
}());