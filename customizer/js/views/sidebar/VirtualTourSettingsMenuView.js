define([
	'jquery',
	'underscore',
	'backbone',
	'views/sidebar/SidebarSubMenu',
	'text!templates/sidebar/virtualTourSettingsMenu.html',
	'mCustomScrollbar',
	'helpers/HelpFunctions',
	'views/sidebar/MapView',

], function($, _, Backbone,SidebarSubMenu,virtualTourSettingsMenu,mCustomScrollbar,HelpFunctions,MapView){

	var VirtualTourSettingsMenuView = SidebarSubMenu.extend({

		initialize: function () {
		  this.events = this.events || {};
		  var eventKey = 'click #' + this.model.get("elem") + ' h3';
		  this.events[eventKey] = 'openSubItems';
		  var checkboxesEvent = 'click #'+ this.model.get("elem") +' .checkboxes li';
		  this.events[checkboxesEvent] = 'selectCheckboxes';
		  this.delegateEvents();
		},

		render: function(){
			var data = {

				settings:tourData.krpano.settings,
				autorotate:tourData.krpano.autorotate,
				control:tourData.krpano.control,
			}
			var compiledTemplate = _.template(virtualTourSettingsMenu,{data:data});
			$(this.el).append( compiledTemplate ); 
			var elem = this.model.get("elem");
			this.$elem = $("#"+elem);
			
			this.model.set("elemWidth",this.$elem.width());
			
			var helpFunctions = new HelpFunctions();

			helpFunctions.setInnerHeight(elem);
			$(window).resize(function(){
					helpFunctions.setInnerHeight(elem);

			});
			$("#"+elem+" .inner").mCustomScrollbar({
				theme:"minimal-dark",
				scrollInertia:300,
				});

			this.show();
			this.mapView = new MapView();
			this.mapView.render(elem);
			
			helpFunctions.dropDown(".dd-settingmenu");
			helpFunctions.checkbox(".check-group","fa-check-square","fa-square");
			helpFunctions.selectChoice(".checkboxes","fa-circle-o","fa-circle");
			helpFunctions.toolTip(".submenu .help","aside help");
		},

		openSubItems:function(e){
			$mineSub = $(e.target).parent("li").find(".sub-items")
			$("#"+this.model.get("elem")+" .sub-items").not($mineSub).slideUp();
			$mineSub.slideToggle();
			//google.maps.event.trigger(map, "resize");
			this.mapView.refreshSizeMap()
		},

		selectCheckboxes:function(e){
			var target = $(e.target);
			if(target.is("span")){
				elem = $(e.target).parent("li")
			}else{
				elem = $(e.target)

			}
			if($(elem).data("evt") == "singleLoc"){
				$("#virtualTourSettings-menu .map-wrapper").show()
			}else{
				$("#virtualTourSettings-menu .map-wrapper").hide()
			}
		}
		
	});

	return VirtualTourSettingsMenuView;
	
});
