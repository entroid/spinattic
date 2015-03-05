define([
	'jquery',
	'underscore',
	'backbone',
	'views/main/UploaderView',
	'text!templates/footer/panoMenuFooter.html',
	'helpers/HelpFunctions'

], function($, _, Backbone,UploaderView,panoMenuFooter,HelpFunctions){

	var PanoMenuFooterView = Backbone.View.extend({
		el: $("footer.main-footer"),
		minHeight:0,
		totalHeight:0,
		initialize: function () {

			
		},
		events:{
			 "click #footer-hide-show":"showHideFooter",
			 "click #pano-uploader":"openPanoUpload"
				 },
		render: function(){
		 var compiledTemplate = _.template(panoMenuFooter);
			$(this.el).append( compiledTemplate ); 
	 		this.minHeight =  $("footer menu").outerHeight();
	 		this.totalHeight = $("footer").height()
		},

		showHideFooter:function(e){
			me = this;
			$footer = $(e.target).parents("footer");
			var helpFunctions = new HelpFunctions();
			if($footer.height() == me.totalHeight){
				$footer.animate({
					height:me.minHeight
				},function(){
					helpFunctions.setInnerHeight(".submenu",true);
					helpFunctions.setInnerHeight(".main-section",true);
				})
			$footer.find("#footer-hide-show i").removeClass("fa-angle-double-down").addClass("fa-angle-double-up")
			
			}else{
				$footer.animate({
					height:me.totalHeight
				},function(){
					helpFunctions.setInnerHeight(".submenu",true);
					helpFunctions.setInnerHeight(".main-section",true);
				})
			$footer.find("#footer-hide-show i").removeClass("fa-angle-double-up").addClass("fa-angle-double-down")
			}
		},

		openPanoUpload:function(){

			var UploaderModel = Backbone.Model.extend({});
			uploaderModer = new UploaderModel({gNewTour:false,addingPane:true});
			uploaderview = new UploaderView({model:uploaderModer});
			uploaderview.render();

		}
		
	});

	return PanoMenuFooterView;
	
});
