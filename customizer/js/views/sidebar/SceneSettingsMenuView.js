define([
	'jquery',
	'underscore',
	'backbone',
	'views/sidebar/SidebarSubMenu',
	'text!templates/sidebar/sceneSettingsMenu.html',
	'mCustomScrollbar',
	'helpers/HelpFunctions',
	'helpers/ManageData',
	'views/sidebar/MapView',


], function($, _, Backbone,SidebarSubMenu,sceneSettingsMenu,mCustomScrollbar,HelpFunctions,ManageData,MapView){

	var SceneSettingsMenuView = SidebarSubMenu.extend({
		initialize: function () {
		
		},
		events:{

			"keyup #scenetitle":"updateData",
			"keyup #friendlyURL":"updateData",
			"keyup #scene-description":"updateData"
				 },
		
		render: function(){
			var scenedata = $("#tour").data("scene");
			data = scenedata;
			var compiledTemplate = _.template(sceneSettingsMenu,data);
			$(this.el).append(compiledTemplate ); 

			var elem = this.model.get("elem")
			this.$elem = $("#"+elem);
			this.model.set("elemWidth",this.$elem.width());
			var helpFunctions = new HelpFunctions();
			helpFunctions.setInnerHeight(elem);
			$(window).resize(function(){
			
					helpFunctions.setInnerHeight(elem);

			});
			$("#sceneSettings-menu .inner").mCustomScrollbar({
				theme:"minimal-dark",
				scrollInertia:300,
				});	
			this.show();
			var mapView = new MapView();
			mapView.render(elem);
			this.refreshData()
			},

		refreshData:function(){
			if($("#sceneSettings-menu").length){
			var scenedata = $("#tour").data("scene");
			$("#sceneSettings-menu").data("scenename",scenedata._name)
			$("#sceneSettings-menu #scenetitle").val(scenedata._title)
			$("#sceneSettings-menu #scenetitle").data("obj","_title")
			$("#sceneSettings-menu #filename").val(scenedata.filename)
			$("#sceneSettings-menu #friendlyURL").val(scenedata._urlname)
			$("#sceneSettings-menu #friendlyURL").data("obj","_urlname")
			$("#sceneSettings-menu figure img").attr("src",scenedata._thumburl);
			$("#sceneSettings-menu .latFld").val(scenedata._lat);
			$("#sceneSettings-menu .latFld").data("obj","_lat");
			$("#sceneSettings-menu .lngFld").val(scenedata._lng);
			$("#sceneSettings-menu .lngFld").data("obj","_lng");
			$("#sceneSettings-menu #scene-description").val(scenedata._description);
			$("#sceneSettings-menu #scene-description").data("obj","_description");

			}
		},

		updateData:function(e){
			var manageData = new ManageData();
			manageData.saveSceneOnTour( $("#sceneSettings-menu").data("scenename"),$(e.target).data("obj"),$(e.target).val())
		}

		
	});

	return SceneSettingsMenuView;
	
});
