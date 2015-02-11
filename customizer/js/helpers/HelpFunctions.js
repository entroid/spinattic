define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){

  var HelpFunctions =  function(){

   
    this.toolTip = function(obj,myclass){
    	
    	$(obj).mouseover(function(event){

    		if(!$("#tooltip").length){
    		$("body").append('<div id="tooltip">text</div>')
	    	}
    		$tooltip = $("#tooltip");

   	    	eleOffset = $(event.target).offset();
          text = $(event.target).attr("title");
          if($(event.target).attr("id")){
            singleClass = $(event.target).attr("id");
          }else{
            singleClass = "";
          }
        $tooltip.addClass(myclass +" "+ singleClass )
        $tooltip.text(text);
       
				$tooltip.show().css({

						left: eleOffset.left,
            top: eleOffset.top
					});
        $(event.target).removeAttr("title");
       
			}).mouseout(function(event){
				$tooltip.hide()
        $tooltip.removeClass()
        $(event.target).attr("title",text);
			});
    }

    this.capitaliseFirstLetter = function(string){
      return string.charAt(0).toUpperCase() + string.slice(1);
    }


    this.setInnerHeight = function(obj,byClass){

       var  innerHeight = $(window).height()-($("header.main-header").outerHeight()+$("footer.main-footer").outerHeight());
        if(!byClass){
        $("#"+obj +" .inner").height(innerHeight);
        }else{
        $(obj +" .inner").height(innerHeight);
        }
    }

    this.dropDown = function(elem){
      $(elem).find("h2").click(function(e){
        $(this).next("ul").slideToggle();
      })

       $(elem).find("li").click(function(e){
        $(this).closest(elem).find("h2 span.title").text($(e.target).text())
        $(this).closest(elem).find("ul").slideToggle();
       })
    }

    this.checkbox = function(elem,firstClass,secClass){

        $(elem+" li").click(function(){
            $(this).find("span").toggleClass("fa "+firstClass+" fa-lg").toggleClass("fa "+secClass+" fa-lg");
        })

  }

  this.selectChoice = function(elem,firstClass,secClass){
        $(elem+" li").click(function(){
            $(elem+" li").each(function(){
                $(this).find("span").attr("class","fa "+secClass+" fa-lg")
            })
            $(this).find("span").attr("class","fa "+firstClass+" fa-lg")
        })

  }

  this.mapJSONToUriParams=function(data, prefix, call){
    
    prefix = typeof prefix !== 'undefined' ? prefix : "";
    call = typeof call !== 'undefined' ? call : 0;

    var map = [];
    var me = this;
    if( Object.prototype.toString.call( data ) === '[object Array]' ) {

        for (var ik = 0; ik < data.length; ik++){
            map.push(mapJSONToUriParams(data[ik], prefix + "[" + ik + "]", call + 1));
        };
        
    }else if ( Object.prototype.toString.call( data ) === '[object Object]' ) {
        Object.keys(data).map(function(k){
            var sep = "";
            
            //not empty
            if (prefix !== ""){
                
                if (prefix.slice(-1) !== "]"){
                    sep = ":";
                }
            }
            
            map.push(me.mapJSONToUriParams(data[k], prefix + sep + k, call + 1));
        });      
        
    }else{
        map.push(prefix + "=" + encodeURIComponent(data));
    }   
        
    return map.join("&");
}


}

  return HelpFunctions;
  
});
