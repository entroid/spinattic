define([
    'jquery',
    'underscore',
    'backbone',
    'x2js',
    'jqueryui',
    'text!templates/footer/sceneMenu.html',
    'helpers/HelpFunctions',
    'mCustomScrollbar',
    'views/main/TourView',
    'models/main/TourModel',
    'views/sidebar/SceneSettingsMenuView',
    'views/sidebar/ViewSettingsMenuView',
    'helpers/ManageData',
    'helpers/ManageHotSpots',
    'helpers/ManageTour',


], function($, _, Backbone,x2js,jqueryui, bottomMenu,HelpFunctions,mCustomScrollbar,TourView,TourModel,SceneSettingsMenuView,ViewSettingsMenuView,ManageData,ManageHotSpots,ManageTour){

    var SceneMenuView = Backbone.View.extend({
        el: $("footer.main-footer"),
        mycollection:[],
        initialize: function () {
                _.bindAll(this,"openScene")
            
        },
        events:{
            "click #sceneMenu .selector-scene":"removeItem",
            "click #sceneMenu li img":"openScene",
            "click #remove-selected-scene": "removeSelectedScene"   
                 },
        render: function(){
            if(this.collection){
                var jsonObj = this.collection.toJSON();
                this.mycollection = this.collection.toJSON();
            }else{
                var jsonObj = [];
            }

            if($(".main-footer .scene-wrapper").length){
                $(".main-footer .scene-wrapper").remove();
            }
            var compiledTemplate = _.template(bottomMenu,{jsonObj:jsonObj});
            $(this.el).append( compiledTemplate ); 
            
            _.each(jsonObj,function(val,ind){
                $("#sceneMenu li:eq("+ind+")").data("scene",val);
                if(val.hotspot){
                    $("#sceneMenu li:eq("+ind+")").data("hotspots",val.hotspot)
                }
            })

            var helpFunctions = new HelpFunctions();
            helpFunctions.toolTip("#sceneMenu li img","footer");
            var este = this;
            $("#sceneMenu").sortable({
                beforeStop:function(evt,ui){

                    var reloadEverything = function(){
                        var manageTour = new ManageTour();
                        var resetPos = function(){
                            if(!$("#sceneMenu li:eq(0)").hasClass("selected")){
                                $("#sceneMenu li").removeClass("selected");
                                $("#sceneMenu li:eq(0)").addClass("selected");
                               
                            }
                        }
                        var resetElem = function(){
                             helpFunctions.refreshData();
                        }
                    manageTour.reloadTour(resetPos,resetElem)
                    }
                    var manageData = new ManageData();
                    manageData.SaveNewSceneOrder(reloadEverything)

                }
            });

            var liwidth = $("#sceneMenu li").outerWidth();
            var liright = $("#sceneMenu li").css("margin-right");
            liright = parseInt(liright.replace("px",""));
            var liall = liwidth+liright;
            var allwidth = liall * $("#sceneMenu li").length;
            $("#sceneMenu").width(allwidth+20);

            $(".scene-wrapper").mCustomScrollbar({
                            theme:"light",
                            scrollInertia:300,
                            horizontalScroll: true,
                    });
        },

        removeItem:function(e){

            $(e.target).toggleClass("selected")

            if($("#sceneMenu li .selector-scene").hasClass("selected")){
                $("#remove-selected-scene").removeClass("none")
            }else{
                $("#remove-selected-scene").addClass("none")
            }
            /*$(e.target).parent().fadeOut(function(){
                var thisname = $(this).data("scene")._scene_id;
                this.remove();
                var manageData = new ManageData();
                var manageTour = new ManageTour();
                manageData.deleteScene(manageTour.reloadTour,thisname);
                $("#sceneMenu li:eq(0)").addClass("selected")
            })*/
        },

        removeSelectedScene:function(){
            var scenesToDel = []
                $("#sceneMenu li .selector-scene").hasClass("selected")
                _.each($("#sceneMenu li"),function(el,i){
                        if($(el).find(".selector-scene").hasClass("selected")){
                            scenesToDel.push($(el).attr("id"));
                        }
                })

            var manageData = new ManageData();
            manageData.deleteScene(scenesToDel,manageTour.reloadTour);  
        },

        openScene:function(e){

            var helpFunctions = new HelpFunctions();

            $thisli = $(e.target).parent();
            $("#tour").data("scene",$thisli.data("scene"))
            helpFunctions.refreshData();
            var customparam = jQuery.extend({},$thisli.data("scene"));
            console.log(customparam)
            delete customparam.view._segment;
            delete customparam.preview._segment;
            delete customparam.image._segment;
            delete customparam._segment;
            delete customparam.hotspot;
            var krpano = document.getElementById("krpanoSWFObject");
            var param = helpFunctions.mapJSONToUriParams(customparam);
            param = param.replace(/:_/g,".");
            krpano.call("loadscene('"+$thisli.attr("id")+"','"+param+"',MERGE|KEEPCONTROL,BLEND(1));");
            if($thisli.data("hotspots")){
                var manageHotSpots = new ManageHotSpots();
                krpano.set("events.onpreviewcomplete","js(initHotSpots())");
                krpano.set("events.keep",true);
            }
            $("#sceneMenu li").removeClass("selected");
            $thisli.addClass("selected")

            $(".hotspotwindow .save-and-close").trigger("click");
            this.openAsideMenu();

        },

        openAsideMenu: function() {
            var btn = $('aside #sceneSettings');
            console.log(!$(btn).hasClass('selected'))
            if( !$(btn).hasClass('selected') ) {
                $(btn).click();
            }
        }
        
    });

    return SceneMenuView;
    
});
