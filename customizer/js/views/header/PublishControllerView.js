define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/header/publishcontrollerview.html',
    'views/modal/LiveTourView',
    'helpers/HelpFunctions'

], function($, _, Backbone, publishcontrollerview, LiveTourView, HelpFunctions){

    var PublishControllerView = Backbone.View.extend({

        el: $(".header-bottom"),

        initialize: function () {
          
        },

        events:{  
            "click header .onoffswitch-label": "openLiveModal"
        },

        render: function(){
            var este = this;
            var compiledTemplate = _.template(publishcontrollerview);
            var helpFunctions = new HelpFunctions();

            $(this.el).append( compiledTemplate );

            $('header .onoffswitch-label').click(function() {
                este.openLiveModal();
            })

            helpFunctions.toolTip("#publishController .onoffswitch", "publish up");
            helpFunctions.toolTip("#publishController .fa-question-circle", "publish up");
            helpFunctions.toolTip("#publishController #publish", "publish up");

        },

        openLiveModal: function () {
            this.liveTourView = new LiveTourView();
                this.liveTourView.render("liveTourModal",this.liveTourView.renderExtend);
        }    
    });

    return PublishControllerView;  
});
