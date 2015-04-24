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
            "click .tabContent .add .addStyle": "addStyles",
            "click .tabContent .icons .addStyle": "selectAddStyles",
            "click .cancel": "removeModal",
            "change .absoluteRight":"setProperties"
        },

        defaultHPValues:{
            width:32,
            height:32,
            X:0,
            Y:0

        },

        renderExtend: function() {
            var este = this;
            var myid = this.myid;
            var template = _.template(hotSpotStyleEditor);
            var deleteSet = '<span class="delete-set modal-bt red"><i class="fa fa-trash"></i> Delete Set</span>'

            $("#"+myid+" .inner-modal").html(template);
            $("#"+myid+" header h2").text("Styles of hotspots set:");

            $("#"+myid+" header").append($(deleteSet));

            var imgsrc = this.model.get("imgsrc")
            if(imgsrc == ""){
                $("#hotspotStyleEditor .hotspotStyleContent").hide()
            }
            var SingleUploaderModel = Backbone.Model.extend({});
            var singleUploaderModel = new SingleUploaderModel({myid:"graphic-hotspot",imgsrc:""})
            var singleUploader = new SingleUploader({model:singleUploaderModel});
            var uploadComplete = this.uploadComplete;
            singleUploader.render(uploadComplete);
            
            este.verticalCent();
            
            
            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });

        },

        tabs: function (e) {
            var el = $(e.target),
                id = $(el).attr('data-content');
            var valueText = $(el).text();    
            if(!$(el).hasClass('selected')) {
                $(el).addClass('selected').siblings('li').removeClass('selected');
                $('.hotsPotStyleTabs #' + id).removeClass('none').siblings().addClass('none');
            }
            $('.tabContent .tab').removeClass("selected")
            $('.tabContent #' + id).addClass("selected")
            var properties = $(".tab.selected").data("properties");
            var mytype =  $(".tab.selected .selected").data("type");

            if(properties){
            
            $(".hotsPotStyleSelected .width").val(properties[mytype].width);
            $(".hotsPotStyleSelected .height").val(properties[mytype].height);
            $(".hotsPotStyleSelected .X").val(properties[mytype].X);
            $(".hotsPotStyleSelected .Y").val(properties[mytype].Y);
             $("#bt-selected").text(mytype)

            
            }else{

            $(".hotsPotStyleSelected .width").val("")
            $(".hotsPotStyleSelected .height").val("")
            $(".hotsPotStyleSelected .X").val("")
            $(".hotsPotStyleSelected .Y").val("")
            $("#bt-selected").text("")

            }


            $("#hp-type-selected").text(valueText)

        },

        addStyles: function(e) {            
            var el = $(e.target);
            var $thistab = $(el).parents(".tab");
            $(el).parents('.add').addClass('none').siblings('.icons').removeClass('none');
            
            dfval = this.defaultHPValues;
            $(".hotsPotStyleSelected .width").val(dfval.width)
            $(".hotsPotStyleSelected .height").val(dfval.height)
            $(".hotsPotStyleSelected .X").val(dfval.X)
            $(".hotsPotStyleSelected .Y").val(dfval.Y)

            $thistab.find(".addStyle").css({
                "width":dfval.width+"px",
                "height":dfval.height+"px",
            });

            $thistab.find(".addStyle:eq(0)").css({
                "background-image":"url("+$("#graphic-hotspot").data("imgsrc")+")",
                "background-repeat":"no-repeat",
                "background-position": dfval.X +"px "+ dfval.Y+"px"
            }).addClass("not-empty");

            var prop = {
                up:dfval,
                over:dfval,
                down:dfval
            }
            $thistab.data("properties",prop);
            $thistab.find(".icons .addStyle:eq(0)").trigger("click")
            
        },

        selectAddStyles: function(e){
             var el = $(e.target);
             var dfval = this.defaultHPValues;
             if(!$(el).hasClass("not-empty")){
                $(el).css({
                     "background-image":"url("+$("#graphic-hotspot").data("imgsrc")+")",
                     "background-repeat":"no-repeat",
                     "background-position": dfval.X +"px "+ dfval.Y+"px"
               }).addClass("not-empty");
             }

             if(!$(el).hasClass('selected')) {
                $(el).addClass('selected').parents('.icons-wrapper').siblings().find('.addStyle').removeClass('selected');
             }
             console.log($(".tab.selected").attr("id"));

             var properties = $(".tab.selected").data("properties");
            var mytype =  $(".tab.selected .selected").data("type");

            if(properties){
            
            $(".hotsPotStyleSelected .width").val(properties[mytype].width)
            $(".hotsPotStyleSelected .height").val(properties[mytype].height)
            $(".hotsPotStyleSelected .X").val(properties[mytype].X)
            $(".hotsPotStyleSelected .Y").val(properties[mytype].Y)
            }

            var valText = $(el).data("type");
            $("#bt-selected").text(valText);
            $(".tab.selected .controls").addClass("none");
            $(el).parents('.icons-wrapper').find(".controls").removeClass("none");

        },

        uploadComplete:function(){
            $("#hotspotStyleEditor .image-uploader-wrapper img").attr("style","width:auto");
            $("#hotspotStyleEditor .hotspotStyleContent").show();
            this.verticalCent();
        },

        setProperties:function(e){
            console.log($(e.target).val());
            var myprop = {
                width:$(".hotsPotStyleSelected .width").val(),
                height:$(".hotsPotStyleSelected .height").val(),
                X:$(".hotsPotStyleSelected .X").val(),
                Y:$(".hotsPotStyleSelected .Y").val()
            }

            $(".tab.selected .selected").css({
                "width": $(".hotsPotStyleSelected .width").val()+"px",
                "height": $(".hotsPotStyleSelected .height").val()+"px",
                "background-position": $(".hotsPotStyleSelected .X").val() +"px "+ $(".hotsPotStyleSelected .Y").val()+"px" 
            })
            var mytype =  $(".tab.selected .selected").data("type");
            var prop = $(".tab.selected").data("properties")
            prop[mytype] = myprop;
        }

    });

    return HotSpotStyleEditor;

});
