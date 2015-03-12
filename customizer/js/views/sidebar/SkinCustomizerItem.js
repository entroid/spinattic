define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar/skincustomizeritem.html',
	'views/modal/SkillEditor',

], function($, _, Backbone,skincustomizeritem,SkillEditor){

	var SkinCustomizerItem = Backbone.View.extend({

		events:{
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
			var SkillModel = Backbone.Model.extend({});
			skillModel = new SkillModel({data:skill});
			var skillEditor = new SkillEditor({model:skillModel});
			skillEditor.render("skillsEditor",skillEditor.renderExtend);
		
		},

		removeSkill:function(e,v){

			var data = this.model.get("data");
			$('#skill-' + data.id ).remove();
			v.undelegateEvents();
			v.remove();

		}
		
	});

	return SkinCustomizerItem;
	
});
