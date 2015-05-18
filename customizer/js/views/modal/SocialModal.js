define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/socialModal.html',
    'helpers/HelpFunctions',
    'socialshare'

], function($, _, Backbone,Modal,SocialModal,HelpFunctions,socialshare){

    var MapModalView = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{
            "click .cancel": "removeModal"
        },
        
        renderExtend:function(){

            var myid = this.myid;
            var template = _.template(SocialModal);
            var helpFunctions = new HelpFunctions();

            $("#"+myid+" .inner-modal").html(template);

            $("#"+myid+" header h2").text("YOUR TOUR IS PUBLISHED!");            

            helpFunctions.checkbox("#"+myid+" .check-group","icon-ok","unchecked"); 

            $('.liveTourModal').socialShare({
                image           : 'image-url',
                twitterVia      : 'ritz078',
                twitterHashTags : 'spinattic,krpano'
            });        

            this.verticalCent();
        }

    });

    return MapModalView;
    
});
