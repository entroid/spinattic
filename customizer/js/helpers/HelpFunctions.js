define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){

  var HelpFunctions =  function(){

   
    this.toolTip = function(obj,myclass){
      var el, text, $tooltip;
    	
    	$(obj).mouseenter(function(event){

    		if(!$("#tooltip").length){
    		  $("body").append('<div id="tooltip">text</div>')
	    	}

    		$tooltip = $("#tooltip");        
        el = $(event.target);
        text = $(el).attr("title");

 	    	var eleOffset = $(el).offset(),            
          elWidth = $(el).outerWidth(),
          ttWidth,
          leftP;

        $(el).removeAttr("title");

        if($(el).attr("id")){
          singleClass = $(el).attr("id");
        }else{
          singleClass = "";
        }

        $tooltip.addClass(myclass +" "+ singleClass ).text(text); 

        ttWidth = $tooltip.outerWidth();
        leftP = (eleOffset.left) + (elWidth - ttWidth) / 2;              
       
				$tooltip.css({
						left: leftP,
            top: eleOffset.top
					}).show();        
       
			}).mouseleave( function( event ){
				$tooltip.hide();
        $tooltip.removeClass();
        $(el).attr("title",text);
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
        $(elem).click(function(){
            $(elem).each(function(){
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


this.refreshData = function(){
  if($("#viewSettings-menu").length){
      var scenedata = $("#tour").data("scene");
      $("#viewSettings-menu").data("scenename",scenedata._name)
      $("#viewSettings-menu #hor").val(scenedata.view._hlookat)
      $("#viewSettings-menu #hor").data("obj","_hlookat")
      $("#viewSettings-menu #vert").val(scenedata.view._vlookat)
      $("#viewSettings-menu #vert").data("obj","_vlookat")
      $("#viewSettings-menu #fov").val(scenedata.view._fov)
      $("#viewSettings-menu #fov").data("obj","_fov")
      $("#viewSettings-menu #fov-min").val(scenedata.view._fovmin)
      $("#viewSettings-menu #fov-min").data("obj","_fovmin")
      $("#viewSettings-menu #fov-max").val(scenedata.view._fovmax)
      $("#viewSettings-menu #fov-max").data("obj","_fovmax")
      $("#viewSettings-menu #max-zoom").val(scenedata.view._maxpixelzoom)
      $("#viewSettings-menu #max-zoom").data("obj","_maxpixelzoom")
      
      }

      if($("#sceneSettings-menu").length){
        var scenedata = $("#tour").data("scene");
        $("#sceneSettings-menu").data("scenename",scenedata._name)
        $("#sceneSettings-menu #scenetitle").val(scenedata._title)
        $("#sceneSettings-menu #scenetitle").data("obj","_title")
        $("#sceneSettings-menu #filename").val(scenedata.filename)
        $("#sceneSettings-menu #friendlyURL").val(scenedata._urlname)
        $("#sceneSettings-menu #friendlyURL").data("obj","_urlname")
        $("#sceneSettings-menu figure img").attr("src",scenedata._thumburl);
        $("#sceneSettings-menu .latFld").val(scenedata._lat);
        $("#sceneSettings-menu .latFld").data("obj","_lat");
        $("#sceneSettings-menu .lngFld").val(scenedata._lng);
        $("#sceneSettings-menu .lngFld").data("obj","_lng");
        $("#sceneSettings-menu #scene-description").val(scenedata._description);
        $("#sceneSettings-menu #scene-description").data("obj","_description");

      }
}

}

  return HelpFunctions;
  
});
