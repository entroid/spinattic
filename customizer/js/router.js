define([
	'jquery',
	'underscore',
	'backbone',
	'x2js',
 'views/footer/SceneMenuView',
 'views/footer/PanoMenuFooterView',
 'collections/footer/SceneCollection',
 'collections/header/UserCollection',
 'views/sidebar/MainMenuView',
 'views/header/UserView',
 'views/main/UploaderView',
 'helpers/HelpFunctions',
 'models/main/TourModel',
 'views/main/TourView',
 'views/header/PublishControllerView',
 // 'views/users/list'
], function($, _, Backbone,x2js,SceneMenuView,PanoMenuFooterView,SceneCollection,UserCollection,MainMenuView,UserView,UploaderView,HelpFunctions,TourModel,TourView,PublishControllerView){
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define some URL routes
			'tour/:id': 'getTour',
			// Default
			'*actions': 'defaultAction'
		}
	});

	var initialize = function(){
		
		
		var panoMenuFooterView = new PanoMenuFooterView();
		panoMenuFooterView.render();
		var app_router = new AppRouter;
		var userCollection = {};

		var helpFunctions = new HelpFunctions();
		helpFunctions.setInnerHeight(".main-section","byClass");

		var publishControllerView = new PublishControllerView();
		publishControllerView.render();
		
		$(window).resize(function(){
			
					helpFunctions.setInnerHeight(".main-section","byClass");
		

			});

		app_router.on('route:getTour', function (id) {
		// Note the variable in the route definition being passed in here
			$.ajax({
		  dataType:"json",
		  url:  "data/user.json.php",
		 }).done(function(obj){
		 	var xmlpath ="data/tour.xml?id="+id;
		 	//var xmlpath ="data/xml.php?idtour=9&c=1";
		 	$.ajax({
   			 url: xmlpath,
			    type: "GET",
			    dataType: "html",
			    success: function(data) {
			    var x2js = new X2JS({attributePrefix:"_"});
			    tourData =  x2js.xml_str2json( data );
			
			   	var xml2krpano = xmlpath.replace("&c=1","")
				var tourModel = new TourModel({xmlpath:xml2krpano});
			
				var tourView = new TourView({ model: tourModel});
				tourView.render();


			    var scenes = tourData.krpano.scene;

				var sceneCollection = new SceneCollection(scenes);
				var sceneMenuView = new SceneMenuView({ collection: sceneCollection});
				sceneMenuView.render();


				if(!userCollection.length){
					userCollection = new UserCollection(obj);
					userView = new UserView({ collection: userCollection});
					userView.render();
				}
				var mainMenuView = new MainMenuView();
				mainMenuView.render();
			

			    }
			});

		 })

	});


		app_router.on('route:defaultAction', function(actions){

		var sceneMenuView = new SceneMenuView();
		sceneMenuView.render();

				$.ajax({
				  dataType:"json",
				  url:  "data/user.json.php",
				 }).done(function(obj){
					userCollection = new UserCollection(obj);
					userView = new UserView({ collection: userCollection});
					userView.render();
					uploaderview = new UploaderView();
					uploaderview.render();
				 })



		});


 Backbone.history.start();
		
	};



	return {
		initialize: initialize
	};


});