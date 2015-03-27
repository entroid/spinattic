define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/signatureSkillEditor.html',
	'helpers/HelpFunctions',
	'views/modal/SingleUploader',
	'mCustomScrollbar'  

], function($, _, Backbone,Modal,signatureSkillEditor,HelpFunctions,SingleUploader, mCustomScrollbar){

	var SignatureSkillEditor = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);        
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{
			"click #signature-skill-finish":"doneEdition"
		},
		
		renderExtend:function(){

			var myid = this.myid;
			var tourSkill = this.model.get("tourSkill");
			var template = _.template(signatureSkillEditor,{tourSkill:tourSkill})

			$("#"+myid+" .inner-modal").html(template);
			$("#"+myid+" header h2").text("Signature Skill Editor")
			$("#"+myid).find(".save-and-close").unbind("click");
			
			$(".scrollwrapper").mCustomScrollbar({
				theme:"minimal-dark",
				scrollInertia:300
			});

			
			var SingleUploaderModel = Backbone.Model.extend({});
			var singleUploaderModel = new SingleUploaderModel({myid:"signature-skill-editor-img",imgsrc:tourSkill.plugin._url})
			
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
			mytourSkill._url = $("#signature-skill-editor-img").data("imgsrc");
			mytourSkill._x = $("#signature-skill-x").val();
			mytourSkill._y = $("#signature-skill-y").val();
			mytourSkill._zorder = $("#signature-skill-zorder").val();
			mytourSkill._alpha = $("#signature-skill-alpha").val();
			mytourSkill._onclick = "openurl("+$("#signature-skill-linkto").val()+",_blank);";


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

	return SignatureSkillEditor;
	
});
