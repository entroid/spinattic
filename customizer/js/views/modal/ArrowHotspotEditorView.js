define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'text!templates/modal/hotspotarrow.html',
	'helpers/HelpFunctions',
	'views/modal/HotSpotsDropDown',
	'helpers/ManageData',


], function($, _, Backbone,Modal,hotspotarrow,HelpFunctions,HotSpotsDropDown,ManageData){

	var ArrowHotspotEditorView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);        
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{

				 },
		
		renderExtend:function(){
			var manageData = new ManageData();
			var num = this.myid.replace("spot","");
			$("#"+this.myid).addClass("arrow-hotspot");
			$("#"+this.myid+" header h2").text("Arrow Hotspot. ID "+num+":")

			var allData = this.model.get("allData");
			var scenes = tourData.krpano.scene;			
			var compiledTemplate = _.template(hotspotarrow,{num:num,allData:allData,scenes:scenes})
			$("#"+this.myid+" .inner-modal").html(compiledTemplate);
			var me = this;
			$("#"+me.myid).find(".fa-close").remove();
			$("#"+me.myid+" header .save-and-close").unbind("click")
			$("#"+me.myid+" header .save-and-close").click(function(){
				
				var selectedscene = $("#"+me.myid+" h2 .selectedScene").text();
				var hotspot = allData;
				if(selectedscene == "none"){
					selectedscene = "";
				}
				hotspot._selectedscene = selectedscene;
				manageData.changeDataInHotSpot($("#tour").data("scene")._name, hotspot)
				
				$(this).parents(".modal").fadeOut(function(){
					me.removeThis();
				})
			})

			var selectedset = this.model.get("selectedSet");
			var myid = this.myid;
			var HotSpotDDModel = Backbone.Model.extend({});
			hotSpotDDModel = new HotSpotDDModel({selectedset:selectedset,kind:"arrow",elemid:myid});
			var hotSpotsDropDown = new HotSpotsDropDown({model:hotSpotDDModel})
			hotSpotsDropDown.render();
			this.autocomplete();


			$("#"+me.myid+" .scrollwrapper-scenes").mCustomScrollbar({
				theme:"minimal-dark",
				scrollInertia:300
			});

		},

		removeThis:function(){
			this.undelegateEvents();
			$("#"+this.myid).parent(".overlay").remove();
		},

		autocomplete: function(){
				var myid = this.myid;
				var num = this.myid.replace("spot","");
				var scenes = tourData.krpano.scene;
				_.each(scenes,function(elem,ind){
					elem.label = elem._title;
			}) 

			$("#"+myid+" .search-scenes").autocomplete({
				source:scenes,
				 appendTo:"#scenes-search-results-"+num,
				 focus: function( event, ui ) {
					$("#"+myid+" .search-scenes").val( ui.item._title );
					return false;
					}, 
				select:function(event,ui){
					var myTitle = ui.item._title;
					$("#"+myid+" .search-scenes").val(myTitle);
					/*$("#"+myid+" .inner-modal h2").show();*/
					//$("#"+myid+" .pano-list-ul #" +ui.item.fileName).show();
					return false;
				},
				search:function(event,ui){
				  //$("#"+myid+" .skill-list li").hide();
					//$("#"+myid+" .inner-modal h2").hide();
				},
				change: function(event,ui){
					if(!ui.item){
					   $("#"+myid+" .search-scenes").val('');
						//$("#"+myid+" .skill-list li").show()
						//$("#"+myid+" .inner-modal h2").show();
					}                               
				}
			}).data("ui-autocomplete")._renderItem = function(ul,item){

				return $( "<li></li>" )
				.data( "item.autocomplete", item )
				.append( "<img src="+item._thumburl+" /><dl><dt>" + item._title + "</dt><dd>" + item._name + "</dd></dl>" )
				.appendTo( ul ); 

			};
		}

		
	});

	return ArrowHotspotEditorView;
	
});
