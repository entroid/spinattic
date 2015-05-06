define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/signatureSkillEditor.html',
	'helpers/HelpFunctions',
	'views/modal/SingleUploader',
	'mCustomScrollbar',
	'helpers/HelpFunctions',
	'helpers/ManageData',
	'helpers/ManageTour',


], function($, _, Backbone,Modal,signatureSkillEditor,HelpFunctions,SingleUploader, mCustomScrollbar,HelpFunctions,ManageData,ManageTour){

	var SignatureSkillEditor = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);        
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{
			"click #Context-menu-finish":"doneEdition"
		},
		
		renderExtend:function(){

			var myid = this.myid;
			var tourSkill = this.model.get("tourSkill");

			var template = _.template(signatureSkillEditor,{tourSkill:tourSkill})
			$("#"+myid+" .inner-modal").html(template);
			_.each($("#signature-skill-align .fa-circle"),function(elem,ind){
				if($(elem).data("pos") == tourSkill.plugin._align){
					$(elem).addClass("selected");
				}
			})
			$("#"+myid+" header h2").text("Signature Skill Editor")
			$("#"+myid).find(".save-and-close").unbind("click");
			
			$(".scrollwrapper").mCustomScrollbar({
				theme:"minimal-dark",
				scrollInertia:300
			});

			var helpFunctions = new HelpFunctions();
			helpFunctions.nineGrillSelector("#"+myid+" .position");

			var tour_id = location.hash.split("/")[1];
			var caso = 'skills';
			
			var SingleUploaderModel = Backbone.Model.extend({});
			var singleUploaderModel = new SingleUploaderModel({myid:"signature-skill-editor-img",imgsrc:tourSkill.plugin._url,tour_id:tour_id,caso:caso})
			
			var singleUploader = new SingleUploader({model:singleUploaderModel});
			singleUploader.render();

		},

	
		doneEdition:function(e){
			var myid = this.myid;
			var tourSkill = this.model.get("tourSkill");
			
			console.log(tourSkill)
			
			tourSkill.plugin._url = $("#signature-skill-editor-img").data("imgsrc");
			tourSkill.plugin._x = $("#signature-skill-x").val();
			tourSkill.plugin._y = $("#signature-skill-y").val();
			tourSkill.plugin._zorder = $("#signature-skill-zorder").val();
			tourSkill.plugin._onclick = "openurl("+$("#signature-skill-linkto").val()+",_blank);";
			tourSkill.plugin._align = $("#signature-skill-align .selected").data("pos")

			var manageData = new ManageData();
			var manageTour = new ManageTour();
			manageData.editSkill(tourSkill,manageTour.reloadTour)
			this.removeModal(e);
			this.undelegateEvents();
		
		}
	});

	return SignatureSkillEditor;
	
});
