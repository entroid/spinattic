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
		  	
		},

		editSkill:function(e){
			var skill = $(e.target).parent("li").data("skill");
			console.log(skill)
			var SkillModel = Backbone.Model.extend({});
			skillModel = new SkillModel({data:skill});
			var skillEditor = new SkillEditor({model:skillModel});
			skillEditor.render("skillsEditor",skillEditor.renderExtend);
		
		}
		
	});

	return SkinCustomizerItem;
	
});
