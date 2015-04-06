define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
    'text!templates/modal/hotspotvideo.html',

], function($, _, Backbone,Modal,hotspotvideo){

	var PhotoHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var num = this.myid.replace("spot","");
			$("#"+this.myid+" header h2").text("Video Hotspot. ID "+num+":")
			var compiledTemplate = _.template(hotspotvideo)
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);
			$("#"+this.myid).find(".fa-close").remove();
			$("#"+this.myid+" header .save-and-close").unbind("click")
			$("#"+this.myid+" header .save-and-close").click(function(){
				$(this).parents(".modal").fadeOut();
			})

		}

		
	});

	return PhotoHotspotEditorView;
	
});
