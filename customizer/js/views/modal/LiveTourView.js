define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/liveTour.html',
    'helpers/HelpFunctions'

], function($, _, Backbone,Modal,LiveTour, HelpFunctions){

    var MapModalView = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{
        },
        
        renderExtend:function(){

            var myid = this.myid;

            $("#"+myid+" header h2").text("GO LIVE!");

            //$("#"+myid).find(".save-and-close").unbind("click");
            //$("#"+myid).find(".save-and-close").click(this.doneEdition);
            var helpFunctions = new HelpFunctions();
            var template = _.template(LiveTour);

            $("#"+myid+" .inner-modal").html(template);         
            
            helpFunctions.checkbox(".check-group","fa-check-square-o","fa-square-o");
            helpFunctions.dropDown(".dd-liveTour", "h3");

            this.verticalCent();

            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });
        }

    });

    return MapModalView;
    
});
