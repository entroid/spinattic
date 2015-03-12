define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/skilllist.html',
	'views/sidebar/SkinCustomizerItem',
	'mCustomScrollbar'

], function($, _, Backbone, Modal, skilllist, SkinCustomizerItem, mCustomScrollbar){

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

			var este = this;
			$.ajax({
				url:"data/json.php?t=s",
				dataType:"json",
				success:function(data){
					$("#"+myid+" .loading").hide();

					_.each(data,function(elem,ind){
						var title = "<h3>"+elem.title+"</h3>";
						var descrip = "<p>"+elem.description+"</p>";
						var $bt
						
					
						if($("#skinCustomizer-menu ul.skill-list li#skill-"+elem.id).length > 0){
							$bt = $('<span class="added-skill">Added</span>');
						}else{
							$bt = $('<a href="" id="add-item-'+elem.id+'" class="add-skill"><i class="fa fa-plus"></i>Add</a>').data("skill",elem);
						}

						

						var $li = $('<li id="item'+elem.id+'">'+title+descrip+'</li>');
						$li.append($bt);
						$("#"+myid+" .free-skills ul").append($li);                        
					})
					
					este.events = este.events || {};
					 var addSkill = 'click #' + myid + ' .add-skill';
					este.events[addSkill] = 'addSkilltoCustomizer';
					este.delegateEvents(); 

					$(".modal .skills").mCustomScrollbar({
						theme:"minimal-dark",
						scrollInertia:300
					});
				},

				error:function(jqXHR){
					console.log(jqXHR)
				}
			})

			$("#"+this.myid+" header .fa-close").unbind("click")
			$("#"+this.myid+" header .fa-close").click(function(){
				$(this).parents(".modal").fadeOut(function(){

					este.undelegateEvents();
					$(this).parents(".overlay").remove();

					});
				})


		},

		addSkilltoCustomizer : function(evt) {
			evt.preventDefault();

		   var name = $(evt.target).prop("tagName")
			if(name == "I"){
			var skill = $(evt.target).parent("a").data("skill");
			var $elem = $(evt.target).parent("a");
			}else{
			var skill = $(evt.target).data("skill");
			var $elem = $(evt.target);
			}

			var SkillItemModel = Backbone.Model.extend({});

			skillItemModel = new SkillItemModel({data:skill});

			var skinCustomizerItem = new SkinCustomizerItem({model:skillItemModel});

			skinCustomizerItem.render();
			$elem.replaceWith('<span class="added-skill">Added</span>')
			/*$(li)
			$("#skinCustomizer-menu .skill-list").append($li);*/
		}

	})      
	
	return SkillsModalList;
	
});
