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
            "blur #tour-title":"changeTitleByBlur",
            "keyup #tour-title":"setWidth"
        },

        render: function(){

            var title = tourData.krpano.settings._title,
                widthTestElHtml = "<span id='widthTestEl' class='none'></span>",
                widthEl = $("#widthTestEl");

            var compiledTemplate = _.template(tourtitle,{title:title});
            $(this.el).append( compiledTemplate );           
            $("#tour-title").data("obj","settings");
            $("#tour-title").data("bind","_title");

            //width del input
            if(!widthEl.lenght) {
                $('body').append(widthTestElHtml);
            } 
            this.setWidth();       

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

            //this.setWidth(e.target);            

        },
        setWidth : function() {
            var el = $("#tour-title"),
                elText = $(el).val(),
                widthTestEl = $('#widthTestEl'),                
                widthTest;

            $(widthTestEl).html(elText);                
            widthTest = $(widthTestEl).width();

            $(el).width(widthTest);
        }


    });

    return TourTitle;
  
});
