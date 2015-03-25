define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/addFromPanosManager.html' 

], function($, _, Backbone,Modal,addFromPanosManager){

    var AddFromPanosManager = Modal.extend({
        
        initialize: function () {
            _.bindAll(this);        
            _.extend(this.events, Modal.prototype.events);
            
        },

        events:{
        },

        renderExtend: function() {

            var myid = this.myid;
            var template = _.template(addFromPanosManager);

            $("#"+myid+" .inner-modal").html(template);
            console.log('antra')

            $("#"+myid+" header h2").text("Add panos to this tour from Pano files manager:");

            this.verticalCent();

            /*$(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });*/
        }

    });

    return AddFromPanosManager;

});
