define([
    'jquery',
    'underscore',
    'backbone',
    'jqueryui',
    'views/modal/Modal',
    'text!templates/modal/hotSpotStyleEditor.html',
     'views/modal/SingleUploader'

], function($, _, Backbone,jqueryui,Modal,hotSpotStyleEditor,SingleUploader){

    var HotSpotStyleEditor = Modal.extend({
        
        initialize: function () {
            _.bindAll(this);        
            _.extend(this.events, Modal.prototype.events);
            
        },

        events:{
            /*"click .select-pano": "selectPano",*/
            "click .menuTabs .modal-bt": "tabs",
            "click .cancel": "removeModal"
        },

        renderExtend: function() {
            var este = this;
            var myid = this.myid;
            var template = _.template(hotSpotStyleEditor);

            $("#"+myid+" .inner-modal").html(template);
            $("#"+myid+" header h2").text("Styles of hotspots set:");

            var SingleUploaderModel = Backbone.Model.extend({});
            var singleUploaderModel = new SingleUploaderModel({myid:"graphic-hotspot",imgsrc:""})
            var singleUploader = new SingleUploader({model:singleUploaderModel});

            singleUploader.render();
            
            este.verticalCent();
            
            /*$.ajax({
                url:"data/panoManager.json",
                dataType:"json",
                success: function( data ){
                    
                    este.data = data.pano;
                    este.sortByKey("filename","verse")
                    //este.data = data;
                    este.verticalCent();
                    este.autocomplete( myid );

                    $("#"+myid+" .sort").click(function(){

                        if(!$(this).hasClass("selected")){

                            if($(this).hasClass("fa-sort-alpha-asc")){
                                este.sortByKey("filename","asc")
                            }else if($(this).hasClass("fa-sort-alpha-desc")){
                                este.sortByKey("filename","desc")
                            }else if($(this).hasClass("fa-sort-amount-asc")){
                                este.sortByDate("asc")
                            }else if($(this).hasClass("fa-sort-amount-desc")){
                                este.sortByDate("desc")
                            }

                            $("#"+myid+" .sort-btn").removeClass("selected");
                            $(this).addClass("selected")
                        }
                    })
                }
            })*/


        
            
            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });

        },

        tabs: function (e) {
            var el = $(e.target),
                id = $(el).attr('data-content');

            if(!$(el).hasClass('selected')) {
                $(el).addClass('selected').siblings('li').removeClass('selected');
                $('.hotsPotStyleTabs #' + id).removeClass('none').siblings().addClass('none');
            }


        }

    });

    return HotSpotStyleEditor;

});
