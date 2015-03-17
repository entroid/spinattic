define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/contextMenuSkillEditor.html',

], function($, _, Backbone,Modal,contextMenuSkillEditor){

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
			var template = _.template(contextMenuSkillEditor,{tourSkill:tourSkill})

			console.log(tourSkill);
			$("#"+myid+" .inner-modal").html(template);
			$("#"+myid+" header h2").text("Context Menu Skill Editor")
			
			/*$("#"+myid+" header .fa-close").unbind("click");
			$("#"+myid+" header .fa-close").click(function(evt){
				$("#"+myid).parent(".overlay").hide();
			})*/


			this.verticalCent();
		},

	
		doneEdition:function(){
		
		}
	});

	return LogoSkillEditor;
	
});
