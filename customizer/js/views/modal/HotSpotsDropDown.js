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
		var pos = []
		var selectedurl;
		var selectedPos;
		var styles = tourData.krpano.style;
		var kind = 	this.model.get("kind");
		var elemid = this.model.get("elemid");
		var selectedset = this.model.get("selectedset");

		_.each(styles,function(elem){
				if(elem._kind == kind){
					urls.push(elem._url);
					pos.push(elem._crop);
					var name = elem._name;
	                name = name.split("_");
	                if(name[1] == selectedset){
	                        selectedurl = elem._url;
	                    	selectedPos = elem._crop;
	                    }
                    }
			})

			selPos = selectedPos.split("|");
			$("#"+elemid+" .dropdown h2 .default").css({
				"background-image":"url(data/"+selectedurl+")",
				"background-position": "-"+selPos[0]+"px "+selPos[0]+"px"
			});
			
			_.each(urls,function(elem,ind){
				var mypos = pos[ind].split("|");
				var backpos = "-"+mypos[0]+"px "+mypos[0]+"px";
				var $li = $('<li id="opt'+ind+'"><div class="default" style="background-image:url(data/'+elem+');background-position:'+backpos+'"></div></li>');
				$("#"+elemid+" .styles-list").append($li);
			})


			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+elemid+" .dropdown");

		 	$("#"+elemid+" .dropdown li").click(function(){
		 		var bk = $(this).find(".default").css("background-image");
		 		$("#"+elemid+" .dropdown h2 .default").css("background-image",bk);
		 	})

		}

		
	});

	return HotSpotsDropDown;
	
});
