define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone){

	var ManageData =  function(){

			this.saveSceneOnTour = function(scenename,nodename,newVal,parent){

					_.each(tourData.krpano.scene,function(elem){
					
					if(elem._name == scenename){
						if(!parent){
						elem[nodename] = newVal;
						}else{
						elem[parent][nodename] = newVal;
						}
						$("#tour").data("scene",elem);
						$("#sceneMenu").find("#"+scenename).data("scene",elem);
					}
				})

			}

			this.pushHotspot = function(sceneName,hotspot){

				_.each(tourData.krpano.scene,function(elem){
				if(elem._name == sceneName){
					if(!elem.hotspot){
						elem.hotspot = [];
						elem.hotspot.push(hotspot);
					}else{
						elem.hotspot.push(hotspot);
					}
					$("#sceneMenu #"+elem._name).data("hotspots",elem.hotspot)
				}
			})

			},

			this.changeDataInHotSpot = function(sceneName,hotspot){
				_.each(tourData.krpano.scene,function(elem){
						if(elem._name == sceneName){

								_.each(elem.hotspot,function(hs,ind){
									if(hs._name == hotspot._name){
											elem.hotspot[ind] = hotspot;
										}
								})
						console.log(elem.hotspot)		
						$("#sceneMenu #"+elem._name).data("hotspots",elem.hotspot)
						}
					})
			}

}

	return ManageData;
	
});
