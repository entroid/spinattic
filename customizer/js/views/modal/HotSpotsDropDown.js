define([
	'jquery',
	'underscore',
	'backbone',
	'helpers/HelpFunctions'

], function($, _, Backbone,HelpFunctions){

	var HotSpotsDropDown = Backbone.View.extend({

		events:{
		},
		
		render:function(){
			

		var urls = [];
		var selectedurl;
		var styles = tourData.krpano.style;
		var kind = 	this.model.get("kind");
		var elemid = this.model.get("elemid");
		var selectedset = this.model.get("selectedset");

		_.each(styles,function(elem){
				if(elem._kind == kind){
					urls.push(elem._url);
					var name = elem._name;
	                name = name.split("_");
	                if(name[1] == selectedset){
	                        selectedurl = elem._url;
	                    }
                    }
			})
			$("#"+elemid+" .dropdown h2 .default").css("background-image","url(data/"+selectedurl+")");
			
			_.each(urls,function(elem,ind){
				var $li = $('<li id="opt'+ind+'"><div class="default" style="background:url('+elem+')"></div></li>');
				$("#"+elemid+" .styles-list").append($li);
			})


			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+elemid+" .dropdown");

		  	
		}

		
	});

	return HotSpotsDropDown;
	
});
