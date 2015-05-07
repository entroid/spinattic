define([
	'jquery',
	'underscore',
	'backbone',
	'x2js',
	'helpers/HelpFunctions',
	'helpers/ManageHotSpots',
    'views/footer/SceneMenuView',
    'collections/footer/SceneCollection',

 
], function($, _, Backbone,x2js,HelpFunctions,ManageHotSpots,SceneMenuView,SceneCollection){

  var ManageTour =  function(){


		this.reloadTour = function(escenas){

		console.log(escenas)	
		var tourId = location.hash.split("/")[1];
		var xmlpath ="data/xml.php?id="+tourId+"&d=1&c=1";


		$(".dragger-wrapper").fadeOut(function(){
			 $(this).remove();
		})

		$("#tour").remove();

		$.ajax({
				url: xmlpath,
				type: "GET",
				dataType: "html",

				success: function(data) {
						var x2js = new X2JS({attributePrefix:"_"});
						tourData =  x2js.xml_str2json( data );
						var helpFunctions = new HelpFunctions()
						helpFunctions.prepareConditionsForTour();

						$.ajax({
								url:  "data/json.php?id="+tourId+"&d=1&t=t",
								dataType:"json",
								success:function(datatour){

										tourData.krpano.datatour = datatour;
										var xml2krpano = xmlpath.replace("&c=1","&h=0")

										if(escenas != undefined){
											escenas();
										}
										
										$pano_wrapper = $('<div id="tour"></div>');         
										$(".main-section .inner").append( $pano_wrapper ); 
										embedpano({
											swf:"player/tour.swf", 
											xml:xml2krpano, 
											target:"tour", html5:"auto", 
											wmode:"transparent", 
											passQueryParameters:true,
											onready:function(){
												var krpano = document.getElementById("krpanoSWFObject");
												krpano.call("registerattribute(int,0)");
												krpano.call("loadscene("+tourData.krpano.scene[0]._name+"),null,MERGE,BLEND(1));");
												$("#tour").data("scene",tourData.krpano.scene[0])
												
												helpFunctions.setInnerHeight(".main-section",true);

												if($("#tour").data("scene").hotspot){
													setTimeout(function(){
														initHotSpots();
												},2000)
													
												}
											}

										});
										$(".main-section .inner").addClass("withTour")

										
								}
						})
				}
		});

	}

	
	
}

  return ManageTour;
  
});
