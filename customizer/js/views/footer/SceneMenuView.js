define([
	'jquery',
	'underscore',
	'backbone',
	'x2js',
	'jqueryui',
	'text!templates/footer/sceneMenu.html',
	'helpers/HelpFunctions',
	'mCustomScrollbar',
	'views/main/TourView',
	'models/main/TourModel',
	'views/sidebar/SceneSettingsMenuView',
	'views/sidebar/ViewSettingsMenuView'
	
	
], function($, _, Backbone,x2js,jqueryui, bottomMenu,HelpFunctions,mCustomScrollbar,TourView,TourModel,SceneSettingsMenuView,ViewSettingsMenuView){

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

			if($(".main-footer .scene-wrapper").length){
				$(".main-footer .scene-wrapper").remove();
			}
			var compiledTemplate = _.template(bottomMenu,{jsonObj:jsonObj});
			$(this.el).append( compiledTemplate ); 
 
			_.each(jsonObj,function(val,ind){
				$("#sceneMenu li:eq("+ind+")").data("scene",val);
			})

			var helpFunctions = new HelpFunctions();
			helpFunctions.toolTip("#sceneMenu li img","footer");
		
			$("#sceneMenu").sortable({
				beforeStop:function(evt,ui){

					var scenes = []
					_.each($("#sceneMenu li"),function(el,i){
						if($(el).data("scene")){
							var scene = $(el).data("scene");
							if($(el).data("hotspots")){
								var hotspots = $(el).data("hotspots");
								scene.hotspots = hotspots;
							}
							scenes.push(scene);
						}
					})
					tourData.krpano.scene = scenes;
				}
			});

			liwidth = $("#sceneMenu li").outerWidth();
			liright = $("#sceneMenu li").css("margin-right");
			liright = parseInt(liright.replace("px",""));
			liall = liwidth+liright;
			allwidth = liall * $("#sceneMenu li").length;
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
			helpFunctions.refreshData();
			var customparam = jQuery.extend({},$thisli.data("scene"));
			delete customparam.view._segment;
			delete customparam.preview._segment;
			delete customparam.image._segment;
			delete customparam._segment;
			delete customparam.hotspot;
			var krpano = document.getElementById("krpanoSWFObject");
			var param = helpFunctions.mapJSONToUriParams(customparam);
			param = param.replace(/:_/g,".");
			krpano.call("loadscene('"+$thisli.attr("id")+"','"+param+"');");
			if($thisli.data("hotspots")){

				var hotspot = $thisli.data("hotspots");
				_.each(hotspot,function(elem){

					krpano.call("addhotspot("+elem._name+")");
					krpano.set("hotspot["+elem._name+"].url", elem._url);
					krpano.set("hotspot["+elem._name+"].ath", elem._ath);
					krpano.set("hotspot["+elem._name+"].atv", elem._atv);
					krpano.call("hotspot["+elem._name+"].loadStyle("+elem._selectedSet+");");
					krpano.call('set(hotspot['+elem._name+'].ondown, draghotspot() );');
		    		krpano.call('set(hotspot['+elem._name+'].onclick, js(showWindow('+elem._name+')) );');
		    		krpano.call('set(hotspot['+elem._name+'].onup, js(regPos('+elem._name+')) );');

				})
			}
			

			$("#sceneMenu li").removeClass("selected");
			$thisli.addClass("selected")

		}
		
	});

	return SceneMenuView;
	
});
