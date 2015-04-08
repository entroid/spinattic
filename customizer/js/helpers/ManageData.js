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

            },

            this.saveSettings = function(e){
                tourData.krpano[$(e.target).data("obj")][$(e.target).data("bind")]=$(e.target).val();
            },

            this.pushSkill = function(skill){
                var first= function(obj) {
                    for (var a in obj) return a;
                }
                var myskill = first(skill);
                if(tourData.krpano[myskill] && skill[myskill]._kind != tourData.krpano[myskill]._kind){
                    if(tourData.krpano[myskill].length == undefined){
                        var items = [];
                        items[0] = tourData.krpano[myskill];
                        tourData.krpano[myskill] = items;
                        tourData.krpano[myskill].push(skill[myskill])
                    }else{
                        tourData.krpano[myskill].push(skill[myskill])                   
                    }
                }else{
                tourData.krpano[myskill] = skill[myskill];
                }
            }

            this.saveServer = function(){

                var jsonstr = JSON.stringify(tourData)
                var id = location.hash.split("/")[1]
                $.ajax({
                    url:'php/updater.php',
                    type:'POST',
                    data:"json="+jsonstr+"&id="+id,
                    success:function(res){
                    }
                })
            }
}

    return ManageData;
    
});
