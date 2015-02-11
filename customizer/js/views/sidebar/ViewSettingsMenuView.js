define([
	'jquery',
	'underscore',
	'backbone',
	'views/sidebar/SidebarSubMenu',
	'text!templates/sidebar/viewSettingsMenu.html'

], function($, _, Backbone,SidebarSubMenu,viewSettingsMenu){

	var ViewSettingsMenuView = SidebarSubMenu.extend({
		
		initialize: function () {
		
		},
		events:{

			"change #viewSettings-menu input":"changeValuePano"
				 },
		
		render: function(){
			var compiledTemplate = _.template(viewSettingsMenu);
			$(this.el).append( compiledTemplate ); 
			this.$elem = $("#"+this.model.get("elem"));
			this.model.set("elemWidth",this.$elem.width());
			this.show();
			this.refreshData();
		},

		changeValuePano:function(e){
			myid = $(e.target).attr("id");
			console.log(myid)
			var param = ""
			switch(myid){
				case "fov":
				param = "fov"
				break;
				case "max-zoom":
				param = "maxpixelzoom"
				break;
				case "fov-max":
				param = "fovmax"
				break;
				case "fov-min":
				param = "fovmin"
				break;
				case "hor":
				param = "hfov"
				break;
				case "vert":
				param = "vfov"
				break;
			}
			krpano = document.getElementById("krpanoSWFObject");
			krpano.set("view."+param,$("#"+myid).val())
			this.updateData(e);
		},

		refreshData:function(){
			if($("#viewSettings-menu").length){
			var scenedata = $("#tour").data("scene");
			$("#viewSettings-menu").data("scenename",scenedata._name)
			$("#viewSettings-menu #hor").val(scenedata.view._hlookat)
			$("#viewSettings-menu #hor").data("obj","_hlookat")
			$("#viewSettings-menu #vert").val(scenedata.view._vlookat)
			$("#viewSettings-menu #vert").data("obj","_vlookat")
			$("#viewSettings-menu #fov").val(scenedata.view._fov)
			$("#viewSettings-menu #fov").data("obj","_fov")
			$("#viewSettings-menu #fov-min").val(scenedata.view._fovmin)
			$("#viewSettings-menu #fov-min").data("obj","_fovmin")
			$("#viewSettings-menu #fov-max").val(scenedata.view._fovmax)
			$("#viewSettings-menu #fov-max").data("obj","_fovmax")
			$("#viewSettings-menu #max-zoom").val(scenedata.view._maxpixelzoom)
			$("#viewSettings-menu #max-zoom").data("obj","_maxpixelzoom")
			
			}
		},

		updateData:function(e){
			_.each(tourData.krpano.scene,function(elem){
				if(elem._name == $("#viewSettings-menu").data("scenename")){
					var newVal = $(e.target).val();
					elem.view[$(e.target).data("obj")] = newVal;
					$("#tour").data("scene",elem);
					$("#sceneMenu").find("#"+$("#sceneSettings-menu").data("scenename")).data("scene",elem)
				}
			})
		}

		
	});

	return ViewSettingsMenuView;
	
});
