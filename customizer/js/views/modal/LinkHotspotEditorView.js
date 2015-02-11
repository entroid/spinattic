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
			$("#"+this.myid+" header .fa-close").unbind("click")
			$("#"+this.myid+" header .fa-close").click(function(){
				$(this).parents(".modal").fadeOut();
			})

		},
		removeHotSpot:function(){
			
		}

		
	});

	return LinkHotspotEditorView;
	
});
