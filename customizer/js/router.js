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
	// 'views/users/list'
	'views/header/TourTitle',
	'views/header/PublishControllerView'

], function($, _, Backbone, x2js, SceneMenuView, PanoMenuFooterView, SceneCollection, UserCollection, MainMenuView, 
	UserView, UploaderView, HelpFunctions, TourModel, TourView, TourTitle, PublishControllerView){

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

		var tourTitle = new TourTitle();
		tourTitle.render();

		var publishControllerView = new PublishControllerView();
        publishControllerView.render();
		
		$(window).resize(function(){
			
			helpFunctions.setInnerHeight(".main-section","byClass");		

		});

		jQuery.ajax({
			type: "POST",
			url: "php/ajax_chk_session.php",
			data: "chklogout=true",
			cache: false,
			success: function(res){
				console.log(res)
				if(res == "1"){
					location.href= "http://dev.spinattic.com/index.php?login";
				}else{
					$.ajax({
						dataType:"json",
						url:  "data/json.php?t=u",
					}).done(function(obj){

						if(!userCollection.length){
							userCollection = new UserCollection(obj);
							userView = new UserView({ collection: userCollection});
							userView.render();
						}
					})
				}
			}
		})

		app_router.on('route:getTour', function (id) {
		// Note the variable in the route definition being passed in here
			$.ajax({
		  dataType:"json",
		  url:  "data/json.php?t=u",
		 }).done(function(obj){
		 	console.log(obj)
		 	//var xmlpath ="data/tour.xml?id="+id;
		 	var xmlpath ="data/xml.php?id="+id+"&d=1&c=1";
		 	$.ajax({
   			 url: xmlpath,
			    type: "GET",
			    dataType: "html",
			    success: function(data) {

				    var x2js = new X2JS({attributePrefix:"_"});
				    console.log(data)
				    tourData =  x2js.xml_str2json( data );

					if(tourData.krpano.scene.length == undefined){
						var escenas = [];
						escenas[0] = tourData.krpano.scene;
						tourData.krpano.scene = escenas
					}

					$.ajax({
						url:  "data/json.php?id="+id+"&d=1&t=t",
						dataType:"json",
						success:function(datatour){

							tourData.krpano.datatour = datatour;
							console.log(tourData)
							var xml2krpano = xmlpath.replace("&c=1","");
							var tourModel = new TourModel({xmlpath:xml2krpano});
						
							var tourView = new TourView({ model: tourModel});
							tourView.render();
						    var scenes = tourData.krpano.scene;

							var sceneCollection = new SceneCollection(scenes);
							var sceneMenuView = new SceneMenuView({ collection: sceneCollection});
							sceneMenuView.render();
							
							var mainMenuView = new MainMenuView();
							mainMenuView.render();
						}
					})
			    }
			});
		 })
	});


	app_router.on('route:defaultAction', function(actions){

		var sceneMenuView = new SceneMenuView();
		sceneMenuView.render();
		var UploaderModel = Backbone.Model.extend({});
		uploaderModer = new UploaderModel({gNewTour:true,addingPane:false});
		uploaderview = new UploaderView({model:uploaderModer});
		uploaderview.render();

	});

	Backbone.history.start();
		
	};

	return {
		initialize: initialize
	};
});