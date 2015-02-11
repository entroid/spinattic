define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
    'text!templates/modal/hotspotinfo.html',
    'helpers/HelpFunctions',

], function($, _, Backbone,Modal,hotspotinfo,HelpFunctions){

	var InfoHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var num = this.myid.replace("spot","");
			$("#"+this.myid+" header h2").text("Info Hotspot. ID "+num+":")
			var compiledTemplate = _.template(hotspotinfo)
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);
			$("#"+this.myid+" header .fa-close").unbind("click")
			$("#"+this.myid+" header .fa-close").click(function(){
				$(this).parents(".modal").fadeOut();
			})

		}

		
	});

	return InfoHotspotEditorView;
	
});
