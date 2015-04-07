define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/hotspotarrow.html',
    'helpers/HelpFunctions',
    'views/modal/HotSpotsDropDown',
    

], function($, _, Backbone,Modal,hotspotarrow,HelpFunctions,HotSpotsDropDown){

    var ArrowHotspotEditorView = Modal.extend({
        
        initialize: function () {
        _.bindAll(this);        
         _.extend(this.events, Modal.prototype.events);
        },
        events:{

                 },
        
        renderExtend:function(){
            var num = this.myid.replace("spot","");
            $("#"+this.myid).addClass("arrow-hotspot");
            $("#"+this.myid+" header h2").text("Arrow Hotspot. ID "+num+":")

            var compiledTemplate = _.template(hotspotarrow,{num:num})
            $("#"+this.myid+" .inner-modal").html(compiledTemplate);
            $("#"+this.myid).find(".fa-close").remove();
            $("#"+this.myid+" header .save-and-close").unbind("click")
            $("#"+this.myid+" header .save-and-close").click(function(){
                $(this).parents(".modal").fadeOut();
            })

            var selectedset = this.model.get("selectedSet");
            var myid = this.myid;
            var HotSpotDDModel = Backbone.Model.extend({});
            hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"arrow",elemid:myid});
            var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
            hotSpotsDropDown.render();
            this.autocomplete();

        },

        autocomplete: function(){
                var myid = this.myid;
                var num = this.myid.replace("spot","");
                var scenes = tourData.krpano.scene;
                _.each(scenes,function(elem,ind){
                    elem.label = elem._title;
            }) 

            console.log(scenes)
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
                    //$("#"+myid+" .pano-list-ul #" +ui.item.fileName).show();
                    return false;
                },
                search:function(event,ui){
                  //$("#"+myid+" .skill-list li").hide();
                    //$("#"+myid+" .inner-modal h2").hide();
                },
                change: function(event,ui){
                    if(!ui.item){
                       $("#"+myid+" .search-scenes").val('');
                        //$("#"+myid+" .skill-list li").show()
                        //$("#"+myid+" .inner-modal h2").show();
                    }                               
                }
            }).data("ui-autocomplete")._renderItem = function(ul,item){

                return $( "<li></li>" )
                .data( "item.autocomplete", item )
                .append( "<img src="+item._thumburl+" /><dl><dt>" + item._title + "</dt><dd>" + item._name + "</dd></dl>" )
                .appendTo( ul ); 

            };
        }

        
    });

    return ArrowHotspotEditorView;
    
});
