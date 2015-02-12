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
	'models/main/HotSpotWindowModel'

], function($, _, Backbone,SidebarSubMenu,hotspotsMenu,LinkHotspotEditorView,InfoHotspotEditorView,PhotoHotspotEditorView,VideoHotspotEditorView,ArrowHotspotEditorView,HotSpotWindowModel){

	var HotSpotsMenuView = SidebarSubMenu.extend({
		hotspotCount: 0,
		
		events:{
			"click #hotSpots-menu li": "addHotSpot"
				 },
		
		render: function(){
			var compiledTemplate = _.template(hotspotsMenu);
			$(this.el).append( compiledTemplate ); 
			this.$elem = $("#"+this.model.get("elem"));
			this.model.set("elemWidth",this.$elem.width());
			this.show();

		},

		addHotSpot:function(e){
			this.hotspotCount++;
			var name = $(e.target).prop("tagName")
			if(name == "SPAN"){
			var myid = $(e.target).parent().attr("id");
			}else{
			var myid = $(e.target).attr("id");
			}
			var posx = "";
			var modalView;
			switch(myid){
				case "hotspot-link":
					posx = "128";
					modalView = LinkHotspotEditorView;
				break;
				case "hotspot-video":
					posx = "96";
					modalView = VideoHotspotEditorView;
				break;
				case "hotspot-camera":
					posx = "64";
					modalView = PhotoHotspotEditorView;
				break;
				case "hotspot-info":
					posx = "32";
					modalView = InfoHotspotEditorView;
				break;
				case "hotspot-chevron":
					posx = "00";
					modalView = ArrowHotspotEditorView;
				break;
			}

			var __url = 'images/icons/hotspots.png';
			var __posx =  posx+"|00|32|32";
			var __name = "spot"+this.hotspotCount;
			this.openWindowEditor(modalView);
			showWindow = this.showWindow;
			var krpano = document.getElementById("krpanoSWFObject");
			krpano.call("addhotspot("+__name+")");
			krpano.set("hotspot[spot"+this.hotspotCount+"].url", __url);
			var __ath   =  krpano.get('view.hlookat')-Math.floor(Math.random() * 45); 
		    var __atv   =  krpano.get('view.vlookat')-Math.floor(Math.random() * 25); 
			krpano.set("hotspot[spot"+this.hotspotCount+"].ath", __ath);
			krpano.set("hotspot[spot"+this.hotspotCount+"].atv", __atv);
			krpano.set("hotspot[spot"+this.hotspotCount+"].crop",__posx);
			krpano.call('set(hotspot[spot'+this.hotspotCount+'].ondown, draghotspot() );');
    		krpano.call('set(hotspot[spot'+this.hotspotCount+'].onclick, js(showWindow('+this.hotspotCount+')) );');
    		$(".overlay").addClass("hotspotwindow");

    		var hotspot = {
    			_name: __name,
    			_ath:__ath,
    			_atv:__atv,
    			_url:__url,
    			_crop:__posx,
    			_type:"image",
    			_visible:true,
    		}

    		_.each(tourData.krpano.scene,function(elem){
				if(elem._name == $("#tour").data("scene")._name){
					if(!elem.hotspot){
						elem.hotspot = [];
						elem.hotspot.push(hotspot);
					}else{
						elem.hotspot.push(hotspot);
					}
					$("#sceneMenu #"+elem._name).data("hotspots",elem.hotspot)
				}
			})

		},
		showWindow:function(num) {
			$("#spot"+num).fadeIn()
		},
		openWindowEditor:function(mView){
				var hotSpotWindowModel = new HotSpotWindowModel({id:this.hotspotCount})
				var linkhotspotEditorview = new mView({model:hotSpotWindowModel});
				linkhotspotEditorview.render("spot"+this.hotspotCount,linkhotspotEditorview.renderExtend);
		}
		
	});

	return HotSpotsMenuView;
	
});
