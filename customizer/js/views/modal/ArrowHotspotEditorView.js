define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/hotspotarrow.html',
	'helpers/HelpFunctions',


], function($, _, Backbone,Modal,hotspotarrow,HelpFunctions){

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
			$("#"+this.myid+" header .fa-close").unbind("click")
			$("#"+this.myid+" header .fa-close").click(function(){
				$(this).parents(".modal").fadeOut();
			})

			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+this.myid+" .dropdown");

			$("#"+this.myid+" .dropdown li").each(function(ind){
				$(this).find(".default").css("background-position","0px "+(-32*ind)+"px")
			})
			

		}

		
	});

	return ArrowHotspotEditorView;
	
});
