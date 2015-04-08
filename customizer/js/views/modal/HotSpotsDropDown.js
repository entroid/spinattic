define([
	'jquery',
	'underscore',
	'backbone',
	'helpers/HelpFunctions',
	'helpers/ManageData'
], function($, _, Backbone,HelpFunctions,ManageData){

	var HotSpotsDropDown = Backbone.View.extend({

		events:{
		},
		
		render:function(){
			

		var urls = [];
		var pos = [];
		var names = [];
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
					names.push(elem._name);
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
				var $li = $('<li id="opt'+ind+'" data-name="'+names[ind]+'"><div class="default" style="background-image:url(data/'+elem+');background-position:'+backpos+'"></div></li>');
				$("#"+elemid+" .styles-list").append($li);
			})


			var helpFunctions = new HelpFunctions();
			helpFunctions.dropDown("#"+elemid+" .dropdown");

		 	$("#"+elemid+" .dropdown li").click(function(){
		 		var bk = $(this).find(".default").css("background-image");
		 		var stylesel = $(this).data("name");
		 		$("#"+elemid+" .dropdown h2 .default").css("background-image",bk);
		 		var krpano = document.getElementById("krpanoSWFObject");
		 		krpano.call("hotspot["+elemid+"].loadStyle("+stylesel+");");
		 		
		 		var hotspot = $("#"+elemid).data("spotdata");
            	hotspot._selectedSet = stylesel;
            	$("#"+elemid).data("spotdata",hotspot);
            	var manageData = new ManageData();
            	manageData.changeDataInHotSpot( $("#tour").data("scene")._name,hotspot)

		 		console.log(elemid)
		 		console.log(selectedset)

		 	})

		}

		
	});

	return HotSpotsDropDown;
	
});
