define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/modal/singleUploaderDragArea.html',
	'text!templates/modal/singleUploaderShowing.html',
	'text!templates/modal/singleUploaderUploadingAnimation.html',

], function($, _, Backbone,singleUploaderDragArea,singleUploaderShowing,singleUploaderUploadingAnimation){

	var SingleUploader = Backbone.View.extend({

		events:{
		},
		
		render:function(){
			var myid = this.model.get("myid");

			if(this.model.get("imgsrc")){
				var img = this.model.get("imgsrc");
				var template = _.template(singleUploaderShowing,{imgsrc:img});
				$("#"+myid).html(template);
			}else{
				var template = _.template(singleUploaderDragArea);
				$("#"+myid).html(template);
			}
		}

		
	});

	return SingleUploader;
	
});
