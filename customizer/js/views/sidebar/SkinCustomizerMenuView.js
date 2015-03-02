define([
	'jquery',
	'underscore',
	'backbone',
	'views/sidebar/SidebarSubMenu',
	'text!templates/sidebar/skinCustomizerMenu.html',
	'helpers/HelpFunctions',
	'views/modal/Modal',
	

], function($, _, Backbone,SidebarSubMenu,skinCustomizerMenu,HelpFunctions,Modal){

	var SkinCustomizerMenuView = SidebarSubMenu.extend({
		initialize: function () {
		  this.events = this.events || {};
		  var slideStyles = 'click #' + this.model.get("elem") + ' h3';
		  var addStyles = 'click #' + this.model.get("elem") + ' td .add';
		  this.events[slideStyles] = 'openSubItems';
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
			var modal = new Modal();
			modal.render("hola");
		}

		
	});

	return SkinCustomizerMenuView;
	
});
