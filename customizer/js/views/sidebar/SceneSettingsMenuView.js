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
			helpFunctions.refreshData();
			var mapView = new MapView();
			mapView.render(elem);
			},

		updateData:function(e){
			var manageData = new ManageData();
			manageData.saveSceneOnTour( $("#sceneSettings-menu").data("scenename"),$(e.target).data("obj"),$(e.target).val())
		}

		
	});

	return SceneSettingsMenuView;
	
});
