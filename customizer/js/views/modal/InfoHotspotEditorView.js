define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/hotspotinfo.html',
	'helpers/HelpFunctions',
	'helpers/ManageData',
	'views/modal/HotSpotsDropDown',
	

], function($, _, Backbone,Modal,hotspotinfo,HelpFunctions,ManageData,HotSpotsDropDown){

	var InfoHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var manageData = new ManageData();
			var num = this.myid.replace("spot","");
			var spotName =  this.myid;
			$("#"+spotName+" header h2").text("Info Hotspot. ID "+num+":")
			var compiledTemplate = _.template(hotspotinfo)
			$("#"+spotName+" .inner-modal").html(compiledTemplate);
			
			
			$("#"+this.myid+" header .fa-close").unbind("click")
			var $me = $("#"+this.myid);
			var myid = this.myid;
			var selectedset = this.model.get("selectedSet");
			var HotSpotDDModel = Backbone.Model.extend({});
		    hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"info",elemid:myid});
		    var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
			hotSpotsDropDown.render();

			
			$me.find("header .fa-close").click(function(){

				var infoTitle = $me.find(".infotitle").val();
				var infoText = $me.find(".infotext").val();
				var hotspot = $me.data("spotdata");
				hotspot._infotitle = infoTitle;
				hotspot._infotext = infoText;
				manageData.changeDataInHotSpot($("#tour").data("scene")._name, hotspot)
				$(this).parents(".modal").fadeOut();
			})

			$me.find(".removeHotspot").click(function(){
				var krpano = document.getElementById("krpanoSWFObject");
				krpano.call("removehotspot("+spotName+")");
				$(this).parents(".modal").fadeOut(function(){
					$(this).parent(".hotspotwindow").remove();
				});
				manageData.removeHotSpot($("#tour").data("scene")._name, spotName)
			})

		}

		
	});

	return InfoHotspotEditorView;
	
});
