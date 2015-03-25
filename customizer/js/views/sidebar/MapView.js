define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/sidebar/map.html',
	'models/main/ModalModel',
	'views/modal/AlertView',
	'async!http://maps.googleapis.com/maps/api/js?libraries=places&sensor=fals',
	

], function($, _, Backbone,map,ModalModel,AlertView,MapModalView){

	var MapView = Backbone.View.extend({
		
		image:'images/icons/marker.png',
		geocoder:null,
		infowindow:null,
		marker:null,    
		map:null,
		markersArray:[],
		searchBox:null,
		myid:null,

		events:{
		
				 },

		initialize:function(){
			_.bindAll(this);
			console.log(self);
		},
		
		render: function(id){
			this.myid = id;
			var compiledTemplate = _.template(map);
			$("#"+id+" .gmap-wrapper").append( compiledTemplate ); 
			this.initMap();
		},

		initMap:function ()
		{
			this.geocoder = new google.maps.Geocoder();
			this.infowindow = new google.maps.InfoWindow();
			
			var latlng = new google.maps.LatLng(50, 0);
			var myOptions = {
				zoom: 1,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var elem = $("#"+this.myid+" .map_canvas")[0];
			var map = new google.maps.Map(elem, myOptions);
			this.map = map
			// add a click event handler to the map object
			var me = this;
			if(me.model.get("lat") != "" && me.model.get("lng") != ""){
				var latitudLongitud = new google.maps.LatLng(me.model.get("lat"), me.model.get("lng"));
				me.placeMarker(latitudLongitud);
				console.log(me.model.get("lat"))
				$("#"+me.myid+" .latFld").val(me.model.get("lat"));
				$("#"+me.myid+" .lngFld").val( me.model.get("lng"));
				me.codeLatLng();
			}
			google.maps.event.addListener(map, "click", function(event)
			{
				me.placeMarker(event.latLng);
				$("#"+me.myid+" .latFld").val(event.latLng.lat())
				$("#"+me.myid+" .lngFld").val(event.latLng.lng())
				me.codeLatLng();
			});


		  // Create the search box and link it to the UI element.
		  var input = ($("#"+me.myid+" .location")[0]);
		  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		  this.searchBox = new google.maps.places.SearchBox((input));
		  google.maps.event.addListener(me.searchBox, 'places_changed',me.searchMap);


		},

		 placeMarker: function (location) {
			// first remove all markers if there are any
			this.deleteOverlays();
			this.marker = new google.maps.Marker({
				position: location, 
				map: this.map
			});

			// add marker in markers array
			this.markersArray.push(this.marker);

			//map.setCenter(location);
		},

		deleteOverlays: function() {
			if(this.marker){
				this.marker.setMap(null);
			}
			if (this.markersArray) {
				for (i in this.markersArray) {
					this.markersArray[i].setMap(null);
				}
			this.markersArray.length = 0;
			}
		},

		codeLatLng:function() {
			var me = this;	
		  var thelocation = '';
		  var lat = parseFloat($("#"+me.myid+" .latFld").val());
		  var lng = parseFloat($("#"+me.myid+" .lngFld").val());
		  var latlng = new google.maps.LatLng(lat, lng);
		  this.geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			  if (results[1]) {
			   // map.setZoom(11);
				this.marker = new google.maps.Marker({
					position: latlng,
					map: this.map
				});
			   me.infowindow.setContent(results[1].formatted_address);
			   me.infowindow.open(me.map, me.marker);

				for (var ind=7;ind>=0;ind--)
				{
					if(typeof results[ind] != 'undefined'){
						parte = results[ind].formatted_address.replace(' - ',',').split(",");
						for(var i in parte){
//							alert (parte[i]);
							if(thelocation.indexOf(parte[i]) == -1){
								if(thelocation == ''){
									thelocation = parte[i] + thelocation;
								}else{
									thelocation = parte[i] + ', ' + thelocation;
								}
							}
						}
					}
				}

			$("#"+me.myid+" .location").val(thelocation);
				
			  } else {
				me.showMsg('No location results found. Please try again');
			  }
			} else {
			  me.showMsg('Geocoder failed due to: ' + status + '. Please try again');
			}
		  });
			return false;
		},

		searchMap:function(){

	    var places = this.searchBox.getPlaces();

		    if (places.length == 0) {
		      return;
		    }

		    var bounds = new google.maps.LatLngBounds();
		    for (var i = 0, place; place = places[i]; i++) {
		   	
		   	var myPlace = place.geometry.location
		   	this.placeMarker(myPlace)
		   	bounds.extend(myPlace);

		    $("#"+this.myid+" .latFld").val(myPlace.lat())
			$("#"+this.myid+" .lngFld").val(myPlace.lng())

		    }

		    this.map.fitBounds(bounds);

		},

		refreshSizeMap:function(){
			google.maps.event.trigger(this.map, "resize");
		},

		showMsg: function(msg){

				var modalModel = new ModalModel({msg:msg})
				var alertView = new AlertView({model:modalModel});
				alertView.render("alert_"+this.myid,alertView.renderExtend);

				}
		
	});

	return MapView;
	
});
