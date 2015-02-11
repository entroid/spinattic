define([
	'jquery',
	'underscore',
	'backbone',
	'jqueryui',
	'text!templates/footer/sceneMenu.html',
	'helpers/HelpFunctions',
	'mCustomScrollbar',
	'views/main/TourView',
	'models/main/TourModel',
	'views/sidebar/SceneSettingsMenuView',
	'views/sidebar/ViewSettingsMenuView'
	
	
], function($, _, Backbone,jqueryui, bottomMenu,HelpFunctions,mCustomScrollbar,TourView,TourModel,SceneSettingsMenuView,ViewSettingsMenuView){

	var SceneMenuView = Backbone.View.extend({
		el: $("footer.main-footer"),
		mycollection:[],
		initialize: function () {
				_.bindAll(this,"openScene")
			
		},
		events:{
			"click #sceneMenu .fa-close":"removeItem",
			"click #sceneMenu li":"openScene"     
				 },
		render: function(){
			if(this.collection){
				var jsonObj = this.collection.toJSON();
				this.mycollection = this.collection.toJSON();
			}else{
				var jsonObj = [];
			}
			var compiledTemplate = _.template(bottomMenu,{jsonObj:jsonObj});
			$(this.el).append( compiledTemplate ); 
 
			_.each(jsonObj,function(val,ind){
				$("#sceneMenu li:eq("+ind+")").data("scene",val);
			})

			var helpFunctions = new HelpFunctions();
			helpFunctions.toolTip("#sceneMenu li img","footer");
		
			$("#sceneMenu").sortable();

			liwidth = $("#sceneMenu li").outerWidth();
			allwidth = liwidth * $("#sceneMenu li").length;
			$("#sceneMenu").width(allwidth+20);

			$(".scene-wrapper").mCustomScrollbar({
							theme:"light",
							scrollInertia:300,
							horizontalScroll: true,
					});
		},

		removeItem:function(e){
			$(e.target).parent().fadeOut(function(){
				this.remove();
			})
		},

		openScene:function(e){

			var helpFunctions = new HelpFunctions();

			$thisli = $(e.target).parent();
			$("#tour").data("scene",$thisli.data("scene"))
			var sceneSettingsMenuView = new SceneSettingsMenuView();
			sceneSettingsMenuView.refreshData();

			var viewSettingsMenuView = new ViewSettingsMenuView();
			viewSettingsMenuView.refreshData();
			
			var krpano = document.getElementById("krpanoSWFObject");
			var param = helpFunctions.mapJSONToUriParams($thisli.data("scene"));
				
			param = param.replace(/:_/g,".");

			krpano.call("loadscene('"+$thisli.attr("id")+"','"+param+"');");

			

			$("#sceneMenu li").removeClass("selected");
			$thisli.addClass("selected")

		}

		
	});

	return SceneMenuView;
	
});
