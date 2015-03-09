define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
    'text!templates/modal/skilllist.html'

], function($, _, Backbone,Modal,skilllist){

	var SkillsModalList = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			
			var compiledTemplate = _.template(skilllist);
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);
			
			$.ajax({
				url:"data/json.php?t=s",
				dataType:"json",
				success:function(data){
					console.log(data)
				},
				error:function(jqXHR){
					console.log(jqXHR)
				}
			})

			}

		})
		
	
	return SkillsModalList;
	
});
