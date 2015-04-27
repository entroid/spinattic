define([
	'jquery',
	'underscore',
	'backbone',
	'x2js',
  	'models/main/TourModel',
  	'views/main/TourView',
  	'views/footer/SceneMenuView',
  	'collections/footer/SceneCollection',
 
], function($, _, Backbone,x2js,TourModel,TourView,SceneMenuView,SceneCollection){

  var ManageTour =  function(){


		this.reloadTour = function(tourId){

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

						if(tourData.krpano.scene.length == undefined){
								var escenas = [];
								escenas[0] = tourData.krpano.scene;
								tourData.krpano.scene = escenas
						}

						_.each(tourData.krpano.scene,function(scene,ind){
						if(scene.hotspot){
									if(scene.hotspot.length == undefined){
										var myhp = []
										myhp[0] = scene.hotspot;
										tourData.krpano.scene[ind].hotspot = myhp;
									}
								}
						})

						if(tourData.krpano.skill.length == undefined){
							var capacidad = [];
							capacidad[0] = tourData.krpano.skill;
							tourData.krpano.skill = capacidad
						}

						$.ajax({
								url:  "data/json.php?id="+tourId+"&d=1&t=t",
								dataType:"json",
								success:function(datatour){

										tourData.krpano.datatour = datatour;
										var xml2krpano = xmlpath.replace("&c=1","&h=0")
										var tourModel = new TourModel({xmlpath:xml2krpano});

										var tourView = new TourView({ model: tourModel});
										tourView.render();
										var scenes = tourData.krpano.scene;
										var sceneCollection = new SceneCollection(scenes);
										var sceneMenuView = new SceneMenuView({ collection: sceneCollection});
										sceneMenuView.render();
								}
						})
				}
		});

	}

	
	
}

  return ManageTour;
  
});
