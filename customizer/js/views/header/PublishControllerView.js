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
            "click #onoffswitchpub": "openLiveModal"
        },

        render: function(){
            var este = this;
            var compiledTemplate = _.template(publishcontrollerview);
            var helpFunctions = new HelpFunctions();

            $(this.el).append( compiledTemplate );

            if ($('#onoffswitchpub').is(":checked")) {
                helpFunctions.toolTip("#publishController .onoffswitch", "publish up");
            }
            helpFunctions.toolTip("#publishController .fa-question-circle", "publish up");
            helpFunctions.toolTip("#publishController #publish", "publish up");

            //avoid tooltip bubble up
            $("#publishController .onoffswitch .onoffswitch-inner").mouseenter(function(e){
                e.stopPropagation();
            });

        },

        openLiveModal: function(e) {
            var helpFunctions = new HelpFunctions();

            if($(e.target).is(":checked")){
                this.liveTourView = new LiveTourView();
                this.liveTourView.render("liveTourModal",this.liveTourView.renderExtend);
                helpFunctions.toolTip("#publishController .onoffswitch", "publish up");
            } else {
                $('#publishController .onoffswitch').unbind('mouseenter');
            }
        }    
    });

    return PublishControllerView;  
});
