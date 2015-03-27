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
	'views/modal/SingleUploader',
	'views/modal/MapModalView',


], function($, _, Backbone,SidebarSubMenu,sceneSettingsMenu,mCustomScrollbar,HelpFunctions,ManageData,MapView,SingleUploader,MapModalView){

	var SceneSettingsMenuView = SidebarSubMenu.extend({
		initialize: function () {
		
		},
		events:{

			"keyup #scenetitle":"updateData",
			"keyup #friendlyURL":"updateData",
			"keyup #scene-description":"updateData",
			"click #sceneSettings-menu .fa-search":"zoomMap"
				 },
		
		render: function(){
			var scenedata = $("#tour").data("scene");
			var data = scenedata;
			var compiledTemplate = _.template(sceneSettingsMenu,{data:data});
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


			var SingleUploaderModel = Backbone.Model.extend({});
			console.log(data)
			var singleUploaderModel = new SingleUploaderModel({myid:"scene-thumbnail-src",imgsrc:data._thumburl})
			var singleUploader = new SingleUploader({model:singleUploaderModel});
			singleUploader.render();

			var MapModel = Backbone.Model.extend({});
			var mapModel = new MapModel({lat:data._lat,lng:data._lng})
			
			this.mapView = new MapView({model:mapModel});
			this.mapView.render(elem);

	
			},

		updateData:function(e){
			var manageData = new ManageData();
			manageData.saveSceneOnTour( $("#sceneSettings-menu").data("scenename"),$(e.target).data("obj"),$(e.target).val())
		},

		zoomMap:function(){

			var me = this;
			var MapModel = Backbone.Model.extend({});
			var mapModel = new MapModel({lat:$("#sceneSettings-menu .latFld").val(),lng:$("#sceneSettings-menu .lngFld").val(),elemToAttach:"sceneSettings-menu"})
			var mapModalView = new MapModalView({model:mapModel});
			mapModalView.render("mapModal",mapModalView.renderExtend);
			this.mapView.removeMap();
		}

		
	});

	return SceneSettingsMenuView;
	
});
