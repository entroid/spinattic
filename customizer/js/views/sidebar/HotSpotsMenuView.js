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
	'helpers/HelpFunctions'


], function($, _, Backbone,SidebarSubMenu,hotspotsMenu,LinkHotspotEditorView,InfoHotspotEditorView,PhotoHotspotEditorView,VideoHotspotEditorView,ArrowHotspotEditorView,HotSpotWindowModel,ManageData,HelpFunctions){

	var HotSpotsMenuView = SidebarSubMenu.extend({
		hotspotCount: 0,
		
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
			regPos = this.regPos;
			var krpano = document.getElementById("krpanoSWFObject");
			krpano.call("addhotspot("+__name+")");
			//krpano.set("hotspot[spot"+this.hotspotCount+"].url", __url);
			var __ath   =  krpano.get('view.hlookat')-Math.floor(Math.random() * 45); 
		    var __atv   =  krpano.get('view.vlookat')-Math.floor(Math.random() * 25); 
			krpano.set("hotspot[spot"+this.hotspotCount+"].ath", __ath);
			krpano.set("hotspot[spot"+this.hotspotCount+"].atv", __atv);
			krpano.call("hotspot[spot"+this.hotspotCount+"].loadStyle(hotspot_set1_arrow);");
			//krpano.set("hotspot[spot"+this.hotspotCount+"].crop",__posx);
			krpano.call('set(hotspot[spot'+this.hotspotCount+'].ondown, draghotspot() );');
    		//krpano.call('set(hotspot[spot'+this.hotspotCount+'].onclick, js(showWindow('+__name+')) );');
    		krpano.call('set(hotspot[spot'+this.hotspotCount+'].onup, js(regPos('+__name+')) );');
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
    		var manageData = new ManageData();
    		manageData.pushHotspot( $("#tour").data("scene")._name,hotspot)
    		$("#spot"+this.hotspotCount).data("spotdata",hotspot)

		},
		showWindow:function(elem) {
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
				//var hotSpotWindowModel = new HotSpotWindowModel({id:this.hotspotCount})
				//var linkhotspotEditorview = new mView({model:hotSpotWindowModel});
				//linkhotspotEditorview.render("spot"+this.hotspotCount,linkhotspotEditorview.renderExtend);
		},

		selectStyleClick:function(ev){
			var obj = ev.currentTarget
			console.log($(obj))
			var set = $(obj).next().find(".rowinrow").data("family");
			console.log(set)
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
				$("#hotspots-menu-header ul").html("")
				_.each(selected,function(elem,ind){ 
					 var crop = elem._crop.split("|")
					 $("#hotspots-menu-header ul").append('	<li id="'+elem._kind+'" class="htpt"><div class="selected" style="background-image:url('+elem._url+');background-position:-'+crop[1]+'px 0"></div></li>');
				 })
					$("#hotspots-menu-header ul").append('<li id="open-styles">hotspots styles</li>');
			},

		showhideStyles:function(){
			$("#hotspot-styles").toggle()
		}
		
	});

	return HotSpotsMenuView;
	
});
