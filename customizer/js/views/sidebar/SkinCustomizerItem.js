define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar/skincustomizeritem.html',
	'views/modal/SkillEditor',
	'views/modal/ContextMenuSkillEditor',
	'views/modal/LogoSkillEditor',
	'views/modal/SignatureSkillEditor',
	'views/modal/LoadingBarSkillEditor',

], function($, _, Backbone,skincustomizeritem,SkillEditor,ContextMenuSkillEditor,LogoSkillEditor,SignatureSkillEditor,LoadingBarSkillEditor){

	var SkinCustomizerItem = Backbone.View.extend({

		events:{
		},

		initialize: function () {

		   _.bindAll(this);
	   },
		
		render:function(){
			
			var data = this.model.get("data");
			var compiledTemplate = _.template(skincustomizeritem,{data:data});
			$("#skinCustomizer-menu .skill-list").append(compiledTemplate);

			$('#skill-' + data.id ).data("skill",data);
			$('#skill-' + data.id + ' .customizelink').click(this.editSkill);
			var view = this;
			$('#skill-' + data.id + ' .fa-close').click(function(event){
				
				var v = view;
				view.removeSkill(event,v)
				
				});
		  	
		},

		editSkill:function(e){
			var skill = $(e.target).parents("li").data("skill");
			var tourSkill = this.model.get("tourSkill");
			console.log(skill.id)
			switch(skill.id){
				case "1":
				var mview = ContextMenuSkillEditor;
				break;
				case "2":
				var mview = LoadingBarSkillEditor;
				break;
				case "3":
				var mview = LogoSkillEditor;
				break;
				case "4":
				var mview = SignatureSkillEditor;
				break;
				default:
				var mview = SkillEditor
			}
			
			if($(".skillModal").length){

					$(".skillModal").find(".save-and-close").trigger("click");

			}
				var SkillModel = Backbone.Model.extend({});
				skillModel = new SkillModel({data:skill,tourSkill:tourSkill});
				var skillEditor = new mview({model:skillModel});
				skillEditor.render("skillsEditor-"+skill.id,skillEditor.renderExtend);
				$("#skillsEditor-"+skill.id).addClass("skillModal").parent(".overlay").addClass("skillWindow");
				skillEditor.verticalCent();
			
		},

		removeSkill:function(e,v){

			var data = this.model.get("data");
			if($('#skillsEditor-' + data.id ).length){
				$('#skillsEditor-' + data.id ).find(".save-and-close").trigger("click");
			}
			$('#skill-' + data.id ).remove();
			v.undelegateEvents();
			v.remove();

		}
		
	});

	return SkinCustomizerItem;
	
});
