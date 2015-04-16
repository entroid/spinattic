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
            var compiledTemplate = _.template(hotspotphoto,{allData:allData,integer:num})
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);

    		var SingleUploaderModel = Backbone.Model.extend({});
            var singleUploaderModel = new SingleUploaderModel({myid:"pic-hotspot"+num,imgsrc:allData._pic})
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

			$me.find(".removeHotspot").click(function(){
				var krpano = document.getElementById("krpanoSWFObject");
				krpano.call("removehotspot("+spotName+")");
				manageData.removeHotSpot($("#tour").data("scene")._name, spotName);
				$("#"+myid+" header .save-and-close").trigger("click");
			})
	
	},

	removeThis:function(){
			this.undelegateEvents();
			$("#"+this.myid).parent(".overlay").remove();
		}

		
	});

	return PhotoHotspotEditorView;
	
});
