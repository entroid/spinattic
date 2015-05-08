define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/liveTour.html',
    'helpers/HelpFunctions',
    'views/modal/SingleUploader',
    'views/sidebar/MapView'

], function($, _, Backbone,Modal,LiveTour, HelpFunctions,SingleUploader,MapView){

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

            var SingleUploaderModel = Backbone.Model.extend({});
            var singleUploaderModel = new SingleUploaderModel({myid:"live-tour-img-uploader",imgsrc:"imgUrl",tour_id:"tourId"})
            
            var singleUploader = new SingleUploader({model:singleUploaderModel});
            singleUploader.render();

            var MapModel = Backbone.Model.extend({});
            var mapModel = new MapModel({lat:"data._lat",lng:"data._lng"})
            
            this.mapView = new MapView({model:mapModel});
            var indice = $("#sceneMenu .selected").index();
            var param = "scene";

            this.mapView.render("elem",{param:param,indice:indice});

            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });
        }

    });

    return MapModalView;
    
});
