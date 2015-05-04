define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/liveTour.html',

], function($, _, Backbone,Modal,LiveTour){

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

            var template = _.template(LiveTour);

            $("#"+myid+" .inner-modal").html(template);
            
            /*var liveTourView = new LiveTourView({model:mapModel});
            liveTourView.render(myid);*/

            this.verticalCent();
            /*$(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });*/
        }

    });

    return MapModalView;
    
});
