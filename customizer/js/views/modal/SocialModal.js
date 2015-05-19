define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/socialModal.html',
    'helpers/HelpFunctions',
    'socialshare'

], function($, _, Backbone,Modal,socialModal,HelpFunctions,socialshare){

    var SocialModal = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{
            "click .cancel": "removeModal"
        },
        
        renderExtend:function(){

            var myid = this.myid;
            var template = _.template(socialModal);
            var helpFunctions = new HelpFunctions();

            $("#"+myid+" .inner-modal").html(template);

            $("#"+myid+" header h2").text("YOUR TOUR IS PUBLISHED!");            

            helpFunctions.checkbox("#"+myid+" .check-group","fa-check","unchecked");

            this.verticalCent();

            /*$('.check-group').socialShare({
                image           : 'image-url',
                twitterVia      : 'ritz078',
                twitterHashTags : 'spinattic,krpano'
            }); */
            $('.csbuttons').cSButtons();
        }

    });

    return SocialModal;
    
});
