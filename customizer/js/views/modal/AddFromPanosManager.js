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
					este.autocomplete( myid );

					$("#"+myid+" .sort").click(function(){

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
			$("#" + myid + " .clear-btn").click(this.clearSearch)
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
				panoImg = '<li data-id="'+$(el).parents("li").attr("id")+'"><span class="remove fa fa-close"></span></li>';
				$(panoImg).prepend($(el).siblings('img').clone()).prependTo(".pano-manager .selected-panos");
			}
		},

		removePano: function(e) {
			var el = e.target,
				id = $(el).siblings('img').attr('data-id');

			$(el).parent().remove();
			$('.pano-list li').find('a[data-id="' + id + '"]').removeClass('yellow selected').addClass('blue').text('select');

		},

		autocomplete:function(myid){
			var data = this.data;
			$("#pano-search").autocomplete({
				source: data,
				appendTo:"#pano-search-results",

				focus: function( event, ui ) {
					$( "#pano-search" ).val( ui.item.fileName );
					return false;
					}, 
				select:function(event,ui){
					var myTitle = ui.item.fileName,
						panoId = myTitle.split('.')[0];
					$("#pano-search").val(myTitle);
					$("#"+myid+" .pano-list-ul li").hide()
					
					$("#"+myid+" .pano-list-ul #" + panoId).show();
					return false;
				},
				search:function(event,ui){
				/*  $("#"+myid+" .skill-list li").hide();
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
				var panoId = el.fileName.split('.')[0];
				var added = $("#"+myid+" .selected-panos li");
				var isThere = "blue";
				var selectText = "select";
				_.each(added,function(elem,ind){
			
					if(panoId == $(elem).data("id")){
						isThere = " selected yellow ";
						selectText = "selected"
					}
				}) 
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

				pano = '<li id="' + panoId + '">' + img + '<div class="pano-data">' + fileName + resolution + date + '</div><a data-id="' + i + '" class="modal-bt select-pano '+ isThere +'">'+selectText+'</a></li>'

				$("#"+myid+" .pano-list ul").append(pano);
				el.label = el.fileName;
			});

		},
		clearSearch: function (ev) {                
			$(ev.target).siblings('input').val('');
			$("#"+this.myid+" .pano-list-ul li").show()
		}

	});

	return AddFromPanosManager;

});
