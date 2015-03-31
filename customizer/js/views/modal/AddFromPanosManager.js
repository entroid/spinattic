define([
	'jquery',
	'underscore',
	'backbone',
	'jqueryui',
    'views/modal/Modal',
	'text!templates/modal/addFromPanosManager.html' 

], function($, _, Backbone,jqueryui,Modal,addFromPanosManager){

	var AddFromPanosManager = Modal.extend({
		
		initialize: function () {
			_.bindAll(this);        
			_.extend(this.events, Modal.prototype.events);
			
		},

		events:{
			"click .select-pano": "selectPano",
			"click .remove": "removePano",
			"click .cancel": "removeModal"
		},

		renderExtend: function() {
			var este = this;
			var myid = this.myid;
			var template = _.template(addFromPanosManager);

			$("#"+myid+" .inner-modal").html(template);
			$("#"+myid+" header h2").text("Add panos to this tour from Pano files manager:");
			
			$.ajax({
				url:"data/panoManager.json",
				dataType:"json",
				success: function( data ){
					
					este.data = data.pano;
					este.sortByKey("filename","verse")
					//este.data = data;
					este.verticalCent();
					este.autocomplete();

					$("#"+myid+" .sort-btn").click(function(){
						if(!$(this).hasClass("selected")){
							if($(this).hasClass("fa-sort-alpha-asc")){
								este.sortByKey("filename","asc")
							}else if($(this).hasClass("fa-sort-alpha-desc")){
								este.sortByKey("filename","desc")
							}else if($(this).hasClass("fa-sort-amount-asc")){
								este.sortByDate("asc")
							}else if($(this).hasClass("fa-sort-amount-desc")){
								este.sortByDate("desc")
							}
						$("#"+myid+" .sort-btn").removeClass("selected");
						$(this).addClass("selected")

						}

					})

				}
			})
			$("#"+myid+" .cancel").click(this.removeModal);
		
			
			$(".scrollwrapper").mCustomScrollbar({
				theme:"minimal-dark",
				scrollInertia:300
			});

		},

		selectPano: function(e) {
			var el = e.target,
				panoImg;

			if (!$(el).hasClass('selected')) {
				$(el).addClass('selected yellow').removeClass('blue').text('selected');

				panoImg = '<li><span class="remove fa fa-close"></span></li>';

				$(panoImg).prepend($(el).siblings('img').clone()).prependTo(".pano-manager .selected-panos");
			}
		},

		removePano: function(e) {
			var el = e.target,
				id = $(el).siblings('img').attr('data-id');

			$(el).parent().remove();
			$('.pano-list li').find('a[data-id="' + id + '"]').removeClass('yellow selected').addClass('blue').text('select');

		},

		autocomplete:function(){
			var data = this.data;
			$("#pano-search").autocomplete({
							source: data,
							appendTo:"#pano-search-results",

							focus: function( event, ui ) {
								$( "#pano-search" ).val( ui.item.fileName );
								return false;
								}, 
							select:function(event,ui){
								var myTitle = ui.item.fileName;
								$("#pano-search").val(myTitle);
								/*$("#"+myid+" .skill-list li").hide()
								$("#"+myid+" .inner-modal h2").show();
								$("#"+myid+" .skill-list li#item"+ui.item.id).show();*/
								return false;
							},
							search:function(event,ui){
							/*	$("#"+myid+" .skill-list li").hide();
								$("#"+myid+" .inner-modal h2").hide();*/
							},
							change: function(event,ui){
								if(!ui.item){
									$( "#pano-search" ).val('');
									//$("#"+myid+" .skill-list li").show()
									//$("#"+myid+" .inner-modal h2").show();
								}                               
							}
						}).data("ui-autocomplete")._renderItem = function(ul,item){

								return $( "<li></li>" )
								.data( "item.autocomplete", item )
								.append( "<img src="+item.img+" /><dl><dt>" + item.fileName + "</dt><dd>" + item.uploadDate + "</dd></dl>" )
								.appendTo( ul ); 

						};   
			},

			sortByKey:function(key,ascdes) {
				var data = this.data;
				

				var compare = function(el1, el2, index) {
					return el1[index] == el2[index] ? 0 : (el1[index] < el2[index] ? -1 : 1);
				}

				var panosOrder = data.sort(function(el1,el2){
				  return compare(el1, el2, "fileName")
				});

				if(ascdes == "desc"){
					panosOrder = panosOrder.reverse();
				}
				this.data = panosOrder;

				this.fullfillList()
			},

			sortByDate:function(ascdes){
				var data = this.data;
				function comp(a, b) {
					return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
				}
				var panosOrder = data.sort(comp);
				if(ascdes == "desc"){
					panosOrder = panosOrder.reverse();
				}
				this.data = panosOrder;
				this.fullfillList()
			},

			fullfillList:function(){
				var data =  this.data;
				var myid = this.myid;
				$("#"+myid+" .pano-list ul").html("");
				_.each( data, function ( el, i ){
						var img = '<img data-id="' + i + '" class="pano-img" src="' + el.img + '" alt="Pano Name">',
							fileName = '<div class="pano-entry">File Name: <span>' + el.fileName + '</span></div>',
							res = el.resolution,
							resolution,
							date = '<div class="pano-date">Upload date: ' + el.uploadDate + '</div>',
							pano;

						if(res === 'Multiresolution'){
							resolution = '<div class="pano-entry">' + res + '</div>'
						} else {
							resolution = '<div class="pano-entry">Tile size: <span>' + res + '</span></div>'
						};

						pano = '<li>' + img + '<div class="pano-data">' + fileName + resolution + date + '</div><a data-id="' + i + '" class="modal-bt blue select-pano">Select</a></li>'

						$("#"+myid+" .pano-list ul").append(pano);
						el.label = el.fileName;
					});

			}

	});

	return AddFromPanosManager;

});
