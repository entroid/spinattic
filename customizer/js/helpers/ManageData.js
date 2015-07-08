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

			this.SaveNewSceneOrder = function(callback){

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
				this.saveServer(callback);
			}

			

			this.deleteSceneFromServer = function(scenes,callB){
					var este = this;
					if(!$("#publishController #draft").hasClass("active")){
						$("#publishController #draft").addClass("active")
					}
					$("#draft .loading-wrapper").show();
					
					var scenesDel = scenes.join('|');
					var jsonstr = JSON.stringify(tourData)
					var accion ="del_scene";
					var mydata = "json="+jsonstr+"&id="+scenesDel+"&action="+accion+"&d=1"
				
				$.ajax({
					url:'php/updater.php',
					type:'POST',
					data:mydata,
					success:function(res){
						console.log("success")
						var res = res;
						$("#sceneMenu .ready-to-del").fadeOut(function(){
							$(this).remove();
							if($("#sceneMenu .ready-to-del").size() == 0){
								var scenestoAdd = []
								_.each($("#sceneMenu li"),function(el,i){
									if($(el).data("scene")){
										var myscene = $(el).data("scene");
										if($(el).data("hotspots")){
											var hotspots = $(el).data("hotspots");
											myscene.hotspots = hotspots;
										}
										scenestoAdd.push(myscene);
									}
								})
								tourData.krpano.scene = scenestoAdd;
								console.log(res)
								callB();
							}
						})
						if(res){
							var res = JSON.parse(res);
							var fecha = res.date;
						}else{
							fecha = "";
						}
						$("#draft .date").text(fecha);
						$("#draft .loading-wrapper").html('<i class="fa fa-check"></i> Draft Saved').delay(1000).fadeOut(function(){
							$("#draft .loading-wrapper").html('<div class="loading"></div>')
						});

					},
					error:function(xhr, ajaxOptions, thrownError){
						console.log(xhr)
					}
				})	
			}

			this.pushHotspot = function(sceneName,hotspot){

				_.each(tourData.krpano.scene,function(elem){
				if(elem._name == sceneName){
					if(!elem.hotspot){
						elem.hotspot = [];
						elem.hotspot.push(hotspot);
						$("#tour").data("scene",elem);
					}else{
						elem.hotspot.push(hotspot);
						$("#tour").data("scene",elem);
					}
					$("#sceneMenu #"+elem._name).data("hotspots",elem.hotspot)
					$("#sceneMenu #"+elem._name).data("scene",elem)
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
				if($(e.target).attr("type") == "checkbox"){
					if($(e.target).is(":checked")){
						valueToInsert = "true";
					}else{
						valueToInsert ="false";
					}
				}else if($(e.target).prop("tagName") == "LI"){
					valueToInsert = $(e.target).data("value")
				}else{
					valueToInsert = $(e.target).val()
				}
				console.log($(e.target))
				tourData.krpano[$(e.target).data("obj")][$(e.target).data("bind")]=valueToInsert;
				this.saveServer();
			},

			this.saveTourData = function(elem,val){
				tourData.krpano.datatour[elem] = val;
				this.saveServer();
			}

			this.pushSkill = function(skill,callback){
				myskill = skill;
				tourData.krpano.skill.push(myskill)
				console.log(tourData.krpano.skill)
				this.saveServer(callback);
			}

			this.editSkill = function(json,callback){
				_.each(tourData.krpano.skill,function(skill,ind){
					if(skill._kind == json._kind){
							tourData.krpano.skill[ind] = json;
						}
				})
				this.saveServer(callback);
			}

			this.removeSkill = function(kind,callback){

				_.each(tourData.krpano.skill,function(skill,ind){
						if(skill._kind == kind){
							tourData.krpano.skill[ind] = null;
							delete tourData.krpano.skill[ind];
							tourData.krpano.skill.splice(ind,1)
						}
				})
				this.saveServer(callback);	
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

			this.removeStyle = function(name){

				console.log(name)
				indexToremove = [];
				_.each(tourData.krpano.style,function(elem,ind){

					var elemname = elem._name;
					var elemray = elemname.split("_");
					
					if(elemray[1] == name){
						indexToremove.push(ind);
					}
				})

				var arr = $.grep(tourData.krpano.style, function(n, i) {
				    return $.inArray(i, indexToremove) ==-1;
				});
				tourData.krpano.style = arr;

				this.saveServer();	
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
				this.saveServer();
			}
			this.resetThumb = function(){
				var id = location.hash.split("/")[1];
				$.ajax({
					url:'php/updater.php',
					type:'POST',
					data:"action=reset_tour_thumb&id="+id,
					success:function(res){
						res = JSON.parse(res)
						$("#live-tour-img-uploader img").attr("src",res.path);
						$("#reset-live-thumb").hide();
					}
				})
			}
			this.saveServer = function(fun,action){
				if(!$("#publishController #draft").hasClass("active")){
					$("#publishController #draft").addClass("active")
				}
				$("#draft .loading-wrapper").show();
				var jsonstr = JSON.stringify(tourData)
				var id = location.hash.split("/")[1];
				var mydata;
				if(action){
					mydata = "json="+jsonstr+"&id="+action.scene_id+"&action="+action.accion+"&d=1"
				}else{
					mydata = "json="+jsonstr+"&id="+id
				}

				$.ajax({
					url:'php/updater.php',
					type:'POST',
					data:mydata,
					success:function(res){
						var res = JSON.parse(res);
						console.log(res)
						console.log(fun)
						if(fun){
							fun()
						}
						$("#draft .loading-wrapper").html('<i class="fa fa-check"></i> Draft Saved').delay(1000).fadeOut(function(){
							$("#draft .loading-wrapper").html('<div class="loading"></div>')
						});
						$("#draft .date").text(res.date);
						console.log(res)
					},
					error:function(xhr, ajaxOptions, thrownError){
						console.log(xhr)
					}
				})
			}
}

	return ManageData;
	
});
