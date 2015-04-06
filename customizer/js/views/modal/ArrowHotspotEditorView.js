define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/hotspotarrow.html',
	'helpers/HelpFunctions',
	'views/modal/HotSpotsDropDown',
	

], function($, _, Backbone,Modal,hotspotarrow,HelpFunctions,HotSpotsDropDown){

	var ArrowHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var num = this.myid.replace("spot","");
			$("#"+this.myid).addClass("arrow-hotspot");
			$("#"+this.myid+" header h2").text("Arrow Hotspot. ID "+num+":")
			var compiledTemplate = _.template(hotspotarrow)
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);
			$("#"+this.myid).find(".fa-close").remove();
			$("#"+this.myid+" header .save-and-close").unbind("click")
			$("#"+this.myid+" header .save-and-close").click(function(){
				$(this).parents(".modal").fadeOut();
			})

			var selectedset = this.model.get("selectedSet");
			myid = this.myid;
			var HotSpotDDModel = Backbone.Model.extend({});
		    hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"arrow",elemid:myid});
		    var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
			hotSpotsDropDown.render();
			
		}

		
	});

	return ArrowHotspotEditorView;
	
});
