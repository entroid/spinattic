define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/hotspotarrow.html',
    'helpers/HelpFunctions',
    'views/modal/HotSpotsDropDown',
    'helpers/ManageData',


], function($, _, Backbone,Modal,hotspotarrow,HelpFunctions,HotSpotsDropDown,ManageData){

    var ArrowHotspotEditorView = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{
            
                 },
        
        renderExtend:function(){
            var manageData = new ManageData();
            var num = this.myid.replace("spot","");
            $("#"+this.myid).addClass("arrow-hotspot");
            $("#"+this.myid+" header h2").text("Arrow Hotspot. ID "+num+":")

            var allData = this.model.get("allData");
            var me = this;
            var scenes = tourData.krpano.scene;         
            var compiledTemplate = _.template(hotspotarrow,{num:num,allData:allData,scenes:scenes,num:num})
            $("#"+this.myid+" .inner-modal").html(compiledTemplate);
            
            $("#"+me.myid).find(".fa-close").remove();
            $("#"+me.myid+" header .save-and-close").unbind("click")

            $("#"+me.myid+" header .save-and-close").click(function(){
                
                var selectedscene = $("#"+me.myid+" h3 .selectedScene").text();
                var hotspot = allData;
                if(selectedscene == "none"){
                    selectedscene = "";
                }
                hotspot._rotate = $("#"+me.myid+" .rotate").val()
                hotspot._linkedscene = selectedscene;
                manageData.changeDataInHotSpot($("#tour").data("scene")._name, hotspot)
                
                $(this).parents(".modal").fadeOut(function(){
                    me.removeThis();
                })
            })
            
            var $me = $("#"+this.myid);
            var oldWidth = $me.width();

            var spotName =  this.myid;
            $me.find(".removeHotspot").click(function(){
                var krpano = document.getElementById("krpanoSWFObject");
                krpano.call("removehotspot("+spotName+")");
                manageData.removeHotSpot($("#tour").data("scene")._name, spotName);
                $("#"+myid+" header .save-and-close").trigger("click");
            })

            $me.find('.rotate').change( function() {
                var val = $(this).val();
                var hpdata = $("#"+me.myid).data("spotdata")._name;
                //var krpano = document.getElementById("krpanoSWFObject");
                //krpano.set("hotspot["+hpdata._name+"].rotate",val);

                me.limitRotate(val, hpdata, $("#"+me.myid));
            })

            $me.find("#onoffswitchhparrow-"+num).click(function(){
                if($(this).is(":checked")){
                    var hpdata = $me.data("spotdata");
                    var selectedscene = $("#"+me.myid+" h3 .selectedScene").text();
                    var krpano = document.getElementById("krpanoSWFObject");
                    krpano.call("addhotspot("+hpdata._name +")");
                    window.selectScene = function(selectedscene){
                        setTimeout(function(){
                            $("#"+selectedscene+" img").trigger("click")
                        },500)
                    }

                    krpano.call('set(hotspot['+hpdata._name+'].ondown, null );');
                    krpano.call('set(hotspot['+hpdata._name+'].onclick,  tween(scale,0.25,0.5); tween(oy,-20,0.5); tween(alpha,0,0.5);js(selectScene('+selectedscene+')) );');
                    $me.find(".hotspotarrow").delay(200).slideUp(function(){
                       $me.find(".test-mode").fadeIn(); 
                    });
                    $me.find(".removeHotspot").fadeOut();
                    $me.delay(200).animate({
                        width:'330px'
                    })

                }else{
                    var hpdata = $me.data("spotdata");
                    var krpano = document.getElementById("krpanoSWFObject");
                    krpano.call("addhotspot("+hpdata._name +")");
                    krpano.call('set(hotspot['+hpdata._name+'].ondown, draghotspot() );');
                    krpano.call('set(hotspot['+hpdata._name+'].onclick, js(openHotspotWindowEditor('+hpdata._name+')) );');
                    $me.find(".save-and-close").show();
                    $me.find(".hotspotarrow").delay(200).slideDown();
                    $me.find(".removeHotspot").fadeIn();                    
                    $me.find(".test-mode").fadeOut(); 

                    $me.delay(200).animate({
                        width:oldWidth+'px'
                    })
                }
            })


            var selectedset = this.model.get("selectedSet");
            var myid = this.myid;


            var HotSpotDDModel = Backbone.Model.extend({});
            hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"arrow",elemid:myid});
            var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
            hotSpotsDropDown.render();
            this.autocomplete();


            $("#"+me.myid+" .scrollwrapper-scenes").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });

            $("#"+me.myid+" .dropdown1").click(function (){
                $("#"+me.myid+" .list-scene").toggleClass('none');
            })

        },

        removeThis:function(){
            this.undelegateEvents();
            $("#"+this.myid).parent(".overlay").remove();
        },

        autocomplete: function(){
                var myid = this.myid;
                var num = this.myid.replace("spot","");
                var scenes = tourData.krpano.scene;

                _.each(scenes,function(elem,ind){
                    elem.label = elem._title;
                }) 

            $("#"+myid+" .search-scenes").autocomplete({
                source:scenes,
                 appendTo:"#scenes-search-results-"+num,
                 focus: function( event, ui ) {
                    $("#"+myid+" .search-scenes").val( ui.item._title );
                    return false;
                    }, 
                select:function(event,ui){
                    var myTitle = ui.item._title;
                    $("#"+myid+" .search-scenes").val(myTitle);
                    /*$("#"+myid+" .inner-modal h2").show();*/
                    $("#"+myid+" .scenes-list #"+ui.item._name).show();
                    return false;
                },
                search:function(event,ui){
                  $("#"+myid+" .scenes-list li").hide();
                    //$("#"+myid+" .inner-modal h2").hide();
                },
                change: function(event,ui){
                    if(!ui.item){
                        $("#"+myid+" .search-scenes").val('');
                    }                               
                }
            }).data("ui-autocomplete")._renderItem = function(ul,item){

                return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( "<img src="+item._thumburl+" /><dl><dt>" + item._title + "</dt><dd>" + item._name + "</dd></dl>" )
                .appendTo( ul ); 

            };

            /* select */

            $("#"+myid+" .scenes-list li").click(function(e){
                var name = $(this).attr("id");
                var panoName = $(this).find('dd').text();

                var imgsrc =  $(this).find("img").attr("src");

                $("#"+myid+" h3 .selectedScene").text(name);
                $("#"+myid+" h3 .selectedFile").text(panoName);
                $("#"+myid+" .list-scene").toggleClass('none');
                $("#"+myid+" h3.scenedd img").attr("src",imgsrc)
            })

            $("#"+myid+" .scenelist .clear-btn").click(function(ev) {                
                $(ev.target).find('input').val('');
                $("#"+myid+" .scenes-list li").show()
            })

        },

        limitRotate: function (val, spotName, modalName) {
            var inputRotate = $(modalName).find('.rotate');
            if ( !isNaN( val ) ) {
                if ( val < -180 ) {
                    $(inputRotate).val(-180);
                    val = -180;

                } else if ( val > 180) {
                    $(inputRotate).val(180);
                    val = 180;
                }
            } else {
                return
            }
            
            var krpano = document.getElementById("krpanoSWFObject");
            krpano.set("hotspot["+ spotName +"].rotate",val);

        }

        
    });

    return ArrowHotspotEditorView;
    
});
