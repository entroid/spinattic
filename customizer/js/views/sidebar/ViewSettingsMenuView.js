define([
    'jquery',
    'underscore',
    'backbone',
    'views/sidebar/SidebarSubMenu',
    'text!templates/sidebar/viewSettingsMenu.html',
    'helpers/ManageData',
    'helpers/HelpFunctions',
    'text!templates/main/setStartup.html'

], function($, _, Backbone, SidebarSubMenu, viewSettingsMenu, ManageData, HelpFunctions, setStartup){

    var ViewSettingsMenuView = SidebarSubMenu.extend({
        
        initialize: function () {
        
        },
        events:{
            "change #viewSettings-menu input":"changeValuePano"
        },
        
        render: function(){
            var compiledTemplate = _.template(viewSettingsMenu);
            $(this.el).append( compiledTemplate );             

            this.$elem = $("#"+this.model.get("elem"));
            this.model.set("elemWidth",this.$elem.width());
            
            this.$elem.append( setStartup ); 
            this.show();
            
            var helpFunctions = new HelpFunctions();
            helpFunctions.refreshData();
        },

        changeValuePano:function(e){
            myid = $(e.target).attr("id");
            console.log(myid)
            var param = ""
            switch(myid){
                case "fov":
                param = "fov"
                break;
                case "max-zoom":
                param = "maxpixelzoom"
                break;
                case "fov-max":
                param = "fovmax"
                break;
                case "fov-min":
                param = "fovmin"
                break;
                case "hor":
                param = "hfov"
                break;
                case "vert":
                param = "vfov"
                break;
            }
            krpano = document.getElementById("krpanoSWFObject");
            krpano.set("view."+param,$("#"+myid).val())
            this.updateData(e);
        },

        updateData:function(e){

            var manageData = new ManageData();
            manageData.saveSceneOnTour($("#viewSettings-menu").data("scenename"),$(e.target).data("obj"),$(e.target).val(),"view")
        }

        
    });

    return ViewSettingsMenuView;
    
});
