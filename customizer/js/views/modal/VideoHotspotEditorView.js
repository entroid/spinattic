define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/hotspotvideo.html',
	'views/modal/HotSpotsDropDown',
	'helpers/ManageData',
	
], function($, _, Backbone,Modal,hotspotvideo,HotSpotsDropDown,ManageData){

	var PhotoHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var manageData = new ManageData();
			var num = this.myid.replace("spot","");
			$("#"+this.myid+" header h2").text("Video Hotspot. ID "+num+":")
			var allData = this.model.get("allData")
			var compiledTemplate = _.template(hotspotvideo,{allData:allData})
			var myid = this.myid;
			$("#"+myid+" .inner-modal").html(compiledTemplate);
			$("#"+myid).find(".fa-close").remove();
			var me = this;
			$("#"+myid+" header .save-and-close").unbind("click");
			$("#"+myid+" header .save-and-close").click(function(){
				
				var video = $("#"+myid+" #urlvideohotspot").val();
				var tooltip = $("#"+myid+" #videoTooltip").val();
				var hotspot = allData;
				hotspot._video = video;
				hotspot._tooltip = tooltip;
				manageData.changeDataInHotSpot($("#tour").data("scene")._name, hotspot)
				
				$(this).parents(".modal").fadeOut(function(){
					me.removeThis();
				})
			})

			var selectedset = this.model.get("selectedSet");
			var HotSpotDDModel = Backbone.Model.extend({});
			hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"video",elemid:myid});
			var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
			hotSpotsDropDown.render();
		},

		removeThis:function(){
			this.undelegateEvents();
			$("#"+this.myid).parent(".overlay").remove();
		}

		
	});

	return PhotoHotspotEditorView;
	
});
