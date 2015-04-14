define([
    'jquery',
    'underscore',
    'backbone',
    'views/sidebar/SidebarSubMenu',
    'text!templates/sidebar/hotspotsMenu.html',
    'models/main/HotSpotWindowModel',
    'helpers/ManageData',
    'helpers/HelpFunctions',
    'helpers/ManageHotSpots',


], function($, _, Backbone,SidebarSubMenu,hotspotsMenu,HotSpotWindowModel,ManageData,HelpFunctions,ManageHotSpots){

    var HotSpotsMenuView = SidebarSubMenu.extend({
        hotspotCount: 0,
        selectedset:"",
        events:{
            "click #hotSpots-menu li.htpt": "addHotSpot",
            "click #hotspot-styles .selector":"selectStyleClick",
            "click #open-styles":"showhideStyles"
                 },
        
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
            var urlid;
            switch(myid){
                case "link":
                    urlid = "5"
                break;
                case "video":
                    urlid = "4"
                break;
                case "photo":
                    urlid = "3"
                break;
                case "info":
                    urlid = "2"
                break;
                case "arrow":
                    urlid = "1"
                break;
            }
            var me = this;
            $.ajax({
                url:"data/xml.php?t=htspts&c=1&id="+urlid,
                 dataType: "html",
                 success:function(data){

                    var x2js = new X2JS({attributePrefix:"_"});
                    var newHotspot =  x2js.xml_str2json( data ).hotspot;
                    var krpano = document.getElementById("krpanoSWFObject");
                    var __ath   =  krpano.get('view.hlookat')-Math.floor(Math.random() * 45); 
                    var __atv   =  krpano.get('view.vlookat')-Math.floor(Math.random() * 25); 
                    newHotspot._ath = __ath;
                    newHotspot._atv = __atv;
                    newHotspot._name = "spot"+me.hotspotCount;

                    var manageHotSpots = new ManageHotSpots();
                    console.log(newHotspot)

                    krpano.call("addhotspot("+newHotspot._name +")");
                    krpano.set("hotspot["+newHotspot._name+"].ath", newHotspot._ath );
                    krpano.set("hotspot["+newHotspot._name+"].atv", newHotspot._atv );
                    krpano.call("hotspot["+newHotspot._name+"].loadStyle(hotspot_"+me.selectedset+"_"+myid+");");
                    krpano.call('set(hotspot['+newHotspot._name+'].ondown, draghotspot() );');
                    krpano.call('set(hotspot['+newHotspot._name+'].onclick, js(openHotspotWindowEditor('+newHotspot._name+')) );');
                    krpano.call('set(hotspot['+newHotspot._name+'].onup, js(regPos('+newHotspot._name+')) );');
                    var manageData = new ManageData();
                    manageData.pushHotspot( $("#tour").data("scene")._name,newHotspot)
                    openHotspotWindowEditor(newHotspot._name);

                    
                 }
             })
            /*
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
            krpano.call('set(hotspot[spot'+this.hotspotCount+'].onclick, js(showWindow('+__name+')) );');
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
            */

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
                console.log(set)
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
        }
        
    });

    return HotSpotsMenuView;
    
});
