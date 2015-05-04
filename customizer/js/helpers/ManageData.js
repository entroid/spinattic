define([
	'jquery',
	'underscore',
	'backbone',
   'helpers/ManageTour',
], function($, _, Backbone,ManageTour){

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

				this.saveServer();      
			}

			this.SaveNewSceneOrder = function(){

				var scenes = []
					_.each($("#sceneMenu li"),function(el,i){
						if($(el).data("scene")){
							var scene = $(el).data("scene");
							if($(el).data("hotspots")){
								var hotspots = $(el).data("hotspots");
								scene.hotspots = hotspots;
							}
							scenes.push(scene);
						}
					})
					tourData.krpano.scene = scenes;
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
				this.saveServer();
			},

			this.changeDataInHotSpot = function(sceneName,hotspot){
				_.each(tourData.krpano.scene,function(elem){
						if(elem._name == sceneName){

								_.each(elem.hotspot,function(hs,ind){
									if(hs._name == hotspot._name){
											elem.hotspot[ind] = hotspot;
										}
								})
						$("#sceneMenu #"+elem._name).data("hotspots",elem.hotspot)
						}
					})
				this.saveServer();
			},

			this.removeHotSpot = function(sceneName,hotspotname){
				_.each(tourData.krpano.scene,function(elem){
						if(elem._name == sceneName){

								_.each(elem.hotspot,function(hs,ind){
									if(hs._name == hotspotname){
											elem.hotspot[ind] = null;
											delete elem.hotspot[ind];
											elem.hotspot.splice(ind,1)
										}
								})
							$("#sceneMenu #"+elem._name).data("hotspots",elem.hotspot)
					
							if(elem.hotspot[0] === undefined){
									delete elem.hotspot;
									$("#sceneMenu #"+elem._name).removeData("hotspots")
							}
						}
					})
				this.saveServer();
			},

			this.saveSettings = function(e){
				tourData.krpano[$(e.target).data("obj")][$(e.target).data("bind")]=$(e.target).val();
			},

			this.saveTourData = function(elem,val){
				tourData.krpano.datatour[elem] = val;
			}

			this.pushSkill = function(skill,callback){
				/*var first= function(obj) {
					for (var a in obj) return a;
				}
				var myskill = first(skill);
				*/
				/*if(tourData.krpano[myskill] && skill[myskill]._kind != tourData.krpano[myskill]._kind){
					console.log(skill)
					
					
						tourData.krpano[myskill].push(skill[myskill])                   
					
				}else{
				tourData.krpano[myskill] = skill[myskill];
				}*/
				myskill = skill;
				console.log(myskill)
				tourData.krpano.skill.push(myskill)
				console.log(tourData.krpano.skill)
				this.saveServer(callback);
			}

			this.removeSkill = function(kind){

				_.each(tourData.krpano.skill,function(skill,ind){
						if(skill._kind == kind){
							tourData.krpano.skill[ind] = null;
							delete tourData.krpano.skill[ind];
							tourData.krpano.skill.splice(ind,1)
						}
				})
				this.saveServer();	
			}

			this.pushStyle = function(json){

				var equal = false;
				_.each(tourData.krpano.style,function(elem,ind){
					if(elem._name == json._name){
						console.log("se da la condicion")
						tourData.krpano.style[ind] = json;
						equal = true;
					}
				})
				if(!equal){
				tourData.krpano.style.push(json);
				}
			}

			this.mapData = function(lat, lng, sceneIndex){
				console.log(sceneIndex)
				if(sceneIndex != undefined){
					tourData.krpano.scene[sceneIndex]._lat = lat;
					tourData.krpano.scene[sceneIndex]._lng = lng;
					$("#sceneMenu li:eq("+sceneIndex+")").data("scene")._lat = lat;
					$("#sceneMenu li:eq("+sceneIndex+")").data("scene")._lng = lng;
				}else{
					tourData.krpano.settings._lat = lat;
					tourData.krpano.settings._long = lng;
				}
			}

			this.saveServer = function(fun){

				var jsonstr = JSON.stringify(tourData)
				var id = location.hash.split("/")[1]
				$.ajax({
					url:'php/updater.php',
					type:'POST',
					data:"json="+jsonstr+"&id="+id,
					success:function(res){
						if(fun){
							fun()
						}
						console.log(res)
					}
				})
			}
}

	return ManageData;
	
});
