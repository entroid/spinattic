define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/liveTour.html',
    'helpers/HelpFunctions',
    'views/modal/SingleUploader',
    'views/sidebar/MapView',
    'views/modal/SocialModal',
    'lib/tagsinput/tagsinput',
    'helpers/ManageData'
], function($, _, Backbone,Modal,LiveTour, HelpFunctions,SingleUploader,MapView,SocialModal,tagsinput,ManageData){

    var MapModalView = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{
            "click #reset-live-thumb":"resetThumb"
        },
        
        renderExtend:function(){

            var myid = this.myid;

            $("#"+myid+" header h2").text("GO LIVE!");

            var tourInfo = {
                settings:tourData.krpano.settings,
                datatour:tourData.krpano.datatour
            }

            var helpFunctions = new HelpFunctions();
            var template = _.template(LiveTour,{tourInfo:tourInfo});

            $("#"+myid+" .inner-modal").html(template);         
            
            helpFunctions.checkbox("#"+myid+" .check-group","fa-check-square-o","fa-square-o");
            
            this.verticalCent();
            helpFunctions.dropDown("#location-lt","h3");

            var tour_id = location.hash.split("/")[1];
            var caso = 'tour_thumb';
            
            var SingleUploaderModel = Backbone.Model.extend({});
            var singleUploaderModel = new SingleUploaderModel({myid:"live-tour-img-uploader",imgsrc:tourData.krpano.datatour.tour_thumb_path,tour_id:tour_id,caso:caso})
            
            var singleUploader = new SingleUploader({model:singleUploaderModel});
            singleUploader.render(this.changeImage);


            $.ajax({
                    url : 'data/json.php?t=c',
                    type: 'JSON',
                    cache : false,
                    success : function(data){
                        var data = JSON.parse(data);
                        _.each(data,function(elem,ind){
                            $("#category-lt ul.category").append("<li><span>"+elem.category+"</span></li>")
                        })
                        helpFunctions.dropDown("#category-lt","h3");
                        $("#category-lt ul.category").mCustomScrollbar({
                                theme:"minimal-dark",
                                scrollInertia:300
                            });

            
                    }
                });

            $.ajax({
                    url : 'data/json.php?t=p',
                    type: 'JSON',
                    cache : false,
                    success : function(data){

                        var data = JSON.parse(data);
                        _.each(data,function(elem,ind){
                            if(tourData.krpano.datatour.privacy == elem.value){
                                $("#privacy-lt .title").text(elem.privacy);
                            }
                            $("#privacy-lt ul.privacy").append('<li id="'+elem.value+'"><span>'+elem.privacy+'</span></li>')
                        })
                        helpFunctions.dropDown("#privacy-lt","h3");
                         $("#privacy-lt ul.privacy").mCustomScrollbar({
                                theme:"minimal-dark",
                                scrollInertia:300
                            });
            
                    }
                });
            //$("#"+myid).find(".save-and-close").unbind("click");
            //$("#"+myid).find(".save-and-close").click(this.doneEdition);            

            $('#tagsLiveModal').tagsInput({
            'width': '265px',
            'height':'70px',
            'defaultText':'add a tag',
            onChange: function(elem, elem_tags)
            {
                var manageData = new ManageData();
                manageData.saveTourData("tags",$("#tagsLiveModal").val())
            },
            autocomplete_url:'../php-stubs/tags.php', // jquery ui autocomplete requires a json endpoint
            autocomplete:{appendTo:"#toAppendTagsModal",

                    open:function(){
                        $("#toAppendTagsModal .ui-widget-content").mCustomScrollbar({
                            theme:"minimal-dark",
                            scrollInertia:300,
                            });
                    },
                    response:function(){
                        $("#toAppendTagsModal .ui-widget-content").mCustomScrollbar("destroy")
                    },
                    close:function(){
                        $("#toAppendTagsModal .ui-widget-content").mCustomScrollbar("destroy")
                        }
                    }
            });

            var MapModel = Backbone.Model.extend({});
            var mapModel = new MapModel({lat:tourData.krpano.settings._lat,lng:tourData.krpano.settings._long})            
            this.mapView = new MapView({model:mapModel});
            this.mapView.render("liveTourModal","settings");
             /*   
            var indice = $("#sceneMenu .selected").index();
            var param = "scene";

            this.mapView.render("elem",{param:param,indice:indice});*/
            $("#"+myid).find(".save").click(this.goLive);

            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });
        },

        changeImage:function(){
            console.log("a")
            tourData.krpano.datatour.tour_thumb_custom = "1",
            $("#reset-live-thumb").show();

        },

        goLive: function() {
            
            //social share modal
            this.socialModal = new SocialModal();
            this.socialModal.render("socialModal",this.socialModal.renderExtend);
        
        },

        resetThumb:function(){
            var manageData = new ManageData();
            manageData.resetThumb();
        }

    });

    return MapModalView;
    
});
