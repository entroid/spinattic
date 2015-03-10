define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/hotspotarrow.html',
	'helpers/HelpFunctions',
	'views/modal/HotSpotsDropDown',
	

], function($, _, Backbone,Modal,hotspotarrow,HelpFunctions,HotSpotsDropDown){

	var ArrowHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var num = this.myid.replace("spot","");
			$("#"+this.myid).addClass("arrow-hotspot");
			$("#"+this.myid+" header h2").text("Arrow Hotspot. ID "+num+":")
			var compiledTemplate = _.template(hotspotarrow)
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);
			$("#"+this.myid+" header .fa-close").unbind("click")
			$("#"+this.myid+" header .fa-close").click(function(){
				$(this).parents(".modal").fadeOut();
			})

			var selectedset = this.model.get("selectedSet");
			myid = this.myid;
			var HotSpotDDModel = Backbone.Model.extend({});
		    hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"arrow",elemid:myid});
		    var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
			hotSpotsDropDown.render();
			/*var urls = [];
			var selectedurl;
			_.each(styles,function(elem){
				if(elem._kind == "arrow"){
					urls.push(elem._url);

					var name = elem._name;
	                name = name.split("_");
	                
	                if(name[1] == selectedset){
	                        selectedurl = elem._url;
	                    }
                    }
			})
			var myid = this.myid;
			$("#"+myid+" .dropdown h2 .default").css("background-image","url(data/"+selectedurl+")");
			
			console.log(urls)
			_.each(urls,function(elem,ind){
				var $li = $('<li id="opt'+ind+'"><div class="default" style="background:url('+elem+')"></div></li>');
				$("#"+myid+" .styles-list").append($li);
			})


			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+this.myid+" .dropdown");
*/

		}

		
	});

	return ArrowHotspotEditorView;
	
});
