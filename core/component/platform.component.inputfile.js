/*!
 * 基于bootstrap-fileinput
 * 
 * Pre-requisites:
 * 1.Bootstrap 3.x
 * 2.JQuery
 * 
 * Usage:
 * bootstrap.min.css
 * fileinput.min.css
 * bootstrap.min.js
 * fileinput.min.js
 * theme.js(bootstrap-fileinput/themes/explorer-fa)
 * (lang).js(bootstrap-fileinput/js/locales)
 */
(function($, P) {
  'use strict';
  
  /* FILEINPUT PUBLIC CLASS DEFINITION
   * ==============================*/
  
  var FileUpload=function(element, options, owner){
      this.$element = $(element);
      this.options = $.extend({}, P.fileUpload.defaults, options);
      this.owner = owner;
      return this;      
  }
  
  FileUpload.prototype.init = function(paramData, options) {
      var self = this
         , uploadUrl = self.$element.data("url")
         , initUrl = self.$element.data("init")
         , paramData = self.$element.data("paramData")||{};
         
      options = options || self.options;
      
      if (paramData.type=='string') 
          paramData = $.parseJSON(paramData);  
      
      if (typeof(initUrl)!='undefined') {
          options.initialPreviewAsData=true;        
          options.initialPreview=[initUrl];
          options.initialPreviewConfig=[{caption: "原图片.jpg", size: 329892, width: "120px", url: "{$url}", key: 1}];
      }

      options.uploadUrl = uploadUrl;
      options.uploadExtraData = paramData;
      
      var callback = P.callback.get("fileUpload.init", self.$element);
      if (callback) {
        var r=callback.call(self);
        if (typeof(r) === "object") {
            options = $.extend({}, options, r);
        }
      }          
      
      //core
      self.$element.fileinput(options);       
      
      //控件初始化成功后回调
      var callback = P.callback.get("fileUpload.load", self.$element);
      if (callback) {
        callback.call(self);      
      }     
      
      //异步上传成功结果处理
      self.$element.on('fileuploaded', function(event, data, previewId, index) {
          var callback = P.callback.get("fileUpload.fileuploaded", self.$element);
          if (callback) {
              callback.call(self,data);         
          }
      });
      
      //异步上传失败结果处理
      self.$element.on('fileerror', function(event, data, msg) {
          var callback = P.callback.get("fileUpload.fileerror", self.$element);
          if (callback) {
              callback.call(self,data);         
          }
      });
      
      //同步上传成功结果处理
      self.$element.on('filebatchuploadsuccess', function(event, data, previewId, index) {         
          var callback = P.callback.get("fileUpload.filebatchuploadsuccess", self.$element);
          if (callback) {
              callback.call(self,data);         
          }
      });
      
      //同步上传成功失败处理
      self.$element.on('filebatchuploaderror', function(event, data, msg) {         
          var callback = P.callback.get("fileUpload.filebatchuploaderror", self.$element);
          if (callback) {
              callback.call(self,data);         
          }
      });
      
      //清除文件
      self.$element.on('fileclear', function(event, data, msg) {            
          var callback = P.callback.get("fileUpload.fileclear", self.$element);
          if (callback) {
              callback.call(self);         
          }
      });
      
      //选择文件后处理事件
      self.$element.on('filebatchselected', function(event, files) {         
          var callback = P.callback.get("fileUpload.filebatchselected", self.$element);
          if (callback) {
              callback.call(self,files);         
          }
      });
      
  }
  
  
  /* FILEINPUT PUBLIC CLASS DEFINITION
   * ==============================*/
  
  var old = p.fileUpload;
  P.fileUpload=function(element, option, paramData, owner){
      return element.each(function () {
          var $this = $(this)
            , component = $this.data('fileUpload')
            , options = typeof option == 'object' && option;
          if (!component)
             $this.data('fileUpload', (component = new FileUpload(this, options, owner)));
          component.init(paramData);
      });
  }
  
  P.fileUpload.defaults = {
          language : 'zh', 
          theme : 'fa',
          uploadUrl : null,
          allowedFileExtensions : [ 'jpg', 'png', 'gif', 'bmp','jpeg' ],
          overwriteInitial : false,
          initialPreviewAsData: false,
          initialPreview: [],
          maxFilesNum : 1,
          maxFileSize : 102400,          
          uploadAsync : false,
          showPreview : false,            
          uploadExtraData :null, 
          initialPreviewShowDelete : false,
          initialPreviewConfig: [],
          slugCallback : function (filename) {
              return filename.replace('(', '_').replace(']', '_');
          }
  };
  
  P.fileUpload.Constructor = FileUpload;
  
  
  /* FILEINPUT NO CONFLICT
   * ==============================*/
  P.fileUpload.noConflict = function () {
      P.fileUpload = old;
      return this;
  };


})(jQuery, SWPlatform);
