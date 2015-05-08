define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header/tourtitle.html',
    'helpers/ManageData',
    'helpers/HelpFunctions'
  

], function($, _, Backbone, tourtitle,ManageData, HelpFunctions){

    var TourTitle = Backbone.View.extend({

        el: $(".header-bottom"),

        initialize: function () {
          
        },

        events:{
            "focus #tour-title":"changeTitleByEnter",
            "blur #tour-title":"changeTitleByBlur"
        },

        render: function(){

            var title = tourData.krpano.settings._title
            console.log(title)
            var compiledTemplate = _.template(tourtitle,{title:title});
            $(this.el).append( compiledTemplate );           
            $("#tour-title").data("obj","settings")
            $("#tour-title").data("bind","_title");

            var helpFunctions = new HelpFunctions();
            helpFunctions.toolTip("header .open-live-tour","open-live-tour-tt up");
        },

        changeTitleByEnter:function(e){

        $(window).keydown(function(event){
            if(event.keyCode == 13) {
                $("#tour-title").blur();
              event.preventDefault();
              $(window).unbind("keydown");
              return false;
            }
          });
        },
        changeTitleByBlur:function(e){

             var manageData = new ManageData();
            manageData.saveSettings(e);

        }


    });

    return TourTitle;
  
});
