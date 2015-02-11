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

			this.openWindowEditor(modalView);
			showWindow = this.showWindow;
			var krpano = document.getElementById("krpanoSWFObject");
			krpano.call("addhotspot(spot"+this.hotspotCount+")");
			krpano.set("hotspot[spot"+this.hotspotCount+"].url", 'images/icons/hotspots.png');
			var _ath   =  krpano.get('view.hlookat')-Math.floor(Math.random() * 45); 
		    var _atv   =  krpano.get('view.vlookat')-Math.floor(Math.random() * 25); 
			krpano.set("hotspot[spot"+this.hotspotCount+"].ath", _ath);
			krpano.set("hotspot[spot"+this.hotspotCount+"].atv", _atv);
			krpano.set("hotspot[spot"+this.hotspotCount+"].crop", posx+"|00|32|32");
			krpano.call('set(hotspot[spot'+this.hotspotCount+'].ondown, draghotspot() );');
    		krpano.call('set(hotspot[spot'+this.hotspotCount+'].onclick, js(showWindow('+this.hotspotCount+')) );');
    		$(".overlay").addClass("hotspotwindow");
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
