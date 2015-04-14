define([
    'jquery',
    'underscore',
    'backbone',
    'views/sidebar/SidebarSubMenu',
    'text!templates/sidebar/hotspotsMenu.html',
    'views/modal/LinkHotspotEditorView',
    'views/modal/InfoHotspotEditorView',
    'views/modal/PhotoHotspotEditorView',
    'views/modal/VideoHotspotEditorView',
    'views/modal/ArrowHotspotEditorView',
    'models/main/HotSpotWindowModel',
    'helpers/ManageData',
    'helpers/HelpFunctions',
    'views/modal/HotSpotStyleEditor'


], function($, _, Backbone,SidebarSubMenu,hotspotsMenu,LinkHotspotEditorView,InfoHotspotEditorView,PhotoHotspotEditorView,VideoHotspotEditorView,ArrowHotspotEditorView,HotSpotWindowModel,ManageData,HelpFunctions,HotSpotStyleEditor){

    var HotSpotsMenuView = SidebarSubMenu.extend({
        hotspotCount: 0,
        selectedset:"",
        events:{
            "click #hotSpots-menu li.htpt": "addHotSpot",
            "click #hotspot-styles .selector":"selectStyleClick",
            "click #open-styles":"showhideStyles",
            "click #hotspot-styles .add-link": "showHotspotsStyleEditor"
                 },
        hotspotstyleeditor:null,
        
        render: function(){
            var styles = tourData.krpano.style;
            var compiledTemplate = _.template(hotspotsMenu,{styles:styles});
            $(this.el).append( compiledTemplate ); 
            var helpFunctions = new HelpFunctions();
            helpFunctions.selectChoice("#hotspot-styles .selector","fa-circle-o","fa-circle");
            this.$elem = $("#"+this.model.get("elem"));
            this.model.set("elemWidth",this.$elem.width());
            this.selectStyle("set1");
            this.show();
        },

        addHotSpot:function(e){
            if($("#tour").data("scene").hotspot){
                this.hotspotCount = $("#tour").data("scene").hotspot.length;
            }else{
                this.hotspotCount = 0;
            }
            this.hotspotCount++;
            var name = $(e.target).prop("tagName")
            if(name == "DIV"){
            var myid = $(e.target).parents("li").attr("id");
            }else{
            var myid = $(e.target).attr("id");
            }
            var posx = "";
            var modalView;
            switch(myid){
                case "link":
                    posx = "128";
                    modalView = LinkHotspotEditorView;
                break;
                case "video":
                    posx = "96";
                    modalView = VideoHotspotEditorView;
                break;
                case "photo":
                    posx = "64";
                    modalView = PhotoHotspotEditorView;
                break;
                case "info":
                    posx = "32";
                    modalView = InfoHotspotEditorView;
                break;
                case "arrow":
                    posx = "00";
                    modalView = ArrowHotspotEditorView;
                break;
            }
            var __name = "spot"+this.hotspotCount;
            this.openWindowEditor(modalView);
            showWindow = this.showWindow;
            regPos = this.regPos;
            var krpano = document.getElementById("krpanoSWFObject");
            krpano.call("addhotspot("+__name+")");
            //krpano.set("hotspot[spot"+this.hotspotCount+"].url", __url);
            var __ath   =  krpano.get('view.hlookat')-Math.floor(Math.random() * 45); 
            var __atv   =  krpano.get('view.vlookat')-Math.floor(Math.random() * 25); 
            krpano.set("hotspot[spot"+this.hotspotCount+"].ath", __ath);
            krpano.set("hotspot[spot"+this.hotspotCount+"].atv", __atv);
            var stylo = "hotspot_"+this.selectedset+"_"+myid;
            krpano.call("hotspot[spot"+this.hotspotCount+"].loadStyle(hotspot_"+this.selectedset+"_"+myid+");");
            //krpano.set("hotspot[spot"+this.hotspotCount+"].crop",__posx);
            krpano.call('set(hotspot[spot'+this.hotspotCount+'].ondown, draghotspot() );');
            krpano.call('set(hotspot[spot'+this.hotspotCount+'].onup, js(showWindow('+__name+')) );');
            krpano.call('set(hotspot[spot'+this.hotspotCount+'].onup, js(regPos('+__name+')) );');
            $(".overlay").addClass("hotspotwindow");

            var hotspot = {
                _name: __name,
                _ath:__ath,
                _atv:__atv,
                _type:"image",
                _visible:true,
                _style:"hotspot_"+this.selectedset+"_"+myid
            }
            var manageData = new ManageData();
            manageData.pushHotspot( $("#tour").data("scene")._name,hotspot)
            $("#spot"+this.hotspotCount).data("spotdata",hotspot)

        },
        showWindow:function(elem) {
            console.log(elem)
            $("#"+elem).fadeIn()
        },

        regPos:function(elem){
            var krpano = document.getElementById("krpanoSWFObject");
            var ath = krpano.get("hotspot["+elem+"].ath");
            var atv = krpano.get("hotspot["+elem+"].atv");
            var hotspot = $("#"+elem).data("spotdata");
            hotspot._ath =  ath;
            hotspot._atv = atv
            var manageData = new ManageData();
            manageData.changeDataInHotSpot( $("#tour").data("scene")._name,hotspot)
            
            $("#"+elem).data("spotdata",hotspot);
        },

        openWindowEditor:function(mView){
                var hotSpotWindowModel = new HotSpotWindowModel({id:this.hotspotCount,selectedSet:this.selectedset})
                var linkhotspotEditorview = new mView({model:hotSpotWindowModel});
                linkhotspotEditorview.render("spot"+this.hotspotCount,linkhotspotEditorview.renderExtend);
        },

        selectStyleClick:function(ev){
            var obj = ev.currentTarget
            var set = $(obj).next().find(".rowinrow").data("family");
            this.selectStyle(set)
        },

        selectStyle:function(set){                
            var styles = tourData.krpano.style;
            var selected = [];
            _.each(styles,function(elem,ind){
                var name = elem._name;
                name = name.split("_");
                
                if(name[1] == set){
                    
                    selected.push(elem)
                }
            });

            this.selectedset = set;
            $("#hotspots-menu-header").html("").append('<ul></ul>');

            _.each(selected,function(elem,ind){ 
                var crop = elem._crop.split("|")
                $("#hotspots-menu-header ul").append(' <li id="'+elem._kind+'" class="htpt"><div class="selected icons"><div style="background-image:url(data/'+elem._url+');background-position:-'+crop[0]+'px 0"></div></div></li>');                    
            })
                
            $("#hotspots-menu-header").append('<div id="open-styles">hotspots styles <div class="arrow"></div>');
        },

        showhideStyles:function(){
            $("#hotspot-styles").slideToggle()
        },

        showHotspotsStyleEditor: function () {
            if($(".pano-manager").length) {            
                this.hotspotstyleeditor.removeView();                
            }else{
                this.hotspotstyleeditor = new HotSpotStyleEditor();
                this.hotspotstyleeditor.render("hotspotStyleEditor",this.hotspotstyleeditor.renderExtend);
            }
        }
        
    });

    return HotSpotsMenuView;
    
});
