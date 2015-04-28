define([
    'jquery',
    'underscore',
    'backbone',
    'jqueryui',
    'x2js',
    'views/modal/Modal',
    'text!templates/modal/hotSpotStyleEditor.html',
     'views/modal/SingleUploader'

], function($, _, Backbone,jqueryui,x2js,Modal,hotSpotStyleEditor,SingleUploader){

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
            
            $("#hotspotStyleEditor .save-and-close").unbind("click");
            este.events = este.events || {};
            var saveandclose = 'click #hotspotStyleEditor .save-and-close';
            este.events[saveandclose] = 'saveAndClose';
            este.delegateEvents(); 
            
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
        },

        saveAndClose:function(e){

            alert("a")

                _.each($("#hotspotStyleEditor .tab"),function(elem, ind){

                      if($(elem).data("properties")){

                            var template_id = $(elem).data("id");
                            $(e.target).text("saving...")
                            $.ajax({
                                url:"data/xml.php?t=htspts_styles&id="+template_id,
                                 dataType: "html",    
                                  success:function(data){
                                        var x2js = new X2JS({attributePrefix:"_"});
                                        var style =  x2js.xml_str2json( data );
                                        var properties = $(elem).data("properties");
                                        var family = $("#hotspot-styles .row:last-child .rowinrow").data("family");
                                        var integer = family.replace("set","");
                                        integer = parseInt(integer)+1;
                                        style._crop = properties.up.X+"|"+properties.up.Y+"|"+properties.up.width+"|"+properties.up.height;
                                        style._name = "hotspot_set"+integer+"_"+$(elem).data("name");
                                        style._ondowncrop = properties.down.X+"|"+properties.down.Y+"|"+properties.down.width+"|"+properties.down.height;
                                        style._onovercrop = properties.over.X+"|"+properties.over.Y+"|"+properties.over.width+"|"+properties.over.height;
                                        style._url = $("#graphic-hotspot").data("imgsrc");
                                        console.log(style)
                                    }
                                })
                       }
            
                })
            /*$.ajax({
                url:"data/xml.php?t=skills&c=1&id="+skill.id,
                 dataType: "html",
                 success:function(data){
                    var SkillItemModel = Backbone.Model.extend({});
                    var x2js = new X2JS({attributePrefix:"_"});
                    var tourSkill =  x2js.xml_str2json( data );
                   
                    skillItemModel = new SkillItemModel({tourSkill:tourSkill.skill});
                    var skinCustomizerItem = new SkinCustomizerItem({model:skillItemModel});
                    skinCustomizerItem.render();
                    $elem.replaceWith('<span class="added-skill">Added</span>')
                    var manageData = new ManageData()
                    manageData.pushSkill(tourSkill)
                    var tourid = location.hash.split("/")[1];
                    console.log(tourData.krpano)
                    var manageTour = new ManageTour();
                    manageTour.reloadTour(tourid);
                 }
            })*/
        }

    });

    return HotSpotStyleEditor;

});
