define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/logoSkillEditor.html',
	'helpers/HelpFunctions',
	

], function($, _, Backbone,Modal,logoSkillEditor,HelpFunctions){

	var LogoSkillEditor = Modal.extend({
		
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
			var template = _.template(logoSkillEditor,{tourSkill:tourSkill})

			$("#"+myid+" .inner-modal").html(template);
			$("#"+myid+" header h2").text("Logo Skill Editor")
			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+myid+" .dropdown");
			

			this.verticalCent();
		},

	
		doneEdition:function(){
		
		}
	});

	return LogoSkillEditor;
	
});
