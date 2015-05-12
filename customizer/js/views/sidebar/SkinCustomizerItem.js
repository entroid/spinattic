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
	'helpers/ManageData',
	'helpers/ManageTour',
	'views/modal/StandardLoadingSkillEditor'
   

], function($, _, Backbone,skincustomizeritem,SkillEditor,ContextMenuSkillEditor,LogoSkillEditor,SignatureSkillEditor,LoadingBarSkillEditor,ManageData,ManageTour, StandardLoadingSkillEditor){

	var SkinCustomizerItem = Backbone.View.extend({

		events:{
		},

		initialize: function () {

		   _.bindAll(this);
	   },
		
		render:function(){
			
			var tourSkill = this.model.get("tourSkill");
			var compiledTemplate = _.template(skincustomizeritem,{tourSkill:tourSkill});

			$("#skinCustomizer-menu .skill-list").append(compiledTemplate);
			$('#skill-' + tourSkill._template_id ).data("skill",tourSkill);
			$('#skill-' + tourSkill._template_id + ' .customizelink').click(this.editSkill);
			var view = this;
			$('#skill-' + tourSkill._template_id + ' .fa-close').click(function(event){
				
				var v = view;
				view.removeSkill(event,v)
				
				});
		  	
		},

		editSkill:function(e){
			var skill = $(e.target).parents("li").data("skill");
			var tourSkill = this.model.get("tourSkill");
			switch(tourSkill._template_id){
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
				case "5":
				var mview = StandardLoadingSkillEditor;
				break;
				default:
				var mview = SkillEditor
			}
			
			if($(".skillModal").length){

					$(".skillModal").find(".save-and-close").trigger("click");

			}
				var SkillModel = Backbone.Model.extend({});
				skillModel = new SkillModel({tourSkill:tourSkill});
				var skillEditor = new mview({model:skillModel});
				console.log(skillEditor)
				skillEditor.render("skillsEditor-"+tourSkill._template_id,skillEditor.renderExtend);
				$("#skillsEditor-"+tourSkill._template_id).addClass("skillModal").parent(".overlay").addClass("skillWindow");
				skillEditor.verticalCent();
			
		},

		removeSkill:function(e,v){

			var tourSkill = this.model.get("tourSkill");
			if($('#skillsEditor-' + tourSkill._template_id ).length){
				$('#skillsEditor-' + tourSkill._template_id ).find(".save-and-close").trigger("click");
			}
			var manageData = new ManageData()
			var manageTour = new ManageTour();
			manageData.removeSkill(tourSkill._kind,manageTour.reloadTour)

			$('#skill-' + tourSkill._template_id).remove();
			v.undelegateEvents();
			v.remove();

		}
		
	});

	return SkinCustomizerItem;
	
});
