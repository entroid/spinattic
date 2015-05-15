define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/hotspotvideo.html',
	'views/modal/HotSpotsDropDown',
	'helpers/ManageData',
	
], function($, _, Backbone,Modal,hotspotvideo,HotSpotsDropDown,ManageData){

	var PhotoHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);		
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var manageData = new ManageData();
			var num = this.myid.replace("spot","");
			$("#"+this.myid+" header h2").text("Video Hotspot. ID "+num+":")
			var allData = this.model.get("allData")
			var compiledTemplate = _.template(hotspotvideo,{allData:allData,num:num})
			var myid = this.myid;
			$("#"+myid+" .inner-modal").html(compiledTemplate);
			$("#"+myid).find(".fa-close").remove();
			var me = this;
			var $me = $("#"+this.myid);
			$("#"+myid+" header .save-and-close").unbind("click");
			$("#"+myid+" header .save-and-close").click(function(){
				
				if($("#"+me.myid+" .onoffswitch-checkbox").is(":checked")){
					$("#"+me.myid+" .onoffswitch-checkbox").trigger("click");
				}
				var video = $("#"+myid+" #urlvideohotspot").val();
				var tooltip = $("#"+myid+" #videoTooltip").val();
				var hotspot = allData;
				hotspot._video = video;
				hotspot._tooltip = tooltip;
				manageData.changeDataInHotSpot($("#tour").data("scene")._name, hotspot)
				
				$(this).parents(".modal").fadeOut(function(){
					me.removeThis();
				})
			})

			var selectedset = this.model.get("selectedSet");
			var HotSpotDDModel = Backbone.Model.extend({});
			hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"video",elemid:myid});
			var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
			hotSpotsDropDown.render();
			var spotName =  this.myid;
			$me.find(".removeHotspot").click(function(){
				var krpano = document.getElementById("krpanoSWFObject");
				krpano.call("removehotspot("+spotName+")");
				manageData.removeHotSpot($("#tour").data("scene")._name, spotName);
				$("#"+myid+" header .save-and-close").trigger("click");
			})

			$me.find("#onoffswitchhpvideo-"+num).click(function(){
				if($(this).is(":checked")){
					var hpdata = $me.data("spotdata");
					var video = $("#"+myid+" #urlvideohotspot").val();
					var tooltip = $("#"+myid+" #videoTooltip").val();
					var krpano = document.getElementById("krpanoSWFObject");
					krpano.call("addhotspot("+hpdata._name +")");
					krpano.set("hotspot["+hpdata._name+"].pic", video );
					krpano.set("hotspot["+hpdata._name+"].tooltip", tooltip );
					
					krpano.call('set(hotspot['+hpdata._name+'].ondown, null );');
					krpano.call('set(hotspot['+hpdata._name+'].onclick, showpic() );');
					$me.find(".hotspotvideo").delay(200).slideUp(function(){
                       $me.find(".test-mode").fadeIn(); 
                    });
					$me.find(".removeHotspot").fadeOut();

				}else{
					var hpdata = $me.data("spotdata");
					var krpano = document.getElementById("krpanoSWFObject");
					krpano.call("addhotspot("+hpdata._name +")");
					krpano.call('set(hotspot['+hpdata._name+'].ondown, draghotspot() );');
					krpano.call('set(hotspot['+hpdata._name+'].onclick, js(openHotspotWindowEditor('+hpdata._name+')) );');
					$me.find(".hotspotvideo").delay(200).slideDown();
					$me.find(".removeHotspot").fadeIn();
					$me.find(".test-mode").fadeOut();
				}
			})
		},

		removeThis:function(){
			this.undelegateEvents();
			$("#"+this.myid).parent(".overlay").remove();
		}

		
	});

	return PhotoHotspotEditorView;
	
});
