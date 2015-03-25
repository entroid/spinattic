define([
	'jquery',
	'underscore',
	'backbone',
	'views/modal/Modal',
	'views/sidebar/MapView',

], function($, _, Backbone,Modal,MapView){

	var MapModalView = Modal.extend({
		
		initialize: function () {
		_.bindAll(this);        
		 _.extend(this.events, Modal.prototype.events);
		},
		events:{
		},
		
		renderExtend:function(){

			var myid = this.myid;

			$("#"+myid+" .inner-modal").html('<div class="gmap-wrapper"></div>');
			$("#"+myid+" header h2").text("Map");

			var MapModel = Backbone.Model.extend({});
			var lat = this.model.get("lat");
			var lng = this.model.get("lng");
			var mapModel = new MapModel({lat:lat,lng:lng})
			
			var mapView = new MapView({model:mapModel});
			mapView.render(myid);

		
		},

	});

	return MapModalView;
	
});
