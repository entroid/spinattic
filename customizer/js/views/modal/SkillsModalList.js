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
			
			var myid = this.myid;
			var compiledTemplate = _.template(skilllist);
			$("#"+myid+" .inner-modal").html(compiledTemplate);
			
			$.ajax({
				url:"data/json.php?t=s",
				dataType:"json",
				success:function(data){
					_.each(data,function(elem,ind){
						var title = "<h3>"+elem.title+"</h3>";
						var descrip = "<p>"+elem.description+"</p>";
						var bt = '<a href="" id="add-item-'+elem.id+'">Add</a>'
						var $li = $('<li id="item'+elem.id+'">'+title+descrip+bt+'</li>');
						$("#"+myid+" .free-skills ul").append($li);
						
					})
				},
				error:function(jqXHR){
					console.log(jqXHR)
				}
			})

			}

		})
		
	
	return SkillsModalList;
	
});
