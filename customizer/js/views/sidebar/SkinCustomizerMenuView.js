define([
	'jquery',
	'underscore',
	'backbone',
	'views/sidebar/SidebarSubMenu',
	'text!templates/sidebar/skinCustomizerMenu.html',
	'helpers/HelpFunctions',
	'views/modal/SkillsModalList',
	

], function($, _, Backbone,SidebarSubMenu,skinCustomizerMenu,HelpFunctions,SkillsModalList){

	var SkinCustomizerMenuView = SidebarSubMenu.extend({
		initialize: function () {
		  this.events = this.events || {};
		  var addStyles = 'click #' + this.model.get("elem") + ' .add-link';
		  this.events[addStyles] = 'addStyle';
		  this.delegateEvents(); 
		},

		render: function(){

			var styles = tourData.krpano.style;
			var compiledTemplate = _.template(skinCustomizerMenu,{styles:styles});
			$(this.el).append( compiledTemplate );
			elem =  this.model.get("elem");
			this.$elem = $("#"+elem);
			this.model.set("elemWidth",this.$elem.width());
			var helpFunctions = new HelpFunctions();
			helpFunctions.setInnerHeight(elem);
			this.show();
		},

		openSubItems:function(e){
			$mineSub = $(e.target).parent("li").find(".sub-items")
			$("#"+this.model.get("elem")+" .sub-items").not($mineSub).slideUp();
			$mineSub.slideToggle();
		},
		addStyle:function(e){
			var skillsModalList = new SkillsModalList();
			skillsModalList.render("skillsModalList",skillsModalList.renderExtend);
		}

		
	});

	return SkinCustomizerMenuView;
	
});
