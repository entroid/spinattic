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
    'helpers/ManageHotSpots'

], function($, _, Backbone,x2js,jqueryui, bottomMenu,HelpFunctions,mCustomScrollbar,TourView,TourModel,SceneSettingsMenuView,ViewSettingsMenuView,ManageData,ManageHotSpots){

    var SceneMenuView = Backbone.View.extend({
        el: $("footer.main-footer"),
        mycollection:[],
        initialize: function () {
                _.bindAll(this,"openScene")
            
        },
        events:{
            "click #sceneMenu .fa-close":"removeItem",
            "click #sceneMenu li":"openScene"     
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
        
            $("#sceneMenu").sortable({
                beforeStop:function(evt,ui){

                    var manageData = new ManageData();
                    manageData.SaveNewSceneOrder()

                }
            });

            liwidth = $("#sceneMenu li").outerWidth();
            liright = $("#sceneMenu li").css("margin-right");
            liright = parseInt(liright.replace("px",""));
            liall = liwidth+liright;
            allwidth = liall * $("#sceneMenu li").length;
            $("#sceneMenu").width(allwidth+20);

            $(".scene-wrapper").mCustomScrollbar({
                            theme:"light",
                            scrollInertia:300,
                            horizontalScroll: true,
                    });
        },

        removeItem:function(e){
            $(e.target).parent().fadeOut(function(){
                var thisname = $(this).data("scene")._scene_id;
                this.remove();

                if($("#tour").data("scene")._scene_id == thisname){
                    $("#sceneMenu li:eq(0) img").trigger("click");
                }

                var manageData = new ManageData();
                manageData.SaveNewSceneOrder()
            })
        },

        openScene:function(e){

            var helpFunctions = new HelpFunctions();

            $thisli = $(e.target).parent();
            $("#tour").data("scene",$thisli.data("scene"))
            helpFunctions.refreshData();
            var customparam = jQuery.extend({},$thisli.data("scene"));
            delete customparam.view._segment;
            delete customparam.preview._segment;
            delete customparam.image._segment;
            delete customparam._segment;
            delete customparam.hotspot;
            var krpano = document.getElementById("krpanoSWFObject");
            var param = helpFunctions.mapJSONToUriParams(customparam);
            param = param.replace(/:_/g,".");
            krpano.call("loadscene('"+$thisli.attr("id")+"','"+param+"');");
            if($thisli.data("hotspots")){

                var manageHotSpots = new ManageHotSpots();
                krpano.set("events.onpreviewcomplete","js(initHotSpots())");
                krpano.set("events.keep",true);
            }
            $("#sceneMenu li").removeClass("selected");
            $thisli.addClass("selected")

            $(".hotspotwindow .save-and-close").trigger("click");

            console.log('entra')

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
