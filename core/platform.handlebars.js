
Handlebars.registerHelper('formatDate', function(format, date) {
  var isNum = false;
  if (typeof date == "string") {
	  var re = /\d*/i;
	  var r = date.match(re);
	  var isNum = r == date;
  } else if (typeof date == "number") {
    isNum = true;
  } else {
	  date = new Date().getTime();
  }

  var d = new Date();
  if (isNum) {
    d = new Date(parseInt(date));
  } else {
    d = new Date(date);
  }

  var fmt = format;
  var o = {
    "M+" : d.getMonth() + 1, // 月份
    "d+" : d.getDate(), // 日
    "h+" : d.getHours(), // 小时
    "m+" : d.getMinutes(), // 分
    "s+" : d.getSeconds(), // 秒
    "q+" : Math.floor((d.getMonth() + 3) / 3), // 季度
    "S" : d.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for ( var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  }

  return fmt;
});

Handlebars.registerHelper('hash', function(hash) {
  return "#"+hash;
});

Handlebars.registerHelper('equals', function(v1, v2, options) {
  if (v1 == v2) {
    return options.fn({});
  } else {
	return options.inverse({});
  }

  return "";
});

Handlebars.registerHelper('size', function(items) {
    if ($.isArray(items)) {
        return items.length;
    }
    return 1;
});

Handlebars.registerHelper('controlText', function(text,targets) {
    if (text.length > targets) 
        text = text.substring(0,targets)+"...";
    return text;
});

Handlebars.registerHelper('arrayToString', function(items,key) {
    if ($.isArray(items)&&items.length>0) {
        var text="";
        $.each(items,function(k,v){
            text=text+v[key]+" ,";
        });
        return text.substring(0,text.length-1);      
    }
    return null;
});


Handlebars.registerHelper('content', function(items,key,val,target) {
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
});



Handlebars.registerHelper('pager', function(pageIndex, totalItems, totalPages, itemsPerPage, options) {
	var ret = "";
	  
	  var startP = 0;
	  var endP = totalPages-1;
	  
	  if (totalPages > 5) {
		  if (pageIndex >= 2 && pageIndex <= (totalPages-1 -2)) {
			  startP = pageIndex - 2;
			  endP = pageIndex + 2
		  } else if (pageIndex < 2) {
			  endP = 4;
		  } else if (pageIndex > (totalPages-1 -2)) {
			  startP = totalPages-1 -4;
		  }
	  }
	  
	  for (var p = startP; p <= endP; p++) {
	    if (p == pageIndex) {
	      ret += options.fn({"pageIndex": p, "pageTitle": p+1, "selected": "selected", "active": "active"});
	    } else {
	      ret += options.fn({"pageIndex": p, "pageTitle": p+1});
	    }
	  }

	  return ret;
});

Handlebars.registerHelper('selector', function(items, itemsPerPage, options) {
  var jsonItems = [];
  if (typeof items == "string")
    jsonItems = eval("("+items+")");

  var ret = "";
  for (var i = 0; i < jsonItems.length; i++) {
    var v = jsonItems[i];
    if (typeof v == "string" || typeof v == "number") {
      if (v == itemsPerPage) {
        ret += options.fn({"name": v,"value": v, "selected": "selected='selected'"});
      } else {
        ret += options.fn({"name": v,"value": v});
      }
    }
  }

  return ret;
});

Handlebars.registerHelper('loopPager', function(pageIndex, totalItems, totalPages, itemsPerPage, options) {
	  var ret = "";
	  var showPage=5;
	  var pageIndex=parseInt(pageIndex);
	  if(totalPages<=showPage){
		  for (var p = 0; p < totalPages; p++) {
	      if (p == pageIndex) {
		       ret += options.fn({"pageIndex": p, "pageTitle": p+1, "selected": "selected", "active": "active"});
		       } else {
		       ret += options.fn({"pageIndex": p, "pageTitle": p+1});
		      }
		  }
	  }else{
		  if(pageIndex<=Math.floor(showPage/2)){
			  for(var p=0;p<showPage;p++) {
			      if (p == pageIndex) {
				       ret += options.fn({"pageIndex": p, "pageTitle": p+1, "selected": "selected", "active": "active"});
				       } else {
				       ret += options.fn({"pageIndex": p, "pageTitle": p+1});
				      }
			  }
			 // ret +="<li class=\"disabled \"><a href=\"#\">...</a></li>";
		  }else{
			  if(pageIndex >=totalPages-Math.floor(showPage/2)-1)
				  {
				//  ret +="<li class=\"disabled \"><a href=\"#\">...</a></li>";
				  for (var p = totalPages-showPage; p < totalPages; p++) {
				      if (p == pageIndex) {
					       ret += options.fn({"pageIndex": p, "pageTitle": p+1, "selected": "selected", "active": "active"});
					       } else {
					       ret += options.fn({"pageIndex": p, "pageTitle": p+1});
					      }
					  }
				  }
			  else{
			  // ret +="<li class=\"disabled \"><a href=\"#\">...</a></li>";
		       for (var p = pageIndex-Math.floor(showPage/2); p < pageIndex+Math.ceil(showPage/2); p++) { 
		       if (p == pageIndex) {
			       ret += options.fn({"pageIndex": p, "pageTitle": p+1, "selected": "selected", "active": "active"});
			       } else {
			       ret += options.fn({"pageIndex": p, "pageTitle": p+1});
			      }
			   }
		       // ret +="<li class=\"disabled \"><a href=\"#\">...</a></li>";
			  }
		  }
	  }
	  return ret;
});
Handlebars.registerHelper('pageSelector', function(pageIndex, totalPages, options) {
  var tp=parseInt(totalPages);
  var ret = "";
  for (var i = 0; i <tp; i++) {
		  if(i==pageIndex)
			  ret +=options.fn({"name": (i+1)+"/"+totalPages,"value": i, "selected": "selected='selected'"});
		  else
			  ret +=options.fn({"name": (i+1)+"/"+totalPages,"value": i });
	  }
	  return ret;
});

Handlebars.registerHelper('endsWith', function(value, suffix, options) {
  
  // 针对有些浏览器（如ie11）不支持endsWith方法
  if (typeof String.prototype.endsWith !== 'function') {
      String.prototype.endsWith = function(suffix) {
          return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };
  }
  
  if (value.endsWith(suffix)) {
    return options.fn({});
  } else {
    return options.inverse({});
  }
});

Handlebars.registerHelper('compare', function(left, operator, right, options) {
    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }
    var operators = {
      '==':     function(l, r) {return l == r; },
      '===':    function(l, r) {return l === r; },
      '!=':     function(l, r) {return l != r; },
      '!==':    function(l, r) {return l !== r; },
      '<':      function(l, r) {return l < r; },
      '>':      function(l, r) {return l > r; },
      '<=':     function(l, r) {return l <= r; },
      '>=':     function(l, r) {return l >= r; },
      'typeof': function(l, r) {return typeof l == r; }
    };

    if (!operators[operator]) {
      throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
    }

    var result = operators[operator](left, right);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
});


Handlebars.registerHelper('range', function(minimum, maximum, operator, options) {
    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper "range" needs 3 parameters');
    }

    var range = function(minimum, maximum, operator){
        if (typeof operator == "string") 
          operator=parseInt(operator);
        if (operator >= minimum && operator <= maximum) 
            return true;
        else 
            return false;
    }
    
    var result = range(minimum, maximum, operator);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
    
});


Handlebars.registerHelper('operate', function(left, operator, right, options) {
    if (arguments.length < 3) {
      throw new Error('Handlerbars Helper "compare" needs 2 parameters');
    }
    var operators = {
      '+':     function(l, r) {return l + r; },
      '-':     function(l, r) {return l - r; },
      '*':     function(l, r) {return l * r; },
      '/':     function(l, r) {  if(r != 0) return l / r;  else{ throw new Error('Divisor can not Be zero'); } }
    };

    if (!operators[operator]) {
      throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
    }
    left=Number(left);
    right=Number(right);
    var result = operators[operator](left, right);

    return result;
});
