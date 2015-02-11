define([
	'jquery',
	'underscore',
	'backbone',
	'jqueryui',
	'text!templates/modal/modaltemplate.html',


], function($, _, Backbone,jqueryui,modaltemplate){

	var Modal = Backbone.View.extend({
		el: $("body"),
		myid:"",
		initialize: function () {
			_.bindAll(this,'render');		
		},

		extend:function(child){
			var view = Backbone.View.extend.apply(this, arguments);
    		view.prototype.events = _.extend({}, this.prototype.events, child.events);
    		return view;
		},


		render:function(id,fun){
			this.myid = id;
			var compiledTemplate = _.template(modaltemplate,{myid:this.myid});
			$(this.el).append( compiledTemplate );
			$("#"+this.myid).parent().fadeIn();
			 $(".modal").draggable({ handle:'header'});

			 $("#"+this.myid).find(".fa-close").click(function(){
			 		$(this).parents(".overlay").remove();
			 })

			 if(fun != undefined){
				fun();
			}
			
		}
		
	});

	return Modal;
	
});
