define([
	'jquery',
	'underscore',
	'backbone',
	'lib/krpano/embedpano',
	'text!templates/main/setStartup.html',

], function($, _, Backbone, userview,setStartup){

	var TourView = Backbone.View.extend({
		el: $(".main-section .inner"),
		initialize: function () {

			
		},
		events:{

		},
		render: function(){
			var xmlpath = this.model.get("xmlpath");
			$pano_wrapper = $('<div id="tour"></div>');
			$(this.el).append( setStartup ); 
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
			krpano.call("loadscene("+tourData.krpano.scene[0]._name+"),null,MERGE,BLEND(1));");
			$("#tour").data("scene",tourData.krpano.scene[0])
		}
		
	});

	return TourView;
	
});
