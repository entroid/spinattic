define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/logoSkillEditor.html',
	'helpers/HelpFunctions',
	'views/modal/SingleUploader',
	'mCustomScrollbar'  

], function($, _, Backbone,Modal,logoSkillEditor,HelpFunctions,SingleUploader, mCustomScrollbar){

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
			$("#"+myid+" header h2").text("Logo Skill Editor");
			$("#"+myid).find(".save-and-close").unbind("click");
			$(".scrollwrapper").mCustomScrollbar({
				theme:"minimal-dark",
				scrollInertia:300
			});

			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+myid+" .dropdown");
			
			var SingleUploaderModel = Backbone.Model.extend({});
			var singleUploaderModel = new SingleUploaderModel({myid:"logo-skill-editor-img",imgsrc:tourSkill.plugin._url})
			var singleUploader = new SingleUploader({model:singleUploaderModel});
			singleUploader.render();

		},

	
		doneEdition:function(e){
			var myid = this.myid;
			
			var tourSkill = this.model.get("tourSkill");
			var mytourSkill;
			if(tourData.krpano.plugin.length == undefined){
				mytourSkill = tourData.krpano.plugin ;
			}else{
				_.each(tourData.krpano.plugin,function(elem,ind){
					if(elem._kind == tourSkill.plugin._kind){
							mytourSkill = tourData.krpano.plugin[ind];
					}
				})
			}
			
			mytourSkill._url = $("#logo-skill-editor-img").data("imgsrc");
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
			this.removeModal(e);
			this.undelegateEvents();
		
		}
	});

	return LogoSkillEditor;
	
});
