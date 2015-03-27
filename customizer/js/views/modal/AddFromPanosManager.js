define([
    'jquery',
    'underscore',
    'backbone',
    'views/modal/Modal',
    'text!templates/modal/addFromPanosManager.html' 

], function($, _, Backbone,Modal,addFromPanosManager){

    var AddFromPanosManager = Modal.extend({
        
        initialize: function () {
            _.bindAll(this);        
            _.extend(this.events, Modal.prototype.events);
            
        },

        events:{
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
                    _.each( data.pano, function ( el, i ){
                        var img = '<img class="pano-img" src="' + el.img + '" alt="Pano Name">',
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

                        pano = '<li>' + img + '<div class="pano-data">' + fileName + resolution + date + '</div><a class="modal-bt blue">Select</a></li>'

                        $("#"+myid+" .pano-list ul").append(pano);
                    });

                    este.verticalCent();
                }
            })

            $(".scrollwrapper").mCustomScrollbar({
                theme:"minimal-dark",
                scrollInertia:300
            });

        }

    });

    return AddFromPanosManager;

});
