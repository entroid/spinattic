define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/hotspotinfo.html',
    'helpers/HelpFunctions',
    'helpers/ManageData',
    'views/modal/HotSpotsDropDown',
    

], function($, _, Backbone,Modal,hotspotinfo,HelpFunctions,ManageData,HotSpotsDropDown){

    var InfoHotspotEditorView = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{

                 },
        
        renderExtend:function(){
            var manageData = new ManageData();
            var num = this.myid.replace("spot","");
            var spotName =  this.myid;
            var allData = this.model.get("allData");

            $("#"+spotName+" header h2").text("Info Hotspot. ID "+num+":")

            var compiledTemplate = _.template(hotspotinfo,{allData:allData,num:num})
            $("#"+spotName+" .inner-modal").html(compiledTemplate);
            
            
            $("#"+this.myid+" header .fa-close").unbind("click")
            var $me = $("#"+this.myid);
            var myid = this.myid;
            var selectedset = this.model.get("selectedSet");
            var HotSpotDDModel = Backbone.Model.extend({});
            hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"info",elemid:myid});
            var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
            hotSpotsDropDown.render();

            $("#"+this.myid).find(".fa-close").remove();
            $("#"+this.myid+" header .save-and-close").unbind("click")
            var me = this;
            
            $("#"+this.myid+" header .save-and-close").click(function(){
                
                if($("#"+me.myid+" .onoffswitch-checkbox").is(":checked")){
                    $("#"+me.myid+" .onoffswitch-checkbox").trigger("click");
                }
                var infoTitle = $me.find(".infotitle").val();
                var infoText = $me.find(".infotext").val();
                var hotspot = allData;
                hotspot._infotitle = infoTitle;
                hotspot._infotext = infoText;
                manageData.changeDataInHotSpot($("#tour").data("scene")._name, hotspot)
                
                $(this).parents(".modal").fadeOut(function(){
                    me.removeThis();
                });
            })

            $me.find(".removeHotspot").click(function(){
                var krpano = document.getElementById("krpanoSWFObject");
                krpano.call("removehotspot("+spotName+")");
                $(this).parents(".modal").fadeOut(function(){
                    $(this).parent(".hotspotwindow").remove();
                });
                manageData.removeHotSpot($("#tour").data("scene")._name, spotName)
            })

            $me.find("#onoffswitchhpinfo-"+num).click(function(){
                if($(this).is(":checked")){
                    
                    var hpdata = $me.data("spotdata");
                    var infoTitle = $me.find(".infotitle").val();
                    var infoText = $me.find(".infotext").val(); 
                    var krpano = document.getElementById("krpanoSWFObject");
                    krpano.call("addhotspot("+hpdata._name +")");
                    
                    krpano.call('set(hotspot['+hpdata._name+'].ondown, null );');
                    krpano.call('set(hotspot['+hpdata._name+'].onclick, showinfo('+escape(infoTitle)+','+escape(infoText)+') );');
                    $me.find(".hotspotinfo").delay(200).slideUp(function(){
                       $me.find(".test-mode").fadeIn(); 
                    });
                    $me.find(".removeHotspot").fadeOut();

                }else{
                    var hpdata = $me.data("spotdata");
                    var krpano = document.getElementById("krpanoSWFObject");
                    krpano.call("addhotspot("+hpdata._name +")");
                    krpano.call('set(hotspot['+hpdata._name+'].ondown, draghotspot() );');
                    krpano.call('set(hotspot['+hpdata._name+'].onclick, js(openHotspotWindowEditor('+hpdata._name+')) );');
                    $me.find(".hotspotinfo").delay(200).slideDown();
                    $me.find(".removeHotspot").fadeIn();
                    $me.find(".test-mode").fadeOut();
                }
            })

        },

        removeThis:function(){
            this.undelegateEvents();
            $("#"+this.myid).parent(".overlay").remove();
        }

        
    });

    return InfoHotspotEditorView;
    
});
