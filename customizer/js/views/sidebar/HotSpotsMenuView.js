define([
    'jquery',
    'underscore',
    'backbone',
    'views/sidebar/SidebarSubMenu',
    'text!templates/sidebar/hotspotsMenu.html',
    'helpers/ManageHotSpots',
    'models/main/HotSpotWindowModel',
    'helpers/ManageData',
    'helpers/HelpFunctions',
    'views/modal/HotSpotStyleEditor'


], function($, _, Backbone,SidebarSubMenu,hotspotsMenu,ManageHotSpots,HotSpotWindowModel,ManageData,HelpFunctions,HotSpotStyleEditor){

    var HotSpotsMenuView = SidebarSubMenu.extend({
        hotspotCount: 0,
        selectedset:"",
        events:{
            "click #hotSpots-menu li.htpt": "addHotSpot",
            "click #hotspot-styles .selector":"selectStyleClick",
            "click #open-styles":"showhideStyles",
            "click #hotspot-styles .add-link": "showHotspotsStyleEditor",
            "click #hotspot-styles .rowinrow": "editHotSpotAppeareance",
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
                var numbs = []
                _.each($("#tour").data("scene").hotspot,function(hp,val){
                    var num = parseInt(hp._name.replace("spot",""));
                    numbs.push(num);
                })


                this.hotspotCount = Math.max.apply(Math, numbs);
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
                    newHotspot._style = "hotspot_"+me.selectedset+"_"+myid;
                    newHotspot._name = "spot"+me.hotspotCount;

                    var manageHotSpots = new ManageHotSpots();

                    krpano.call("addhotspot("+newHotspot._name +")");
                    krpano.set("hotspot["+newHotspot._name+"].ath", newHotspot._ath );
                    krpano.set("hotspot["+newHotspot._name+"].atv", newHotspot._atv );
                    krpano.call("hotspot["+newHotspot._name+"].loadStyle(hotspot_"+me.selectedset+"_"+myid+");");
                    console.log(me.selectedset)
                    krpano.call('set(hotspot['+newHotspot._name+'].ondown, draghotspot() );');
                    krpano.call('set(hotspot['+newHotspot._name+'].onclick, js(openHotspotWindowEditor('+newHotspot._name+')) );');
                    krpano.call('set(hotspot['+newHotspot._name+'].onup, js(regPos('+newHotspot._name+')) );');
                    var manageData = new ManageData();
                    manageData.pushHotspot( $("#tour").data("scene")._name,newHotspot)
                    openHotspotWindowEditor(newHotspot._name);
                 }
             })
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
                $("#hotspots-menu-header ul").append(' <li id="'+elem._kind+'" class="htpt"><div class="selected icons"><div style="background-image:url('+elem._url+');background-position:-'+crop[0]+'px 0"></div></div></li>');                    
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
                var StyleNew = Backbone.Model.extend({});
                styleNew = new StyleNew({imgsrc:""})
                this.hotspotstyleeditor = new HotSpotStyleEditor({model:styleNew});
                this.hotspotstyleeditor.render("hotspotStyleEditor",this.hotspotstyleeditor.renderExtend);
            }
        },


        editHotSpotAppeareance:function(e){
            if($(e.target).hasClass("custom")){
                var imgsrc = $(e.target).data("url");
                var family = $(e.target).data("family");
                var name = $(e.target).data("name");
                var StyleNew = Backbone.Model.extend({});
                styleNew = new StyleNew({imgsrc:imgsrc,family:family,name:name})
                var hotspotstyleeditor = new HotSpotStyleEditor({model:styleNew});
                hotspotstyleeditor.render("hotspotStyleEditor",hotspotstyleeditor.renderExtend);
                }
        }
        
    });

    return HotSpotsMenuView;
    
});
