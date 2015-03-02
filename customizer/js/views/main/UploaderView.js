define([
	'jquery',
	'underscore',
	'backbone',
	'helpers/HelpFunctions',
	'models/main/ModalModel',
	'views/modal/AlertView',
	'text!templates/main/upload.html',
	'filedrop',
	'text!templates/main/uploadProgress.html',
	'views/main/TourView',
	'views/sidebar/MainMenuView',
	'models/main/TourModel',
	'views/footer/SceneMenuView',
 	'collections/footer/SceneCollection',
 
	
	
], function($, _, Backbone, HelpFunctions, ModalModel, AlertView,upload,filedrop,uploadProgress,TourView,MainMenuView,TourModel,SceneMenuView,SceneCollection){

	var UploaderView = Backbone.View.extend({
		el: $("body"),
		initialize: function () {

			_.bindAll(this);
		},
		events:{
				 },
		render: function(){
			este = this;
			var compiledTemplate = _.template(upload);
			$(this.el).append( compiledTemplate ); 
			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown(".dropdown");
			
			var drag_overlay = null;
			var last_zindex  = null;
			var rollingOver = false;
				
		var dropbox = $('#drop-zone'),
		message = $('.drop-message', dropbox);
		$(".dragger-wrapper").animate({
			top:"0"
		})
		dropbox.filedrop({
		// The name of the $_FILES entry:
		paramname:'pic',
		refresh: 100,
		maxfiles: 3,
		//queuefiles: 2,
				maxfilesize: 200,
		url: 'php/upload-files.php',

		data:{
			tour_id:"12"
		},

		error: function(err, file) {
			switch(err) {
					case 'BrowserNotSupported':
						este.showMsg('Your browser does not support HTML5 file uploads!');
						break;
					case 'TooManyFiles':
						este.showMsg('Too many files! Please select 3 at most!');
						break;
					case 'FileTooLarge':
						este.showMsg(file.name+' is too large! Please upload files up to 200 mb.');
						break;
					default:
						break;
				}
		},
		
		beforeEach: function(file){    
			
			if(!file.type.match(/^image\//)){
						este.showMsg('Only images are allowed!');
							return false;
			}

			if(!file.type.match(/jpeg|tiff/)){
				este.showMsg('Format not supported!');
				return false;
			}
		
		},
		
		uploadStarted:function(i, file, len){
				

				$(".dragger-wrapper").css({
									'position':'relative',
									'left':'0'
								})
								

				if (rollingOver)
				{ 
						$('.main-section').css('z-index', "last_zindex");
						drag_overlay.remove();
						$("header.main-header").removeClass("bluring")
						$("footer.main-footer").removeClass("bluring")
						$(".dragger-wrapper").removeClass("scaling")
						rollingOver = false;
				}    

				este.createImage(file,i);

		},
								
		dragOver:function(e){    
						if (!rollingOver)
						{    
								drag_overlay = $('<div class="overlay-drag" style="display:block;"></div>');
								drag_overlay.appendTo('body');
							$("header.main-header").addClass("bluring")
							$(".dragger-wrapper").addClass("scaling")
							$("footer.main-footer").addClass("bluring")
						
								$('.main-section').css('z-index', '100');
								var posleft = $(".dragger-wrapper").offset().left;
								/*$(".dragger-wrapper").css({
									'position':'fixed',
									'left':posleft+20
								})*/
								
								rollingOver = true;
						}    
		},
								
		dragLeave:function(e){     
						
						if (rollingOver)
						{ 
								last_zindex = $('#drop-zone').css('z-index', last_zindex);
								drag_overlay.remove();
								$("header.main-header").removeClass("bluring")
								$(".dragger-wrapper").removeClass("scaling")
								$("footer.main-footer").removeClass("bluring")
						
								/*$(".dragger-wrapper").css({
									'position':'relative',
									'left':'0'
								})*/

								rollingOver = false;
						}    

		},
		
		progressUpdated: function(i, file, progress) {
							$(".uploader-footer p").text("uploading or processing panoramas, please don't close this page")
							$("#pano-"+i+" .progress").width(progress+'%');
							$("#pano-"+i+" .percentage").text('Uploading '+progress+'%');
				},
								
				uploadFinished:function(i, file, response){  


								 if (response.result == 'SUCCESS')                     
								 {

								 	var pano_id         = response.params.pano_id;
                  var scene_id        = response.params.scene_id;
                  var tour_id         = response.params.tour_id;    
                  var filename        = response.params.file_name;  
                  var scene_name      = response.params.file_name.replace(/\.jpg|\.jpeg|\.tiff/g, '');
                  var html_ref_id     = 'pano-'+scene_id;


                  //$("#pano-"+i+" img").attr("src",$("#pano-"+i+" img").data("url"));
									//$("#pano-"+i+" .progress").css("background","#497f3c")
									
									$("#pano-"+i+" .icon-msg img").attr("src","images/process.gif");
									$("#pano-"+i+" .icon-msg img").load(function(){
										$(this).parent().css("background","#d5ae06");

									})
								$("#pano-"+i+" .percentage").text("Processing image (1/2)");
									$("#pano-"+i).attr("id", html_ref_id);	
									este.launchImageProcessing (filename, pano_id, scene_id, html_ref_id);
									
									}

									else
										{
											console.log(response)
												if (response.result == 'ERROR'){
														este.showMsg(response.msg);
												}else{
														este.showMsg("An error occurred while uploading file " + file.name + "<br>Please try again or contact us");
														este.sendReport("1", "<u>File name</u>:"+file.name+"<br><u>File Size</u>:"+file.size+" Bytes");
												}
												$(".pano-item-wrapper").remove();
												$(".uploader-footer").remove();
												$(".dragable").show();
										}    

		},
								
								afterAll : function()
								{

								}
								
								
			 
		});

		},

		showMsg: function(msg){

						var modalModel = new ModalModel({msg:msg})
						var alertView = new AlertView({model:modalModel});
						alertView.render("alert",alertView.renderExtend);

						},

		createImage:function(file,i)
				{
						data = {
								filesrc:file.name,
								ind:i    
						}
						
					var compiledTemplate = _.template(uploadProgress,data);
						 if($(".dragable").is(':visible')){
								$(".dragable").hide();
						 }  
							if($(".pano-item-wrapper").length == 0){
								$('.dragger-wrapper').append('<div class="pano-item-wrapper"></div><div class="uploader-footer"><p></p><span class="fa fa-clock-o"></span></div>')
						 }
						$('.dragger-wrapper .pano-item-wrapper').append(compiledTemplate);
						
						
					$(".cancel-process").click(function(){
						if($(".cancel-process").data('id') != ''){
						$.ajax({
								url : 'php-stubs/scenes.php?action=remove',
								type: 'POST',
								async: true,
								data: 'pano-id='+$(".cancel-process").data('id'),
								cache : false,
								success : function(response){}
						});
						}
				$('#proc_cancelled').val('1');
				$(this).closest('.pano-item').hide();
						//$('#item-' + $(".cancel-process").data('scene')).hide();
					});               

						// Associating a preview container
						// with the file, using jQuery's $.data():

						//$.data(file,preview);
	},

	sendReport:function(type, extras){
		$.ajax({
			url : 'php/send_report.php',
			type: 'POST',
			async: true,
			data: 'type='+type+'&extras='+extras,
			cache : false,
			success : function(response){}
		});		
	},

	launchImageProcessing:function(file_name,pano_id, scene_id, html_ref_id){
			$.ajax({
								url : 'php/image-processing.php?step=1',
								type: 'POST',
								async: true,
								data: 'file_name='+file_name+'&pano_id='+pano_id+'&scene_id='+scene_id,
								success : function(response){
									console.log(response)
									response = jQuery.parseJSON(response);
									if (response.result == 'SUCCESS' && response.num_of_files == "4")  {

											$("#"+html_ref_id+" .percentage").text("Processing image (2/2)");
											$("#"+html_ref_id+" .thumb").attr("src",response.params.thumb_path);

													$.ajax({
																	url : 'php/image-processing.php?step=2',
																	type: 'POST',
																	async: true,
																	data: 'file_name='+file_name+'&pano_id='+pano_id+'&scene_id='+scene_id,
																	success:function(responsest2){

																		responsest2 = jQuery.parseJSON(responsest2);

																		if (responsest2.result == 'SUCCESS' && responsest2.num_of_files == "17"){


																					$("#"+html_ref_id+" .progress").css("background","#497f3c");
																					$("#"+html_ref_id+" .percentage").text("Upload Complete!");
																					$("#"+html_ref_id+" .icon-msg").html('<span class="fa fa-check"></span>');
																						$("#"+html_ref_id+" .icon-msg").css("background","#497f3c");
																						$("#"+html_ref_id).data("pano_id",pano_id);	

																					var completed = 0;	
																					$(".pano-item").each(function(index){

																						if($(this).find(".percentage").text() == "Upload Complete!"){
																							completed++
																						}
																					})

																					if(completed == $(".pano-item").size()){

																						este.AllUploaded();

																					}	

																				}  

																	}
													})

										}

								
								}
						});
		
	},

	AllUploaded:function(){
			$(".uploader-footer p").html('All Done <span class="fa fa-smile-o"></span>');
			$(".fa-clock-o").addClass("save").text("SAVE AND CLOSE");

			$(".save").click(function(){
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

						var tourModel = new TourModel({scenes:myscenes[0]});
						var tourView = new TourView({ model: tourModel});
						tourView.render();
						$(".dragger-wrapper").fadeOut(function(){
							$(this).remove();
						})
						var mainMenuView = new MainMenuView();
						mainMenuView.render();

						$("footer .scene-wrapper").remove();
						var sceneCollection = new SceneCollection(myscenes);
						var sceneMenuView = new SceneMenuView({ collection: sceneCollection});
						sceneMenuView.render();

						Backbone.history.navigate("tour/"+myscenes[0].id);
						

				})

	}

		
	});

	return UploaderView;
	
});
