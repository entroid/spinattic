define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
    'text!templates/modal/hotspotphoto.html',
    'views/modal/HotSpotsDropDown',
	'views/modal/SingleUploader',
	'helpers/ManageData',
	
], function($, _, Backbone,Modal,hotspotphoto,HotSpotsDropDown,SingleUploader,ManageData){

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
			var myid = this.myid;
			
			$("#"+this.myid+" header h2").text("Photo Hotspot. ID "+num+":")
			var allData = this.model.get("allData");
            var compiledTemplate = _.template(hotspotphoto,{allData:allData,num:num})
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);

			tour_id = location.hash.split("/")[1];
			var caso = 'hotspots';
    		var SingleUploaderModel = Backbone.Model.extend({});
            var singleUploaderModel = new SingleUploaderModel({myid:"pic-hotspot"+num,imgsrc:allData._pic,tour_id:tour_id,caso:caso})
            var singleUploader = new SingleUploader({model:singleUploaderModel});
            
           /* var callBackFunction = function(){
				$("#"+myid).data("spotdata")._pic = $("#"+myid+" #pic-hotspot").data("imgsrc");
			}*/

			singleUploader.render();

			var me = this;
			$("#"+myid).find(".fa-close").remove();
			var $me = $("#"+this.myid);
			$("#"+myid+" header .save-and-close").unbind("click")
			$("#"+myid+" header .save-and-close").click(function(){
				
				if($("#"+me.myid+" .onoffswitch-checkbox").is(":checked")){
					$("#"+me.myid+" .onoffswitch-checkbox").trigger("click");
				}
				var pic = $("#"+myid+" #pic-hotspot"+num).data("imgsrc");
				var tooltip = $me.find("#photoTooltip").val();
				var hotspot = allData;
				hotspot._pic = pic;
				hotspot._tooltip = tooltip;
				manageData.changeDataInHotSpot($("#tour").data("scene")._name, hotspot)
				
				$(this).parents(".modal").fadeOut(function(){
					me.removeThis();
				})
			})

			var selectedset = this.model.get("selectedSet");
			var HotSpotDDModel = Backbone.Model.extend({});
		    hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"photo",elemid:myid});
		    var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
			hotSpotsDropDown.render();
			var spotName =  this.myid;
			$me.find(".removeHotspot").click(function(){
				var krpano = document.getElementById("krpanoSWFObject");
				krpano.call("removehotspot("+spotName+")");
				manageData.removeHotSpot($("#tour").data("scene")._name, spotName);
				$("#"+myid+" header .save-and-close").trigger("click");
			})

			$me.find("#onoffswitchhpphoto-"+num).click(function(){
				if($(this).is(":checked")){
					var hpdata = $me.data("spotdata");
					var pic = $("#"+myid+" #pic-hotspot"+num).data("imgsrc");
					var tooltip = $me.find("#photoTooltip").val(); 
					var krpano = document.getElementById("krpanoSWFObject");
					krpano.call("addhotspot("+hpdata._name +")");
					krpano.set("hotspot["+hpdata._name+"].pic", pic );
					krpano.set("hotspot["+hpdata._name+"].tooltip", tooltip );
					
					krpano.call('set(hotspot['+hpdata._name+'].ondown, null );');
					krpano.call('set(hotspot['+hpdata._name+'].onclick, showpic() );');
					$me.find(".hotspotphoto").delay(200).slideUp(function(){
                       $me.find(".test-mode").fadeIn(); 
                    });
					$me.find(".removeHotspot").fadeOut();

				}else{
					var hpdata = $me.data("spotdata");
					var krpano = document.getElementById("krpanoSWFObject");
					krpano.call("addhotspot("+hpdata._name +")");
					krpano.call('set(hotspot['+hpdata._name+'].ondown, draghotspot() );');
					krpano.call('set(hotspot['+hpdata._name+'].onclick, js(openHotspotWindowEditor('+hpdata._name+')) );');
					$me.find(".save-and-close").show();
					$me.find(".hotspotphoto").delay(200).slideDown();
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
