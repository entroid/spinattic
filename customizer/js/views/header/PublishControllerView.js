define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/header/publishcontrollerview.html',
	'views/modal/LiveTourView',
	'helpers/HelpFunctions',
	'helpers/ManageData',
	'models/main/ModalModel',
	'views/modal/ConfirmView'

], function($, _, Backbone, publishcontrollerview, LiveTourView, HelpFunctions,ManageData,ModalModel,ConfirmView){

	var PublishControllerView = Backbone.View.extend({

		el: $(".header-bottom"),

		initialize: function () {
		  
		},

		events:{  
			"click #onoffswitchpub": "openLiveModal",
			"click #publish.active":"sendToLive",
			"savingtour #publishController":"savingTour",
			"savedtour #publishController":"savedTour"
		},

		render: function(){
			var este = this;
			var helpFunctions = new HelpFunctions();
			var datepub = tourData.krpano.datatour.date_published;
			var dateupdate = tourData.krpano.datatour.date_updated;
			var deploy;
			if(datepub != ""){
				var published = new Date(datepub);
				var updated = new Date(dateupdate);
				if(updated > published){
					deploy = true;
				}
			}
			var compiledTemplate = _.template(publishcontrollerview,{datepub:datepub,dateupdate:dateupdate,deploy:deploy});
			$(this.el).append( compiledTemplate );

			if(datepub!=""){
				$("#draft").data("live","published")
				$("#publish").attr("title","Deploy draft to LIVE version");
				helpFunctions.toolTip("#publishController #publish", "publish up");

			}
			if ($('#onoffswitchpub').is(":checked")) {
				helpFunctions.toolTip("#publishController .onoffswitch", "publish up");
				$("#tourTitleBar").trigger("updatepublish",["on"])
			}
			helpFunctions.toolTip("#publishController .fa-question-circle", "publish up");
			

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
			
			} else {
				var msg = "Are you sure you want to turn your tour Offline?";
				var evt = function(){
					var manageData = new ManageData();
					manageData.saveLive("notlive");
					 $("#draft").data("live","unpublished")
					$('#publishController .onoffswitch').unbind('mouseenter');
					$('#publishController .onoffswitch').removeAttr('title');
					$("#confirmDel .fa-close").trigger("click");
					$("#onoffswitchpub").prop("checked",false);
					$("#publish").removeClass("active")
					$("#publishController #publish").unbind("mouseenter");
					$("#publishController #publish").removeAttr("title");
					$("#tourTitleBar").trigger("updatepublish",["off"])
			
				}
				$("#onoffswitchpub").prop("checked",true);
				var modalModel = new ModalModel({msg:msg,evt:evt})
				var alertView = new ConfirmView({model:modalModel});
				alertView.render("confirmDel",alertView.renderExtend);

			}
		},

		sendToLive:function(){
				var callB = function(){
					$("#draft").removeClass("active");
					$("#publish .loading").remove();
					$("#publish").removeClass("active")
					$("#publishController #publish").unbind("mouseenter");
					$("#publishController #publish").removeAttr("title");
				}
				$("#publish").html('<div class="loading"></div>')
				var manageData = new ManageData();
				manageData.saveLive("live",callB);
			},

		savingTour:function(){
			$("#publish").removeClass("active");
			$("#publishController #publish").unbind("mouseenter");
			$("#publishController #publish").removeAttr("title");
			if(!$("#publishController #draft").hasClass("active")){
					$("#publishController #draft").addClass("active")
				}
				$("#draft .loading-wrapper").show();
		},
		savedTour:function(evt,text){
			$("#draft .loading-wrapper").html('<i class="fa fa-check"></i> Draft Saved').delay(1000).fadeOut(function(){
							$("#draft .loading-wrapper").html('<div class="loading"></div>')
						});
			if($("#draft").data("live") == "published"){
					$("#publish").addClass("active");
					$("#publish").attr("title","Deploy draft to LIVE version");
					var helpFunctions = new HelpFunctions();
					helpFunctions.toolTip("#publishController #publish", "publish up");
				}
						$("#draft .date").text(text);
		} 
	});

	return PublishControllerView;  
});
