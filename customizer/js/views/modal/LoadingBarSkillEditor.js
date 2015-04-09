define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/loadingBarSkillEditor.html',
	'helpers/HelpFunctions',
	'views/modal/SingleUploader',
	'mCustomScrollbar',
	'jqueryui',
	'colorpicker'  

], function($, _, Backbone,Modal,loadingBarSkillEditor,HelpFunctions,SingleUploader, mCustomScrollbar,jqueryui,colorpicker){

	var LoadingBarSkillEditor = Modal.extend({
		
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
			var template = _.template(loadingBarSkillEditor,{tourSkill:tourSkill})

			$("#"+myid+" .inner-modal").html(template);
			$("#"+myid+" header h2").text("Signature Skill Editor")
			$("#"+myid).find(".save-and-close").unbind("click");
			
			$(".scrollwrapper").mCustomScrollbar({
				theme:"minimal-dark",
				scrollInertia:300
			});

			var helpFunctions = new HelpFunctions();
            helpFunctions.dropDown(".dropdown");
            $('#loading-bar-back-bgcolor').colorpicker();
            $('#loading-bar-bar-bgcolor').colorpicker();
			console.log(tourSkill)
			
		},

	
		doneEdition:function(e){
			var myid = this.myid;
			var tourSkill = this.model.get("tourSkill");
			var mytourSkill;
			/*
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
			}*/
			this.removeModal(e);
			this.undelegateEvents();
		
		}
	});

	return LoadingBarSkillEditor;
	
});
