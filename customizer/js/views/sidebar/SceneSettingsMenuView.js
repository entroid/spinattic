define([
    'jquery',
    'underscore',
    'backbone',
    'views/sidebar/SidebarSubMenu',
    'text!templates/sidebar/sceneSettingsMenu.html',
    'mCustomScrollbar',
    'helpers/HelpFunctions',
    'helpers/ManageData',
    'views/sidebar/MapView',
    'views/modal/SingleUploader',


], function($, _, Backbone,SidebarSubMenu,sceneSettingsMenu,mCustomScrollbar,HelpFunctions,ManageData,MapView,SingleUploader){

    var SceneSettingsMenuView = SidebarSubMenu.extend({
        initialize: function () {
        
        },
        events:{

            "keyup #scenetitle":"updateData",
            "keyup #friendlyURL":"updateData",
            "keyup #scene-description":"updateData"
                 },
        
        render: function(){
            var scenedata = $("#tour").data("scene");
            var data = scenedata;
            var compiledTemplate = _.template(sceneSettingsMenu,{data:data});
            $(this.el).append(compiledTemplate ); 

            var elem = this.model.get("elem")
            this.$elem = $("#"+elem);
            this.model.set("elemWidth",this.$elem.width());
            var helpFunctions = new HelpFunctions();
            helpFunctions.setInnerHeight(elem);
            $(window).resize(function(){
            
                    helpFunctions.setInnerHeight(elem);

            });
            
            $("#sceneSettings-menu .inner").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300,
                }); 

            this.show();

            helpFunctions.refreshData();


            var SingleUploaderModel = Backbone.Model.extend({});
            console.log(data)
            var singleUploaderModel = new SingleUploaderModel({myid:"scene-thumbnail-src",imgsrc:data._thumburl})
            var singleUploader = new SingleUploader({model:singleUploaderModel});
            singleUploader.render();


            var mapView = new MapView();
            mapView.render(elem);
            },

        updateData:function(e){
            var manageData = new ManageData();
            manageData.saveSceneOnTour( $("#sceneSettings-menu").data("scenename"),$(e.target).data("obj"),$(e.target).val())
        }

        
    });

    return SceneSettingsMenuView;
    
});
