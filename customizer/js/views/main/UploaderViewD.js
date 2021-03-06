define([
	'jquery',
	'underscore',
	'backbone',
	'x2js',
	'helpers/HelpFunctions',
	'helpers/ManageTour',
	'models/main/ModalModel',
	'views/modal/AlertView',
	'views/modal/ConfirmView',
	'text!templates/main/upload.html',
	'lib/dropzone',
	'text!templates/main/uploadProgressD.html',
	'views/main/TourView',
	'views/sidebar/MainMenuView',
	'models/main/TourModel',
	'views/footer/SceneMenuView',
	'collections/footer/SceneCollection',
	'views/header/TourTitle',
	'views/header/PublishControllerView',
	'mCustomScrollbar'


	], function($, _, Backbone,x2js,HelpFunctions, ManageTour, ModalModel, AlertView,ConfirmView,upload,dropzone,uploadProgressD,TourView,MainMenuView,TourModel,SceneMenuView,SceneCollection,TourTitle,PublishControllerView, mCustomScrollbar){

	var UploaderView = Backbone.View.extend({
		el: $("body"),
		gNew_tour:null,
		gTour_id:"",
		setIntervalID:[],
		state:[],
		pano_id : [],
		scene_id : [],
		tour_id:[],
		filename:[],
		scene_name:[],
		html_ref_id:[],
		thumb_path:[],
		addingPane:null,
		initialize: function () {
			_.bindAll(this);
		},
		events:{
			"input .tile-size input":"maxTile",
			"click .dragger-wrapper .cancel":"removeView"
		},

		render: function(){
			este = this;
			  window.proc_id = new Array();
	  
			este.gNew_tour = this.model.get("gNewTour");
			este.addingPane =  this.model.get("addingPane");
			este.cancel = this.model.get("cancel")
			if(location.hash.split("/")[1]){
				este.gTour_id= location.hash.split("/")[1];
			}
			var i = 0;
			var compiledTemplate = _.template(upload);
			$(this.el).append( compiledTemplate ); 

			if (este.cancel) {
				$('.dragger-wrapper .cancel').removeClass('none');
			}
			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown(".dropdown");
			var last_zindex  = null;
			var rollingOver = false;
			este.verticalCent();
			$('#drop-zone').dropzone({ 
				url: "php/general_process.php",
				clickable:"#click-to-select-file",
				previewTemplate:uploadProgressD,
				drop:function(){
					/*if (rollingOver) { 
						$('.main-section').css('z-index', "last_zindex");
						$("header.main-header").removeClass("bluring")
						$("footer.main-footer").removeClass("bluring")
						$(".dragger-wrapper").removeClass("scaling")
						rollingOver = false;
					}    
					if($(".inner-dragger .pano-item").length!=0){
						i = $(".inner-dragger .pano-item").length;
					}
					$(".scroll-wrapper").mCustomScrollbar({
						theme:"minimal-dark",
						scrollInertia:300,
					});*/

					$(".dragable").addClass("uploading-drop-zone");
					$.ajax({
							url:'php/ultour.php',
							type:'POST',
							data:'autocreate=true',
							async:false,
							success:function(response){
								var parsedObj = jQuery.parseJSON(response);
								if(!window.gTour_id){
									window.gTour_id    = parsedObj.params.tour_id;  
								 }
								console.log("se ha creado un tour desde autocreateTour") 
								
	  
							}
						 })
				},
				sending:function(file,xhr,formData){
					var start_time = new Date().getTime();
					window.proc_id[i] =  start_time+'-'+i+'-'+window.gTour_id;
					console.log(window.proc_id[i])
					formData.append("tour_id", window.gTour_id);
					formData.append("proc_id", window.proc_id[i]);
				},

				processing:function(file){
					console.log(file)
					$(file.previewElement).attr("id","pano-"+i)

					este.processState(i)
					i++
					
				},
				uploadprogress:function(file,progress){
					console.log("upload")
					$("#pano-"+i+" .progress").width(progress+'%');
					$("#pano-"+i+" .percentage").text('Uploading '+progress+'%');
				},
				success:function(){
					
					console.log("succes")	
				
				}
			})

		},

		showMsg: function(msg){
			var modalModel = new ModalModel({msg:msg})
			var alertView = new AlertView({model:modalModel});
			alertView.render("alert",alertView.renderExtend);
		},


		processState:function(i){
			var este = this;
			este.setIntervalID[i] = setInterval(function(){
						//console.log("se tiene que ejecutar" + window.proc_id[i])
						$.ajax({
							type: "POST",
							url: "php/general_process_state.php",
							data: "proc_id=" + window.proc_id[i],
							cache: false,
							success: function(response){
								var respuesta = JSON.parse(response);
									//console.log("STATE "+i+":"+respuesta.state);
									console.log(response)
									if(este.state[i] != respuesta.state && respuesta.state != 'w'){
										
										este.state[i] = respuesta.state;
										
										switch(este.state[i]) {
										case "-1": //Error
											//console.log("ENTRO ERROR: " + este.state[i]);
											clearInterval(este.setIntervalID[i]);               
											$(".inner-dragger #pano-"+i+" h3").html(respuesta.state_desc + " " + file.name + "<br>Please try again or contact us")
											break;
											
										case "1":
											console.log("ENTRO " + i + "(" + este.filename[i] +"): "+ este.state[i]);
											$("#pano-"+i+" .percentage").text(respuesta.state_desc);
											
											break;
										case "2":
											console.log("ENTRO " + i + "(" + este.filename[i] +"): "+ este.state[i]);
											

											este.pano_id[i]         = respuesta.pano_id;
											este.scene_id[i]        = respuesta.scene_id;
											este.tour_id[i]         = respuesta.tour_id;    
											este.filename[i]        = respuesta.filename;  
											este.thumb_path[i]        = respuesta.thumb_path;  
											este.scene_name[i]         = este.filename[i].replace(/\.jpg|\.jpeg|\.tiff/g, '');
											este.html_ref_id[i]     = 'pano-'+respuesta.scene_id;
														
											$("#pano-"+i+" .fa-close").data("state",este.state[i]);
											$("#pano-"+i+" .icon-msg img").attr("src","images/process.gif");
											$("#pano-"+i+" .icon-msg img").load(function(){
												console.log("aca se deberia mostrar la imagen")
											})											
											$(this).parent().css("background","#d5ae06");
											$("#pano-"+i+" .percentage").text("Processing image (1/2)");
											$("#pano-"+i).attr("id", este.html_ref_id[i]);  
											$("#"+este.html_ref_id[i]+" .fa-close").data("state",este.state[i]);

										break;
										case "3":
											console.log("ENTRO " + i + "(" + este.filename[i] +"): "+ este.state[i]);
											$("#"+este.html_ref_id[i]+" .percentage").text("Processing image (2/2)");
											$("#"+este.html_ref_id[i]+" .fa-close").data("state",este.state[i]);
											
										   
										   break;
											
										case "4":
											console.log("ENTRO " + i + "(" + este.filename[i] +"): "+ este.state[i]);
											
											$("#"+este.html_ref_id[i]+" .thumb").attr("src",este.thumb_path[i]);

											$("#"+este.html_ref_id[i]+" .progress").css("background","#497f3c");
											$("#"+este.html_ref_id[i]+" .percentage").text("Upload Complete!");
											$("#"+este.html_ref_id[i]+" .icon-msg").html('<span class="fa fa-check"></span>');
											$("#"+este.html_ref_id[i]+" .icon-msg").css("background","#497f3c");
											$("#"+este.html_ref_id[i]).data("pano_id",este.pano_id[i]);    
											$("#"+este.html_ref_id[i]+" .fa-close").data("pano_id",este.pano_id[i]);    
											$("#"+este.html_ref_id[i]+" .fa-close").data("state",este.state[i]);    

											var completed = 0; 

											$(".pano-item").each(function(index){
												if($(this).find(".percentage").text() == "Upload Complete!"){
												   completed++
												}
											})

											if(completed == $(".pano-item").size()){
												este.AllUploaded();
											}
											
											clearInterval(este.setIntervalID[i]);
											break;
										} 
										
									}
									
								}
						})}, 500);
		},

		AllUploaded:function(){
			$(".uploader-footer").find('#cancelUploaded').removeClass('none').siblings('p').html('All Done <span class="fa fa-smile-o"></span>');            

			if(este.addingPane){
				$(".fa-clock-o").removeClass('blink').addClass("save").text("ADD PANOS");
			}else{
				$(".fa-clock-o").removeClass('blink').addClass("save").text("CREATE TOUR");
			}
			$("#cancelUploaded").click(este.cancelUploaded);
			$(".save").unbind("click");
			$(".save").click( function(){

				if(este.addingPane){
				   
					$(".dragger-wrapper").fadeOut(function(){
					   $(this).remove();
					})
					var manageTour = new ManageTour();
					var cargarEscenas = function(){
						var scenes = tourData.krpano.scene;
						var sceneCollection = new SceneCollection(scenes);
						var sceneMenuView = new SceneMenuView({ collection: sceneCollection});
						sceneMenuView.render();
					}

					manageTour.reloadTour(cargarEscenas);

				}else{

					var myscenes = [];
					$(".pano-item-wrapper .pano-item").each(function(ind,elem){
						var scene = {}

						var sceneid = $(elem).attr("id"); 
						sceneid = sceneid.replace("pano-","");
						scene.name = sceneid;
						scene.title = $(elem).find("h3 span").text();
						scene.filename = $(elem).find("h3 span").text();
						scene.thumburl = $(elem).find(".thumb").attr("src");
						scene.url = sceneid;
						myscenes.push(scene);
					})


					$(".dragger-wrapper").fadeOut(function(){
					   $(this).remove();
					})

					if(!este.gTour_id){
						este.gTour_id = window.gTour_id;
					}

					jQuery.ajax({
					type: "GET",
					url: "php/general_process.php?reset_queue="+este.gTour_id,
					success: function(res){
						console.log("reseted")
					}})

					var xmlpath ="data/xml.php?id="+este.gTour_id+"&d=1&c=1";
					//var xmlpath ="data/xml.php?idtour=9&c=1";
					
					$.ajax({
						url: xmlpath,
						type: "GET",
						dataType: "html",

						success: function(data) {
							var x2js = new X2JS({attributePrefix:"_"});
							tourData =  x2js.xml_str2json( data );

							if(tourData.krpano.scene.length == undefined){
								var escenas = [];
								escenas[0] = tourData.krpano.scene;
								tourData.krpano.scene = escenas
							}

							_.each(tourData.krpano.scene,function(scene,ind){
								if(scene.hotspot){
											if(scene.hotspot.length == undefined){
												var myhp = []
												myhp[0] = scene.hotspot;
												tourData.krpano.scene[ind].hotspot = myhp;
											}
									}
							})

							if(tourData.krpano.skill.length == undefined){
								var capacidad = [];
								capacidad[0] = tourData.krpano.skill;
								tourData.krpano.skill = capacidad
							}

							$.ajax({
								url:  "data/json.php?id="+este.gTour_id+"&d=1&t=t",
								dataType:"json",

								success:function(datatour){

									tourData.krpano.datatour = datatour;

									var xml2krpano = xmlpath.replace("&c=1","&h=0")
									var tourModel = new TourModel({xmlpath:xml2krpano});

									var tourView = new TourView({ model: tourModel});
									tourView.render();

									$(".main-footer").show();
									$(".header-bottom").show();

									var scenes = tourData.krpano.scene;

									var sceneCollection = new SceneCollection(scenes);
									var sceneMenuView = new SceneMenuView({ collection: sceneCollection});
									sceneMenuView.render();
									var mainMenuView = new MainMenuView();
									mainMenuView.render();
				  
									var tourTitle = new TourTitle();
									tourTitle.render();

									var publishControllerView = new PublishControllerView();
									publishControllerView.render();


									Backbone.history.navigate("tour/"+este.gTour_id);
									$("#publish #draft").addClass("active")
								 
								}
							})

						}
					});
				}
			})
		},


		removePano:function(e){
			var $elem = $(e.target); 
			var msg = "Are you sure you want to remove this pano from your tour?<br>"+$elem.data("myfile")+"?";
			var este = this;
			var evt=function(){
				
					if($elem.data("state") == "4"){
						var url     = 'php/updater.php';
						var type    = 'POST';
						var data    = 'id='+$elem.data('pano_id')+"&action=del_pano";
					}else{

						var url     = 'php/general_process.php';
						var type    = 'GET';
						var data    = 'proc_id='+$elem.data('myproc')+"&c=1";
						var cicle   =  parseInt($elem.data("cicle"));
						clearInterval(este.setIntervalID[cicle]);
					}
					$("#confirmDel .fa-close").trigger("click");
					$elem.parents(".pano-item").append('<div class="cancelling"><p>Removing pano...</p><div class="loading"></div></div>')
					$.ajax({
						url : url,
						type: type,
						data: data,
						success : function(response){
							$elem.parents(".pano-item").css("background","#fad368").fadeOut(function(){
								$(this).remove();
								if($(".pano-item").size() == 0){
									$(".dragger-wrapper").fadeOut(function(){
									   $(this).remove();
									   este.render()
									})
									
								}else{
									var completed = 0;
									_.each($(".pano-item"),function(elem){
										if($(elem).find(".fa-close").data("state")== "4"){
											completed++
										}
									})
									if(completed == $(".pano-item").size()){
											este.AllUploaded();
									}
								}
								
							});
						}
					});
					
				}
			var modalModel = new ModalModel({msg:msg,evt:evt})
			var alertView = new ConfirmView({model:modalModel});
			alertView.render("confirmDel",alertView.renderExtend);
		},

		cancelUploaded:function(){
			var este = this;
			var total = 0;
			$("#cancelUploaded").text("Cancelling...");
			_.each($(".pano-item"),function(elem,ind){
				var panoid = $(elem).data("pano_id");
				$.ajax({
					url : 'php/updater.php',
					type: 'POST',
					data: 'id='+panoid+"&action=del_pano",
					success : function(response){
						console.log(response)
						total++
						if(total == $(".pano-item").size()){
							este.removeView();
						}
					}
				})
			})
		},

		removeView:function(){
			this.undelegateEvents();            

			$(".dragger-wrapper").animate({
				'top' : '0'
			}, function(){
				$('.dragger-wrapper' ).remove();
			})
		},

		verticalCent : function() {
			$(".dragger-wrapper").animate({
				'top' : '50%',
				'margin-top' : -$('.dragger-wrapper').outerHeight()/2
			})
		},

		maxTile : function(e) {
			var elem = $(e.target),
				val = elem.val();

			elem.siblings('input').val(val);
		}
	});

	return UploaderView;

});
