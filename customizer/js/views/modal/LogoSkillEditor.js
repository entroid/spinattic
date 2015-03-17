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
		"click #logo-skill-finish":"doneEdition"
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
			var tourSkill = this.model.get("tourSkill");
			var mytourSkill = tourSkill
			
			mytourSkill._url = $("#logo-skill-image-url").val();
			mytourSkill._x = $("#logo-skill-x").val();
			mytourSkill._y = $("#logo-skill-y").val();
			mytourSkill._zorder = $("#logo-skill-zorder").val();
			mytourSkill._onclick = "openurl("+$("#logo-skill-linkto").val()+",_blank);";


			if(tourData.krpano.plugin.length == undefined){
				tourData.krpano.plugin = mytourSkill;
			}else{
				_.each(tourData.krpano.plugin,function(elem,ind){
					if(elem._kind == mytourSkill._kind){
						tourData.krpano.plugin[ind] = mytourSkill;
					}
				})
			}

			$("#"+myid+"header .fa-close").trigger("click");
		
		}
	});

	return LogoSkillEditor;
	
});
