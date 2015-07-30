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

			"focus #scenetitle":"sentEventByEnter",
			"blur #scenetitle":"changeTitle",
			"focus #friendlyURL":"sentEventByEnter",
			"blur #friendlyURL":"updateData",
			"focus #scene-description":"sentEventByEnter",
			"blur #scene-description":"updateData",
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
			/*
			var singleUploaderModel = new SingleUploaderModel({myid:"scene-thumbnail-src",imgsrc:data._thumburl})
			var singleUploader = new SingleUploader({model:singleUploaderModel});
			singleUploader.render();
			*/
			var MapModel = Backbone.Model.extend({});
			var mapModel = new MapModel({lat:data._lat,lng:data._lng})
			
			this.mapView = new MapView({model:mapModel});

			
			var indice = $("#sceneMenu .selected").index();
			var param = "scene";

			var me = this;
			this.mapView.render(elem,{param:param,indice:indice});
			setTimeout(function(){
				me.mapView.refreshSizeMap()
			},500)
				$("#sceneMenu li").click(function(){
					me.mapView.removeMap();
					var MapModel = Backbone.Model.extend({});
					console.log($(this).data("scene")._lat)
					console.log($(this).data("scene")._lng)
					var mapModel = new MapModel({lat:$(this).data("scene")._lat,lng:$(this).data("scene")._lng})
					me.mapView = new MapView({model:mapModel});
					me.mapView.render(elem,{param:param,indice:$(this).index()});
					
					var thumburl = $(this).data("scene")._thumburl
					
					/*singleUploader.removeThis();
					var singleUploaderModel = new SingleUploaderModel({myid:"scene-thumbnail-src",imgsrc:thumburl})
					singleUploader = new SingleUploader({model:singleUploaderModel});
					singleUploader.render();
					*/

				})
			},

		updateData:function(e){
			var manageData = new ManageData();
			manageData.saveSceneOnTour( $("#sceneSettings-menu").data("scenename"),$(e.target).data("obj"),$(e.target).val());
			$(window).unbind("keydown");
		},

		sentEventByEnter:function(e){
			$(window).keydown(function(event){
				if(event.keyCode == 13) {
					$(e.target).blur();
					event.preventDefault();
					$(window).unbind("keydown");
					return false;
				}
			  });
		},
		changeTitle:function(e){

			this.updateData(e);
			$(window).unbind("keydown");
			var krpano = document.getElementById("krpanoSWFObject");
			krpano.set("scene["+$("#tour").data("scene")._name+"].title",$(e.target).val());
			$("#sceneMenu").trigger("refreshtitlefromscenemenu");
		},

		zoomMap:function(){
			console.log(this)
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
