define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/contextMenuSkillEditor.html',

], function($, _, Backbone,Modal,contextMenuSkillEditor){

	var ContextMenuSkillEditor = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);        
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{
		"click #Context-menu-add-item":"addItem",
		"click #Context-menu-finish":"doneEdition"
				 },
		
		renderExtend:function(){

			
			var myid = this.myid;
			var tourSkill = this.model.get("tourSkill");
			var template = _.template(contextMenuSkillEditor,{tourSkill:tourSkill})

			console.log(tourSkill);
			$("#"+myid+" .inner-modal").html(template);
			$("#"+myid+" header h2").text("Context Menu Skill Editor")
			$("#"+myid+" header .fa-close").unbind("click");
			$("#"+myid+" header .fa-close").click(function(evt){
				$("#"+myid).parent(".overlay").hide();
			})


			this.verticalCent();
		},

		addItem:function(){
			$item = $("#"+this.myid+" .fieldwrapper fieldset:eq(0)").clone();

			var length = $("#"+this.myid+" .fieldwrapper").children().length;
			length++
			$item.attr("id","contextMenu-"+length);
			$item.find("input").val("")
			$item.find("textarea").val("")
			$("#"+this.myid+" .fieldwrapper").append($item);
		},

		doneEdition:function(){
			var myid = this.myid;
			var data = this.model.get("data");
			var skillid = data.id;
			var items = []			
			_.each($("#"+myid+" .fieldwrapper fieldset"),function(elem,ind){
				var obj = {};
				obj._caption = $(elem).find("input.caption").val();
				obj._kind = "Context Menu"
				obj._name = $(elem).find("input.signature").val();
				obj._onclick = $(elem).find("textarea").val();
				obj._prev_tag_ident = "1";
				obj._segment = "SKILLS" ;
				obj._tag_ident = "2"
				items.push(obj)
			})

			tourData.krpano.contextmenu.item = items;
			$("#skinCustomizer-menu .skill-list #skill-"+skillid)
			$("#"+myid).parent(".overlay").hide();
		}
	});

	return ContextMenuSkillEditor;
	
});
