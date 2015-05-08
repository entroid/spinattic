define([
	'jquery',
	'underscore',
	'backbone',
	'helpers/ManageHotSpots',
	'helpers/HelpFunctions',

], function($, _, Backbone, ManageHotSpots,HelpFunctions){

	var TourView = Backbone.View.extend({
		el: $(".main-section .inner"),
		initialize: function () {

			
		},
		events:{

		},
		render: function(){
			var xmlpath = this.model.get("xmlpath");
			$pano_wrapper = $('<div id="tour"></div>');         
			$(this.el).append( $pano_wrapper ); 

			embedpano({
				swf:"player/tour.swf", 
				xml:xmlpath, 
				target:"tour", html5:"auto", 
				wmode:"transparent", 
				passQueryParameters:true,
				onready:this.initTool

			});
			$(this.el).addClass("withTour")
		},

		initTool:function(){
			var krpano = document.getElementById("krpanoSWFObject");
			krpano.call("registerattribute(int,0)");
			krpano.call("loadscene("+tourData.krpano.scene[0]._name+"),null,MERGE,BLEND(1));");
			$("#tour").data("scene",tourData.krpano.scene[0])
			var helpFunctions = new HelpFunctions()
			helpFunctions.setInnerHeight(".main-section",true);
			var manageHotSpots = new ManageHotSpots();
				
			if($("#tour").data("scene").hotspot){
				krpano.set("events.onloadcomplete","js(initHotSpots())");
				krpano.set("events.keep",true);
			}
			
		}
		
	});

	return TourView;
	
});
