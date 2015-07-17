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
	'helpers/HelpFunctions',
	'helpers/ManageData',
	'helpers/ManageTour',
	'views/modal/StandardLoadingSkillEditor',
	'views/modal/SimpleControlBtnSkillEditor',
	'models/main/ModalModel',
	'views/modal/AlertView',
	'views/modal/ConfirmView',
	'views/modal/SimpleMenuSkillEditor'
   

], function($, _, Backbone,skincustomizeritem,SkillEditor,ContextMenuSkillEditor,LogoSkillEditor,SignatureSkillEditor,LoadingBarSkillEditor,HelpFunctions,ManageData,ManageTour, StandardLoadingSkillEditor, SimpleControlBtnSkillEditor,ModalModel,AlertView,ConfirmView,SimpleMenuSkillEditor){

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
				case "6":
				var mview = SimpleMenuSkillEditor;
				break;
				case "7":
				var mview = SimpleControlBtnSkillEditor;
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
			var no_delete_if_free = this.model.get("no_delete_if_free");
			console.log(tourSkill)
			var este = this;

			if($(".main-header .user").data("level") == "FREE"){
				if(no_delete_if_free == "1"){
					este.showMsg("We're sorry. You cannot remove this skill because your membership level is set to Basic.");
					return;
				}
			}


			var msg = "If you remove this skill, you'll lose the custom configurations associated with it.";
			evt = function(){
				if($('#skillsEditor-' + tourSkill._template_id ).length){
					$('#skillsEditor-' + tourSkill._template_id ).find(".save-and-close").trigger("click");
				}
				var helpFunctions = new HelpFunctions();
				helpFunctions.showReloadOverlay();
				var manageData = new ManageData()
				var manageTour = new ManageTour();
				$("#confirmDel .fa-close").trigger("click");
				manageData.removeSkill(tourSkill._kind,manageTour.reloadTour)

				$('#skill-' + tourSkill._template_id).remove();
				v.undelegateEvents();
				v.remove();
			}
			var modalModel = new ModalModel({msg:msg,evt:evt})
			var alertView = new ConfirmView({model:modalModel});
			alertView.render("confirmDel",alertView.renderExtend);
		},

		showMsg: function(msg){
			var modalModel = new ModalModel({msg:msg})
			var alertView = new AlertView({model:modalModel});
			alertView.render("alert",alertView.renderExtend);
		},
		
	});

	return SkinCustomizerItem;
	
});
