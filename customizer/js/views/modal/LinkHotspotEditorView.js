define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
    'text!templates/modal/hotspotlink.html',
    'helpers/HelpFunctions',

], function($, _, Backbone,Modal,hotspotlink,HelpFunctions){

	var LinkHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var num = this.myid.replace("spot","");
			$("#"+this.myid+" header h2").text("Link Hotspot. ID "+num+":")
			var compiledTemplate = _.template(hotspotlink)
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);
			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+this.myid+" .dropdown");
			$("#"+this.myid).find(".fa-close").remove();
			$("#"+this.myid+" header .save-and-close").unbind("click")
			$("#"+this.myid+" header .save-and-close").click(function(){
				$(this).parents(".modal").fadeOut();
			})

		},
		removeHotSpot:function(){
			
		}

		
	});

	return LinkHotspotEditorView;
	
});
