define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
    'text!templates/modal/hotspotlink.html',
    'helpers/HelpFunctions',
	'views/modal/HotSpotsDropDown',
	'helpers/ManageData',

], function($, _, Backbone,Modal,hotspotlink,HelpFunctions,HotSpotsDropDown,ManageData){

	var LinkHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var manageData = new ManageData();
			var num = this.myid.replace("spot","");
			var myid = this.myid;
			
			$("#"+this.myid+" header h2").text("Link Hotspot. ID "+num+":")
			var allData = this.model.get("allData")
			var compiledTemplate = _.template(hotspotlink,{allData:allData})
			var myid = this.myid;
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);

			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+this.myid+" .dropdowntarget");
            
			var me = this;
			$("#"+myid).find(".fa-close").remove();
			var $me = $("#"+this.myid);
			$("#"+myid+" header .save-and-close").unbind("click")

			$("#"+myid+" header .save-and-close").click(function(){
				
				var linkurl = $("#"+myid+" .urllinkhotspot").val();
				var tooltip = $("#"+myid+" .linkTooltip").val();
				var target = $("#"+myid+" .dropdowntarget h2 .title").text();
				var hotspot = allData;
				hotspot._linkurl = linkurl;
				hotspot._tooltip = tooltip;
				hotspot._target = target;

				manageData.changeDataInHotSpot($("#tour").data("scene")._name, hotspot)
				
				$(this).parents(".modal").fadeOut(function(){
					me.removeThis();
				})
			})

			var selectedset = this.model.get("selectedSet");
			var HotSpotDDModel = Backbone.Model.extend({});
		    hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"link",elemid:myid});
		    var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
			hotSpotsDropDown.render();
			var spotName =  this.myid;
			$me.find(".removeHotspot").click(function(){
				var krpano = document.getElementById("krpanoSWFObject");
				krpano.call("removehotspot("+spotName+")");
				manageData.removeHotSpot($("#tour").data("scene")._name, spotName);
				$("#"+myid+" header .save-and-close").trigger("click");
			})

		},
		removeThis:function(){
			this.undelegateEvents();
			$("#"+this.myid).parent(".overlay").remove();
		}

		
	});

	return LinkHotspotEditorView;
	
});
