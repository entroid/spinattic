define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/header/publishcontrollerview.html',
	'views/modal/LiveTourView',
	'helpers/HelpFunctions',
	'helpers/ManageData'

], function($, _, Backbone, publishcontrollerview, LiveTourView, HelpFunctions,ManageData){

	var PublishControllerView = Backbone.View.extend({

		el: $(".header-bottom"),

		initialize: function () {
		  
		},

		events:{  
			"click #onoffswitchpub": "openLiveModal",
			"click #publish.active":"sendToLive"
		},

		render: function(){
			var este = this;
			var compiledTemplate = _.template(publishcontrollerview);
			var helpFunctions = new HelpFunctions();

			$(this.el).append( compiledTemplate );

			if ($('#onoffswitchpub').is(":checked")) {
				helpFunctions.toolTip("#publishController .onoffswitch", "publish up");
			}
			helpFunctions.toolTip("#publishController .fa-question-circle", "publish up");
			helpFunctions.toolTip("#publishController #publish", "publish up");

			//avoid tooltip bubble up
			$("#publishController .onoffswitch .onoffswitch-inner").mouseenter(function(e){
				e.stopPropagation();
			});

		},

		openLiveModal: function(e) {
			var helpFunctions = new HelpFunctions();

			if($(e.target).is(":checked")){
				this.liveTourView = new LiveTourView();
				this.liveTourView.render("liveTourModal",this.liveTourView.renderExtend);
				helpFunctions.toolTip("#publishController .onoffswitch", "publish up");
			} else {
				var manageData = new ManageData();
				manageData.saveLive("notlive");
				 $("#draft").data("live","unpublished")
				$('#publishController .onoffswitch').unbind('mouseenter');
			}
		},

		sendToLive:function(){
				var callB = function(){
					$("#draft").removeClass("active");
					$("#publish .loading").remove();
					$("#publish").removeClass("active")
				}
				$("#publish").html('<div class="loading"></div>')
				var manageData = new ManageData();
				manageData.saveLive("live",callB);
			}    
	});

	return PublishControllerView;  
});
