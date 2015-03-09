define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar/skincustomizeritem.html'

], function($, _, Backbone,skincustomizeritem){

	var SkinCustomizerItem = Backbone.View.extend({
		
		render:function(){
			
			data = this.model.get("data");
			console.log(data)
			var compiledTemplate = _.template(skincustomizeritem,{data:data});
			$("#skinCustomizer-menu .skill-list").append(compiledTemplate);
		}
		
	});

	return SkinCustomizerItem;
	
});
