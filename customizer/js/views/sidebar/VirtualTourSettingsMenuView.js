define([
	'jquery',
	'underscore',
	'backbone',
	'views/sidebar/SidebarSubMenu',
	'text!templates/sidebar/virtualTourSettingsMenu.html',
	'mCustomScrollbar',
	'helpers/HelpFunctions',
	'views/sidebar/MapView',
	'helpers/ManageData',
	'views/modal/MapModalView',
	'lib/tagsinput/tagsinput',

	
], function($, _, Backbone,SidebarSubMenu,virtualTourSettingsMenu,mCustomScrollbar,HelpFunctions,MapView,ManageData,MapModalView,tagsinput){

	var VirtualTourSettingsMenuView = SidebarSubMenu.extend({

		initialize: function () {

		  this.events = this.events || {};

		  var eventKey = 'click #' + this.model.get("elem") + ' h3';
		  this.events[eventKey] = 'openSubItems';

		  var checkboxesEvent = 'click #'+ this.model.get("elem") +' .checkboxes li';
		  this.events[checkboxesEvent] = 'selectCheckboxes';

		  var inputs = "keyup #virtualTourSettings-menu .tour-data";
		  var inputsChange = "mouseup #virtualTourSettings-menu .tour-data";
		  this.events[inputs] = 'insertData';
		  this.events[inputsChange] = 'insertData';

		  var onoff = 'change .autorotate-settings .switchInput input[type="checkbox"]'
		  this.events[onoff] = 'onOffSwitch'

		  var zoomMap = 'click #virtualTourSettings-menu .fa-search';
		  this.events[zoomMap] = 'zoomMap';

		  var checkEvent = "click .check-group li";
		  this.events[checkEvent] = "CheckUncheck";

		  var liddEvent = "click  #virtualTourSettings-menu .general-settings .dropdown li";
		  this.events[liddEvent] = "saveDD";

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
			var MapModel = Backbone.Model.extend({});
			var mapModel = new MapModel({lat:data.settings._lat,lng:data.settings._long})
			
			this.mapView = new MapView({model:mapModel});
			this.mapView.render(elem,"settings");
			
			helpFunctions.dropDown(".dd-settingmenu");
			helpFunctions.checkbox(".check-group","fa-check-square","fa-square");
			helpFunctions.selectChoice(".checkboxes li","fa-circle-o","fa-circle");
			helpFunctions.toolTip(".submenu .help","aside help");

			var open = false;
			$('#tagsTour').tagsInput({
			'width': '265px',
			'height':'70px',
			'defaultText':'add a tag',
			onChange: function(elem, elem_tags)
			{
				console.log("a")
			    /*   var languages = ['php','ruby','javascript'];
			    $('.tag', elem_tags).each(function()
			    {
			            if($(this).text().search(new RegExp('\\b(' + languages.join('|') + ')\\b')) >= 0)
			                    $(this).css('background-color', 'yellow');
			    });*/

			//console.log($(this).val());
			},
			onRemoveTag: function(elem, elem_tags)
			{

			},                            
			autocomplete_url:'../php-stubs/tags.json', // jquery ui autocomplete requires a json endpoint
			autocomplete:{appendTo:"#toAppendTags",open:function(){

					$("#toAppendTags .ui-widget-content").mCustomScrollbar({
							theme:"minimal-dark",
							scrollInertia:300,
							});
				},
				close:function(){
					$("#toAppendTags .ui-widget-content").mCustomScrollbar("destroy")
					}
				}
			});
		   
		},

		openSubItems:function(e){

			var clickParent = $(e.target).parents("li"),
			caret = clickParent.find('.caret'),
			$mineSub = clickParent.find(".sub-items");

			$("#" + this.model.get("elem") + " .sub-items").not( $mineSub ).slideUp();
			clickParent.siblings().find('.caret').removeClass( 'fa-caret-up').addClass( 'fa-caret-down');

			caret.toggleClass('fa-caret-down fa-caret-up');
			$mineSub.slideToggle();

			//google.maps.event.trigger(map, "resize");
			this.mapView.refreshSizeMap()
		},

		selectCheckboxes: function(e) {

			var target = $(e.target);

			if(target.is("span")){
				elem = $(e.target).parent("li")
			} else {
				elem = $(e.target)
			}

			if($(elem).data("evt") == "singleLoc"){
				$("#virtualTourSettings-menu .map-wrapper").show();
				$('#virtualTourSettings-menu .bigger-map').show();
			} else {
				$("#virtualTourSettings-menu .map-wrapper").hide();
				$('#virtualTourSettings-menu .bigger-map').hide();
			}

		},

		insertData:function(e){

			var manageData = new ManageData();
			manageData.saveSettings(e);
		
		},

		onOffSwitch: function(e) {
			var selectedInput = e.target;

			if (!$(selectedInput).prop( 'checked' )) {
				$(selectedInput).parent().siblings('input[type="number"]').prop('disabled', true).addClass('disabled')
			} else {
				$(selectedInput).parent().siblings('input[type="number"]').prop('disabled', false).removeClass('disabled');
			}
		},

		zoomMap:function(){

			var me = this;
			var MapModel = Backbone.Model.extend({});
			var mapModel = new MapModel({lat:$("#virtualTourSettings-menu .latFld").val(),lng:$("#virtualTourSettings-menu .lngFld").val(),elemToAttach:"virtualTourSettings-menu"})
			var mapModalView = new MapModalView({model:mapModel});
			mapModalView.render("mapModal",mapModalView.renderExtend);
			this.mapView.removeMap();
		},

		CheckUncheck:function(e){
			var manageData = new ManageData();
			var name = $(e.target).prop("tagName")
			if(name == "LI"){
			$chkbox = $(e.target).find(".fa-lg")
			}else{
			$chkbox = $(e.target)
			}
			if($chkbox.hasClass("fa-check-square")){
				manageData.saveTourData($chkbox.attr("id"),"on")
			}else{
				manageData.saveTourData($chkbox.attr("id"),"off")
			}
		},

		saveDD:function(e){
			var manageData = new ManageData();
			manageData.saveTourData($(e.target).parent().attr("class"),$(e.target).text())
		}


		
	});

	return VirtualTourSettingsMenuView;
	
});
